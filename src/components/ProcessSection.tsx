'use client';

import Image from 'next/image';
import { Layers, Rocket, ShieldCheck, Sparkles, Code2, Zap, Layout, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedSectionIntro, LocalizedCardList } from '@/lib/types';

const defaultIntro: LocalizedSectionIntro = {
  ar: {
    eyebrow: 'المنهجية',
    title: 'خطوات واضحة من البداية للنهاية',
    subtitle: 'الهدف هو تقليل الضبابية: كل مرحلة لها مخرج واضح وقيمة محسوسة.'
  },
  en: {
    eyebrow: 'Process',
    title: 'A clearer workflow from start to finish',
    subtitle: 'The goal is to reduce ambiguity: each stage should create a visible outcome.'
  }
};

const defaultSteps: LocalizedCardList = {
  ar: [
    { title: 'الاكتشاف', desc: 'نفهم الفكرة، الجمهور، ومكان القوة الحقيقي في المنتج.' },
    { title: 'التصميم', desc: 'نرتب الواجهة والتجربة قبل الدخول في تفاصيل التنفيذ.' },
    { title: 'التنفيذ', desc: 'نحوّل القرارات إلى منتج ثابت وسهل التطوير لاحقًا.' },
    { title: 'الإطلاق', desc: 'نجهز المنتج للعرض أو التسليم أو الإطلاق الفعلي بثقة.' }
  ],
  en: [
    { title: 'Discovery', desc: 'We clarify the idea, audience, and where the product truly wins.' },
    { title: 'Design', desc: 'We structure interface and flow before implementation complexity takes over.' },
    { title: 'Build', desc: 'We turn decisions into a stable product that is easy to extend later.' },
    { title: 'Launch', desc: 'We prepare the product for presentation, delivery, or production release.' }
  ]
};

const icons: LucideIcon[] = [Layers, Sparkles, ShieldCheck, Rocket];
const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  sparkles: Sparkles,
  shield: ShieldCheck,
  rocket: Rocket,
  code: Code2,
  zap: Zap,
  layout: Layout,
  workflow: Workflow
};

export default function ProcessSection({
  intro,
  steps
}: {
  intro?: LocalizedSectionIntro | null;
  steps?: LocalizedCardList | null;
}) {
  const { locale } = useLocale();
  const resolvedIntro = intro?.[locale]?.title ? intro[locale] : defaultIntro[locale];
  const resolvedSteps =
    steps && steps[locale]?.some((item) => item.title && item.desc)
      ? steps[locale].filter((item) => item.title && item.desc)
      : defaultSteps[locale];

  return (
    <section className="section-shell p-6 py-10 sm:p-8 sm:py-12">
      <div className="relative z-10 space-y-8">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">{resolvedIntro.eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight">{resolvedIntro.title}</h2>
          <p className="max-w-3xl text-sm leading-8 text-muted">{resolvedIntro.subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resolvedSteps.map((step, index) => {
            const Icon = step.icon ? iconMap[step.icon] ?? icons[index % icons.length] : icons[index % icons.length];
            const mediaUrl = step.media?.url;
            return (
              <div key={`${step.title}-${index}`} className="glass-soft rounded-[1.7rem] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.24em] text-white/45">
                    {locale === 'ar' ? `مرحلة ${index + 1}` : `Stage ${index + 1}`}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/5 text-accent-300">
                    {mediaUrl ? (
                      <Image src={mediaUrl} alt={step.title} width={36} height={36} className="object-cover" />
                    ) : (
                      <Icon size={16} />
                    )}
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
