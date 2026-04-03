import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TVShowCard } from './TVShowCard';
import type { TVShow } from '@/types';

describe('TVShowCard', () => {
  const mockShow: TVShow = {
    '@assetType': 'tvshow',
    '@key': 'tvshow-001',
    title: 'Breaking Bad',
    description: 'A história do professor de química Walter White.',
    recommendedAge: 16,
  };

  it('Should render show title correctly when data is loaded', () => {
    render(<TVShowCard show={mockShow} />);

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Breaking Bad');
  });

  it('Should render show description correctly when data is loaded', () => {
    render(<TVShowCard show={mockShow} />);

    const description = screen.getByText(
      'A história do professor de química Walter White.'
    );
    expect(description).toBeInTheDocument();
  });

  it('Should render rating badge correctly when data is loaded', () => {
    render(<TVShowCard show={mockShow} />);

    const badge = screen.getByText('16+');
    expect(badge).toBeInTheDocument();
  });

  it('Should render action buttons when component is rendered', () => {
    const mockOnEdit = vi.fn();
    const mockOnDelete = vi.fn();
    render(
      <TVShowCard show={mockShow} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('Should render link to series detail page when card is clicked', () => {
    render(<TVShowCard show={mockShow} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/series/tvshow-001');
  });
});
