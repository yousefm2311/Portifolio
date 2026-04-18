'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedCta } from '@/lib/types';

const defaultCta: LocalizedCta = {
  ar: {
    eyebrow: 'جاهز للانطلاق؟',
    title: 'حوّل فكرتك إلى تجربة تُعرض بثقة',
    subtitle: 'ابدأ برسالة قصيرة، ونرتب معًا أفضل طريق للتنفيذ أو تطوير العرض الحالي.',
    primaryLabel: 'تواصل معي',
    secondaryLabel: 'شاهد التطبيقات'
  },
  en: {
    eyebrow: 'Ready to build?',
    title: 'Turn your idea into something you can present with confidence',
    subtitle: 'Start with a short message and we can shape the best path for execution or portfolio improvement.',
    primaryLabel: 'Contact me',
    secondaryLabel: 'View apps'
  }
};

export default function CallToAction({ cta }: { cta?: LocalizedCta | null }) {
  const { locale } = useLocale();
  const resolved = cta?.[locale]?.title ? cta[locale] : defaultCta[locale];

  return (
    <section className="section-shell p-8 sm:p-10">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">{resolved.eyebrow}</p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight">{resolved.title}</h2>
          <p className="max-w-2xl text-sm leading-8 text-muted">{resolved.subtitle}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contact">
            <Button>{resolved.primaryLabel}</Button>
          </Link>
          <Link href="/apps">
            <Button variant="secondary">{resolved.secondaryLabel}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
