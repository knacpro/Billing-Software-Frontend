'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trash2, Pencil, Save } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Product = {
  name: string;
  caseCount: number;
  unitCount: number;
  caseMrp: number;
  unitMrp: number;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts([{ name: '', caseCount: 0, unitCount: 0, caseMrp: 0, unitMrp: 0 }]);
    }
  }, []);

  const handleAddProduct = () => {
    setProducts([...products, { name: '', caseCount: 0, unitCount: 0, caseMrp: 0, unitMrp: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleChange = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    if (['caseCount', 'unitCount', 'caseMrp', 'unitMrp'].includes(field)) {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setProducts(updated);
  };

  const handleSave = () => {
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Saved Products:', products);
    alert('Products saved successfully!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <Card className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Case Count</TableHead>
              <TableHead>Case MRP</TableHead>
              <TableHead>Unit Count</TableHead>
              <TableHead>Unit MRP</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Input
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Case Count"
                    value={product.caseCount}
                    onChange={(e) => handleChange(index, 'caseCount', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Case MRP"
                    value={product.caseMrp}
                    onChange={(e) => handleChange(index, 'caseMrp', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Unit Count"
                    value={product.unitCount}
                    onChange={(e) => handleChange(index, 'unitCount', e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    placeholder="Unit MRP"
                    value={product.unitMrp}
                    onChange={(e) => handleChange(index, 'unitMrp', e.target.value)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveProduct(index)}
                  >
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