import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconButton } from '../icon-button/icon-button';
import { Input } from './input';

describe('Input', () => {
  it('renders a labelled text field', () => {
    render(<Input id="name" label="Nome do animal" placeholder="Ex.: Nina" />);
    expect(screen.getByLabelText('Nome do animal')).toBeInTheDocument();
  });

  it('renders an error message and marks the field invalid', () => {
    render(<Input id="email" label="E-mail" error="Insira um e-mail válido" />);
    expect(screen.getByText('Insira um e-mail válido')).toBeInTheDocument();
    expect(screen.getByLabelText('E-mail')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('renders a hint line under the field', () => {
    render(
      <Input id="cep" label="CEP" hint="Só usamos para calcular a distância" />,
    );
    expect(
      screen.getByText('Só usamos para calcular a distância'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('CEP')).toHaveAttribute('aria-describedby');
  });

  it('lets the error replace the hint', () => {
    render(
      <Input
        id="cep-error"
        label="CEP"
        hint="Só a distância"
        error="CEP inválido"
      />,
    );
    expect(screen.getByText('CEP inválido')).toBeInTheDocument();
    expect(screen.queryByText('Só a distância')).not.toBeInTheDocument();
  });

  it('hides a decorative leading affix from assistive tech', () => {
    const { container } = render(
      <Input id="amount" label="Outro valor" leading="R$" />,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      'R$',
    );
  });

  it('keeps an interactive trailing affix reachable', () => {
    render(
      <Input
        id="password"
        label="Senha"
        type="password"
        trailing={<IconButton icon="eye" aria-label="Mostrar senha" />}
      />,
    );
    expect(
      screen.getByRole('button', { name: 'Mostrar senha' }),
    ).toBeInTheDocument();
  });
});
