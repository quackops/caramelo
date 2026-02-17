import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Slot, type SlotProps } from '../slot/slot';
import { Text } from '../text/text';

const buttonVariants = cva(
  cn(
    'rounded-md cursor-pointer',
    'active:scale-95 transition-transform duration-150 animate-fade-in-scale',
  ),
  {
    variants: {
      variant: {
        brand: 'bg-brand',
        'on-brand': 'bg-surface-on-brand',
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

export const defaultSlot = 'button';

export const Button = <S extends ElementType = typeof defaultSlot>({
  as,
  variant,
  size,
  type = 'button',
  children,
  ...rest
}: SlotProps<ButtonProps, S>) => {
  return (
    <Slot<ElementType>
      as={as ?? defaultSlot}
      className={buttonVariants({ variant, size })}
      type={type}
      {...rest}
    >
      <Text variant="medium" weight="semibold" color="neutral-inverse">
        {children}
      </Text>
    </Slot>
  );
};

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};
