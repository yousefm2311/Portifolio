'use client';

import Image from 'next/image';
import { Layers, Rocket, ShieldCheck, Sparkles, Code2, Zap, Layout, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedSectionIntro, LocalizedNotes, LocalizedCardList } from '@/lib/types';

const defaultIntro: LocalizedSectionIntro = {
  ar: {
    eyebrow: 'المزايا',
    title: 'من الفكرة إلى منتج واضح وقابل للإطلاق',
    subtitle: 'أغطي دورة المنتج كاملة، مع تركيز على تقديم واجهات قوية، منطق نظيف، وتجربة تظهر الاحتراف بوضوح.'
  },
  en: {
    eyebrow: 'Capabilities',
    title: 'From concept to a clear, launch-ready product',
    subtitle: 'I cover the full product cycle with stronger interfaces, cleaner logic, and a presentation that feels deliberate.'
  }
};

const defaultNotes: LocalizedNotes = {
  ar: {
    noteA: 'كل جزء في المنتج يجب أن يخدم القصة، لا أن يزيد الزحمة.',
    noteB: 'الاهتمام بالتفاصيل الصغيرة هو ما يصنع الانطباع الكبير.'
  },
  en: {
    noteA: 'Every part of the product should support the story, not add noise.',
    noteB: 'Small details are usually what create the strongest impression.'
  }
};

const defaultItems: LocalizedCardList = {
  ar: [
    { title: 'استراتيجية المنتج', desc: 'تحويل الفكرة إلى خطة تنفيذ واضحة، بدل البناء العشوائي.' },
    { title: 'واجهات حية', desc: 'تصميم وتجربة استخدام تشعر بالحياة بدون مبالغة أو ازدحام.' },
    { title: 'هندسة قابلة للتوسع', desc: 'بنية مرتبة تستوعب النمو والتعديل والصيانة.' },
    { title: 'إطلاق أسرع', desc: 'تقليل التشتت وتركيز الجهد على ما يهم المنتج فعلاً.' }
  ],
  en: [
    { title: 'Product strategy', desc: 'Turn the idea into a clear execution plan instead of building blindly.' },
    { title: 'Living interfaces', desc: 'Design and UX that feel alive without becoming noisy.' },
    { title: 'Scalable engineering', desc: 'A cleaner foundation that handles growth and iteration well.' },
    { title: 'Faster launch', desc: 'Less distraction, more focus on what actually moves the product forward.' }
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

export default function CapabilitiesSection({
  intro,
  notes,
  items
}: {
  intro?: LocalizedSectionIntro | null;
  notes?: LocalizedNotes | null;
  items?: LocalizedCardList | null;
}) {
  const { locale } = useLocale();
  const resolvedIntro = intro?.[locale]?.title ? intro[locale] : defaultIntro[locale];
  const resolvedNotes = notes?.[locale]?.noteA ? notes[locale] : defaultNotes[locale];
  const resolvedItems =
    items && items[locale]?.some((item) => item.title && item.desc)
      ? items[locale].filter((item) => item.title && item.desc)
      : defaultItems[locale];

  return (
    <section className="section-shell p-6 py-10 sm:p-8 sm:py-12">
      <div className="relative z-10 grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">{resolvedIntro.eyebrow}</p>
          <h2 className="text-3xl font-semibold tracking-tight">{resolvedIntro.title}</h2>
          <p className="text-sm leading-8 text-muted">{resolvedIntro.subtitle}</p>
          <div className="grid gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/75">
              {resolvedNotes.noteA}
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-white/75">
              {resolvedNotes.noteB}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {resolvedItems.map((item, index) => {
            const Icon = item.icon ? iconMap[item.icon] ?? icons[index % icons.length] : icons[index % icons.length];
            const mediaUrl = item.media?.url;
            return (
              <div key={`${item.title}-${index}`} className="glass-soft rounded-[1.7rem] p-5">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white/5 text-accent-300">
                  {mediaUrl ? (
                    <Image src={mediaUrl} alt={item.title} width={44} height={44} className="object-cover" />
                  ) : (
                    <Icon size={20} />
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
