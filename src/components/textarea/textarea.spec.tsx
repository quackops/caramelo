import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Textarea } from './textarea';

describe('Textarea', () => {
  it('renders a labelled multi-line field', () => {
    render(<Textarea id="historia" label="História" />);
    expect(screen.getByLabelText('História')).toBeInTheDocument();
  });

  it('counts characters against the native maxLength', () => {
    render(
      <Textarea id="historia" label="História" maxLength={400} showCount />,
    );

    expect(screen.getByText('0/400')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('História'), {
      target: { value: 'Nina' },
    });
    expect(screen.getByText('4/400')).toBeInTheDocument();
  });

  it('keeps the counter out of the way without showCount', () => {
    render(<Textarea id="historia" label="História" maxLength={400} />);
    expect(screen.queryByText('0/400')).not.toBeInTheDocument();
  });

  it('renders an error that replaces the hint', () => {
    render(
      <Textarea
        id="historia"
        label="História"
        hint="Conte como ela chegou"
        error="Escreva pelo menos 20 caracteres"
      />,
    );

    expect(
      screen.getByText('Escreva pelo menos 20 caracteres'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Conte como ela chegou')).not.toBeInTheDocument();
    expect(screen.getByLabelText('História')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('announces the count politely in its own live region', () => {
    const { container } = render(
      <Textarea id="historia" label="História" maxLength={400} showCount />,
    );

    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toHaveTextContent('0 de 400 caracteres');
  });
});
