import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LoadingSkeleton } from './loading-skeleton';

describe('LoadingSkeleton', () => {
  it('announces itself as a loading status', () => {
    render(<LoadingSkeleton className="h-4 w-20" />);
    expect(
      screen.getByRole('status', { name: 'Carregando' }),
    ).toBeInTheDocument();
  });

  it('keeps the shimmer behind motion-safe', () => {
    const { container } = render(<LoadingSkeleton />);
    expect(container.firstElementChild).toHaveClass(
      'motion-safe:animate-shimmer',
    );
  });
});
