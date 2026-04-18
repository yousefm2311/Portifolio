import type { Locale } from '@/data/translations';
import type { AppDTO } from '@/lib/types';

const categoryLabels = {
  Flutter: { ar: 'تطبيقات Flutter', en: 'Flutter Apps' },
  Backend: { ar: 'أنظمة Backend', en: 'Backend Systems' },
  Admin: { ar: 'لوحات إدارة', en: 'Admin Dashboards' },
  Tools: { ar: 'أدوات داخلية', en: 'Internal Tools' },
  DevOps: { ar: 'بنية ونشر', en: 'Infra & DevOps' }
} as const;

const roleKeyLabels = {
  customer: { ar: 'العميل', en: 'Customer' },
  driver: { ar: 'السائق', en: 'Driver' },
  admin: { ar: 'الإدارة', en: 'Admin' }
} as const;

export function getLocalizedAppTitle(app: AppDTO, locale: Locale) {
  return locale === 'en' ? app.titleEn?.trim() || app.title : app.title;
}

export function getLocalizedTextValue(
  value: { ar?: string; en?: string } | undefined,
  locale: Locale,
  fallback = ''
) {
  if (locale === 'en') {
    return value?.en?.trim() || fallback;
  }

  return value?.ar?.trim() || fallback;
}

export function getLocalizedAppSummary(app: AppDTO, locale: Locale) {
  return getLocalizedTextValue(app.content?.shortDesc, locale, app.shortDesc);
}

export function getLocalizedAppDescription(app: AppDTO, locale: Locale) {
  return getLocalizedTextValue(app.content?.description, locale, app.description);
}

export function getLocalizedAppCaseStudy(app: AppDTO, locale: Locale) {
  return {
    problem: getLocalizedTextValue(app.content?.caseStudy?.problem, locale, app.caseStudy.problem),
    solution: getLocalizedTextValue(app.content?.caseStudy?.solution, locale, app.caseStudy.solution),
    architecture: getLocalizedTextValue(
      app.content?.caseStudy?.architecture,
      locale,
      app.caseStudy.architecture
    ),
    challenges: getLocalizedTextValue(
      app.content?.caseStudy?.challenges,
      locale,
      app.caseStudy.challenges
    ),
    results: getLocalizedTextValue(app.content?.caseStudy?.results, locale, app.caseStudy.results)
  };
}

export function getLocalizedAppFeatures(app: AppDTO, locale: Locale) {
  return (app.features ?? []).map((feature, index) => ({
    title: getLocalizedTextValue(
      app.content?.features?.[index]?.title,
      locale,
      feature.title
    ),
    details: getLocalizedTextValue(
      app.content?.features?.[index]?.details,
      locale,
      feature.details
    )
  }));
}

export function getLocalizedCategory(category: AppDTO['category'], locale: Locale) {
  return categoryLabels[category][locale];
}

export function getLocalizedRoleLabel(
  role: AppDTO['roleVariants'][number],
  locale: Locale
) {
  const normalizedKey = role.key.toLowerCase() as keyof typeof roleKeyLabels;
  if (roleKeyLabels[normalizedKey]) {
    return roleKeyLabels[normalizedKey][locale];
  }

  return role.label;
}

export function getPrimaryMediaAlt(app: AppDTO, locale: Locale) {
  const title = getLocalizedAppTitle(app, locale);
  return locale === 'ar' ? `معاينة ${title}` : `${title} preview`;
}
