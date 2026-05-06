'use client';

import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Save, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Product = {
  id?: number;
  name: string;
  hsnCode: string;
  qty: string;
  mrp: number;
  rate: number;
  grossAmt: number;
  schemePercent: number;
  schemeAmt: number;
  gstPercent: number;
  totalAmt: number;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: '', hsnCode: '', qty: '', mrp: 0, rate: 0, grossAmt: 0, schemePercent: 0, schemeAmt: 0, gstPercent: 0, totalAmt: 0 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const updated = [...products];
    updated.splice(index, 1);
    setProducts(updated);
  };

  const handleChange = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    if (['mrp', 'rate', 'grossAmt', 'schemePercent', 'schemeAmt', 'gstPercent', 'totalAmt'].includes(field)) {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setProducts(updated);
  };

  const handleSave = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products),
    });
    alert('Products saved to MySQL!');
    fetchProducts();
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product Invoice Details</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Description</TableHead>
              <TableHead>HSN Code</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Gross Amt</TableHead>
              <TableHead>Sch(%)</TableHead>
              <TableHead>Sch(INR)</TableHead>
              <TableHead>GST(%)</TableHead>
              <TableHead>Total Amt</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product, index) => (
              <TableRow key={index}>
                {Object.keys(product).filter(key => key !== 'id').map((field) => (
                  <TableCell key={field}>
                    <Input
                      type={typeof (product as any)[field] === 'number' ? 'number' : 'text'}
                      value={(product as any)[field]}
                      onChange={(e) => handleChange(index, field as keyof Product, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleRemoveProduct(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="flex gap-4 mt-4">
        <Button variant="outline" size="sm" onClick={handleAddProduct}>
          <PlusCircle className="w-4 h-4 mr-2" /> Add Product
        </Button>
        <Button variant="default" size="sm" onClick={handleSave}>
          <Save className="w-4 h-4 mr-2" /> Save Products
        </Button>
      </div>
    </div>
  );
}
