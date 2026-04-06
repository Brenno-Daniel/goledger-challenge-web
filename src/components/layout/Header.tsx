'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Logo } from '@/components/ui';
import { Film, ListTodo } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-brand-bg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="group flex items-center gap-3">
            <Logo className="w-8 h-8 text-brand-primary transition-colors duration-150 group-hover:text-white" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-brand-primary transition-colors duration-150 group-hover:text-white">
                LedgerStream
              </span>
              <span className="hidden md:block text-xs text-white/60 transition-colors duration-150 group-hover:text-white/80">
                Gerencie suas séries favoritas
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 md:gap-4">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-brand-primary transition-colors rounded-lg hover:bg-white/5"
              >
                <Film size={18} />
                <span className="hidden sm:inline">Séries</span>
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
            >
              <Link
                href="/watchlist"
                className="flex items-center gap-2 px-3 py-2 text-sm text-white/60 hover:text-brand-primary transition-colors rounded-lg hover:bg-white/5"
              >
                <ListTodo size={18} />
                <span className="hidden sm:inline">Watchlists</span>
              </Link>
            </motion.div>
          </nav>
        </div>
      </div>
    </header>
  );
}
