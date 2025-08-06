import { Bell, FileWarning, AlertTriangle, CircleCheck } from 'lucide-react';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const notifications = [
  {
    id: 1,
    type: 'overdue',
    title: 'Invoice #INV-2024-001 Overdue',
    description: 'Payment from John Doe is 3 days overdue.',
    time: '2 hours ago',
    icon: <FileWarning className="h-5 w-5 text-destructive" />,
  },
  {
    id: 2,
    type: 'low_stock',
    title: 'Low Stock Warning',
    description: 'Ergonomic Chair has only 15 units left.',
    time: '1 day ago',
    icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment Received',
    description: 'Received $250.00 for Invoice #INV-2024-002.',
    time: '2 days ago',
    icon: <CircleCheck className="h-5 w-5 text-green-500" />,
  },
    {
    id: 4,
    type: 'reminder',
    title: 'Billing Reminder Sent',
    description: 'A reminder has been sent to Jane Smith for invoice #INV-2023-088.',
    time: '3 days ago',
    icon: <Bell className="h-5 w-5 text-primary" />,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Notifications"
        description="Recent alerts and updates from your system."
      />
      <Card>
        <CardContent className="p-0">
          <ul className="divide-y">
            {notifications.map((notification) => (
              <li key={notification.id} className="flex items-start gap-4 p-4 hover:bg-muted/50">
                <Avatar className="h-10 w-10 border bg-background">
                  <AvatarFallback className="bg-transparent">{notification.icon}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                   <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
