import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Toast } from './toast';

describe('Toast', () => {
  it('renders a success toast', () => {
    render(
      <Toast
        variant="success"
        title="Interesse enviado"
        description="A ONG Amidogo recebe uma notificação agora."
      />,
    );
    expect(screen.getByText('Interesse enviado')).toBeInTheDocument();
  });

  it('renders an error toast', () => {
    render(
      <Toast
        variant="error"
        title="Não deu certo"
        description="Sem conexão. Tentamos de novo sozinhos."
      />,
    );
    expect(screen.getByText('Não deu certo')).toBeInTheDocument();
  });
});
