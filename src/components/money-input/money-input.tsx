import type { ChangeEvent, FocusEvent } from 'react';
import { Input, type InputProps } from '../input/input';

const maxSafeDigits = 12;

const formatCents = (cents: number) =>
  (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const MoneyInput = ({
  value,
  onChange,
  currency = 'BRL',
  min,
  max,
  inputMode = 'numeric',
  onBlur,
  ...rest
}: MoneyInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const digits = event.target.value
      .replace(/\D/g, '')
      .slice(0, maxSafeDigits);

    onChange(digits ? Number(digits) : 0);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const clamped = Math.min(
      Math.max(value, min ?? Number.NEGATIVE_INFINITY),
      max ?? Number.POSITIVE_INFINITY,
    );

    if (clamped !== value) onChange(clamped);
    onBlur?.(event);
  };

  return (
    <Input
      {...rest}
      inputMode={inputMode}
      leading={currency === 'BRL' ? 'R$' : currency}
      value={formatCents(value)}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export type MoneyInputProps = Omit<
  InputProps,
  'value' | 'onChange' | 'leading'
> & {
  value: number;
  onChange: (cents: number) => void;
  currency?: 'BRL';
  min?: number;
  max?: number;
};
