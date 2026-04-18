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
  getLocalizedAppFeatures,
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory,
  getLocalizedRoleLabel
} from '@/lib/app-presentation';

export default function AppDetailView({
  app,
  showCaseStudy
}: {
  app: AppDTO;
  showCaseStudy?: boolean;
}) {
  const { locale, t } = useLocale();
  const title = getLocalizedAppTitle(app, locale);
  const summary = getLocalizedAppSummary(app, locale);
  const description = getLocalizedAppDescription(app, locale);
  const localizedCaseStudy = getLocalizedAppCaseStudy(app, locale);
  const localizedFeatures = getLocalizedAppFeatures(app, locale);
  const roles = app.roleVariants ?? [];
  const kpis = app.kpis ?? [];

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-16">
      <section className="section-shell p-6 sm:p-8">
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              {getLocalizedCategory(app.category, locale)}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-8 text-muted">{summary}</p>

            {(app.techStack ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {app.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            {roles.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {roles.map((role) => (
                  <span
                    key={role.key}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {getLocalizedRoleLabel(role, locale)}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {app.links?.liveDemoUrl && (
                <a href={app.links.liveDemoUrl} target="_blank" rel="noreferrer">
                  <Button>{t('openFullscreen')}</Button>
                </a>
              )}
              {app.links?.githubUrl && (
                <a href={app.links.githubUrl} target="_blank" rel="noreferrer">
                  <Button variant="secondary">{t('viewGithub')}</Button>
                </a>
              )}
              {showCaseStudy && (
                <Link href={`/app/${app.slug}/case-study`}>
                  <Button variant="ghost">{t('caseStudy')}</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="glass-soft rounded-[1.8rem] p-4 sm:p-5">
            <AppPreview app={app} />
          </div>
        </div>
      </section>

      {kpis.length > 0 && (
        <section className="grid gap-4 md:grid-cols-3">
          {kpis.map((item) => (
            <div key={`${item.label}-${item.value}`} className="glass-soft rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-gradient">{item.value}</p>
            </div>
          ))}
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="glass-soft rounded-[1.8rem] p-5">
          <h2 className="mb-4 text-xl font-semibold">
            {locale === 'ar' ? 'لقطات الشاشة' : 'Screenshots'}
          </h2>
          <Gallery items={app.media.gallery ?? []} mode={app.mediaDisplay?.gallery ?? 'phone'} />
        </div>

        <div className="glass-soft rounded-[1.8rem] p-5">
          <h2 className="mb-4 text-xl font-semibold">
            {locale === 'ar' ? 'المزايا الرئيسية' : 'Core highlights'}
          </h2>
          <div className="space-y-3">
            {localizedFeatures.length > 0 ? (
              localizedFeatures.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold">{feature.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">{feature.details}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">
                {locale === 'ar' ? 'لا توجد مزايا موثقة بعد.' : 'No documented highlights yet.'}
              </p>
            )}
          </div>
        </div>
      </section>

      {showCaseStudy && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
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
          ].map((block) => (
            <div key={block.key} className="glass-soft rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">{block.label}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{block.value}</p>
            </div>
          ))}
        </section>
      )}

      <div className="glass-soft rounded-[1.8rem] p-5">
        <MarkdownRenderer content={description} />
      </div>
    </main>
  );
}
