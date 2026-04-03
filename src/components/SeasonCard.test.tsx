import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SeasonCard } from './SeasonCard';
import type { Season } from '@/types';

describe('SeasonCard', () => {
  const mockSeason: Season = {
    '@assetType': 'season',
    '@key': 'season-001-1',
    number: 1,
    description: 'A primeira temporada acompanha Walter White e Jesse Pinkman.',
    tvShow: { '@key': 'tvshow-001' },
  };

  it('Should render season number correctly when data is loaded', () => {
    render(<SeasonCard season={mockSeason} />);

    const seasonTitle = screen.getByText('Temporada 1');
    expect(seasonTitle).toBeInTheDocument();
  });

  it('Should render season description correctly when data is loaded', () => {
    render(<SeasonCard season={mockSeason} />);

    const description = screen.getByText(
      'A primeira temporada acompanha Walter White e Jesse Pinkman.'
    );
    expect(description).toBeInTheDocument();
  });
});
