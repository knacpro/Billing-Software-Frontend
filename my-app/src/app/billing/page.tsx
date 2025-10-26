'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { Separator } from '@/components/ui/seperator';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

export default function BillingTable() {
  const router = useRouter();

  const [items, setItems] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [customer, setCustomer] = useState({ name: '', address: '', phone: '', gstNumber: '' });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [billingType, setBillingType] = useState('withoutGST');
  const [discount, setDiscount] = useState(0);

  // Load saved products
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setInventoryItems(parsedProducts);
      const mappedItems = parsedProducts.map((product) => ({
        name: product.name,
        unitQty: 0,
        unitMrp: product.unitMrp || 0,
      }));
      setItems(mappedItems);
    } else {
      setItems([{ name: '', unitQty: 0, unitMrp: 0 }]);
    }
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    if (['unitQty', 'unitMrp'].includes(field)) {
      updated[index][field] = parseFloat(value) || 0;
    } else if (field === 'name') {
      updated[index].name = value;

      const match = inventoryItems.find((inv) => inv.name.toLowerCase() === value.toLowerCase());
      if (match) {
        updated[index].unitMrp = match.unitMrp || 0;
      }
    } else {
      updated[index][field] = value;
    }
    setItems(updated);
  };

  const handleRemove = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', unitQty: 0, unitMrp: 0 }]);
  };

  const calculateItemTotal = (item) => {
    return item.unitQty * item.unitMrp;
  };

  const calculateGrandTotal = () => {
    return items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  };

  const subtotal = calculateGrandTotal();
  const taxRate = billingType === 'withGST' ? 0.1 : 0;
  const tax = subtotal * taxRate;
  const totalBeforeDiscount = subtotal + tax;
  const finalTotal = totalBeforeDiscount - discount;

  const handleSubmit = () => {
    setSubmitted(true);

    const billData = {
      customer,
      items,
      billingType,
      discount,
      subtotal,
      tax,
      finalTotal,
      comment,
      date: new Date().toISOString(),
      orderId: `ORD-${Date.now()}`
    };

    const existingBills = JSON.parse(localStorage.getItem("bills") || "[]");
    existingBills.push(billData);
    localStorage.setItem("bills", JSON.stringify(existingBills));

    setTimeout(() => {
      router.push('/customers');
    }, 0);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Billing Type Toggle */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Billing Type:</label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={billingType === 'withGST'}
            onChange={() => setBillingType('withGST')}
          />
          With GST
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            checked={billingType === 'withoutGST'}
            onChange={() => setBillingType('withoutGST')}
          />
          Without GST
        </label>
      </div>

      <PageHeader
        title="Billing Table"
        description={billingType === 'withGST' ? 'GST 10% Included' : 'No GST Applied'}
      />

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <div className="grid gap-2">
          <Input
            placeholder="Customer Name"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
          />
          <Input
            placeholder="Delivery Address"
            value={customer.address}
            onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
          />
          {billingType === 'withGST' && (
            <Input
              placeholder="Customer GST Number"
              value={customer.gstNumber}
              onChange={(e) => setCustomer({ ...customer, gstNumber: e.target.value })}
            />
          )}
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold">Order #: {`ORD-${Date.now()}`}</p>
          <p className="text-sm">{new Date().toLocaleString()}</p>
        </div>
      </div>

      {/* Billing Table */}
      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Unit Qty</TableHead>
              <TableHead>Unit MRP</TableHead>
              <TableHead>Available Unit</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => {
              const matchedInventory = inventoryItems.find((inv) => inv.name.toLowerCase() === item.name.toLowerCase());
              const availableUnit = matchedInventory?.availableUnit ?? 0;

              return (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      list="products"
                      value={item.name}
                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                    />
                    <datalist id="products">
                      {inventoryItems.map((inv, i) => (
                        <option key={i} value={inv.name} />
                      ))}
                    </datalist>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.unitQty}
                      onChange={(e) => handleChange(index, 'unitQty', e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.unitMrp}
                      onChange={(e) => handleChange(index, 'unitMrp', e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>{availableUnit}</TableCell>
                  <TableCell>₹{calculateItemTotal(item).toFixed(2)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => handleRemove(index)}>
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      <div className="my-4">
        <Button variant="outline" onClick={handleAddItem}>+ Add Item</Button>
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Textarea
            placeholder="Comment about order..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Discount ₹"
            value={discount}
            onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
          />
        </div>
        <div className="text-right space-y-2">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Tax ({billingType === 'withGST' ? '10%' : '0%'}): ₹{tax.toFixed(2)}</p>
          <p>Discount: ₹{discount.toFixed(2)}</p>
          <Separator />
          <h3 className="text-xl font-bold">Total: ₹{finalTotal.toFixed(2)}</h3>
        </div>
      </div>

      <div className="text-right mt-4">
        <Button onClick={handleSubmit}>Submit Order</Button>
      </div>

      {submitted && (
        <div className="mt-6 p-4 border rounded-md shadow bg-green-50">
          <h2 className="text-xl font-bold text-green-800 mb-2">Order Submitted Successfully!</h2>
          <p className="text-sm">Thank you, <strong>{customer.name}</strong>. Your order has been processed.</p>
          <div className="mt-4">
            <h3 className="font-semibold">Order Summary:</h3>
            <ul className="list-disc ml-6 text-sm">
              {items.map((item, idx) => (
                <li key={idx}>{item.name} - ₹{calculateItemTotal(item).toFixed(2)}</li>
              ))}
            </ul>
            {billingType === 'withGST' && customer.gstNumber && (
              <p className="mt-2 text-sm">Customer GST: {customer.gstNumber}</p>
            )}
            <p className="mt-2 text-sm">Comment: {comment}</p>
          </div>
        </div>
      )}
    </div>
  );
}
