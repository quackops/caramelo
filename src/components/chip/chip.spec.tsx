import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Chip } from './chip';

describe('Chip', () => {
  it('renders children', () => {
    render(<Chip>Cães</Chip>);
    expect(screen.getByText('Cães')).toBeInTheDocument();
  });

  it('renders a counter badge', () => {
    render(<Chip count={2}>Filtros</Chip>);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('disables the button for the disabled variant', () => {
    render(<Chip variant="disabled">Indisponível</Chip>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
