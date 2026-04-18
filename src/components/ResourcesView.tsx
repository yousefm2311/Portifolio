'use client';

import { BookOpen, ExternalLink, FileText, PlayCircle, Wrench } from 'lucide-react';
import { useLocale } from '@/components/LocaleProvider';
import type { LocalizedResources } from '@/lib/types';

const typeConfig = {
  guide: { icon: BookOpen, label: { ar: 'دليل', en: 'Guide' } },
  link: { icon: ExternalLink, label: { ar: 'رابط', en: 'Link' } },
  tool: { icon: Wrench, label: { ar: 'أداة', en: 'Tool' } },
  file: { icon: FileText, label: { ar: 'ملف', en: 'File' } },
  video: { icon: PlayCircle, label: { ar: 'فيديو', en: 'Video' } }
};

export default function ResourcesView({ resources }: { resources?: LocalizedResources | null }) {
  const { locale } = useLocale();
  const list = resources?.[locale]?.filter((item) => item.title && item.url) ?? [];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <section className="p-2 sm:p-0">
        <div className="relative z-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">
            {locale === 'ar' ? 'الموارد' : 'Resources'}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {locale === 'ar' ? 'مكتبة روابط وملفات مفيدة' : 'A cleaner library of useful links and assets'}
          </h1>
          <p className="max-w-3xl text-sm leading-8 text-muted">
            {locale === 'ar'
              ? 'مجموعة أدوات وروابط ودروس تساعد في تسريع التنفيذ واتخاذ قرارات أفضل أثناء بناء المنتج.'
              : 'A set of links, guides, and references that support faster execution and better product decisions.'}
          </p>
        </div>
      </section>

      {list.length === 0 ? (
        <div className="glass-soft rounded-[1.8rem] p-8 text-sm text-muted">
          {locale === 'ar' ? 'لا توجد موارد مضافة حاليًا.' : 'No resources have been added yet.'}
        </div>
      ) : (
        <section className="grid gap-4 md:grid-cols-2">
          {list.map((item, index) => {
            const config = typeConfig[item.type] ?? typeConfig.link;
            const Icon = config.icon;
            const badge = item.badge?.trim() || config.label[locale];
            return (
              <a
                key={`${item.title}-${index}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {badge}
                  </span>
                  <Icon size={18} className="text-accent-300 transition group-hover:scale-110" />
                </div>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">{item.title}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{item.desc}</p>
              </a>
            );
          })}
        </section>
      )}
    </main>
  );
}
