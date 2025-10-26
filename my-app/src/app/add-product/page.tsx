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
import { PlusCircle, Trash2, Pencil, Save, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';

type Product = {
  name: string;
  unitCount: number;
  unitMrp: number;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load products from localStorage when component mounts
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  // Automatically save whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    setProducts([...products, { name: '', unitCount: 0, unitMrp: 0 }]);
  };

  const handleRemoveProduct = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleChange = (index: number, field: keyof Product, value: string) => {
    const updated = [...products];
    if (['unitCount', 'unitMrp'].includes(field)) {
      updated[index][field] = parseFloat(value) || 0;
    } else {
      updated[index][field] = value;
    }
    setProducts(updated);
  };

  const handleSave = () => {
    localStorage.setItem('products', JSON.stringify(products));
    alert('Products saved successfully!');
  };

  // Filter products by search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
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
              <TableHead>Product Name</TableHead>
              <TableHead>Unit Count</TableHead>
              <TableHead>Unit MRP</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      placeholder="Product Name"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(index, 'name', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Unit Count"
                      value={product.unitCount}
                      onChange={(e) =>
                        handleChange(index, 'unitCount', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="Unit MRP"
                      value={product.unitMrp}
                      onChange={(e) =>
                        handleChange(index, 'unitMrp', e.target.value)
                      }
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No products found
                </TableCell>
              </TableRow>
            )}
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
