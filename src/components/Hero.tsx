'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedList } from '@/lib/types';

const defaultBadges: LocalizedList = {
  ar: ['منتجات موبايل', 'عرض داخل جهاز', 'واجهات واضحة', 'تنفيذ سريع'],
  en: ['Mobile Products', 'In-device Showcase', 'Clear Interfaces', 'Fast Delivery']
};

export default function Hero({
  cvUrl,
  badges
}: {
  cvUrl?: string | null;
  badges?: LocalizedList | null;
}) {
  const { t, locale } = useLocale();
  const resolvedBadges =
    badges && badges[locale]?.some((item) => item.trim().length > 0)
      ? badges[locale]
      : defaultBadges[locale];

  const notes =
    locale === 'ar'
      ? [
          'كل تطبيق هنا يُعرض كمنتج متكامل، لا كصور منفصلة.',
          'الهدف هو إبراز الشغل نفسه بدل إغراق الصفحة بعناصر كثيرة.',
          'المعاينة، التفاصيل، ودراسة الحالة كلها مترابطة وواضحة.'
        ]
      : [
          'Each app is presented like a complete product, not a loose set of screenshots.',
          'The goal is to let the work lead instead of filling the page with noise.',
          'Preview, details, and case study are tied together into one clear flow.'
        ];

  const metrics =
    locale === 'ar'
      ? [
          { value: 'موبايل', label: 'أساس العرض' },
          { value: 'هادئ', label: 'اتجاه بصري' },
          { value: 'واضح', label: 'سرد المشروع' }
        ]
      : [
          { value: 'Mobile', label: 'showcase focus' },
          { value: 'Calm', label: 'visual direction' },
          { value: 'Clear', label: 'project narrative' }
        ];

  return (
    <section className="relative isolate py-12 md:py-16">
      <div className="pointer-events-none absolute -left-6 top-0 h-48 w-48 rounded-full bg-accent-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-10 h-52 w-52 rounded-full bg-accent-500/8 blur-[140px]" />

      <div className="relative z-10 grid gap-10 xl:grid-cols-[1.14fr_0.86fr]">
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-soft">
            <span className="h-2 w-2 rounded-full bg-accent-400" />
            {locale === 'ar'
              ? 'واجهة أخف وأهدى لعرض الشغل بشكل أفضل'
              : 'A lighter, calmer layout built to present the work better'}
          </div>

          <div className="space-y-4">
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-muted md:text-lg">
              {t('heroSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {resolvedBadges.slice(0, 4).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs uppercase tracking-[0.16em] text-soft"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="#launcher">
              <Button>{t('openGallery')}</Button>
            </Link>
            <Link href="/apps">
              <Button variant="secondary">{t('viewApps')}</Button>
            </Link>
            {cvUrl && (
              <a href={cvUrl} target="_blank" rel="noreferrer">
                <Button variant="ghost">{t('downloadCv')}</Button>
              </a>
            )}
          </div>
        </div>

        <div className="section-shell p-6 sm:p-7">
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.22em] text-subtle">
                {locale === 'ar' ? 'ملخص التجربة' : 'Experience summary'}
              </p>
              <h2 className="text-2xl font-semibold tracking-tight">
                {locale === 'ar' ? 'رئيسية أوضح ومساحة تتنفس' : 'A clearer homepage with more breathing room'}
              </h2>
            </div>

            <div className="grid gap-3">
              {notes.map((note, index) => (
                <div
                  key={note}
                  className="flex items-start gap-4 rounded-card border border-white/10 bg-black/10 px-4 py-4"
                >
                  <span className="mt-0.5 text-xs uppercase tracking-[0.2em] text-faint">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-7 text-soft">{note}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((item) => (
                <div key={item.label} className="rounded-card-sm border border-white/10 bg-white/5 p-4">
                  <p className="text-lg font-semibold">{item.value}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-subtle">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
