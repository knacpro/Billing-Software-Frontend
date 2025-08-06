import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/seperator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Trash2 } from 'lucide-react';
import PageHeader from '@/components/page-header';

export default function BillingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Create Invoice"
        description="Fill in the details to create and send a new invoice."
      />
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="grid gap-2">
                <Label htmlFor="client-name" className="font-semibold">Bill To</Label>
                <Input id="client-name" placeholder="Client's Name" />
                <Input id="client-company" placeholder="Client's Company" />
                <Input id="client-address" placeholder="Client's Address" />
                <Input id="client-email" type="email" placeholder="client@example.com" />
              </div>
              <div className="grid gap-2 text-right">
                <h2 className="font-headline text-3xl font-bold text-primary">INVOICE</h2>
                <div className="grid grid-cols-2 items-center">
                  <Label htmlFor="invoice-id" className="text-left">Invoice #</Label>
                  <Input id="invoice-id" defaultValue="INV-2024-001" className="text-right" />
                </div>
                 <div className="grid grid-cols-2 items-center">
                  <Label htmlFor="invoice-date" className="text-left">Date</Label>
                  <Input id="invoice-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} className="text-right" />
                </div>
                 <div className="grid grid-cols-2 items-center">
                  <Label htmlFor="due-date" className="text-left">Due Date</Label>
                  <Input id="due-date" type="date" className="text-right" />
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Description</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Input placeholder="Item description" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" defaultValue="1" className="w-16"/>
                    </TableCell>
                    <TableCell>
                       <Input type="number" placeholder="0.00" className="w-24"/>
                    </TableCell>
                    <TableCell className="text-right font-medium">$100.00</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" className="mt-4">
                <PlusCircle className="w-4 h-4 mr-2" /> Add Item
              </Button>
            </div>
            
            <Separator />

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <Label htmlFor="notes" className="font-semibold">Notes</Label>
                <Textarea id="notes" placeholder="Any additional notes for the client." className="mt-2"/>
              </div>
              <div className="flex flex-col items-end gap-2">
                 <div className="grid w-full max-w-sm grid-cols-2 items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="text-right">$100.00</span>
                 </div>
                 <div className="grid w-full max-w-sm grid-cols-2 items-center">
                    <span className="font-medium">Tax (10%):</span>
                    <span className="text-right">$10.00</span>
                 </div>
                 <Separator className="my-2" />
                 <div className="grid w-full max-w-sm grid-cols-2 items-center">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-lg font-bold text-right">$110.00</span>
                 </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Preview</Button>
          <Button>Send Invoice</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
