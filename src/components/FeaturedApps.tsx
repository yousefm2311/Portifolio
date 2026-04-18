'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AppDTO } from '@/lib/types';
import { useLocale } from '@/components/LocaleProvider';
import {
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory
} from '@/lib/app-presentation';

export default function FeaturedApps({ apps }: { apps: AppDTO[] }) {
  const { locale } = useLocale();
  const featured = apps.slice(0, 3);

  if (featured.length === 0) return null;

  const [lead, ...rest] = featured;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            {locale === 'ar' ? 'مختارات' : 'Featured'}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight">
            {locale === 'ar' ? 'ابدأ بهذه المشاريع' : 'Start with these projects'}
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            {locale === 'ar'
              ? 'مجموعة صغيرة مختارة تشرح شكل العرض الجديد وتفتح الطريق لباقي الأعمال.'
              : 'A small curated set that quickly explains the new presentation style before the rest of the work.'}
          </p>
        </div>
        <Link
          href="/apps"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-white/25 hover:text-white"
        >
          {locale === 'ar' ? 'كل التطبيقات' : 'All apps'}
          <ArrowUpRight size={16} />
        </Link>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Link
          href={`/app/${lead.slug}`}
          className="group overflow-hidden rounded-[2rem] border border-white/10 bg-black/10 transition hover:-translate-y-1 hover:border-white/20"
        >
          <div className="relative min-h-[320px]">
            {lead.media.cover?.url ? (
              <Image
                src={lead.media.cover.url}
                alt={getLocalizedAppTitle(lead, locale)}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-accent-500/18 via-transparent to-accent-300/8" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75">
                {getLocalizedCategory(lead.category, locale)}
              </span>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight">
                {getLocalizedAppTitle(lead, locale)}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/72">
                {getLocalizedAppSummary(lead, locale)}
              </p>
            </div>
          </div>
        </Link>

        <div className="grid gap-4">
          {rest.map((app) => (
            <Link
              key={app._id}
              href={`/app/${app.slug}`}
              className="glass-soft group rounded-[1.8rem] p-5 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                    {getLocalizedCategory(app.category, locale)}
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight">
                    {getLocalizedAppTitle(app, locale)}
                  </h3>
                  <p className="text-sm leading-7 text-muted">
                    {getLocalizedAppSummary(app, locale)}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
