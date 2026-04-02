'use client';

import { ToastProvider } from '@/components/ui';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}
