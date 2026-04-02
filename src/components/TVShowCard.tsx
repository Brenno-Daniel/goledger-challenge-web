import Link from 'next/link';
import { TVShow } from '@/types';
import { Badge, ActionButtons } from '@/components/ui';

interface TVShowCardProps {
  show: TVShow;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function TVShowCard({ show, onEdit, onDelete }: TVShowCardProps) {
  return (
    <div className="relative bg-brand-bg border border-white/10 rounded-lg p-4 flex flex-col gap-3 group hover:border-brand-primary/50 transition-colors duration-300">
      <Link href={`/series/${show['@key']}`} className="block flex-1">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white line-clamp-1">
              {show.title}
            </h3>
            <p className="text-sm text-white/60 line-clamp-2 mt-1">
              {show.description}
            </p>
          </div>
          <Badge rating={show.rating} />
        </div>
      </Link>

      <div className="flex justify-end mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ActionButtons onEdit={onEdit} onDelete={onDelete} />
      </div>
    </div>
  );
}
