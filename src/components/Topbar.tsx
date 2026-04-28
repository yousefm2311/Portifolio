'use client';

import { Search, Bell, Mail, User } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';

export default function Topbar() {
  const { locale, t } = useLocale();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#18181b] px-6">
      <div className="flex items-center text-sm font-medium text-white/60">
        <span className="hover:text-white transition cursor-pointer">
          {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </span>
        <span className="mx-2 text-white/30">&gt;</span>
        <span className="text-accent-500">
          {locale === 'ar' ? 'نظرة عامة' : 'Overview'}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden w-64 md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="w-full rounded-full border border-white/10 bg-white/5 py-1.5 pl-4 pr-10 text-sm text-white placeholder:text-white/40 focus:border-accent-500 focus:outline-none"
          />
        </div>
        
        <div className="flex items-center gap-3 border-l border-white/10 pl-4">
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition">
            <Bell size={16} />
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition">
            <Mail size={16} />
          </button>
          <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-accent-500/20 text-accent-500">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}
