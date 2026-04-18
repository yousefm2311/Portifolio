'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AppIcon({
  title,
  iconUrl,
  active,
  onClick
}: {
  title: string;
  iconUrl?: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={cn('flex flex-col items-center gap-2 text-xs text-white/80')}
      onClick={onClick}
    >
      <div
        className={cn(
          'flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border bg-white/10 shadow-card transition',
          active ? 'border-accent-400/60 shadow-glow' : 'border-white/10'
        )}
      >
        {iconUrl ? (
          <Image src={iconUrl} alt={title} width={56} height={56} className="h-full w-full object-cover" />
        ) : (
          <div className="h-10 w-10 rounded-xl bg-accent-400/40" />
        )}
      </div>
      <span className={cn('line-clamp-1 max-w-[72px]', active && 'text-white')}>{title}</span>
    </motion.button>
  );
}
