'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { AppDTO } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/LocaleProvider';
import Iphone17ProMaxFrame from '@/components/Iphone17ProMaxFrame';
import { toBase64Url, withMediaProxy } from '@/lib/media-proxy';
import { getPrimaryMediaAlt } from '@/lib/app-presentation';

export default function AppPreview({ app }: { app: AppDTO }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoError, setVideoError] = useState<string | null>(null);
  const { t, locale } = useLocale();

  useEffect(() => {
    if (app.demo.type === 'video' || app.demo.type === 'interactive_video') {
      const interval = setInterval(() => {
        if (videoRef.current) {
          setCurrentTime(videoRef.current.currentTime);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [app.demo.type]);

  useEffect(() => {
    setVideoError(null);
  }, [app.demo.video?.url, app._id]);

  const hotspots = useMemo(() => {
    if (app.demo.type !== 'interactive_video') return [];
    return (
      app.demo.interactiveHotspots?.filter(
        (spot) => currentTime >= spot.timeStart && currentTime <= spot.timeEnd
      ) ?? []
    );
  }, [app.demo, currentTime]);

  if (app.demo.type === 'flutter_web' && app.demo.embedUrl) {
    const base = app.demo.embedUrl.replace(/\/index\.html$/i, '');
    const encoded = toBase64Url(base);
    const src = `/flutter-proxy/${encoded}/index.html`;

    return (
      <Iphone17ProMaxFrame>
        <div className="h-full w-full bg-black">
          <iframe
            src={src}
            className="h-full w-full"
            allow="fullscreen"
            title={getPrimaryMediaAlt(app, locale)}
          />
        </div>
      </Iphone17ProMaxFrame>
    );
  }

  const rawVideoUrl = app.demo.video?.url;
  const videoUrl = withMediaProxy(rawVideoUrl);
  const fallbackImage = app.media.cover ?? app.media.gallery?.[0];
  const coverUrl = fallbackImage?.url ? withMediaProxy(fallbackImage.url) : undefined;
  const prefersPhone = app.media.cover ? app.mediaDisplay?.cover !== 'full' : true;
  const mediaFitClass = 'object-contain';

  const emptyState = (
    <div className="flex aspect-video items-center justify-center rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center text-muted">
      <div className="space-y-2">
        <PlayCircle className="mx-auto" size={22} />
        <p className="text-sm">{t('noVideo')}</p>
      </div>
    </div>
  );

  if (!videoUrl && !coverUrl) return emptyState;

  if (!videoUrl && coverUrl) {
    const cover = (
      <div className="relative h-full w-full overflow-hidden bg-black/60">
        <Image
          src={coverUrl}
          alt={getPrimaryMediaAlt(app, locale)}
          fill
          className={mediaFitClass}
          sizes="(max-width: 768px) 100vw, 60vw"
        />
      </div>
    );

    return prefersPhone ? (
      <Iphone17ProMaxFrame>{cover}</Iphone17ProMaxFrame>
    ) : (
      <div className="relative w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/40">
        <div className="aspect-video">{cover}</div>
      </div>
    );
  }

  const renderHotspots = () =>
    hotspots.map((spot, index) => (
      <button
        key={`${spot.label}-${index}`}
        type="button"
        className="absolute rounded-full border border-accent-400 bg-accent-400/25 px-3 py-1 text-xs text-white shadow-glow backdrop-blur"
        style={{
          left: `${spot.x}%`,
          top: `${spot.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        {spot.label}
      </button>
    ));

  const renderVideo = (className?: string) => (
    <div className={cn('relative h-full w-full bg-black/60', className)}>
      <video
        ref={videoRef}
        key={videoUrl}
        src={videoUrl}
        className={`h-full w-full ${mediaFitClass}`}
        controls
        preload="auto"
        playsInline
        crossOrigin="anonymous"
        poster={coverUrl ?? undefined}
        onError={() => {
          const code = videoRef.current?.error?.code;
          const message =
            code === 1
              ? locale === 'ar'
                ? 'تم إيقاف تحميل الفيديو.'
                : 'Video loading was aborted.'
              : code === 2
                ? locale === 'ar'
                  ? 'حدثت مشكلة شبكة أثناء تحميل الفيديو.'
                  : 'A network error occurred while loading the video.'
                : code === 3
                  ? locale === 'ar'
                    ? 'صيغة الفيديو أو الترميز غير مدعوم.'
                    : 'The video format or codec is not supported.'
                  : code === 4
                    ? locale === 'ar'
                      ? 'مصدر الفيديو غير مدعوم.'
                      : 'The video source is not supported.'
                    : locale === 'ar'
                      ? 'تعذر تشغيل الفيديو.'
                      : 'The video failed to load.';
          setVideoError(message);
        }}
      />
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/72 p-4 text-center text-xs text-true-white">
          <div className="space-y-2">
            <p className="font-semibold">
              {locale === 'ar' ? 'تعذر تشغيل الفيديو' : 'Unable to play the video'}
            </p>
            <p>{videoError}</p>
            <p className="text-true-white-70">
              {locale === 'ar'
                ? 'يفضل تحويل الملف إلى H.264 + AAC لثبات أعلى.'
                : 'Transcoding to H.264 + AAC is recommended for better playback.'}
            </p>
          </div>
        </div>
      )}
      {renderHotspots()}
    </div>
  );

  const videoContent = (
    <div className="relative h-full w-full overflow-hidden">{renderVideo()}</div>
  );

  if (prefersPhone) {
    return <Iphone17ProMaxFrame>{videoContent}</Iphone17ProMaxFrame>;
  }

  return (
    <div className="relative w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/50">
      <div className="aspect-video">{renderVideo()}</div>
    </div>
  );
}
