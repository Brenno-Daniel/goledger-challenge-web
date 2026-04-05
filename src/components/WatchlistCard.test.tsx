import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { WatchlistCard } from './WatchlistCard';
import type { Watchlist } from '@/types';

describe('WatchlistCard', () => {
  const mockWatchlist: Watchlist = {
    '@assetType': 'watchlists',
    '@key': 'watchlist-001',
    title: 'Minhas Favoritas',
    description: 'Lista das minhas séries favoritas para assistir.',
    tvShows: [
      { '@assetType': 'tvShows', '@key': 'tvshow-001' },
      { '@assetType': 'tvShows', '@key': 'tvshow-002' },
    ],
  };

  it('Should render watchlist title correctly when data is loaded', () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    const title = screen.getByRole('heading', { level: 4 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Minhas Favoritas');
  });

  it('Should render watchlist description correctly when data is loaded', () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    const description = screen.getByText(
      'Lista das minhas séries favoritas para assistir.'
    );
    expect(description).toBeInTheDocument();
  });

  it('Should render series count correctly when data is loaded', () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    const count = screen.getByText('2 séries');
    expect(count).toBeInTheDocument();
  });

  it('Should render singular text when only one series', () => {
    const singleShowWatchlist: Watchlist = {
      ...mockWatchlist,
      tvShows: [{ '@assetType': 'tvShows', '@key': 'tvshow-001' }],
    };
    render(<WatchlistCard watchlist={singleShowWatchlist} />);

    const count = screen.getByText('1 série');
    expect(count).toBeInTheDocument();
  });

  it('Should render link to watchlist detail page when card is clicked', () => {
    render(<WatchlistCard watchlist={mockWatchlist} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/watchlist/watchlist-001');
  });

  it('Should render zero series text when no tvShows', () => {
    const emptyWatchlist: Watchlist = {
      ...mockWatchlist,
      tvShows: [],
    };
    render(<WatchlistCard watchlist={emptyWatchlist} />);

    const count = screen.getByText('0 séries');
    expect(count).toBeInTheDocument();
  });
});
