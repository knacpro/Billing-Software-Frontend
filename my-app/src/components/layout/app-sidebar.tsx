'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  FileText,
  Boxes,
  Contact,
  BarChart3,
  Bell,
  Package2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const navLinks = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/accounts', icon: Users, label: 'Accounts' },
  { href: '/billing', icon: FileText, label: 'Billing' },
  { href: '/inventory', icon: Boxes, label: 'Inventory' },
  { href: '/customers', icon: Contact, label: 'Customers' },
  { href: '/reports', icon: BarChart3, label: 'Reports' },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
];

type AppSidebarProps = {
  isMobile?: boolean;
};

export default function AppSidebar({ isMobile = false }: AppSidebarProps) {
  const pathname = usePathname();

  const commonClasses =
    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary';
  const activeClass = 'bg-muted text-primary';

  const sidebarContent = (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline font-semibold">
          <Package2 className="h-6 w-6 text-primary" />
          <span className="">KnacPro</span>
        </Link>
        {isMobile && (
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        )}
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                commonClasses,
                pathname === href && activeClass
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  const desktopSidebar = (
    <div className="hidden border-r bg-card md:block">
      {sidebarContent}
    </div>
  );

  return isMobile ? sidebarContent : desktopSidebar;
}
