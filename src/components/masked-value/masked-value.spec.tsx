import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MaskedValue } from './masked-value';

describe('MaskedValue', () => {
  it('renders exactly the string it was given', () => {
    render(<MaskedValue value="(71) 9•••• ••34" />);
    expect(screen.getByText('(71) 9•••• ••34')).toBeInTheDocument();
  });

  it('never derives the mask itself', () => {
    const { container } = render(<MaskedValue value="28.451.***/0001-09" />);
    expect(container.textContent).toBe('28.451.***/0001-09');
  });

  it('renders the release hint beside the value', () => {
    render(
      <MaskedValue value="(71) 9•••• ••34" hint="liberado após o aceite" />,
    );
    expect(screen.getByText('liberado após o aceite')).toBeInTheDocument();
  });

  it('describes the dots instead of reading them out', () => {
    render(
      <MaskedValue value="(71) 9•••• ••34" hint="liberado após o aceite" />,
    );

    expect(
      screen.getByLabelText('terminado em 34, liberado após o aceite'),
    ).toBeInTheDocument();
  });

  it('has no reveal control by default', () => {
    render(<MaskedValue value="WhatsApp ••••1234" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('reveals only a value the consumer already holds', () => {
    const onRevealChange = vi.fn();
    const { rerender } = render(
      <MaskedValue
        value="(71) 9•••• ••34"
        revealedValue="(71) 98888-1234"
        revealable
        onRevealChange={onRevealChange}
      />,
    );

    expect(screen.getByText('(71) 9•••• ••34')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar valor' }));
    expect(onRevealChange).toHaveBeenCalledWith(true);

    rerender(
      <MaskedValue
        value="(71) 9•••• ••34"
        revealedValue="(71) 98888-1234"
        revealable
        revealed
        onRevealChange={onRevealChange}
      />,
    );
    expect(screen.getByText('(71) 98888-1234')).toBeInTheDocument();
  });

  it('stays masked when there is nothing to reveal', () => {
    render(<MaskedValue value="(71) 9•••• ••34" revealable revealed />);
    expect(screen.getByText('(71) 9•••• ••34')).toBeInTheDocument();
  });
});
