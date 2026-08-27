import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { SummaryRow } from '../summary-row/summary-row';
import { ResultScreen } from './result-screen';

describe('ResultScreen', () => {
  it('renders the outcome as the page heading', () => {
    render(
      <ResultScreen
        title="Interesse enviado"
        actions={<Button>Voltar ao mural</Button>}
      />,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Interesse enviado' }),
    ).toBeInTheDocument();
  });

  it('moves focus to the title so the outcome is announced', () => {
    render(
      <ResultScreen
        title="Doação confirmada"
        actions={<Button>Fechar</Button>}
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
  });

  it('renders content between the description and the actions', () => {
    render(
      <ResultScreen
        title="Doação confirmada"
        description="A ONG já recebeu o valor."
        actions={<Button>Fechar</Button>}
      >
        <SummaryRow.Group>
          <SummaryRow label="Taxa Pawee" value="R$ 0,00" />
        </SummaryRow.Group>
      </ResultScreen>,
    );

    expect(screen.getByText('A ONG já recebeu o valor.')).toBeInTheDocument();
    expect(screen.getByText('Taxa Pawee')).toBeInTheDocument();
  });

  it('renders more than one action', () => {
    render(
      <ResultScreen
        title="Erro do servidor"
        actions={
          <>
            <Button>Tentar de novo</Button>
            <Button variant="ghost">Falar com o suporte</Button>
          </>
        }
      />,
    );

    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('always ends in a way out', () => {
    render(
      <ResultScreen
        title="Sem conexão"
        actions={<Button>Tentar de novo</Button>}
      />,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the small print', () => {
    render(
      <ResultScreen
        title="Erro do servidor"
        actions={<Button>Tentar de novo</Button>}
        footnote="erro 500 · ref 8F2A-D19"
      />,
    );

    expect(screen.getByText('erro 500 · ref 8F2A-D19')).toBeInTheDocument();
  });

  it('steps the title down inside a sheet', () => {
    render(
      <ResultScreen
        size="sheet"
        title="Interesse enviado"
        actions={<Button>Fechar</Button>}
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveClass('text-title');
  });

  it('colours an error outcome without relying on colour alone', () => {
    render(
      <ResultScreen
        tone="error"
        title="Não conseguimos carregar"
        description="A culpa provavelmente é nossa."
        actions={<Button>Tentar de novo</Button>}
      />,
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveClass(
      'text-danger',
    );
    expect(
      screen.getByText('A culpa provavelmente é nossa.'),
    ).toBeInTheDocument();
  });
});
