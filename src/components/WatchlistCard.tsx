'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Film } from 'lucide-react';
import type { Watchlist } from '@/types';

interface WatchlistCardProps {
  watchlist: Watchlist;
}

export function WatchlistCard({ watchlist }: WatchlistCardProps) {
  const itemCount = watchlist.tvShows?.length || 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-brand-bg border border-white/10 rounded-lg p-4 hover:border-brand-primary/50 transition-colors duration-300"
    >
      <Link
        href={`/watchlist/${encodeURIComponent(watchlist['@key'])}`}
        className="block"
      >
        <h4 className="text-lg font-semibold text-white line-clamp-1">
          {watchlist.title}
        </h4>
        <p className="text-sm text-white/60 line-clamp-2 mt-1">
          {watchlist.description}
        </p>
        <div className="flex items-center gap-1 mt-2 text-xs text-white/40">
          <Film size={14} />
          <span>
            {itemCount} {itemCount === 1 ? 'série' : 'séries'}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
