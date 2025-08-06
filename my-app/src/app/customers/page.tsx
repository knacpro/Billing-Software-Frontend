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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

const customers = [
    {
      name: 'Emma Watson',
      email: 'emma@hollywood.com',
      avatar: 'https://placehold.co/40x40.png',
      initials: 'EW',
      joined: '2023-01-15',
      orders: 5,
      totalSpent: 1250.75,
    },
    {
      name: 'Daniel Radcliffe',
      email: 'daniel@hogwarts.co.uk',
      avatar: 'https://placehold.co/40x40.png',
      initials: 'DR',
      joined: '2023-02-20',
      orders: 3,
      totalSpent: 850.0,
    },
    {
      name: 'Rupert Grint',
      email: 'rupert@weasley.com',
      avatar: 'https://placehold.co/40x40.png',
      initials: 'RG',
      joined: '2023-03-10',
      orders: 8,
      totalSpent: 2400.5,
    },
    {
      name: 'Tom Felton',
      email: 'tom@malfoymanor.com',
      avatar: 'https://placehold.co/40x40.png',
      initials: 'TF',
      joined: '2023-04-05',
      orders: 2,
      totalSpent: 450.25,
    },
];

export default function CustomersPage() {
    return (
        <div className="flex flex-col gap-6">
            <PageHeader
                title="Customers"
                description="View and manage your customer database."
            >
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Customer
                </Button>
            </PageHeader>
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead className="hidden sm:table-cell">Orders</TableHead>
                                <TableHead className="hidden md:table-cell">Total Spent</TableHead>
                                <TableHead className="hidden md:table-cell">Joined Date</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.email}>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="profile picture" />
                                                <AvatarFallback>{customer.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{customer.name}</div>
                                                <div className="text-sm text-muted-foreground">{customer.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">{customer.orders}</TableCell>
                                    <TableCell className="hidden md:table-cell">${customer.totalSpent.toFixed(2)}</TableCell>
                                    <TableCell className="hidden md:table-cell">{customer.joined}</TableCell>
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
                                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
    )
}
