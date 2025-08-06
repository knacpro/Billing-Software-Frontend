import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/page-header';

export default function AccountsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Account Management"
        description="Create and manage shop accounts."
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Create New Shop</CardTitle>
              <CardDescription>
                Fill out the form to add a new shop account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="shop-name">Shop Name</Label>
                <Input id="shop-name" placeholder="Acme Inc." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="owner-name">Owner Name</Label>
                <Input id="owner-name" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="owner@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subscription">Subscription Plan</Label>
                <Select>
                  <SelectTrigger id="subscription">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Account</Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Existing Shops</CardTitle>
              <CardDescription>
                A list of all registered shop accounts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shop Name</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Innovate Inc.</div>
                      <div className="text-sm text-muted-foreground">
                        sarah@innovate.com
                      </div>
                    </TableCell>
                    <TableCell>Pro</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Synergy Solutions</div>
                      <div className="text-sm text-muted-foreground">
                        mike@synergy.com
                      </div>
                    </TableCell>
                    <TableCell>Basic</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                   <TableRow>
                    <TableCell>
                      <div className="font-medium">Quantum Leap</div>
                      <div className="text-sm text-muted-foreground">
                        lisa@quantum.com
                      </div>
                    </TableCell>
                    <TableCell>Enterprise</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Inactive</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
