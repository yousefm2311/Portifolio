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
            <p className="text-sm font-semibold text-accent-500">
              {locale === 'ar' ? 'المسار' : 'Journey'}
            </p>
            <h2 className="mt-2 text-3xl lg:text-4xl font-bold">{t('timelineTitle')}</h2>
          </div>
          <div className="rounded-xl border border-white/5 bg-black/20 px-4 py-2 text-sm font-semibold text-white/80">
            {range}
          </div>
        </div>
        <Timeline items={items ?? null} />
      </div>
    </section>
  );
}
