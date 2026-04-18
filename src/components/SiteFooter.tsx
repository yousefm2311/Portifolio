'use client';

import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';

export default function SiteFooter({
  features
}: {
  features?: { resources?: boolean; services?: boolean };
}) {
  const { t, locale } = useLocale();
  return (
    <footer className="mt-20 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.8fr]">
            <div className="space-y-3">
              <div className="text-lg font-semibold text-white">
                Yousef<span className="text-accent-400">.dev</span>
              </div>
              <p className="max-w-md text-sm leading-7 text-white/65">
                {locale === 'ar'
                  ? 'بورتفوليو يركز على عرض التطبيقات بشكل منظم، مقنع، وقريب من طريقة تقديم المنتجات الحقيقية.'
                  : 'A portfolio focused on presenting apps in a cleaner, stronger, product-style format.'}
              </p>
              <p className="text-sm text-white/50">
                (c) {new Date().getFullYear()} Yousef.{' '}
                {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                {locale === 'ar' ? 'روابط سريعة' : 'Quick links'}
              </p>
              <div className="grid gap-2 text-sm text-white/75">
                <Link href="/apps" className="hover:text-white">
                  {t('apps')}
                </Link>
                {features?.services && (
                  <Link href="/services" className="hover:text-white">
                    {t('services')}
                  </Link>
                )}
                {features?.resources && (
                  <Link href="/resources" className="hover:text-white">
                    {t('resources')}
                  </Link>
                )}
                <Link href="/#launcher" className="hover:text-white">
                  {locale === 'ar' ? 'تجربة الهاتف' : 'Phone showcase'}
                </Link>
                <Link href="/about" className="hover:text-white">
                  {t('about')}
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-white/50">
                {locale === 'ar' ? 'تواصل' : 'Contact'}
              </p>
              <div className="grid gap-2 text-sm text-white/75">
                <Link href="/contact" className="hover:text-white">
                  {t('contact')}
                </Link>
                <a href="mailto:yousef.m2399@gmail.com" className="hover:text-white">
                  yousef.m2399@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
