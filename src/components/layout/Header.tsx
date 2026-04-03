import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-bg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-brand-primary hover:text-white transition-colors duration-300"
          >
            LedgerStream
          </Link>
        </div>
      </div>
    </header>
  );
}
