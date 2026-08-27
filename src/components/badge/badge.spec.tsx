import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Badge, badgePresets } from './badge';

describe('Badge', () => {
  it('renders the label it is given', () => {
    render(<Badge voice="success" icon="check" label="ONG VERIFICADA" />);
    expect(screen.getByText('ONG VERIFICADA')).toBeInTheDocument();
  });

  it('pairs a decorative glyph with the label', () => {
    const { container } = render(
      <Badge voice="neutral" icon="pause" label="PAUSADO" />,
    );
    const glyph = container.querySelector('svg');

    expect(screen.getByText('PAUSADO')).toBeInTheDocument();
    expect(glyph).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders no glyph when no icon is given', () => {
    const { container } = render(<Badge voice="neutral" label="TUTOR" />);
    expect(container.querySelector('svg')).toBeNull();
  });

  it('keeps the warning voice an outline rather than a brand fill', () => {
    const { container } = render(
      <Badge voice="warning" icon="alert-circle" label="URGENTE" />,
    );
    expect(container.firstElementChild).toHaveClass(
      'bg-transparent',
      'border-warning',
    );
  });

  it('falls back to the neutral voice', () => {
    const { container } = render(<Badge label="TUTOR" />);
    expect(container.firstElementChild).toHaveClass('bg-gray-3');
  });

  it('distinguishes the neutral statuses by label and glyph', () => {
    const { container: rejected } = render(
      <Badge {...badgePresets.rejected} />,
    );
    const { container: expired } = render(<Badge {...badgePresets.expired} />);

    expect(screen.getByText('RECUSADA')).toBeInTheDocument();
    expect(screen.getByText('EXPIRADA')).toBeInTheDocument();
    expect(rejected.querySelector('svg')?.innerHTML).not.toBe(
      expired.querySelector('svg')?.innerHTML,
    );
  });
});
