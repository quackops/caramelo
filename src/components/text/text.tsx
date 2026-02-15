import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType } from 'react';
import { cn } from '../../utils/cn';
import { Slot, type SlotProps } from '../slot/slot';

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

export const defaultSlot = 'span';

export function Text<Slot extends ElementType = typeof defaultSlot>({
  as,
  children,
  variant,
  color,
  weight,
  ...rest
}: SlotProps<TextProps, Slot>) {
  return (
    <Slot<ElementType>
      as={as ?? defaultSlot}
      className={cn(textVariants({ variant, color, weight }))}
      {...rest}
    >
      {children}
    </Slot>
  );
}

export type TextProps = VariantProps<typeof textVariants> & {};
