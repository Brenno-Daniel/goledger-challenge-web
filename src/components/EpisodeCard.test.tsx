import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EpisodeCard } from './EpisodeCard';
import type { Episode } from '@/types';

describe('EpisodeCard', () => {
  const mockEpisode: Episode = {
    '@assetType': 'episode',
    '@key': 'episode:055f8f49-7e3a-5908-b0ec-bf5a3f8df419',
    number: 2,
    name: 'Grilled',
    description: 'Walt e Jesse ficam presos em um esconderijo no deserto.',
    duration: '10:00',
    season: {
      '@key': 'season:e54f2e15-f8c8-5745-a293-97938f20f628',
    },
  };

  it('Should render episode number correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const episodeNumber = screen.getByText('EP 2');
    expect(episodeNumber).toBeInTheDocument();
  });

  it('Should render episode name correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const name = screen.getByText('Grilled');
    expect(name).toBeInTheDocument();
  });

  it('Should render episode description correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const description = screen.getByText(
      'Walt e Jesse ficam presos em um esconderijo no deserto.'
    );
    expect(description).toBeInTheDocument();
  });

  it('Should render episode duration correctly when data is loaded', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    const duration = screen.getByText('10:00');
    expect(duration).toBeInTheDocument();
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
