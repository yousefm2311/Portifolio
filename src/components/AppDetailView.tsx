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
  const externalLinks = [
    { href: app.links?.liveDemoUrl, label: t('openFullscreen'), variant: 'primary' as const },
    { href: app.links?.githubUrl, label: t('viewGithub'), variant: 'secondary' as const },
    { href: app.links?.apkUrl, label: t('downloadApk'), variant: 'secondary' as const },
    { href: app.links?.playStoreUrl, label: 'Play Store', variant: 'ghost' as const },
    { href: app.links?.appStoreUrl, label: 'App Store', variant: 'ghost' as const }
  ].filter((item) => Boolean(item.href));

  const caseBlocks = [
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
  ].filter((block) => block.value?.trim());

  return (
    <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:py-16">
      <section className="section-shell p-5 sm:p-6 lg:p-8">
        <div className="relative z-10 grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(320px,430px)]">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-soft">
                {getLocalizedCategory(app.category, locale)}
              </span>
              {roles.map((role) => (
                <span
                  key={role.key}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-soft"
                >
                  {getLocalizedRoleLabel(role, locale)}
                </span>
              ))}
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                {title}
              </h1>
              <p className="max-w-3xl text-sm leading-8 text-muted sm:text-base">{summary}</p>
            </div>

            {(app.techStack ?? []).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {app.techStack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-soft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              {externalLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  <Button variant={item.variant}>{item.label}</Button>
                </a>
              ))}
              {showCaseStudy && (
                <Link href={`/app/${app.slug}/case-study`}>
                  <Button variant="ghost">{t('caseStudy')}</Button>
                </Link>
              )}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-shell border border-white/10 bg-white/[0.035] p-4 sm:p-5">
            <AppPreview app={app} />
          </div>
        </div>
      </section>

      {kpis.length > 0 && (
        <section className="grid gap-4 md:grid-cols-3">
          {kpis.map((item) => (
            <div key={`${item.label}-${item.value}`} className="glass-soft rounded-card p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-subtle">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold text-gradient">{item.value}</p>
            </div>
          ))}
        </section>
      )}

      <section className="section-shell p-5 sm:p-6">
        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-subtle">
                {locale === 'ar' ? 'المعرض' : 'Gallery'}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {locale === 'ar' ? 'صور التطبيق' : 'App screenshots'}
              </h2>
            </div>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-soft">
              {(app.media.gallery ?? []).length} {locale === 'ar' ? 'صورة' : 'screens'}
            </span>
          </div>
          <Gallery items={app.media.gallery ?? []} mode={app.mediaDisplay?.gallery ?? 'phone'} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-soft rounded-card p-5 sm:p-6">
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

        <div className="glass-soft rounded-card p-5 sm:p-6">
          <h2 className="mb-4 text-xl font-semibold">
            {locale === 'ar' ? 'تفاصيل المشروع' : 'Project details'}
          </h2>
          <MarkdownRenderer content={description} />
        </div>
      </section>

      {showCaseStudy && caseBlocks.length > 0 && (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {caseBlocks.map((block) => (
            <div key={block.key} className="glass-soft rounded-card p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-subtle">{block.label}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{block.value}</p>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
