import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './empty-state';

describe('EmptyState', () => {
  it('renders title, description and action for the empty variant', () => {
    render(
      <EmptyState
        title="Nenhum bicho por aqui"
        description="Seus filtros estão bem estreitos. Solta a distância e olha de novo."
        actionLabel="Limpar filtros"
      />,
    );

    expect(screen.getByText('Nenhum bicho por aqui')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Limpar filtros' }),
    ).toBeInTheDocument();
  });

  it('renders the error variant', () => {
    render(
      <EmptyState
        variant="error"
        title="Não conseguimos carregar"
        description="A culpa provavelmente é nossa."
        actionLabel="Tentar de novo"
      />,
    );

    expect(screen.getByText('Não conseguimos carregar')).toBeInTheDocument();
  });
});
