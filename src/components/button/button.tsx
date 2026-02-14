import { cva } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  cn(
    'rounded-md cursor-pointer',
    'font-semibold font-poppins',
    'active:scale-95 transition-transform duration-150 animate-fade-in-scale',
  ),
  {
    variants: {
      variant: {
        brand: 'bg-brand text-zinc-800',
        'on-brand': 'bg-gray-200 text-gray-800',
      },
      size: {
        medium: 'px-4 py-2',
        large: 'px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'brand',
      size: 'medium',
    },
  },
);

export const Button = ({
  variant,
  size,
  type = 'button',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button className={buttonVariants({ variant, size })} type={type} {...rest}>
      {children}
    </button>
  );
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'brand' | 'on-brand';
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'medium' | 'large';
}
