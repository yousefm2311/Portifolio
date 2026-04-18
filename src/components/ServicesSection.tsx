'use client';

import Link from 'next/link';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedServices } from '@/lib/types';

export default function ServicesSection({ services }: { services?: LocalizedServices | null }) {
  const { locale } = useLocale();
  const list = services?.[locale]?.filter((item) => item.name && item.price) ?? [];
  const items = list.slice(0, 3);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            {locale === 'ar' ? 'الخدمات' : 'Services'}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            {locale === 'ar' ? 'باقات العمل' : 'Service plans'}
          </h2>
          <p className="text-muted">
            {locale === 'ar'
              ? 'اختيارات مختصرة وواضحة، ويمكن دائمًا طلب عرض مخصص حسب المشروع.'
              : 'A shorter, clearer set of options, with room for fully custom scopes.'}
          </p>
        </div>
        <Link href="/services" className="text-sm text-white/70 hover:text-white">
          {locale === 'ar' ? 'عرض الكل' : 'View all'}
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="glass-soft rounded-2xl p-6 text-sm text-muted">
          {locale === 'ar' ? 'لا توجد باقات حالياً.' : 'No service plans yet.'}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((plan, index) => (
            <div
              key={`${plan.name}-${index}`}
              className={`rounded-[1.8rem] p-6 space-y-4 transition hover:-translate-y-1 ${
                plan.highlight
                  ? 'border border-accent-400/28 bg-white/[0.04] shadow-[0_12px_30px_rgba(43,197,255,0.08)]'
                  : 'border border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                {plan.highlight && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {locale === 'ar' ? 'مميز' : 'Popular'}
                  </span>
                )}
              </div>
              <div className="text-2xl font-semibold text-gradient">{plan.price}</div>
              <p className="text-sm text-muted">{plan.description}</p>
              <div className="space-y-2 text-sm text-white/70">
                {(plan.features ?? []).slice(0, 3).map((feature, featureIndex) => (
                  <div
                    key={`${plan.name}-feature-${featureIndex}`}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
