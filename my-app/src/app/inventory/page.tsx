import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/page-header';
import { PackagePlus, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const inventoryItems = [
  {
    name: 'Wireless Mouse',
    sku: 'MOU-24-W',
    category: 'Electronics',
    stock: 120,
    price: 24.99,
    status: 'In Stock',
    image: 'https://placehold.co/64x64.png',
  },
  {
    name: 'Mechanical Keyboard',
    sku: 'KBD-24-M',
    category: 'Electronics',
    stock: 75,
    price: 89.99,
    status: 'In Stock',
    image: 'https://placehold.co/64x64.png',
  },
  {
    name: 'Ergonomic Chair',
    sku: 'CHR-24-E',
    category: 'Furniture',
    stock: 15,
    price: 299.50,
    status: 'Low Stock',
    image: 'https://placehold.co/64x64.png',
  },
  {
    name: '4K Monitor',
    sku: 'MON-24-4K',
    category: 'Electronics',
    stock: 0,
    price: 450.00,
    status: 'Out of Stock',
    image: 'https://placehold.co/64x64.png',
  },
   {
    name: 'Standing Desk',
    sku: 'DSK-24-S',
    category: 'Furniture',
    stock: 30,
    price: 350.00,
    status: 'In Stock',
    image: 'https://placehold.co/64x64.png',
  },
];

export default function InventoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Inventory"
        description="Manage your products and track stock levels."
      >
        <Button>
          <PackagePlus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">
                  Stock
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryItems.map((item) => (
                <TableRow key={item.sku}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={item.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={item.image}
                      width="64"
                      data-ai-hint="product image"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                    <div className="text-xs text-muted-foreground">{item.sku}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Out of Stock' ? 'destructive' : item.status === 'Low Stock' ? 'secondary' : 'outline'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.stock}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
