'use client';

import Card from '@/components/ui/Card';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedTimeline } from '@/lib/types';

const defaultItems: LocalizedTimeline = {
  ar: [
    { year: '2020', title: 'البداية', desc: 'أول MVPات لخدمات محلية وتجارب إطلاق سريعة.' },
    { year: '2022', title: 'التحول', desc: 'بناء أنظمة ولوحات إدارة أكثر نضجًا واعتمادية.' },
    { year: '2024', title: 'التوسع', desc: 'حلول متعددة الأدوار مع تدفق استخدام أكثر تعقيدًا.' },
    { year: '2025', title: 'الآن', desc: 'عرض الأعمال كمنتجات حقيقية بدل مجرد لقطات ثابتة.' }
  ],
  en: [
    { year: '2020', title: 'Kickoff', desc: 'Early MVPs for local services and fast launch experiments.' },
    { year: '2022', title: 'Shift', desc: 'Building more mature and reliable admin systems.' },
    { year: '2024', title: 'Scale', desc: 'Multi-role products with deeper, more complex flows.' },
    { year: '2025', title: 'Now', desc: 'Presenting work like real products instead of static screenshots.' }
  ]
};

export default function Timeline({ items }: { items?: LocalizedTimeline | null }) {
  const { locale } = useLocale();
  const resolvedItems =
    items && items[locale]?.some((item) => item.year && item.title)
      ? items[locale].filter((item) => item.year && item.title)
      : defaultItems[locale];

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {resolvedItems.map((item) => (
        <Card key={item.year} className="relative overflow-hidden rounded-2xl border border-white/5 bg-black/20 p-6 transition hover:bg-white/5">
          <div className="absolute inset-y-0 left-0 w-1 bg-accent-400/80" />
          <div className="flex items-start justify-between gap-6 pl-4">
            <div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
            <span className="text-2xl font-bold text-accent-500/80">{item.year}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
