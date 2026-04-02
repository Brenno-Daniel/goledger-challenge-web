interface BadgeProps {
  rating: string;
  className?: string;
}

export function Badge({ rating, className = '' }: BadgeProps) {
  return (
    <span
      className={`px-2 py-0.5 text-xs font-medium rounded
                  bg-brand-primary text-brand-bg
                  ${className}`}
    >
      {rating}
    </span>
  );
}
