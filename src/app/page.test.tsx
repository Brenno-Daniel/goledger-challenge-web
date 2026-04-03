import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ToastProvider } from '@/components/ui';
import Home from './page';
import * as tvShowService from '@/services/tvShowService';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

const mockTVShows = [
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:001',
    title: 'Breaking Bad',
    description: 'A história do professor...',
    recommendedAge: 16,
  },
  {
    '@assetType': 'tvshows',
    '@key': 'tvshows:002',
    title: 'Stranger Things',
    description: 'Quando um garoto desaparece...',
    recommendedAge: 14,
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    vi.spyOn(tvShowService, 'getTVShows').mockResolvedValue(mockTVShows);
  });

  it('Should render TV show cards when data is loaded', async () => {
    renderWithProvider(<Home />);

    await waitFor(() => {
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings.length).toBe(2);
      expect(headings[0]).toHaveTextContent('Breaking Bad');
    });
  });

  it('Should render search bar when page is loaded', () => {
    renderWithProvider(<Home />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar séries...');
  });

  it('Should render "Nova Série" button when page is loaded', () => {
    renderWithProvider(<Home />);

    const button = screen.getByRole('button', { name: /nova série/i });
    expect(button).toBeInTheDocument();
  });
});
