'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaDTO } from '@/lib/types';
import Iphone17ProMaxFrame from '@/components/Iphone17ProMaxFrame';
import { useLocale } from '@/components/LocaleProvider';
import { cn } from '@/lib/utils';
import { withMediaProxy } from '@/lib/media-proxy';

export default function Gallery({
  items,
  mode = 'phone'
}: {
  items: MediaDTO[];
  mode?: 'phone' | 'full';
}) {
  const [index, setIndex] = useState(0);
  const { locale } = useLocale();

  if (!items || items.length === 0) {
    return (
      <div className="rounded-card-lg border border-dashed border-white/10 bg-white/5 p-6 text-sm text-muted">
        {locale === 'ar' ? 'لا توجد لقطات شاشة متاحة حاليًا.' : 'No screenshots are available yet.'}
      </div>
    );
  }

  const current = items[index];
  const currentUrl = withMediaProxy(current.url);
  const canNavigate = items.length > 1;

  const move = (direction: 'prev' | 'next') => {
    if (!canNavigate) return;
    setIndex((prev) =>
      direction === 'prev' ? (prev - 1 + items.length) % items.length : (prev + 1) % items.length
    );
  };

  const controls = (
    <>
      <button
        type="button"
        disabled={!canNavigate}
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-true-white transition disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => move('prev')}
      >
        <ChevronLeft size={18} />
      </button>
      <button
        type="button"
        disabled={!canNavigate}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/40 p-2 text-true-white transition disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => move('next')}
      >
        <ChevronRight size={18} />
      </button>
    </>
  );

  const preview = (
    <div className="relative h-full w-full overflow-hidden bg-black/70">
      <Image
        src={currentUrl}
        alt={current.alt ?? (locale === 'ar' ? 'لقطة شاشة' : 'Screenshot')}
        fill
        className={cn('object-contain')}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
      {controls}
    </div>
  );

  return (
    <div className="space-y-4 overflow-hidden">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-subtle">
        <span>{locale === 'ar' ? 'المعرض' : 'Gallery'}</span>
        <span>
          {index + 1} / {items.length}
        </span>
      </div>

      {mode === 'phone' ? (
        <Iphone17ProMaxFrame className="max-w-[310px] sm:max-w-[340px]">
          {preview}
        </Iphone17ProMaxFrame>
      ) : (
        <div className="relative aspect-video w-full overflow-hidden rounded-card-lg border border-white/10 bg-black/50">
          {preview}
        </div>
      )}

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {items.map((item, i) => (
          <button
            key={item._id}
            type="button"
            className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border transition ${
              i === index ? 'border-accent-400 shadow-glow' : 'border-white/10'
            }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={withMediaProxy(item.thumbnailUrl ?? item.url)}
              alt={item.alt ?? (locale === 'ar' ? 'صورة مصغرة' : 'Thumbnail')}
              width={96}
              height={64}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
