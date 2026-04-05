import { notFound } from 'next/navigation';
import { getWatchlistByKey } from '@/services/watchlistService';
import { WatchlistDetailClient } from './WatchlistDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WatchlistDetailPage({ params }: PageProps) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  let watchlist;

  try {
    watchlist = await getWatchlistByKey(decodedId);
  } catch {
    notFound();
  }

  if (!watchlist) {
    notFound();
  }

  return <WatchlistDetailClient watchlist={watchlist} />;
}
