import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  it('renders a labelled checkbox', () => {
    render(<Checkbox label="Manter conectado" />);
    expect(
      screen.getByRole('checkbox', { name: 'Manter conectado' }),
    ).toBeInTheDocument();
  });

  it('toggles when the label is clicked', () => {
    render(<Checkbox label="Manter conectado" />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(screen.getByText('Manter conectado'));
    expect(checkbox).toBeChecked();
  });

  it('leaves a link inside the label independently focusable', () => {
    render(
      <Checkbox
        label={
          <>
            Li e aceito os <a href="/termos">Termos de uso</a>.
          </>
        }
      />,
    );

    const link = screen.getByRole('link', { name: 'Termos de uso' });
    link.focus();
    expect(link).toHaveFocus();
  });

  it('does not toggle when a link inside the label is activated', () => {
    const onChange = vi.fn();
    render(
      <Checkbox
        onChange={onChange}
        label={
          <>
            Li e aceito os <a href="/termos">Termos de uso</a>.
          </>
        }
      />,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Termos de uso' }));
    expect(screen.getByRole('checkbox')).not.toBeChecked();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders an error message and marks the field invalid', () => {
    render(
      <Checkbox label="Tenho mais de 18 anos" error="Confirme sua idade" />,
    );

    expect(screen.getByText('Confirme sua idade')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });
});
