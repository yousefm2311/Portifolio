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
        <div className="space-y-3">
          <p className="text-sm font-semibold text-accent-500">
            {locale === 'ar' ? 'مختارات' : 'Featured'}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold">
            {locale === 'ar' ? 'ابدأ بهذه المشاريع' : 'Start with these projects'}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-muted">
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

      <div className="grid gap-6 lg:grid-cols-2">
        <Link
          href={`/app/${lead.slug}`}
          className="group overflow-hidden rounded-2xl border border-white/5 bg-black/20 transition hover:-translate-y-1 hover:border-white/10"
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
              <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-white/90">
                {getLocalizedCategory(lead.category, locale)}
              </span>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                {getLocalizedAppTitle(lead, locale)}
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80">
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
              className="group rounded-2xl border border-white/5 bg-white/5 p-6 transition hover:bg-white/10 hover:border-white/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="rounded-full bg-accent-500/20 px-3 py-1 text-xs font-semibold text-accent-300">
                    {getLocalizedCategory(app.category, locale)}
                  </span>
                  <h3 className="mt-3 text-xl font-bold text-white">
                    {getLocalizedAppTitle(app, locale)}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted line-clamp-2 mt-2">
                    {getLocalizedAppSummary(app, locale)}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  className="shrink-0 text-white/40 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-400"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
