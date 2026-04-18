'use client';

import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedImpact } from '@/lib/types';

const defaultItems: LocalizedImpact = {
  ar: [
    { value: '12+', label: 'منتج تم إطلاقه' },
    { value: '6', label: 'سنوات خبرة تنفيذية' },
    { value: '40+', label: 'رحلة استخدام تفاعلية' },
    { value: '99.9%', label: 'ثبات في الإطلاق' }
  ],
  en: [
    { value: '12+', label: 'Products shipped' },
    { value: '6', label: 'Years in production' },
    { value: '40+', label: 'Interactive flows' },
    { value: '99.9%', label: 'Release stability' }
  ]
};

export default function ImpactStrip({ items }: { items?: LocalizedImpact | null }) {
  const { locale } = useLocale();
  const resolvedItems =
    items && items[locale]?.some((item) => item.value && item.label)
      ? items[locale].filter((item) => item.value && item.label)
      : defaultItems[locale];

  return (
    <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {resolvedItems.map((item, index) => (
        <div
          key={`${item.value}-${item.label}`}
          className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5 transition hover:border-white/20"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-white/40">
            {String(index + 1).padStart(2, '0')}
          </p>
          <div className="mt-3 text-2xl font-semibold text-gradient">{item.value}</div>
          <div className="mt-2 text-sm leading-7 text-white/68">{item.label}</div>
        </div>
      ))}
    </section>
  );
}
