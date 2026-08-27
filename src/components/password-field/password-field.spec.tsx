import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PasswordField } from './password-field';

describe('PasswordField', () => {
  it('renders a masked field with a reveal toggle', () => {
    render(<PasswordField id="senha" label="Senha" />);

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'password');
    expect(
      screen.getByRole('button', { name: 'Mostrar senha' }),
    ).toBeInTheDocument();
  });

  it('reveals the value and updates the toggle state', () => {
    render(<PasswordField id="senha" label="Senha" />);

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));

    expect(screen.getByLabelText('Senha')).toHaveAttribute('type', 'text');
    const toggle = screen.getByRole('button', { name: 'Ocultar senha' });
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
  });

  it('keeps the field focused across a toggle', () => {
    render(<PasswordField id="senha" label="Senha" />);
    const field = screen.getByLabelText('Senha');
    field.focus();

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar senha' }));
    expect(screen.getByLabelText('Senha')).toBe(field);
  });

  it('can drop the toggle entirely', () => {
    render(<PasswordField id="senha" label="Senha" showToggle={false} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('pairs the strength meter with a word', () => {
    render(
      <PasswordField
        id="senha"
        label="Senha"
        strength={3}
        strengthLabel="Boa"
      />,
    );

    expect(screen.getByText('Boa')).toBeInTheDocument();
  });

  it('lets the error take priority over the meter', () => {
    render(
      <PasswordField
        id="senha"
        label="Senha"
        strength={1}
        strengthLabel="Fraca"
        error="A senha precisa de 8 caracteres"
      />,
    );

    expect(
      screen.getByText('A senha precisa de 8 caracteres'),
    ).toBeInTheDocument();
    expect(screen.queryByText('Fraca')).not.toBeInTheDocument();
  });

  it('refuses to render the meter as colour alone', () => {
    const { container } = render(
      <PasswordField id="senha" label="Senha" strength={4} />,
    );

    expect(container.querySelectorAll('.bg-success')).toHaveLength(0);
  });
});
