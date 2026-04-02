import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('should render TV show cards', () => {
    render(<Home />);

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(5);
    expect(headings[0]).toHaveTextContent('Breaking Bad');
  });

  it('should render search bar', () => {
    render(<Home />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('placeholder', 'Buscar séries...');
  });
});
