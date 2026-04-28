'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Layers3, PlayCircle, Sparkles } from 'lucide-react';
import AppIcon from '@/components/AppIcon';
import AppPreview from '@/components/AppPreview';
import Button from '@/components/ui/Button';
import { AppDTO } from '@/lib/types';
import { useLocale } from '@/components/LocaleProvider';
import {
  getLocalizedAppFeatures,
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory
} from '@/lib/app-presentation';

const AppModal = dynamic(() => import('@/components/AppModal'), { ssr: false });

export default function Launcher({
  apps,
  showCaseStudy
}: {
  apps: AppDTO[];
  showCaseStudy?: boolean;
}) {
  const { t, locale } = useLocale();
  const [activeId, setActiveId] = useState(apps[0]?._id ?? '');
  const [selected, setSelected] = useState<AppDTO | null>(null);

  useEffect(() => {
    if (!apps.some((app) => app._id === activeId)) {
      setActiveId(apps[0]?._id ?? '');
    }
  }, [activeId, apps]);

  const activeApp = useMemo(
    () => apps.find((app) => app._id === activeId) ?? apps[0] ?? null,
    [activeId, apps]
  );

  if (!activeApp) return null;

  const activeFeatures = getLocalizedAppFeatures(activeApp, locale);

  const insightCards =
    locale === 'ar'
      ? [
          {
            icon: Layers3,
            title: 'عرض منظم',
            desc: 'تطبيقات مرتبة حسب النوع مع انتقال واضح بين المعاينة والتفاصيل.'
          },
          {
            icon: Sparkles,
            title: 'انطباع أقوى',
            desc: 'الهاتف هنا ليس زينة، بل جزء من سرد المنتج نفسه.'
          },
          {
            icon: PlayCircle,
            title: 'معاينة جاهزة',
            desc: 'افتح الفيديو أو Flutter Web مباشرة ثم انتقل للتفاصيل الكاملة.'
          }
        ]
      : [
          {
            icon: Layers3,
            title: 'Structured browsing',
            desc: 'Apps are organized by type with a clear path from preview to detail.'
          },
          {
            icon: Sparkles,
            title: 'Stronger first impression',
            desc: 'The phone frame is part of the product story, not decoration.'
          },
          {
            icon: PlayCircle,
            title: 'Ready-to-open previews',
            desc: 'Launch video or Flutter Web directly, then jump into the full detail view.'
          }
        ];

  return (
    <section className="section-shell p-6 sm:p-10">
      <div className="relative z-10 grid gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5">
          <div className="space-y-4">
            <p className="text-sm font-medium text-accent-500">{t('launcherTitle')}</p>
            <h2 className="text-3xl lg:text-4xl font-bold">{t('launcherSubtitle')}</h2>
            <p className="text-base leading-relaxed text-muted">
              {locale === 'ar'
                ? 'هذه هي منطقة الإبهار الأساسية في المشروع: اختيار تطبيق، معاينته داخل الهاتف، ثم الغوص في تفاصيله بدون زحمة بصرية.'
                : 'This is the main wow-factor area: pick an app, preview it inside the phone, then dive into the details without visual clutter.'}
            </p>
          </div>

          <div className="grid gap-3">
            {apps.slice(0, 5).map((app, index) => {
              const active = app._id === activeApp._id;
              return (
                <button
                  key={app._id}
                  type="button"
                  onClick={() => setActiveId(app._id)}
                  className={`rounded-xl border px-4 py-4 text-start transition ${
                    active
                      ? 'border-accent-400 bg-white/10 shadow-sm'
                      : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-accent-300">
                        {String(index + 1).padStart(2, '0')}
                      </p>
                      <h3 className="text-lg font-bold">
                        {getLocalizedAppTitle(app, locale)}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted line-clamp-1">
                        {getLocalizedAppSummary(app, locale)}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-xs text-soft">
                      {getLocalizedCategory(app.category, locale)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4">
            {insightCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-xl border border-white/5 bg-black/20 p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-300">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-base">{item.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="rounded-full bg-accent-500/20 px-3 py-1 text-xs font-semibold text-accent-300">
                  {getLocalizedCategory(activeApp.category, locale)}
                </span>
                <h3 className="text-2xl font-bold">
                  {getLocalizedAppTitle(activeApp, locale)}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {getLocalizedAppSummary(activeApp, locale)}
                </p>
              </div>
              <Button onClick={() => setSelected(activeApp)} variant="primary">
                {t('viewDetails')}
                <ArrowUpRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 2xl:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-white/5 bg-black/20 p-6 flex justify-center items-center">
              <AppPreview app={activeApp} />
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="text-sm font-semibold text-accent-500 mb-4">
                  {locale === 'ar' ? 'لمحة سريعة' : 'Quick glance'}
                </p>
                <div className="grid gap-4">
                  <div className="rounded-xl bg-black/20 p-4 border border-white/5">
                    <p className="text-xs text-soft mb-2">
                      {locale === 'ar' ? 'التقنيات' : 'Stack'}
                    </p>
                    <p className="text-sm font-semibold">
                      {(activeApp.techStack ?? []).slice(0, 3).join(' • ') || 'Flutter • Next.js • APIs'}
                    </p>
                  </div>
                  <div className="rounded-xl bg-black/20 p-4 border border-white/5">
                    <p className="text-xs text-soft mb-2">
                      {locale === 'ar' ? 'الميزات' : 'Highlights'}
                    </p>
                    <p className="text-sm font-semibold">
                      {activeFeatures.slice(0, 2).map((item) => item.title).join(' • ') ||
                        (locale === 'ar' ? 'واجهات واضحة وتجربة مستقرة' : 'Clear UI and reliable product flow')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <p className="text-sm font-semibold text-accent-500 mb-4">
                  {locale === 'ar' ? 'شبكة التطبيقات' : 'App dock'}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {apps.map((app) => (
                    <AppIcon
                      key={app._id}
                      title={getLocalizedAppTitle(app, locale)}
                      iconUrl={app.media.icon?.url}
                      active={app._id === activeApp._id}
                      onClick={() => setActiveId(app._id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppModal
        app={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        showCaseStudy={showCaseStudy}
      />
    </section>
  );
}
