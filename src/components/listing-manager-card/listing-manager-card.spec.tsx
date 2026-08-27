import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { IconButton } from '../icon-button/icon-button';
import { ListingManagerCard } from './listing-manager-card';

const metrics = [
  { label: 'Visualizações', value: 184 },
  { label: 'Salvos', value: 23 },
  { label: 'Interesses', value: 2 },
];

describe('ListingManagerCard', () => {
  it('renders the owner-only view of a listing', () => {
    render(
      <ListingManagerCard
        name="Nina"
        status="active"
        statusDetail="Publicado há 3 dias"
        metrics={metrics}
      />,
    );

    expect(screen.getByText('Nina')).toBeInTheDocument();
    expect(screen.getByText('ATIVO')).toBeInTheDocument();
    expect(screen.getByText('Publicado há 3 dias')).toBeInTheDocument();
  });

  it('reuses StatGrid for the numbers', () => {
    const { container } = render(
      <ListingManagerCard name="Nina" status="active" metrics={metrics} />,
    );

    expect(container.querySelector('dl')).toBeInTheDocument();
    expect(screen.getByText('184')).toBeInTheDocument();
  });

  it('makes the pending line the card primary action', () => {
    const onPendingClick = vi.fn();
    render(
      <ListingManagerCard
        name="Nina"
        status="active"
        pendingLabel="2 interesses esperando resposta"
        onPendingClick={onPendingClick}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: /2 interesses esperando resposta/ }),
    );
    expect(onPendingClick).toHaveBeenCalledOnce();
  });

  it('hides the pending line when there is nothing pending', () => {
    render(<ListingManagerCard name="Nina" status="active" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('dims an adopted listing and drops its pending line', () => {
    const { container } = render(
      <ListingManagerCard
        name="Nina"
        status="adopted"
        statusDetail="Adotado em 2 de julho por Rafael C."
        pendingLabel="2 interesses esperando resposta"
      />,
    );

    expect(screen.getByText('ADOTADO')).toBeInTheDocument();
    expect(container.querySelector('[role="img"]')).toHaveClass('opacity-40');
    expect(
      screen.queryByText('2 interesses esperando resposta'),
    ).not.toBeInTheDocument();
  });

  it('renders a paused listing', () => {
    render(<ListingManagerCard name="Nina" status="paused" />);
    expect(screen.getByText('PAUSADO')).toBeInTheDocument();
  });

  it('renders the overflow actions', () => {
    render(
      <ListingManagerCard
        name="Nina"
        status="active"
        actions={<IconButton icon="pause" aria-label="Pausar anúncio" />}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Pausar anúncio' }),
    ).toBeInTheDocument();
  });
});
