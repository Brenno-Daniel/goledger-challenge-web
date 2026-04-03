import type { Metadata } from 'next';
import './globals.css';
import { ClientLayout } from '@/components/ClientLayout';
import { Header } from '@/components/layout';

export const metadata: Metadata = {
  title: 'GoLedger Challenge',
  description: 'Desafio GoLedger',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ClientLayout>
          <Header />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
