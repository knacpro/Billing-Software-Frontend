
'use client';

import { usePathname } from 'next/navigation';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/app-sidebar';
import AppHeader from '@/components/layout/app-header';
import './globals.css';

// This is a workaround to make metadata work in a client component.
// In a real app, you'd want to handle this more gracefully, perhaps with route groups.
const metadata: Metadata = {
  title: 'KnacPro',
  description: 'Modern Billing Software',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased min-h-screen')}>
        {isLoginPage ? (
          <main>{children}</main>
        ) : (
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <AppHeader />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
        )}
        <Toaster />
      </body>
    </html>
  );
}
