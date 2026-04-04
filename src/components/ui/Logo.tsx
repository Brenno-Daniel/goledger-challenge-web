interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="LedgerStream Logo"
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="24"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect x="6" y="8" width="12" height="2" rx="1" fill="currentColor" />
      <rect
        x="6"
        y="12"
        width="10"
        height="2"
        rx="1"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <rect
        x="6"
        y="16"
        width="12"
        height="2"
        rx="1"
        fill="currentColor"
        fillOpacity="0.6"
      />
      <rect
        x="6"
        y="20"
        width="8"
        height="2"
        rx="1"
        fill="currentColor"
        fillOpacity="0.4"
      />
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polygon points="22,21 28,24 22,27" fill="currentColor" />
    </svg>
  );
}
