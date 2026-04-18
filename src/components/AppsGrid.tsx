'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight } from 'lucide-react';
import { AppDTO } from '@/lib/types';
import Button from '@/components/ui/Button';
import { useLocale } from '@/components/LocaleProvider';
import {
  getLocalizedAppSummary,
  getLocalizedAppTitle,
  getLocalizedCategory
} from '@/lib/app-presentation';

const AppModal = dynamic(() => import('@/components/AppModal'), { ssr: false });

export default function AppsGrid({
  apps,
  showCaseStudy
}: {
  apps: AppDTO[];
  showCaseStudy?: boolean;
}) {
  const [selected, setSelected] = useState<AppDTO | null>(null);
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
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-2">
        {apps.map((app, index) => {
          const title = getLocalizedAppTitle(app, locale);
          const description = getLocalizedAppSummary(app, locale);
          const featured = index === 0;

          return (
            <article
              key={app._id}
              className={`group overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/10 transition hover:-translate-y-1 hover:border-white/25 ${
                featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className={`grid ${featured ? 'xl:grid-cols-[0.92fr_1.08fr]' : ''}`}>
                <div className={`relative ${featured ? 'min-h-[320px]' : 'h-56'}`}>
                  {app.media.cover?.url ? (
                    <Image
                      src={app.media.cover.url}
                      alt={title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-500/20 via-transparent to-accent-300/10" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                </div>

                <div className="glass-soft h-full space-y-4 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                      {getLocalizedCategory(app.category, locale)}
                    </span>
                    <Link
                      href={`/app/${app.slug}`}
                      className="text-white/45 transition hover:text-white"
                      aria-label={locale === 'ar' ? `فتح صفحة ${title}` : `Open ${title} page`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
                    <p className="text-sm leading-7 text-muted">{description}</p>
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

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button variant="secondary" onClick={() => setSelected(app)}>
                      {t('viewDetails')}
                    </Button>
                    <Link href={`/app/${app.slug}`}>
                      <Button variant="ghost">
                        {locale === 'ar' ? 'صفحة التطبيق' : 'Open app page'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <AppModal
        app={selected}
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        showCaseStudy={showCaseStudy}
      />
    </div>
  );
}
