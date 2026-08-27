import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MoneyInput, type MoneyInputProps } from './money-input';

const Controlled = ({
  initial = 0,
  ...props
}: Omit<MoneyInputProps, 'value' | 'onChange'> & { initial?: number }) => {
  const [value, setValue] = useState(initial);

  return <MoneyInput {...props} value={value} onChange={setValue} />;
};

describe('MoneyInput', () => {
  it('renders the amount in pt-BR with two decimals', () => {
    render(<Controlled id="valor" label="Outro valor" initial={2500} />);
    expect(screen.getByLabelText('Outro valor')).toHaveValue('25,00');
  });

  it('groups thousands with a dot', () => {
    render(<Controlled id="valor" label="Outro valor" initial={123456789} />);
    expect(screen.getByLabelText('Outro valor')).toHaveValue('1.234.567,89');
  });

  it('renders a decorative R$ affix', () => {
    const { container } = render(
      <Controlled id="valor" label="Outro valor" initial={0} />,
    );
    expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      'R$',
    );
  });

  it('types right to left like a till', () => {
    render(<Controlled id="valor" label="Outro valor" />);
    const field = screen.getByLabelText('Outro valor');

    fireEvent.change(field, { target: { value: '0,002' } });
    expect(field).toHaveValue('0,02');

    fireEvent.change(field, { target: { value: '0,025' } });
    expect(field).toHaveValue('0,25');

    fireEvent.change(field, { target: { value: '0,2500' } });
    expect(field).toHaveValue('25,00');
  });

  it('reports integer cents, never a float', () => {
    const onChange = vi.fn();
    render(
      <MoneyInput
        id="valor"
        label="Outro valor"
        value={0}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByLabelText('Outro valor'), {
      target: { value: '0,0012345' },
    });
    expect(onChange).toHaveBeenCalledWith(12345);
    expect(Number.isInteger(onChange.mock.calls[0][0])).toBe(true);
  });

  it('accepts a comma typed left to right', () => {
    render(<Controlled id="valor" label="Outro valor" />);
    const field = screen.getByLabelText('Outro valor');

    fireEvent.change(field, { target: { value: '25,00' } });
    expect(field).toHaveValue('25,00');
  });

  it('clamps to the minimum on blur, not on keystroke', () => {
    const onChange = vi.fn();
    render(
      <MoneyInput
        id="valor"
        label="Outro valor"
        value={100}
        min={500}
        onChange={onChange}
      />,
    );

    const field = screen.getByLabelText('Outro valor');
    fireEvent.change(field, { target: { value: '0,002' } });
    expect(onChange).toHaveBeenLastCalledWith(2);

    fireEvent.blur(field);
    expect(onChange).toHaveBeenLastCalledWith(500);
  });

  it('clamps to the maximum on blur', () => {
    const onChange = vi.fn();
    render(
      <MoneyInput
        id="valor"
        label="Outro valor"
        value={900000}
        max={500000}
        onChange={onChange}
      />,
    );

    fireEvent.blur(screen.getByLabelText('Outro valor'));
    expect(onChange).toHaveBeenCalledWith(500000);
  });
});
