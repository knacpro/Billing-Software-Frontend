// 'use client';

// import { useEffect, useState } from 'react';
// import { Card, CardContent } from '@/components/ui/card';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Button } from '@/components/ui/button';
// import PageHeader from '@/components/page-header';
// import { UserPlus, MoreHorizontal } from 'lucide-react';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';

// // Predefined date ranges matching your screenshot
// const predefinedRanges = [
//   {
//     label: 'Today',
//     getRange: () => {
//       const today = new Date();
//       return { startDate: today, endDate: today };
//     },
//   },
//   {
//     label: 'Yesterday',
//     getRange: () => {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       return { startDate: yesterday, endDate: yesterday };
//     },
//   },
//   {
//     label: 'Last 7 Days',
//     getRange: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(end.getDate() - 6);
//       return { startDate: start, endDate: end };
//     },
//   },
//   {
//     label: 'Last 30 Days',
//     getRange: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(end.getDate() - 29);
//       return { startDate: start, endDate: end };
//     },
//   },
//   {
//     label: 'This Month',
//     getRange: () => {
//       const now = new Date();
//       const start = new Date(now.getFullYear(), now.getMonth(), 1);
//       const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//       return { startDate: start, endDate: end };
//     },
//   },
//   {
//     label: 'Last Month',
//     getRange: () => {
//       const now = new Date();
//       const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//       const end = new Date(now.getFullYear(), now.getMonth(), 0);
//       return { startDate: start, endDate: end };
//     },
//   },
// ];

// // Helper to format date to dd/mm/yyyy
// function formatDate(date: Date) {
//   return date.toLocaleDateString('en-GB');
// }

// // Helper to format date to yyyy-mm-dd for input[type=date]
// function formatInputDate(d: Date) {
//   return d.toISOString().split('T')[0];
// }

// export default function CustomersPage() {
//   const [bills, setBills] = useState([]);
//   const [filteredBills, setFilteredBills] = useState([]); // filtered bills state
//   const [selectedBills, setSelectedBills] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   useEffect(() => {
//     const savedBills = JSON.parse(localStorage.getItem('bills') || '[]');
//     setBills(savedBills);
//     setFilteredBills(savedBills); // show all initially
//   }, []);

//   // Date range picker states
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [rangeLabel, setRangeLabel] = useState('Select Date Range');
//   const [customRange, setCustomRange] = useState<{ startDate: string; endDate: string }>({
//     startDate: '',
//     endDate: '',
//   });

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedBills([]);
//     } else {
//       setSelectedBills(filteredBills.map((bill) => bill.orderId));
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleSelectBill = (orderId) => {
//     setSelectedBills((prev) =>
//       prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
//     );
//   };

//   const handleSelectRange = (label: string, startDate: Date, endDate: Date) => {
//     setRangeLabel(`${formatDate(startDate)} to ${formatDate(endDate)}`);
//     setCustomRange({ startDate: formatInputDate(startDate), endDate: formatInputDate(endDate) });
//     setShowDropdown(false);
//   };

//   // Filter function for date range
//   const applyFilter = () => {
//     if (!customRange.startDate || !customRange.endDate) {
//       alert('Please select a valid date range.');
//       return;
//     }
//     const start = new Date(customRange.startDate);
//     const end = new Date(customRange.endDate);
//     const filtered = bills.filter((bill) => {
//       const billDate = new Date(bill.date);
//       return billDate >= start && billDate <= end;
//     });
//     setFilteredBills(filtered);
//     setSelectedBills([]);
//     setSelectAll(false);
//     setShowDropdown(false);
//   };

//   const handlePrint = () => {
//     const printData = bills.filter((bill) => selectedBills.includes(bill.orderId));
//     if (printData.length === 0) {
//       alert('Please select at least one bill to print.');
//       return;
//     }

//     const invoiceCSS = `
//       <style>
//         body { font-family: sans-serif; font-size: 12px; }
//         table { border-collapse: collapse; width: 100%; }
//         th, td { border: 1px solid black; padding: 4px; font-size: 11px; }
//         .noborder td, .noborder th { border: none; }
//         .textCenter { text-align: center; font-size: 14px; font-weight: bold; }
//         .textRight { text-align: right; }
//         .textLeft { text-align: left; }
//         .smallfont { font-size: 11px; }
//       </style>
//     `;

//     const printWindow = window.open('', '', 'width=900,height=700');
//     printWindow.document.write(`<html><head><title>Invoices</title>${invoiceCSS}</head><body>`);

//     printData.forEach((bill) => {
//       let itemsHTML = bill.items
//         .map(
//           (item, idx) => `
//           <tr>
//             <td class="textCenter">${idx + 1}</td>
//             <td>${item.sku || ''}</td>
//             <td>${item.name}</td>
//             <td>${item.hsn || ''}</td>
//             <td>${item.batch || ''}</td>
//             <td>${item.upc || ''}</td>
//             <td class="textCenter">${item.caseQty || 0}</td>
//             <td class="textCenter">${item.unitQty || 0}</td>
//             <td class="textCenter">${(item.caseQty || 0) + (item.unitQty || 0)}</td>
//             <td class="textCenter">${item.free || 0}</td>
//             <td class="textRight">${item.caseMrp || 0}</td>
//             <td class="textRight">${item.rate || item.unitMrp || 0}</td>
//             <td class="textRight">${(item.total || (item.caseQty * item.caseMrp) + (item.unitQty * item.unitMrp)).toFixed(2)}</td>
//             <td class="textCenter">${item.schemePercent || 0}</td>
//             <td class="textCenter">${item.schemeAmt || 0}</td>
//             <td class="textCenter">${item.cdPercent || 0}% (${item.cdAmt || 0})</td>
//             <td class="textRight">${item.taxable || 0}</td>
//             <td class="textCenter">5.00 (${((item.taxable || 0) * 0.02).toFixed(2)})</td>
//             <td class="textCenter">5.00 (${((item.taxable || 0) * 0.02).toFixed(2)})</td>
//             <td class="textCenter">0.00 (0.00)</td>
//             <td class="textRight">${((item.taxable || 0) * 1.18).toFixed(2)}</td>
//           </tr>
//         `
//         )
//         .join('');

//       printWindow.document.write(`
//         <div class="textCenter">Tax Invoice<span style="float:right;">ORIGINAL / DUPLICATE / TRIPLICATE</span></div>
//         <table class="noborder">
//           <tr>
//             <td width="40%">
//               <b>Bill From:-</b><br>
//               UDAYA AGENCIES<br>
//               KUSUGAL ROAD KESHWAPUR HUBLI<br>
//               State Code & Name: 29 KARNATAKA<br>
             
//             </td>
//             <td width="40%">
//               <b>Ship To:-</b><br>
//               ${bill.customer.name || ''}<br>
//               ${bill.customer.address || ''}<br>
//               State Code & Name: 29 KARNATAKA<br>
//               Phone: ${bill.customer.phone || ''}<br>
//             </td>
//             <td width="20%">
//               Invoice number: ${bill.orderId}<br>
//               Invoice Date: ${new Date(bill.date).toLocaleDateString()}<br>
//             </td>
//           </tr>
//         </table>

//         <table>
//           <tr>
//             <th>S No.</th>
//             <th>SkuCode</th>
//             <th>Item Name</th>
//             <th>HsnCode</th>
//             <th>Batch Number</th>
//             <th>UPC</th>
//             <th>Qty Cases</th>
//             <th>Qty Units</th>
//             <th>Total Qty</th>
//             <th>Free</th>
//             <th>MRP</th>
//             <th>Rate</th>
//             <th>Gross Amt</th>
//             <th>Scheme %</th>
//             <th>Scheme Amt</th>
//             <th>CD% (Amt)</th>
//             <th>Taxable Amount</th>
//             <th>CGST % (Amt)</th>
//             <th>U/SGST % (Amt)</th>
//             <th>IGST % (Amt)</th>
//             <th>Total Amount</th>
//           </tr>
//           ${itemsHTML}
//         </table>

//         <p><b>Net Receivable Amount:</b> ₹${bill.finalTotal.toFixed(2)}</p>
//         <hr/>
//       `);
//     });

//     printWindow.document.write('</body></html>');
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <div className="w-screen h-screen overflow-auto p- bg-gray-50">
//       {/* Date Range Dropdown UI + Filter button */}
//       <div className="relative inline-flex items-center gap-2 mb-4">
//         <button
//           onClick={() => setShowDropdown(!showDropdown)}
//           className="px-9 py-2 bg-blue-600 text-white rounded"
//         >
//           📅 {rangeLabel} ▼
//         </button>

//         {/* Filter Button */}
//         <button
//           onClick={applyFilter}
//           className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//         >
//           Update
//         </button>

//         {showDropdown && (
//           <div className="absolute bg-white border rounded shadow mt-1 w-72 z-10 flex">
//             {/* Left menu: Predefined ranges */}
//             <div className="flex flex-col border-r p-2 w-36 text-sm">
//               {predefinedRanges.map((range) => (
//                 <button
//                   key={range.label}
//                   onClick={() => {
//                     const { startDate, endDate } = range.getRange();
//                     handleSelectRange(range.label, startDate, endDate);
//                   }}
//                   className="text-left px-2 py-1 hover:bg-gray-200 rounded"
//                 >
//                   {range.label}
//                 </button>
//               ))}
//               <div className="px-2 py-1 bg-blue-100 rounded mt-auto font-semibold">Custom Range</div>
//             </div>

           
//             <div className="p-2 flex flex-col gap-2 flex-grow">
//               <label>
//                 Start Date:
//                 <input
//                   type="date"
//                   className="border rounded px-2 py-1 w-full"
//                   value={customRange.startDate}
//                   onChange={(e) =>
//                     setCustomRange((prev) => ({ ...prev, startDate: e.target.value }))
//                   }
//                 />
//               </label>
//               <label>
//                 End Date:
//                 <input
//                   type="date"
//                   className="border rounded px-2 py-1 w-full"
//                   value={customRange.endDate}
//                   onChange={(e) =>
//                     setCustomRange((prev) => ({ ...prev, endDate: e.target.value }))
//                   }
//                 />
//               </label>
//             </div>
//           </div>
//         )}
//       </div>

//       <PageHeader title="Customers" description="View and manage your customer orders.">
//         <Button onClick={handlePrint} variant="secondary" className="mr-2">
//           Print Selected
//         </Button>
//         <Button>
//           <UserPlus className="h-4 w-4 mr-2" />
//           Add Customer
//         </Button>
//       </PageHeader>

//       <Card className="overflow-x-auto mt-4">
//         <CardContent className="p-0">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>
//                   <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
//                 </TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead className="hidden sm:table-cell">Items</TableHead>
//                 <TableHead className="hidden md:table-cell">Total</TableHead>
//                 <TableHead className="hidden md:table-cell">Order Date</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Actions</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredBills.length > 0 ? (
//                 filteredBills.map((bill) => (
//                   <TableRow key={bill.orderId}>
//                     <TableCell>
//                       <input
//                         type="checkbox"
//                         checked={selectedBills.includes(bill.orderId)}
//                         onChange={() => handleSelectBill(bill.orderId)}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Avatar>
//                           <AvatarFallback>{bill.customer.name[0]}</AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <div>{bill.customer.name}</div>
//                           <div className="text-muted-foreground text-sm">{bill.customer.phone}</div>
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell className="hidden sm:table-cell">{bill.items.length}</TableCell>
//                     <TableCell className="hidden md:table-cell">{bill.finalTotal.toFixed(2)}</TableCell>
//                     <TableCell className="hidden md:table-cell">
//                       {new Date(bill.date).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant="ghost" className="h-8 w-8 p-0">
//                             <span className="sr-only">Open menu</span>
//                             <MoreHorizontal className="h-4 w-4" />
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="w-32">
//                           <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                           <DropdownMenuItem>View</DropdownMenuItem>
//                           <DropdownMenuItem>Edit</DropdownMenuItem>
//                           <DropdownMenuItem>Delete</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} className="text-center p-4">
//                     No bills found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function CustomersPage() {
  const [bills, setBills] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bills') || '[]');
    setBills(data);
  }, []);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePrint = () => {
    const data = bills.filter((b) => selected.includes(b.orderId));
    if (data.length === 0) return alert("Select bill");

    const w = window.open('', '', 'width=1000,height=800');

    w.document.write(`
    <html>
    <head>
      <style>
        body { font-family: Arial; font-size: 14px; }
        table { border-collapse: collapse; width: 100%; font-size: 13px; }
        th, td { border: 1px solid black; padding: 6px; }
        .center { text-align: center; }
        .right { text-align: right; }
        .no-border td { border: none; }
        h3 { text-align: center; font-size: 18px; }

        @media print {
          body { zoom: 1.2; }
        }
      </style>
    </head>
    <body>
    `);

    data.forEach((bill) => {

      let totalTaxable = 0;
      let totalCGST = 0;
      let totalSGST = 0;

      const rows = bill.items.map((item, i) => {
        const taxable = item.qty * item.price;
        const cgst = taxable * 0.025;
        const sgst = taxable * 0.025;

        totalTaxable += taxable;
        totalCGST += cgst;
        totalSGST += sgst;

        return `
        <tr>
          <td class="center">${i + 1}</td>
          <td>${item.name}</td>
          <td class="center">0000</td>
          <td class="center">${item.qty}</td>
          <td class="right">${item.price}</td>
          <td class="right">${taxable.toFixed(2)}</td>
          <td class="center">2.5%</td>
          <td class="right">${cgst.toFixed(2)}</td>
          <td class="center">2.5%</td>
          <td class="right">${sgst.toFixed(2)}</td>
          <td class="right">${(taxable + cgst + sgst).toFixed(2)}</td>
        </tr>
        `;
      }).join('');

      w.document.write(`
        <h3>TAX INVOICE</h3>

        <table class="no-border">
          <tr>
            <td>
              <b>From:</b><br/>
              UDAYA AGENCIES
            </td>
            <td>
              <b>To:</b><br/>
              ${bill.customer.name}<br/>
              ${bill.customer.address}<br/>
              ${bill.customer.phone}
            </td>
            <td>
              Invoice: ${bill.orderId}<br/>
              Date: ${new Date(bill.date).toLocaleDateString()}
            </td>
          </tr>
        </table>

        <br/>

        <table>
          <tr>
            <th>S.No</th>
            <th>Item</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Taxable</th>
            <th>CGST</th>
            <th>CGST Amt</th>
            <th>SGST</th>
            <th>SGST Amt</th>
            <th>Total</th>
          </tr>

          ${rows}
        </table>

        <br/>

        <table>
          <tr><td>Total</td><td class="right">${totalTaxable.toFixed(2)}</td></tr>
          <tr><td>CGST</td><td class="right">${totalCGST.toFixed(2)}</td></tr>
          <tr><td>SGST</td><td class="right">${totalSGST.toFixed(2)}</td></tr>
          <tr><td><b>Final</b></td><td class="right"><b>${(totalTaxable + totalCGST + totalSGST).toFixed(2)}</b></td></tr>
        </table>

        <br/><br/>

        <table class="no-border">
          <tr>
            <td>Receiver Signature</td>
            <td class="right">Authorized Signatory</td>
          </tr>
        </table>

        <hr/>
      `);
    });

    w.document.write('</body></html>');
    w.document.close();
    w.print();
  };

  return (
    <div className="p-6">

      <Button onClick={handlePrint}>Print Invoice</Button>

      {bills.map((bill) => (
        <div key={bill.orderId} className="flex gap-2 mt-2">
          <input type="checkbox" onChange={() => toggleSelect(bill.orderId)} />
          <span>{bill.customer.name} - ₹{bill.finalTotal}</span>
        </div>
      ))}
    </div>
  );
}