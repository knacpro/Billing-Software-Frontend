'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  FileText,
  Boxes,
  Contact,
  BarChart3,
  Bell,
  Package2,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const navLinks = [
  { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
  { href: '/add-product', icon: Boxes, label: 'Add Products' },
  { href: '/billing', icon: FileText, label: 'Create invoice' },
  { href: '/customers', icon: Contact, label: 'Bill Printing' },
  {
    label: 'Reports',
    icon: BarChart3,
    subLinks: [
      { href: '/reports/add-product-report', label: 'Add Product Report' },
      { href: '/reports/bill', label: 'Bill Report' },
    ],
  },
  { href: '/notifications', icon: Bell, label: 'Notifications' },
];

type AppSidebarProps = {
  isMobile?: boolean;
};

export default function AppSidebar({ isMobile = false }: AppSidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const bgColor = 'bg-white';
  const textColor = 'text-black';
  const borderColor = 'border-black';
  const activeBg = 'bg-[#FBB916]';
  const activeText = 'text-black';

  const commonClasses = `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-black hover:bg-[#FEE191] ${textColor}`;
  const activeClass = `${activeBg} ${activeText} font-semibold`;

  const toggleMenu = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const sidebarContent = (
    <div
      className={`flex flex-col h-screen gap-2 ${bgColor} border-r ${borderColor}`}
      style={{ overflow: 'hidden' }}
    >
      {/* Header */}
      <div
        className={`flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6 ${borderColor} ${textColor} font-headline font-semibold flex-shrink-0`}
      >
        <Link href="/" className="flex items-center gap-2">
          <Package2 className="h-6 w-8 text-[#FBB916]" />
          <h1 className="font-bold text-black text-lg hidden md:block">
            &nbsp;&nbsp;
            <span className="font-semibold">KNAC PRO </span>
          </h1>
        </Link>
        {isMobile && (
          <Button
            variant="outline"
            size="icon"
            className={`ml-auto h-8 w-8 border ${borderColor} ${textColor} hover:bg-[#FBB916] hover:text-black`}
          >
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        )}
      </div>

      {/* Navigation Links */}
      <nav
        className="flex-1 overflow-y-auto px-2 text-sm font-medium lg:px-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {navLinks.map(({ href, icon: Icon, label, subLinks }) => {
          if (subLinks) {
            return (
              <div key={label}>
                <button
                  onClick={() => toggleMenu(label)}
                  className={cn(commonClasses, openMenu === label && activeClass, 'w-full text-left')}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  {openMenu === label ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </button>
                {openMenu === label && (
                  <div className="ml-8 mt-1 flex flex-col gap-1">
                    {subLinks.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={cn(
                          'px-3 py-1 rounded-lg hover:bg-[#FEE191]',
                          pathname === sub.href && activeClass
                        )}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={label}
              href={href!}
              className={cn(commonClasses, pathname === href && activeClass)}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );

  const desktopSidebar = <div className="hidden md:block w-60">{sidebarContent}</div>;

  return isMobile ? sidebarContent : desktopSidebar;
}
