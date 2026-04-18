'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Download, ExternalLink, Github } from 'lucide-react';
import { AppDTO } from '@/lib/types';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Gallery from '@/components/Gallery';
import AppPreview from '@/components/AppPreview';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { useLocale } from '@/components/LocaleProvider';
import Chip from '@/components/ui/Chip';
import {
  getLocalizedAppCaseStudy,
  getLocalizedAppDescription,
  getLocalizedAppFeatures,
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory,
  getLocalizedRoleLabel
} from '@/lib/app-presentation';

export default function AppModal({
  app,
  open,
  onClose,
  showCaseStudy
}: {
  app: AppDTO | null;
  open: boolean;
  onClose: () => void;
  showCaseStudy?: boolean;
}) {
  const { t, locale } = useLocale();
  const tabs = useMemo(
    () =>
      ([
        { id: 'demo', labelKey: 'liveDemo' },
        { id: 'screens', labelKey: 'screenshots' },
        ...(showCaseStudy ? [{ id: 'case', labelKey: 'caseStudy' }] : [])
      ] as const),
    [showCaseStudy]
  );
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('demo');
  const [role, setRole] = useState<string | null>(null);

  const roleVariants = useMemo(() => app?.roleVariants ?? [], [app]);

  useEffect(() => {
    if (!app) return;
    setTab('demo');
    setRole(app.roleVariants?.[0]?.key ?? null);
  }, [app]);

  if (!app) return null;

  const title = getLocalizedAppTitle(app, locale);
  const summary = getLocalizedAppSummary(app, locale);
  const description = getLocalizedAppDescription(app, locale);
  const localizedCaseStudy = getLocalizedAppCaseStudy(app, locale);
  const localizedFeatures = getLocalizedAppFeatures(app, locale);
  const selectedRole =
    roleVariants.find((variant) => variant.key === role) ?? roleVariants[0] ?? null;

  const links = [
    {
      key: 'live',
      href: app.links?.liveDemoUrl,
      label: t('openFullscreen'),
      icon: ExternalLink,
      variant: 'primary' as const
    },
    {
      key: 'github',
      href: app.links?.githubUrl,
      label: t('viewGithub'),
      icon: Github,
      variant: 'secondary' as const
    },
    {
      key: 'apk',
      href: app.links?.apkUrl,
      label: t('downloadApk'),
      icon: Download,
      variant: 'secondary' as const
    }
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
  ].filter((item) => item.value?.trim());

  return (
    <Modal open={open} onClose={onClose} title={title}>
      <div className="space-y-6">
        <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-soft rounded-[1.8rem] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  {getLocalizedCategory(app.category, locale)}
                </span>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{summary}</p>
                </div>
              </div>
              {showCaseStudy && (
                <Link href={`/app/${app.slug}/case-study`} onClick={onClose}>
                  <Button variant="ghost">{t('caseStudy')}</Button>
                </Link>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {tabs.map((item) => (
                <Chip
                  key={item.id}
                  label={t(item.labelKey as never)}
                  active={tab === item.id}
                  onClick={() => setTab(item.id)}
                />
              ))}
            </div>
          </div>

          <div className="glass-soft rounded-[1.8rem] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              {locale === 'ar' ? 'روابط ومؤشرات' : 'Links and signals'}
            </p>
            <div className="mt-4 space-y-3">
              {links.length > 0 ? (
                links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.key} href={item.href} target="_blank" rel="noreferrer">
                      <Button variant={item.variant} className="w-full justify-between">
                        <span>{item.label}</span>
                        <Icon size={16} />
                      </Button>
                    </a>
                  );
                })
              ) : (
                <p className="text-sm text-muted">
                  {locale === 'ar'
                    ? 'لا توجد روابط خارجية مضافة لهذا التطبيق بعد.'
                    : 'No external links have been added for this app yet.'}
                </p>
              )}
            </div>

            {app.kpis && app.kpis.length > 0 && (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {app.kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/45">{kpi.label}</p>
                    <p className="mt-2 text-lg font-semibold">{kpi.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            {tab === 'demo' && (
              <div className="glass-soft rounded-[1.8rem] p-4 sm:p-5">
                {roleVariants.length > 0 && (
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                      {t('roles')}
                    </span>
                    {roleVariants.map((variant) => (
                      <Chip
                        key={variant.key}
                        label={getLocalizedRoleLabel(variant, locale)}
                        active={role === variant.key}
                        onClick={() => setRole(variant.key)}
                      />
                    ))}
                  </div>
                )}
                <AppPreview app={app} />
              </div>
            )}

            {tab === 'screens' && (
              <div className="glass-soft rounded-[1.8rem] p-4 sm:p-5">
                <Gallery items={app.media.gallery ?? []} mode={app.mediaDisplay?.gallery ?? 'phone'} />
              </div>
            )}

            {showCaseStudy && tab === 'case' && (
              <div className="grid gap-4 md:grid-cols-2">
                {caseBlocks.map((block) => (
                  <div key={block.key} className="glass-soft rounded-[1.6rem] p-5">
                    <p className="text-xs uppercase tracking-[0.22em] text-white/45">{block.label}</p>
                    <p className="mt-3 text-sm leading-7 text-muted">{block.value}</p>
                  </div>
                ))}
              </div>
            )}

            {description && (
              <div className="glass-soft rounded-[1.8rem] p-5">
                <MarkdownRenderer content={description} />
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="glass-soft rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">{t('techStack')}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(app.techStack ?? []).length > 0 ? (
                  app.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted">
                    {locale === 'ar' ? 'لا توجد تقنيات مضافة.' : 'No technologies added yet.'}
                  </p>
                )}
              </div>
            </div>

            <div className="glass-soft rounded-[1.8rem] p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">{t('features')}</p>
              <div className="mt-4 space-y-3">
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

            {selectedRole && (
              <div className="glass-soft rounded-[1.8rem] p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                  {locale === 'ar' ? 'الوضع المحدد' : 'Selected mode'}
                </p>
                <p className="mt-3 text-lg font-semibold">
                  {getLocalizedRoleLabel(selectedRole, locale)}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">
                  {locale === 'ar'
                    ? 'يمكنك التنقل بين الأدوار لمعرفة أن التطبيق يدعم أكثر من رحلة استخدام.'
                    : 'Switch between roles to show that the product supports more than one user journey.'}
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </Modal>
  );
}
