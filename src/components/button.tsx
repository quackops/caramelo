import type { ButtonProps } from './types';

export const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

export type { ButtonProps } from './types';
