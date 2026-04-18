'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Chip from '@/components/ui/Chip';
import { useLocale } from '@/components/LocaleProvider';
import { Input } from '@/components/ui/Inputs';
import Button from '@/components/ui/Button';

const categories = ['All', 'Flutter', 'Backend', 'Admin', 'Tools', 'DevOps'] as const;

export default function AppsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');

  const activeCategory = searchParams.get('category') ?? 'All';

  const labelFor = (cat: (typeof categories)[number]) => {
    if (cat === 'All') return t('all');
    if (cat === 'Flutter') return t('flutter');
    if (cat === 'Backend') return t('backend');
    if (cat === 'Admin') return t('adminCategory');
    if (cat === 'Tools') return t('tools');
    if (cat === 'DevOps') return t('devops');
    return cat;
  };

  const hasFilters = useMemo(
    () => Boolean(searchParams.get('category') || searchParams.get('q')),
    [searchParams]
  );

  const pushParams = (nextCategory?: string, nextQuery?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const resolvedCategory = nextCategory ?? activeCategory;
    const resolvedQuery = nextQuery ?? query;

    if (!resolvedCategory || resolvedCategory === 'All') params.delete('category');
    else params.set('category', resolvedCategory);

    if (!resolvedQuery.trim()) params.delete('q');
    else params.set('q', resolvedQuery.trim());

    params.delete('page');
    const next = params.toString();
    router.push(next ? `/apps?${next}` : '/apps');
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    pushParams(activeCategory, query);
  };

  return (
    <form onSubmit={submit} className="glass-soft rounded-[1.8rem] p-5">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={labelFor(cat)}
              active={activeCategory === cat}
              onClick={() => pushParams(cat, query)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full"
          />
          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="secondary">
              {t('searchAction')}
            </Button>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setQuery('');
                  router.push('/apps');
                }}
              >
                {locale === 'ar' ? 'إعادة الضبط' : 'Reset'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
