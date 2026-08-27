import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Slot, type SlotProps } from '../slot/slot';
import { Text } from '../text/text';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center h-13 rounded-control px-6 cursor-pointer whitespace-nowrap',
    'motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-150',
    'disabled:cursor-not-allowed disabled:active:scale-100',
    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
  ),
  {
    variants: {
      variant: {
        primary:
          'bg-brand hover:bg-brand-pressed active:bg-brand-pressed disabled:bg-gray-3 disabled:text-gray-8',
        secondary:
          'bg-transparent border-[1.5px] border-gray-7 hover:border-caramelo-8 text-neutral disabled:border-gray-5 disabled:text-gray-8',
        handoff: 'bg-whatsapp',
        destructive:
          'bg-transparent border-[1.5px] border-danger/50 text-danger hover:border-danger disabled:border-gray-5 disabled:text-gray-8',
        ghost: cn(
          'h-auto min-h-11 px-3 py-2 bg-transparent border-none',
          'text-link hover:text-neutral active:text-neutral disabled:text-neutral-3',
        ),
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export const defaultSlot = 'button';

export const Button = <S extends ElementType = typeof defaultSlot>({
  as,
  variant,
  type = 'button',
  children,
  className,
  ...rest
}: SlotProps<ButtonProps, S>) => {
  const ghost = variant === 'ghost';

  const textColor =
    variant === 'secondary'
      ? 'neutral'
      : variant === 'destructive'
        ? 'danger'
        : 'on-brand-strong';

  return (
    <Slot<ElementType>
      as={as ?? defaultSlot}
      className={cn(buttonVariants({ variant }), className)}
      type={type}
      {...rest}
    >
      <Text
        variant="medium"
        weight={ghost ? 'medium' : 'semibold'}
        color={ghost ? undefined : textColor}
        className={ghost ? 'text-inherit' : undefined}
      >
        {children}
      </Text>
    </Slot>
  );
};

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};
