"use client";

import Link from 'next/link';
import {
  Bell,
  CircleUserRound,
  PanelLeft,
  Search,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import AppSidebar from './app-sidebar';

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/accounts': 'Secondary Invoice',
  '/billing': 'Billing',
  '/inventory': 'Inventory',
  '/customers': 'Customers',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
};

export default function AppHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || '';

  return (
    <header className="flex items-center justify-between h-14 lg:h-[50px] px-4 bg-[#FBB916] border-b border-black sticky top-0 z-30">
      {/* Left side: Title */}
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden border-black text-black hover:bg-black hover:text-white"
            >
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col p-0 bg-white text-black">
            <AppSidebar isMobile={true} />
          </SheetContent>
        </Sheet>

        <h1 className="font-bold text-black text-lg hidden md:block">
           &nbsp;&nbsp;
          <span className="font-semibold">Welcome Siddaroodha Traders</span>
        </h1>
      </div>

      {/* Right side: User menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-none bg-black text-white border border-black hover:bg-white hover:text-black"
            aria-label="Toggle user menu"
          >
            <CircleUserRound className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-black bg-white text-black">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
