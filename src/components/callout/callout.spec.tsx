import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { Callout } from './callout';

describe('Callout', () => {
  it('renders the consumer copy verbatim', () => {
    render(
      <Callout>
        Venda de animais é proibida na Pawee. Anúncios com cobrança são
        removidos.
      </Callout>,
    );

    expect(
      screen.getByText(/Venda de animais é proibida na Pawee/),
    ).toBeInTheDocument();
  });

  it('ships no default text of its own', () => {
    const { container } = render(<Callout>{''}</Callout>);
    expect(container.textContent).toBe('');
  });

  it('renders a title above the body', () => {
    render(
      <Callout tone="success" icon="shield" title="ONG verificada pela Pawee">
        CNPJ ativo, estatuto conferido, visita virtual em 03/2026.
      </Callout>,
    );

    expect(screen.getByText('ONG verificada pela Pawee')).toBeInTheDocument();
  });

  it('keeps the warning tone an outline, never a fill', () => {
    const { container } = render(<Callout tone="warning">Regra</Callout>);
    const box = container.firstElementChild;

    expect(box).toHaveClass('border-warning', 'bg-transparent');
    expect(box).not.toHaveClass('bg-warning');
  });

  it('renders an action below the body', () => {
    render(
      <Callout action={<Button variant="secondary">Criar alerta</Button>}>
        Quer saber quando alguém parecido com a Amora aparecer?
      </Callout>,
    );

    expect(
      screen.getByRole('button', { name: 'Criar alerta' }),
    ).toBeInTheDocument();
  });

  it('is page content, not a live region', () => {
    const { container } = render(<Callout tone="info">Aviso</Callout>);
    const box = container.firstElementChild;

    expect(box).not.toHaveAttribute('aria-live');
    expect(box).not.toHaveAttribute('role');
    expect(screen.queryByRole('button', { name: /fechar/i })).toBeNull();
  });
});
