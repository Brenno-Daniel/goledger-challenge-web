import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TVShowForm } from './TVShowForm';
import { SeasonForm } from './SeasonForm';
import { EpisodeForm } from './EpisodeForm';
import { ToastProvider } from '@/components/ui';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<ToastProvider>{ui}</ToastProvider>);
};

describe('TVShowForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('Should render form fields correctly', () => {
    renderWithProvider(<TVShowForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('Nome da série')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Descrição da série')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: 16+, Livre')).toBeInTheDocument();
  });

  it('Should display labels correctly', () => {
    renderWithProvider(<TVShowForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
    expect(screen.getByText('Classificação')).toBeInTheDocument();
  });

  it('Should prefill form when defaultValues are provided', () => {
    renderWithProvider(
      <TVShowForm
        onSubmit={mockOnSubmit}
        defaultValues={{
          title: 'Breaking Bad',
          description: 'Uma história sobre química.',
          rating: '16+',
        }}
      />
    );

    expect(screen.getByDisplayValue('Breaking Bad')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('Uma história sobre química.')
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue('16+')).toBeInTheDocument();
  });
});

describe('SeasonForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('Should render form fields correctly', () => {
    renderWithProvider(<SeasonForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Descrição da temporada')
    ).toBeInTheDocument();
  });

  it('Should display labels correctly', () => {
    renderWithProvider(<SeasonForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Número da Temporada')).toBeInTheDocument();
    expect(screen.getByText('Descrição')).toBeInTheDocument();
  });
});

describe('EpisodeForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('Should render all form fields correctly', () => {
    renderWithProvider(<EpisodeForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Título do episódio')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Descrição do episódio')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('9.5')).toBeInTheDocument();
  });

  it('Should display labels correctly', () => {
    renderWithProvider(<EpisodeForm onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Número do Episódio')).toBeInTheDocument();
    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Nota (0-10)')).toBeInTheDocument();
    expect(screen.getByText('Data de Lançamento')).toBeInTheDocument();
  });
});
