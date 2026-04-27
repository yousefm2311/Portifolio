'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Smartphone } from 'lucide-react';
import { AppDTO } from '@/lib/types';
import { useLocale } from '@/components/LocaleProvider';
import {
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory
} from '@/lib/app-presentation';
import { withMediaProxy } from '@/lib/media-proxy';

export default function AppsGrid({
  apps,
  showCaseStudy: _showCaseStudy
}: {
  apps: AppDTO[];
  showCaseStudy?: boolean;
}) {
  const { t, locale } = useLocale();

  if (apps.length === 0) {
    return (
      <div className="glass-soft rounded-[1.8rem] p-8 text-center">
        <p className="text-lg font-semibold">
          {locale === 'ar' ? 'لا توجد تطبيقات مطابقة' : 'No matching apps found'}
        </p>
        <p className="mt-2 text-sm text-muted">
          {locale === 'ar'
            ? 'غيّر الفلاتر أو ابحث بكلمات مختلفة لعرض مشاريع أخرى.'
            : 'Adjust the filters or try a different keyword to reveal more work.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {apps.map((app, index) => {
          const title = getLocalizedAppTitle(app, locale);
          const description = getLocalizedAppSummary(app, locale);
          const featured = index === 0;
          const showcase = app.media.gallery?.[0] ?? app.media.cover ?? app.media.icon;
          const screenshotCount = app.media.gallery?.length ?? 0;

          return (
            <Link
              key={app._id}
              href={`/app/${app.slug}`}
              className={`group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-accent-400/50 hover:bg-white/[0.055] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 ${
                featured ? 'md:col-span-2 xl:col-span-2' : ''
              }`}
            >
              <article className={`grid h-full ${featured ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
                <div className="relative min-h-[330px] overflow-hidden bg-[radial-gradient(circle_at_50%_8%,rgba(98,220,255,0.22),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                  <div className="absolute inset-x-8 bottom-5 h-20 rounded-full bg-accent-500/15 blur-2xl transition group-hover:bg-accent-500/25" />
                  <div className="relative mx-auto flex h-full min-h-[330px] w-full max-w-[250px] items-center justify-center p-5">
                    <div className="relative w-full rounded-[2.45rem] bg-gradient-to-br from-ink-700 via-ink-900 to-black p-[8px] shadow-[0_28px_80px_rgba(0,0,0,0.45)] transition duration-500 group-hover:-translate-y-2">
                      <div className="absolute left-1/2 top-4 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
                      <div className="overflow-hidden rounded-[2.05rem] border border-white/10 bg-black">
                        <div className="relative aspect-[9/19] w-full">
                          {showcase?.url ? (
                            <Image
                              src={withMediaProxy(showcase.thumbnailUrl ?? showcase.url)}
                              alt={showcase.alt ?? title}
                              fill
                              className="object-contain"
                              sizes={featured ? '(max-width: 1024px) 50vw, 280px' : '260px'}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-white/45">
                              <Smartphone size={42} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex h-full min-h-[300px] flex-col justify-between gap-5 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {getLocalizedCategory(app.category, locale)}
                    </span>
                    <span className="rounded-full border border-white/10 p-2 text-white/45 transition group-hover:border-accent-400/50 group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h3>
                    <p className="text-sm leading-7 text-muted">{description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                        {locale === 'ar' ? 'الشاشات' : 'Screens'}
                      </p>
                      <p className="mt-2 text-lg font-semibold">{screenshotCount || 1}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                        {locale === 'ar' ? 'النوع' : 'Type'}
                      </p>
                      <p className="mt-2 truncate text-sm font-semibold">
                        {getLocalizedCategory(app.category, locale)}
                      </p>
                    </div>
                  </div>

                  {(app.techStack ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {app.techStack.slice(0, featured ? 5 : 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition group-hover:border-accent-400/50 group-hover:bg-accent-400/10">
                    {t('viewDetails')}
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
    </div>
  );
}
