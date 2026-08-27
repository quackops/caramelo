import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge } from './badge';

describe('Badge', () => {
  it('renders the verified label', () => {
    render(<Badge variant="verified" />);
    expect(screen.getByText('ONG VERIFICADA')).toBeInTheDocument();
  });

  it('renders a custom label', () => {
    render(<Badge variant="new" label="RECÉM CHEGADO" />);
    expect(screen.getByText('RECÉM CHEGADO')).toBeInTheDocument();
  });

  it('pairs a decorative glyph with every status that has one', () => {
    const { container } = render(<Badge variant="paused" />);
    const glyph = container.querySelector('svg');

    expect(screen.getByText('PAUSADO')).toBeInTheDocument();
    expect(glyph).toHaveAttribute('aria-hidden', 'true');
  });

  it('distinguishes the gray application statuses by label and glyph', () => {
    const { container: rejected } = render(<Badge variant="rejected" />);
    const { container: expired } = render(<Badge variant="expired" />);

    expect(screen.getByText('RECUSADA')).toBeInTheDocument();
    expect(screen.getByText('EXPIRADA')).toBeInTheDocument();
    expect(rejected.querySelector('svg')?.innerHTML).not.toBe(
      expired.querySelector('svg')?.innerHTML,
    );
  });

  it('keeps urgent as an outline rather than a brand fill', () => {
    const { container } = render(<Badge variant="urgent" />);
    expect(container.firstElementChild).toHaveClass(
      'bg-transparent',
      'border-warning',
    );
  });
});
