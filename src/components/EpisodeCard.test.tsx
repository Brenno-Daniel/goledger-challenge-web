import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EpisodeCard } from './EpisodeCard';
import type { Episode } from '@/types';

describe('EpisodeCard', () => {
  const mockEpisode: Episode = {
    '@assetType': 'episode',
    '@key': 'episode:055f8f49-7e3a-5908-b0ec-bf5a3f8df419',
    episodeNumber: 2,
    title: 'Grilled',
    description: 'Walt e Jesse ficam presos em um esconderijo no deserto.',
    rating: 9.5,
    releaseDate: '2009-03-15T00:00:00Z',
    season: {
      '@key': 'season:e54f2e15-f8c8-5745-a293-97938f20f628',
    },
  };

  it('Should render episode number correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const episodeNumber = screen.getByText('EP 2');
    expect(episodeNumber).toBeInTheDocument();
  });

  it('Should render episode title correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const title = screen.getByText('Grilled');
    expect(title).toBeInTheDocument();
  });

  it('Should render episode description correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const description = screen.getByText(
      'Walt e Jesse ficam presos em um esconderijo no deserto.'
    );
    expect(description).toBeInTheDocument();
  });

  it('Should render episode rating correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const rating = screen.getByText('9.5');
    expect(rating).toBeInTheDocument();
  });

  it('Should render action buttons when component is rendered', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <EpisodeCard
        episode={mockEpisode}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit episode/i });
    const deleteButton = screen.getByRole('button', {
      name: /delete episode/i,
    });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('Should call onEdit when edit button is clicked', () => {
    const mockOnEdit = vi.fn();
    render(<EpisodeCard episode={mockEpisode} onEdit={mockOnEdit} />);

    const editButton = screen.getByRole('button', { name: /edit episode/i });
    editButton.click();

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
  });

  it('Should call onDelete when delete button is clicked', () => {
    const mockOnDelete = vi.fn();
    render(<EpisodeCard episode={mockEpisode} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', {
      name: /delete episode/i,
    });
    deleteButton.click();

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });
});
