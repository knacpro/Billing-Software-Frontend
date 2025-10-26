'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import * as XLSX from 'xlsx';

type Product = {
  name: string;
  sku: string;
  category: string;
  caseMrp: number;
  unitMrp: number;
  availableCase: number;
  availableUnit: number;
  status: string;
  image: string;
  addedDate?: string; // for date filtering
};

export default function ReportsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Load products from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
    setFiltered(stored);
  }, []);

  const handleUpdate = () => {
    if (!fromDate && !toDate) {
      setFiltered(products);
      return;
    }

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const result = products.filter((p: Product) => {
      const productDate = p.addedDate ? new Date(p.addedDate) : null;
      if (!productDate) return true;

      let isValid = true;
      if (from && productDate < from) isValid = false;
      if (to && productDate > to) isValid = false;
      return isValid;
    });

    setFiltered(result);
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filtered);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Products');
    XLSX.writeFile(wb, 'Product_Report.xlsx');
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Report</h1>

      {/* Date range filter */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1">From Date</label>
          <Input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1">To Date</label>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className="flex items-end gap-2">
          <Button onClick={handleUpdate}>Update</Button>
          <Button variant="outline" onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
      </div>

      {/* Product table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">SKU</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Case MRP</th>
              <th className="border p-2">Unit MRP</th>
              <th className="border p-2">Available Case</th>
              <th className="border p-2">Available Unit</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Added Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, idx) => (
                <tr key={idx} className="text-center">
                  <td className="border p-2">{p.name}</td>
                  <td className="border p-2">{p.sku}</td>
                  <td className="border p-2">{p.category}</td>
                  <td className="border p-2">₹{p.caseMrp}</td>
                  <td className="border p-2">₹{p.unitMrp}</td>
                  <td className="border p-2">{p.availableCase}</td>
                  <td className="border p-2">{p.availableUnit}</td>
                  <td className="border p-2">{p.status}</td>
                  <td className="border p-2">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-10 w-10 object-cover mx-auto" />
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="border p-2">{p.addedDate || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={10} className="p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
