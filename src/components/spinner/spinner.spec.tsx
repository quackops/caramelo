import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Spinner } from './spinner';

describe('Spinner', () => {
  it('announces itself as a loading status', () => {
    render(<Spinner />);
    expect(
      screen.getByRole('status', { name: 'Carregando' }),
    ).toBeInTheDocument();
  });

  it('keeps the spin behind motion-safe', () => {
    const { container } = render(<Spinner />);
    expect(container.firstElementChild).toHaveClass(
      'motion-safe:animate-spin-slow',
    );
  });

  it('takes a className for sizing', () => {
    const { container } = render(<Spinner className="size-4" />);
    expect(container.firstElementChild).toHaveClass('size-4');
  });
});
