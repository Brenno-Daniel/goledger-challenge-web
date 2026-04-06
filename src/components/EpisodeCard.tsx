'use client';

import { motion } from 'motion/react';
import { Pencil, Trash2, Star } from 'lucide-react';
import type { Episode } from '@/types';

interface EpisodeCardProps {
  episode: Episode;
  onEdit?: () => void;
  onDelete?: () => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

export function EpisodeCard({ episode, onEdit, onDelete }: EpisodeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-brand-bg border border-white/10 rounded-lg p-4 flex flex-col gap-3 hover:border-brand-primary/50 transition-colors duration-300 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 text-xs font-medium rounded bg-brand-primary/20 text-brand-primary">
              EP {episode.episodeNumber}
            </span>
            <span className="flex items-center gap-1 text-xs text-yellow-400">
              <Star size={12} fill="currentColor" />
              {episode.rating.toFixed(1)}
            </span>
          </div>
          <h4 className="text-white font-semibold line-clamp-1">
            {episode.title}
          </h4>
          <p className="text-sm text-white/60 line-clamp-2 mt-1">
            {episode.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">
          {formatDate(episode.releaseDate)}
        </span>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            onClick={onEdit}
            className="p-1.5 bg-brand-bg border border-brand-primary rounded
                       hover:bg-brand-primary transition-all duration-300"
            aria-label="Edit episode"
          >
            <Pencil
              size={14}
              className="text-brand-primary hover:text-black transition-colors"
            />
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            onClick={onDelete}
            className="p-1.5 bg-brand-bg border border-red-500/50 rounded
                       hover:bg-red-500 transition-all duration-300"
            aria-label="Delete episode"
          >
            <Trash2
              size={14}
              className="text-red-400 hover:text-white transition-colors"
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
