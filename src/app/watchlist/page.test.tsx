import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ToastProvider } from '@/components/ui';
import WatchlistPage from './page';
import * as watchlistService from '@/services/watchlistService';
import * as tvShowService from '@/services/tvShowService';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

const mockWatchlists = [
  {
    '@assetType': 'watchlists',
    '@key': 'watchlist-001',
    title: 'Favoritas',
    description: 'Minhas séries favoritas.',
    tvShows: [{ '@assetType': 'tvShows', '@key': 'tvshow-001' }],
  },
  {
    '@assetType': 'watchlists',
    '@key': 'watchlist-002',
    title: 'Para Assistir',
    description: 'Séries para maratonar.',
    tvShows: [],
  },
];

const mockTVShows = [
  {
    '@assetType': 'tvshows',
    '@key': 'tvshow-001',
    title: 'Breaking Bad',
    description: 'A história do professor...',
    recommendedAge: 16,
  },
];

describe('Watchlist Page', () => {
  beforeEach(() => {
    vi.spyOn(watchlistService, 'getWatchlists').mockResolvedValue(
      mockWatchlists
    );
    vi.spyOn(tvShowService, 'getTVShows').mockResolvedValue(mockTVShows);
  });

  it('Should render watchlist cards when data is loaded', async () => {
    renderWithProvider(<WatchlistPage />);

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', { level: 4 });
      expect(headings.length).toBe(2);
      expect(headings[0]).toHaveTextContent('Favoritas');
      expect(headings[1]).toHaveTextContent('Para Assistir');
    });
  });

  it('Should render search bar when page is loaded', () => {
    renderWithProvider(<WatchlistPage />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar watchlists...');
  });

  it('Should render "Nova Watchlist" button when page is loaded', () => {
    renderWithProvider(<WatchlistPage />);

    const button = screen.getByRole('button', { name: /nova watchlist/i });
    expect(button).toBeInTheDocument();
  });

  it('Should render series count on watchlist cards', async () => {
    renderWithProvider(<WatchlistPage />);

    await waitFor(() => {
      const seriesCount = screen.getByText('1 série');
      expect(seriesCount).toBeInTheDocument();
    });
  });
});
