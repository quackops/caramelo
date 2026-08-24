import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingSkeleton } from './loading-skeleton';

describe('LoadingSkeleton', () => {
  it('renders a block skeleton by default', () => {
    render(<LoadingSkeleton className="h-4 w-20" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders a spinner variant', () => {
    render(<LoadingSkeleton variant="spinner" />);
    expect(
      screen.getByRole('status', { name: 'Carregando' }),
    ).toBeInTheDocument();
  });
});
