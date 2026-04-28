'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Layers, Code, Clock, User, Mail, Settings } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';

export default function Sidebar() {
  const { t, locale } = useLocale();
  const pathname = usePathname();

  const menuGroups = [
    {
      title: locale === 'ar' ? 'القائمة الرئيسية' : 'Main Menu',
      items: [
        { label: locale === 'ar' ? 'الرئيسية' : 'Dashboard', href: '/', icon: LayoutDashboard },
        { label: t('apps'), href: '/apps', icon: Layers },
        { label: locale === 'ar' ? 'التقنيات' : 'Tech Stack', href: '/#tech', icon: Code },
        { label: locale === 'ar' ? 'المسار' : 'Timeline', href: '/#timeline', icon: Clock },
      ]
    },
    {
      title: locale === 'ar' ? 'التفاصيل' : 'Management',
      items: [
        { label: t('about'), href: '/about', icon: User },
        { label: t('contact'), href: '/contact', icon: Mail }
      ]
    }
  ];

  return (
    <aside className="hidden h-screen w-64 lg:flex flex-col border-r border-white/5 bg-[#131313] text-sm">
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black font-bold">
            Y
          </div>
          <span className="font-semibold tracking-wide text-white/90">
            Yousef<span className="text-accent-500">.dev</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8 no-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <h4 className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-white/40">
              {group.title}
            </h4>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2 transition-colors ${
                      active
                        ? 'bg-accent-500/10 text-accent-500'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="shrink-0 border-t border-white/5 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-500/20 text-accent-500">
            <User size={18} />
          </div>
          <div className="overflow-hidden">
            <p className="truncate text-sm font-semibold text-white/90">Yousef</p>
            <p className="truncate text-xs text-white/40">Software Engineer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
