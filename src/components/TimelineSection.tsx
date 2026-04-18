'use client';

import Timeline from '@/components/Timeline';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedTimeline } from '@/lib/types';

const fallbackRange = '2020 - 2025';

export default function TimelineSection({ items }: { items?: LocalizedTimeline | null }) {
  const { t, locale } = useLocale();
  const years =
    items?.[locale]?.map((item) => item.year).filter((year): year is string => Boolean(year)) ?? [];
  const numericYears = years
    .map((year) => Number.parseInt(year, 10))
    .filter((year) => !Number.isNaN(year));
  const range =
    numericYears.length > 0
      ? `${Math.min(...numericYears)} - ${Math.max(...numericYears)}`
      : fallbackRange;

  return (
    <section className="section-shell p-6 py-10 sm:p-8 sm:py-12">
      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-white/55">
              {locale === 'ar' ? 'المسار' : 'Journey'}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t('timelineTitle')}</h2>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70">
            {range}
          </div>
        </div>
        <Timeline items={items ?? null} />
      </div>
    </section>
  );
}
