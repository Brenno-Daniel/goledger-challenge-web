import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('Should render input element correctly when component is mounted', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar value="" onChange={mockOnChange} placeholder="Search..." />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Search...');
  });

  it('Should call onChange with each character when user types in the input', async () => {
    const mockOnChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SearchBar value="" onChange={mockOnChange} placeholder="Search..." />
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'AB');

    expect(mockOnChange).toHaveBeenCalledTimes(2);
    expect(mockOnChange).toHaveBeenNthCalledWith(1, 'A');
    expect(mockOnChange).toHaveBeenNthCalledWith(2, 'B');
  });

  it('Should display correct placeholder text when provided', () => {
    const mockOnChange = vi.fn();
    render(
      <SearchBar
        value=""
        onChange={mockOnChange}
        placeholder="Buscar séries..."
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Buscar séries...');
  });
});
