import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from '../button/button';
import { SummaryRow } from './summary-row';

describe('SummaryRow', () => {
  it('renders the label and value as a description pair', () => {
    const { container } = render(
      <SummaryRow.Group>
        <SummaryRow label="CNPJ" value="28.451.***/0001-09" />
      </SummaryRow.Group>,
    );

    expect(container.querySelector('dl')).toBeInTheDocument();
    expect(container.querySelector('dt')).toHaveTextContent('CNPJ');
    expect(container.querySelector('dd')).toHaveTextContent(
      '28.451.***/0001-09',
    );
  });

  it('renders the zero-fee promise as a real row', () => {
    render(
      <SummaryRow.Group>
        <SummaryRow label="Taxa Pawee" value="R$ 0,00" />
      </SummaryRow.Group>,
    );

    expect(screen.getByText('Taxa Pawee')).toBeInTheDocument();
    expect(screen.getByText('R$ 0,00')).toBeInTheDocument();
  });

  it('gives the emphasised total a heavier rule and weight', () => {
    const { container } = render(
      <SummaryRow.Group>
        <SummaryRow label="Total" value="R$ 25,00" emphasis />
      </SummaryRow.Group>,
    );

    expect(container.querySelector('dl > div')).toHaveClass(
      'border-t',
      'border-border',
    );
  });

  it('renders an action after the value', () => {
    render(
      <SummaryRow.Group>
        <SummaryRow
          label="Fotos"
          value="2 fotos"
          action={<Button variant="ghost">Editar</Button>}
        />
      </SummaryRow.Group>,
    );

    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
  });

  it('wraps a long value instead of truncating it', () => {
    const { container } = render(
      <SummaryRow.Group>
        <SummaryRow label="Endereço" value="Pituba, Salvador — BA" />
      </SummaryRow.Group>,
    );

    const row = container.querySelector('dl > div');
    expect(row).toHaveClass('flex-wrap');
    expect(row?.className).not.toMatch(/truncate|text-ellipsis/);
  });
});
