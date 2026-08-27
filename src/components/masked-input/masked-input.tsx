import { type ChangeEvent, useLayoutEffect, useRef, useState } from 'react';
import { Input, type InputProps } from '../input/input';

const digitsOf = (value: string) => value.replace(/\D/g, '');

const formatPhoneBr = (digits: string) => {
  if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : '';

  const area = digits.slice(0, 2);
  const local = digits.slice(2);
  const split = digits.length > 10 ? 5 : 4;
  const head = local.slice(0, split);
  const tail = local.slice(split);

  return tail ? `(${area}) ${head}-${tail}` : `(${area}) ${head}`;
};

const formatCnpj = (digits: string) => {
  let formatted = digits.slice(0, 2);
  if (digits.length > 2) formatted += `.${digits.slice(2, 5)}`;
  if (digits.length > 5) formatted += `.${digits.slice(5, 8)}`;
  if (digits.length > 8) formatted += `/${digits.slice(8, 12)}`;
  if (digits.length > 12) formatted += `-${digits.slice(12, 14)}`;
  return formatted;
};

const formatCep = (digits: string) =>
  digits.length <= 5 ? digits : `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;

const masks = {
  'phone-br': { maxDigits: 11, format: formatPhoneBr },
  cnpj: { maxDigits: 14, format: formatCnpj },
  cep: { maxDigits: 8, format: formatCep },
} satisfies Record<
  string,
  { maxDigits: number; format: (digits: string) => string }
>;

const caretAfterDigits = (formatted: string, digits: number) => {
  if (digits <= 0) return 0;

  let seen = 0;
  for (let index = 0; index < formatted.length; index += 1) {
    if (/\d/.test(formatted[index])) {
      seen += 1;
      if (seen === digits) return index + 1;
    }
  }

  return formatted.length;
};

export const MaskedInput = ({
  mask,
  value,
  onChange,
  inputMode = 'numeric',
  ...rest
}: MaskedInputProps) => {
  const { maxDigits, format } = masks[mask];
  const fieldRef = useRef<HTMLInputElement>(null);
  const [caret, setCaret] = useState<{ position: number } | null>(null);

  const digits = digitsOf(value).slice(0, maxDigits);
  const formatted = format(digits);

  useLayoutEffect(() => {
    if (!caret || !fieldRef.current) return;
    fieldRef.current.setSelectionRange(caret.position, caret.position);
  }, [caret]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const typed = event.target.value;
    const caretPosition = event.target.selectionStart ?? typed.length;
    const deleting = typed.length < formatted.length;

    let nextDigits = digitsOf(typed);
    let digitsBeforeCaret = digitsOf(typed.slice(0, caretPosition)).length;

    if (deleting && nextDigits.length === digits.length) {
      nextDigits =
        nextDigits.slice(0, Math.max(digitsBeforeCaret - 1, 0)) +
        nextDigits.slice(digitsBeforeCaret);
      digitsBeforeCaret = Math.max(digitsBeforeCaret - 1, 0);
    }

    if (nextDigits.length > maxDigits) {
      setCaret({ position: caretAfterDigits(formatted, digits.length) });
      return;
    }

    const nextFormatted = format(nextDigits);
    setCaret({ position: caretAfterDigits(nextFormatted, digitsBeforeCaret) });
    onChange(nextDigits, nextFormatted);
  };

  return (
    <Input
      {...rest}
      ref={fieldRef}
      inputMode={inputMode}
      value={formatted}
      onChange={handleChange}
    />
  );
};

export type MaskName = keyof typeof masks;

export type MaskedInputProps = Omit<InputProps, 'value' | 'onChange'> & {
  mask: MaskName;
  value: string;
  onChange: (raw: string, formatted: string) => void;
};
