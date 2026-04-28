'use client';

import PageTransition from '@/components/PageTransition';
import CommandPalette from '@/components/CommandPalette';
import { LocaleProvider } from '@/components/LocaleProvider';
import { Locale } from '@/data/translations';
import ThemeProvider from '@/components/ThemeProvider';
import type { Theme } from '@/lib/theme';
import ControlCenter from '@/components/ControlCenter';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';

export default function Providers({
  initialLocale,
  initialTheme,
  features,
  children
}: {
  initialLocale: Locale;
  initialTheme: Theme;
  features?: {
    resources?: boolean;
    services?: boolean;
  };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideShell = pathname?.startsWith('/studio');

  return (
    <SessionProvider>
      <ThemeProvider initialTheme={initialTheme}>
        <LocaleProvider initialLocale={initialLocale}>
          {!hideShell ? (
            <div className="flex min-h-screen w-full bg-[#18181b] text-white">
              <div className="sticky top-0 h-screen shrink-0">
                <Sidebar />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="sticky top-0 z-50">
                  <Topbar />
                </div>
                <main className="flex-1 bg-[#18181b]">
                  <PageTransition>{children}</PageTransition>
                </main>
              </div>
            </div>
          ) : (
            <PageTransition>{children}</PageTransition>
          )}
          <CommandPalette />
          <ControlCenter />
        </LocaleProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
