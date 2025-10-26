'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';
import { UserPlus, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as XLSX from 'xlsx'; // <-- for Excel export

// Predefined date ranges
const predefinedRanges = [
  {
    label: 'Today',
    getRange: () => {
      const today = new Date();
      return { startDate: today, endDate: today };
    },
  },
  {
    label: 'Yesterday',
    getRange: () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      return { startDate: yesterday, endDate: yesterday };
    },
  },
  {
    label: 'Last 7 Days',
    getRange: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 6);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last 30 Days',
    getRange: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 29);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'This Month',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return { startDate: start, endDate: end };
    },
  },
  {
    label: 'Last Month',
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return { startDate: start, endDate: end };
    },
  },
];

// Helper to format date to dd/mm/yyyy
function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB');
}

// Helper to format date to yyyy-mm-dd for input[type=date]
function formatInputDate(d: Date) {
  return d.toISOString().split('T')[0];
}

export default function CustomersPage() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const [rangeLabel, setRangeLabel] = useState('Select Date Range');
  const [customRange, setCustomRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    setBills(savedBills);
    setFilteredBills(savedBills);
  }, []);

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedBills([]);
    } else {
      setSelectedBills(filteredBills.map((bill) => bill.orderId));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectBill = (orderId) => {
    setSelectedBills((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleSelectRange = (label: string, startDate: Date, endDate: Date) => {
    setRangeLabel(`${formatDate(startDate)} to ${formatDate(endDate)}`);
    setCustomRange({ startDate: formatInputDate(startDate), endDate: formatInputDate(endDate) });
    setShowDropdown(false);
  };

  const applyFilter = () => {
    if (!customRange.startDate || !customRange.endDate) {
      alert('Please select a valid date range.');
      return;
    }
    const start = new Date(customRange.startDate);
    const end = new Date(customRange.endDate);
    const filtered = bills.filter((bill) => {
      const billDate = new Date(bill.date);
      return billDate >= start && billDate <= end;
    });
    setFilteredBills(filtered);
    setSelectedBills([]);
    setSelectAll(false);
    setShowDropdown(false);
  };

  // Export filtered bills to Excel
  const handleExportExcel = () => {
    if (!filteredBills.length) {
      alert('No bills to export.');
      return;
    }

    const data = filteredBills.map((bill) => ({
      OrderID: bill.orderId,
      CustomerName: bill.customer.name,
      Phone: bill.customer.phone,
      ItemsCount: bill.items.length,
      Total: bill.finalTotal.toFixed(2),
      OrderDate: new Date(bill.date).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Bills Report');
    XLSX.writeFile(wb, 'Bills_Report.xlsx');
  };

  return (
    <div className="w-screen h-screen overflow-auto p-4 bg-gray-50">
      {/* Date Range Dropdown UI + Filter button + Excel Download */}
      <div className="relative inline-flex items-center gap-2 mb-4">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="px-9 py-2 bg-blue-600 text-white rounded"
        >
          📅 {rangeLabel} ▼
        </button>

        <button
          onClick={applyFilter}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update
        </button>

        {/* Download Excel Button */}
        <button
          onClick={handleExportExcel}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          ⬇ Download Excel
        </button>

        {showDropdown && (
          <div className="absolute bg-white border rounded shadow mt-1 w-72 z-10 flex">
            {/* Left menu: Predefined ranges */}
            <div className="flex flex-col border-r p-2 w-36 text-sm">
              {predefinedRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    const { startDate, endDate } = range.getRange();
                    handleSelectRange(range.label, startDate, endDate);
                  }}
                  className="text-left px-2 py-1 hover:bg-gray-200 rounded"
                >
                  {range.label}
                </button>
              ))}
              <div className="px-2 py-1 bg-blue-100 rounded mt-auto font-semibold">
                Custom Range
              </div>
            </div>

            {/* Right side: Custom range inputs */}
            <div className="p-2 flex flex-col gap-2 flex-grow">
              <label>
                Start Date:
                <input
                  type="date"
                  className="border rounded px-2 py-1 w-full"
                  value={customRange.startDate}
                  onChange={(e) =>
                    setCustomRange((prev) => ({ ...prev, startDate: e.target.value }))
                  }
                />
              </label>
              <label>
                End Date:
                <input
                  type="date"
                  className="border rounded px-2 py-1 w-full"
                  value={customRange.endDate}
                  onChange={(e) =>
                    setCustomRange((prev) => ({ ...prev, endDate: e.target.value }))
                  }
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <PageHeader title="Customers" description="View and manage your customer orders.">
        <Button variant="secondary" className="mr-2">
          Print Selected
        </Button>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </PageHeader>

      <Card className="overflow-x-auto mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden sm:table-cell">Items</TableHead>
                <TableHead className="hidden md:table-cell">Total</TableHead>
                <TableHead className="hidden md:table-cell">Order Date</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <TableRow key={bill.orderId}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedBills.includes(bill.orderId)}
                        onChange={() => handleSelectBill(bill.orderId)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarFallback>{bill.customer.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div>{bill.customer.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {bill.customer.phone}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {bill.items.length}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {bill.finalTotal.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(bill.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-32">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-4">
                    No bills found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
