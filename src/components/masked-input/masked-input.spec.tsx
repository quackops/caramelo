import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { MaskedInput, type MaskedInputProps } from './masked-input';

const Controlled = ({
  onRaw,
  ...props
}: Omit<MaskedInputProps, 'value' | 'onChange'> & {
  onRaw?: (raw: string) => void;
  initial?: string;
}) => {
  const [value, setValue] = useState(props.initial ?? '');

  return (
    <MaskedInput
      {...props}
      value={value}
      onChange={(raw) => {
        setValue(raw);
        onRaw?.(raw);
      }}
    />
  );
};

const type = (field: HTMLElement, value: string, caret = value.length) => {
  fireEvent.change(field, { target: { value, selectionStart: caret } });
};

describe('MaskedInput', () => {
  it('formats a 9-digit Brazilian mobile number', () => {
    render(<Controlled id="tel" label="WhatsApp" mask="phone-br" />);
    const field = screen.getByLabelText('WhatsApp');

    type(field, '71988881234');
    expect(field).toHaveValue('(71) 98888-1234');
  });

  it('formats an 8-digit landline', () => {
    render(<Controlled id="tel" label="WhatsApp" mask="phone-br" />);
    const field = screen.getByLabelText('WhatsApp');

    type(field, '7132221234');
    expect(field).toHaveValue('(71) 3222-1234');
  });

  it('reports the raw digits alongside the formatted string', () => {
    const onChange = vi.fn();
    render(
      <MaskedInput
        id="tel"
        label="WhatsApp"
        mask="phone-br"
        value=""
        onChange={onChange}
      />,
    );

    type(screen.getByLabelText('WhatsApp'), '71988881234');
    expect(onChange).toHaveBeenCalledWith('71988881234', '(71) 98888-1234');
  });

  it('formats a CNPJ', () => {
    render(<Controlled id="cnpj" label="CNPJ" mask="cnpj" />);
    const field = screen.getByLabelText('CNPJ');

    type(field, '12345678000199');
    expect(field).toHaveValue('12.345.678/0001-99');
  });

  it('formats a CEP', () => {
    render(<Controlled id="cep" label="CEP" mask="cep" />);
    const field = screen.getByLabelText('CEP');

    type(field, '41810000');
    expect(field).toHaveValue('41810-000');
  });

  it('rejects a keystroke past the mask instead of truncating', () => {
    const onChange = vi.fn();
    render(
      <MaskedInput
        id="cep"
        label="CEP"
        mask="cep"
        value="41810000"
        onChange={onChange}
      />,
    );

    type(screen.getByLabelText('CEP'), '41810-0009');
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByLabelText('CEP')).toHaveValue('41810-000');
  });

  it('keeps the caret where the digit was typed in the middle', () => {
    render(
      <Controlled
        id="tel"
        label="WhatsApp"
        mask="phone-br"
        initial="7188881234"
      />,
    );
    const field = screen.getByLabelText('WhatsApp') as HTMLInputElement;

    type(field, '(71) 98888-1234', 6);
    expect(field).toHaveValue('(71) 98888-1234');
    expect(field.selectionStart).toBe(6);
  });

  it('deletes the preceding digit when a separator is removed', () => {
    render(<Controlled id="cep" label="CEP" mask="cep" initial="41810000" />);
    const field = screen.getByLabelText('CEP');

    type(field, '41810000', 5);
    expect(field).toHaveValue('41810-00');
  });

  it('accepts a pasted, already formatted number', () => {
    render(<Controlled id="tel" label="WhatsApp" mask="phone-br" />);
    const field = screen.getByLabelText('WhatsApp');

    type(field, '(71) 98888-1234');
    expect(field).toHaveValue('(71) 98888-1234');
  });
});
