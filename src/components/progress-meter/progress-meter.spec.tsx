import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ProgressMeter } from './progress-meter';

describe('ProgressMeter', () => {
  it('exposes a proportion, not progress toward completion', () => {
    render(
      <ProgressMeter label="Ração e alimentação" value={54} valueLabel="54%" />,
    );

    const meter = screen.getByRole('meter', { name: 'Ração e alimentação' });
    expect(meter).toHaveAttribute('aria-valuenow', '54');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
    expect(meter).toHaveAttribute('aria-valuetext', '54%');
  });

  it('keeps the percentage visible as the information', () => {
    render(
      <ProgressMeter label="Ração e alimentação" value={54} valueLabel="54%" />,
    );
    expect(screen.getByText('54%')).toBeInTheDocument();
  });

  it('fills the bar to the proportion', () => {
    const { container } = render(
      <ProgressMeter label="Castrações" value={15} valueLabel="15%" />,
    );

    expect(container.querySelector('[role="meter"] > span')).toHaveStyle({
      width: '15%',
    });
  });

  it('clamps a value beyond the maximum', () => {
    const { container } = render(
      <ProgressMeter label="Fora da escala" value={140} valueLabel="140%" />,
    );

    expect(container.querySelector('[role="meter"] > span')).toHaveStyle({
      width: '100%',
    });
  });

  it('takes a non-percentage scale', () => {
    render(
      <ProgressMeter
        label="Meta do mês"
        value={750}
        max={2000}
        valueLabel="R$ 750 de R$ 2.000"
      />,
    );

    expect(screen.getByRole('meter')).toHaveAttribute('aria-valuemax', '2000');
  });

  it('drops to the neutral tone for a secondary row', () => {
    const { container } = render(
      <ProgressMeter
        label="Castrações"
        value={15}
        valueLabel="15%"
        tone="neutral"
      />,
    );

    expect(container.querySelector('[role="meter"] > span')).toHaveClass(
      'bg-gray-8',
    );
  });

  it('does not correct a group whose values do not sum to 100', () => {
    render(
      <ProgressMeter.Group>
        <ProgressMeter label="Ração" value={54} valueLabel="54%" />
        <ProgressMeter label="Veterinário" value={31} valueLabel="31%" />
      </ProgressMeter.Group>,
    );

    expect(screen.getByRole('meter', { name: 'Ração' })).toHaveAttribute(
      'aria-valuenow',
      '54',
    );
    expect(screen.getByRole('meter', { name: 'Veterinário' })).toHaveAttribute(
      'aria-valuenow',
      '31',
    );
  });
});
