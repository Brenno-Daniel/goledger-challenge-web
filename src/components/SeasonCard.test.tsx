import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SeasonCard } from './SeasonCard';
import type { Season } from '@/types';

describe('SeasonCard', () => {
  const mockSeason: Season = {
    '@assetType': 'season',
    '@key': 'season-001-1',
    number: 1,
    year: 2008,
    description: 'A primeira temporada acompanha Walter White e Jesse Pinkman.',
    tvShow: { '@key': 'tvshow-001' },
  };

  it('Should render season number correctly when data is loaded', () => {
    render(<SeasonCard season={mockSeason} tvShowId="tvshow-001" />);

    const seasonTitle = screen.getByText('Temporada 1');
    expect(seasonTitle).toBeInTheDocument();
  });

  it('Should render season year correctly when data is loaded', () => {
    render(<SeasonCard season={mockSeason} tvShowId="tvshow-001" />);

    const year = screen.getByText('(2008)');
    expect(year).toBeInTheDocument();
  });

  it('Should render season description correctly when data is loaded', () => {
    render(<SeasonCard season={mockSeason} tvShowId="tvshow-001" />);

    const description = screen.getByText(
      'A primeira temporada acompanha Walter White e Jesse Pinkman.'
    );
    expect(description).toBeInTheDocument();
  });

  it('Should render links to season episodes when component is rendered', () => {
    render(<SeasonCard season={mockSeason} tvShowId="tvshow-001" />);

    const links = screen.getAllByRole('link');
    expect(links.length).toBe(2);
    expect(links[0]).toHaveAttribute(
      'href',
      '/series/tvshow-001/seasons/season-001-1'
    );
  });

  it('Should render action buttons', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <SeasonCard
        season={mockSeason}
        tvShowId="tvshow-001"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    const editButton = screen.getByRole('button', { name: /edit season/i });
    const deleteButton = screen.getByRole('button', { name: /delete season/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
