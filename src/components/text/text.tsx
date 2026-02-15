import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

const textVariants = cva(cn('font-poppins'), {
  variants: {
    variant: {
      small: 'text-sm',
      medium: 'text-base',
      large: 'text-lg',
      heading: 'text-2xl font-bold',
    },
    color: {
      brand: 'text-brand',
      neutral: 'text-neutral',
      'neutral-inverse': 'text-neutral-inverse',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'medium',
    color: 'neutral',
    weight: 'regular',
  },
});

export const Text = ({
  children,
  variant,
  color,
  weight,
  ...rest
}: TextProps) => {
  return (
    <span className={cn(textVariants({ variant, color, weight }))} {...rest}>
      {children}
    </span>
  );
};

export type TextProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof textVariants> & {};
