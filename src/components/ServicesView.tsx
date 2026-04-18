'use client';

import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedServices } from '@/lib/types';

export default function ServicesView({ services }: { services?: LocalizedServices | null }) {
  const { locale } = useLocale();
  const list = services?.[locale]?.filter((item) => item.name && item.price) ?? [];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <section className="p-2 sm:p-0">
        <div className="relative z-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">
            {locale === 'ar' ? 'الخدمات' : 'Services'}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {locale === 'ar' ? 'باقات عمل مرنة حسب هدف المنتج' : 'Flexible service packages built around product goals'}
          </h1>
          <p className="max-w-3xl text-sm leading-8 text-muted">
            {locale === 'ar'
              ? 'سواء كنت تحتاج MVP سريع، تحسين لتجربة حالية، أو نظام إدارة متكامل، يمكن اختيار باقة مناسبة أو طلب عرض مخصص.'
              : 'Whether you need a fast MVP, a stronger current experience, or a complete admin system, you can pick a package or request a custom scope.'}
          </p>
        </div>
      </section>

      {list.length === 0 ? (
        <div className="glass-soft rounded-[1.8rem] p-8 text-sm text-muted">
          {locale === 'ar' ? 'لا توجد باقات مضافة حاليًا.' : 'No service plans have been added yet.'}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((plan, index) => (
            <div
              key={`${plan.name}-${index}`}
              className={`rounded-[1.8rem] border p-6 transition hover:-translate-y-1 ${
                plan.highlight
                  ? 'border-accent-400/28 bg-white/[0.04] shadow-[0_12px_30px_rgba(43,197,255,0.08)]'
                  : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight">{plan.name}</h2>
                {plan.highlight && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {locale === 'ar' ? 'مميز' : 'Popular'}
                  </span>
                )}
              </div>
              <div className="mt-5 text-3xl font-semibold text-gradient">{plan.price}</div>
              <p className="mt-3 text-sm leading-7 text-muted">{plan.description}</p>
              <div className="mt-5 space-y-2 text-sm text-white/75">
                {(plan.features ?? []).map((feature, featureIndex) => (
                  <div
                    key={`${plan.name}-feature-${featureIndex}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
