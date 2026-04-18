'use client';

import Link from 'next/link';
import { AppDTO } from '@/lib/types';
import { useLocale } from '@/components/LocaleProvider';
import AppPreview from '@/components/AppPreview';
import Gallery from '@/components/Gallery';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Button from '@/components/ui/Button';
import {
  getLocalizedAppCaseStudy,
  getLocalizedAppDescription,
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedRoleLabel
} from '@/lib/app-presentation';

export default function CaseStudyView({ app }: { app: AppDTO }) {
  const { locale } = useLocale();
  const title = getLocalizedAppTitle(app, locale);
  const summary = getLocalizedAppSummary(app, locale);
  const description = getLocalizedAppDescription(app, locale);
  const localizedCaseStudy = getLocalizedAppCaseStudy(app, locale);
  const kpis = app.kpis ?? [];
  const techStack = app.techStack ?? [];
  const roles = app.roleVariants ?? [];

  const sections = [
    { key: 'problem', label: locale === 'ar' ? 'المشكلة' : 'Problem', value: localizedCaseStudy.problem },
    { key: 'solution', label: locale === 'ar' ? 'الحل' : 'Solution', value: localizedCaseStudy.solution },
    {
      key: 'architecture',
      label: locale === 'ar' ? 'المعمارية' : 'Architecture',
      value: localizedCaseStudy.architecture
    },
    {
      key: 'challenges',
      label: locale === 'ar' ? 'التحديات' : 'Challenges',
      value: localizedCaseStudy.challenges
    },
    { key: 'results', label: locale === 'ar' ? 'النتائج' : 'Results', value: localizedCaseStudy.results }
  ];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <section className="section-shell p-6 sm:p-8">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] text-white/50">
              {locale === 'ar' ? 'دراسة حالة' : 'Case Study'}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-8 text-muted">{summary}</p>
            <div className="flex flex-wrap gap-3">
              {app.links?.liveDemoUrl && (
                <a href={app.links.liveDemoUrl} target="_blank" rel="noreferrer">
                  <Button>{locale === 'ar' ? 'فتح العرض الحي' : 'Open live preview'}</Button>
                </a>
              )}
              <Link href={`/app/${app.slug}`}>
                <Button variant="secondary">
                  {locale === 'ar' ? 'العودة إلى التطبيق' : 'Back to app'}
                </Button>
              </Link>
            </div>
          </div>

          <div className="glass-soft rounded-[1.8rem] p-4 sm:p-5">
            <AppPreview app={app} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {sections.map((item) => (
          <div key={item.key} className="glass-soft rounded-[1.8rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">{item.label}</p>
            <p className="mt-3 text-sm leading-7 text-muted">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          {techStack.length > 0 && (
            <div className="glass-soft rounded-[1.8rem] p-5">
              <h2 className="text-lg font-semibold">{locale === 'ar' ? 'التقنيات' : 'Tech stack'}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {roles.length > 0 && (
            <div className="glass-soft rounded-[1.8rem] p-5">
              <h2 className="text-lg font-semibold">{locale === 'ar' ? 'الأدوار' : 'Roles'}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role.key}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {getLocalizedRoleLabel(role, locale)}
                  </span>
                ))}
              </div>
            </div>
          )}

          {kpis.length > 0 && (
            <div className="grid gap-4 md:grid-cols-2">
              {kpis.map((item) => (
                <div key={`${item.label}-${item.value}`} className="glass-soft rounded-[1.6rem] p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">{item.label}</p>
                  <p className="mt-3 text-2xl font-semibold text-gradient">{item.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-soft rounded-[1.8rem] p-5">
          <h2 className="mb-4 text-xl font-semibold">
            {locale === 'ar' ? 'الوصف التفصيلي' : 'Detailed description'}
          </h2>
          <MarkdownRenderer content={description} />
        </div>
      </section>

      <section className="glass-soft rounded-[1.8rem] p-5">
        <h2 className="mb-4 text-xl font-semibold">
          {locale === 'ar' ? 'لقطات الشاشة' : 'Screenshots'}
        </h2>
        <Gallery items={app.media.gallery ?? []} mode={app.mediaDisplay?.gallery ?? 'phone'} />
      </section>
    </main>
  );
}
