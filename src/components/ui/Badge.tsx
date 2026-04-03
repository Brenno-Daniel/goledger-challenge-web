interface BadgeProps {
  rating: number;
  className?: string;
}

export function Badge({ rating, className = '' }: BadgeProps) {
  const displayRating = rating === 0 ? 'Livre' : `${rating}+`;

  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded
                  bg-brand-primary text-brand-bg
                  ${className}`}
    >
      {displayRating}
    </span>
  );
}
