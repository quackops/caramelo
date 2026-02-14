import type { ButtonProps } from './types';

export const Button = ({ variant = 'primary', ...rest }: ButtonProps) => {
  return <button {...rest} />;
};

export type { ButtonProps } from './types';
