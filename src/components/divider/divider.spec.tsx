import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders an hr when unlabelled', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('is a separator either way', () => {
    render(<Divider />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('breaks the rule around the label', () => {
    render(<Divider label="ou" />);

    const separator = screen.getByRole('separator');

    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
    expect(screen.getByText('ou')).toBeInTheDocument();
  });

  it('hides a vertical rule from assistive tech', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const rule = container.querySelector('hr');

    expect(rule).toHaveAttribute('aria-hidden', 'true');
    expect(rule).toHaveClass('w-px', 'self-stretch');
  });

  it('carries no margin of its own', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')?.className).not.toMatch(
      /\bm[trblxy]?-/,
    );
  });
});
