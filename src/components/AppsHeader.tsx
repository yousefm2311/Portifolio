'use client';

import { useLocale } from '@/components/LocaleProvider';

export default function AppsHeader({ total }: { total: number }) {
  const { locale } = useLocale();
  return (
    <div className="section-shell p-6 sm:p-8">
      <div className="relative z-10 flex flex-wrap items-end justify-between gap-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-white/55">
            {locale === 'ar' ? 'المعرض' : 'Gallery'}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            {locale === 'ar' ? 'قائمة التطبيقات' : 'App Library'}
          </h1>
          <p className="max-w-2xl text-sm leading-7 text-muted">
            {locale === 'ar'
              ? 'تصفح المشاريع حسب النوع، ثم افتح المعاينة أو ادخل إلى صفحة التفاصيل الكاملة لكل تطبيق.'
              : 'Browse projects by type, open the preview, then step into the full detail page for each app.'}
          </p>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
          {locale === 'ar' ? `${total} تطبيق منشور` : `${total} published apps`}
        </div>
      </div>
    </div>
  );
}
