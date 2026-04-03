import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToastProvider } from '@/components/ui';
import Home from './page';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe('Home Page', () => {
  it('Should render TV show cards when data is loaded', () => {
    renderWithProvider(<Home />);

    const headings = screen.getAllByRole('heading', { level: 3 });
    expect(headings.length).toBe(5);
    expect(headings[0]).toHaveTextContent('Breaking Bad');
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
