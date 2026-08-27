import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AnimalCard } from './animal-card';

describe('AnimalCard', () => {
  it('renders the list card', () => {
    render(
      <AnimalCard
        name="Nina"
        details="SRD · 2 anos · médio"
        meta="Lar Tintin · 3,2 km"
        tags={['castrada', 'vacinada']}
        badge="verified"
      />,
    );

    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(screen.getByText('SRD · 2 anos · médio')).toBeInTheDocument();
    expect(screen.getByText('castrada')).toBeInTheDocument();
  });

  it('drops tags and details in the grid variant', () => {
    render(
      <AnimalCard
        variant="grid"
        name="Nina"
        details="SRD · 2 anos · médio"
        meta="Pituba · 3,2 km"
        tags={['castrada']}
      />,
    );

    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(screen.getByText('Pituba · 3,2 km')).toBeInTheDocument();
    expect(screen.queryByText('SRD · 2 anos · médio')).not.toBeInTheDocument();
    expect(screen.queryByText('castrada')).not.toBeInTheDocument();
  });

  it('overlays the badge on the photo in the grid variant', () => {
    const { container } = render(
      <AnimalCard variant="grid" name="Nina" badge="urgent" />,
    );

    expect(
      container.querySelector('.absolute.top-1\\.5.left-1\\.5'),
    ).toHaveTextContent('URGENTE');
  });

  it('toggles the favourite without bubbling into the card', () => {
    const onFavoriteToggle = vi.fn();
    const onCardClick = vi.fn();
    render(
      <AnimalCard
        name="Nina"
        onFavoriteToggle={onFavoriteToggle}
        onClick={onCardClick}
      />,
    );

    const favorite = screen.getByRole('button', { name: 'Salvar Nina' });
    expect(favorite).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(favorite);
    expect(onFavoriteToggle).toHaveBeenCalledOnce();
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it('fills the heart once favourited', () => {
    render(<AnimalCard name="Nina" favorited onFavoriteToggle={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Salvar Nina' })).toHaveClass(
      'text-brand',
    );
  });

  it('keeps an unavailable animal in the list, dimmed and badged', () => {
    const { container } = render(
      <AnimalCard name="Nina" unavailable onFavoriteToggle={vi.fn()} />,
    );

    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(screen.getByText('ADOTADO')).toBeInTheDocument();
    expect(container.querySelector('[role="img"]')).toHaveClass('opacity-40');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders the card silhouette while loading', () => {
    const { container } = render(<AnimalCard name="" loading />);

    expect(container.querySelectorAll('output').length).toBeGreaterThan(1);
    expect(container.firstElementChild).toHaveClass('rounded-card');
  });

  it('defaults the photo alt to something meaningful', () => {
    render(
      <AnimalCard name="Nina" photoAlt="Nina, cadela SRD de porte médio" />,
    );
    expect(
      screen.getByRole('img', { name: 'Nina, cadela SRD de porte médio' }),
    ).toBeInTheDocument();
  });

  it('falls back to the name for the photo alt', () => {
    render(<AnimalCard name="Nina" />);
    expect(screen.getByRole('img', { name: 'Nina' })).toBeInTheDocument();
  });
});
