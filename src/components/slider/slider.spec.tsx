import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Slider } from './slider';

describe('Slider', () => {
  it('renders a labelled range input', () => {
    render(
      <Slider
        label="Distância máxima"
        value={15}
        min={1}
        max={100}
        onChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('slider', { name: 'Distância máxima' }),
    ).toHaveValue('15');
  });

  it('reports the formatted value as the accessible value', () => {
    render(
      <Slider
        label="Distância máxima"
        value={15}
        min={1}
        max={100}
        onChange={vi.fn()}
        formatValue={(km) => `${km} quilômetros`}
      />,
    );

    expect(screen.getByRole('slider')).toHaveAttribute(
      'aria-valuetext',
      '15 quilômetros',
    );
    expect(screen.getByText('15 quilômetros')).toBeInTheDocument();
  });

  it('reports the numeric value on change', () => {
    const onChange = vi.fn();
    render(
      <Slider
        label="Distância máxima"
        value={15}
        min={1}
        max={100}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByRole('slider'), { target: { value: '50' } });
    expect(onChange).toHaveBeenCalledWith(50);
  });

  it('is programmatically settable from outside', () => {
    const { rerender } = render(
      <Slider value={15} min={1} max={100} onChange={vi.fn()} />,
    );

    rerender(<Slider value={50} min={1} max={100} onChange={vi.fn()} />);
    expect(screen.getByRole('slider')).toHaveValue('50');
  });
});
