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
            <div className="flex h-screen w-full overflow-hidden bg-[#18181b] text-white">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#18181b]">
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
