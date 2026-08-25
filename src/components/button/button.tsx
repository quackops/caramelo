import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Slot, type SlotProps } from '../slot/slot';
import { Text } from '../text/text';

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center h-13 rounded-control px-6 cursor-pointer',
    'motion-safe:active:scale-95 motion-safe:transition-transform motion-safe:duration-150',
    'disabled:cursor-not-allowed disabled:active:scale-100',
    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
  ),
  {
    variants: {
      variant: {
        primary:
          'bg-brand hover:bg-caramelo-11 active:bg-brand-pressed disabled:bg-gray-3 disabled:text-gray-8',
        secondary:
          'bg-transparent border-[1.5px] border-gray-7 hover:border-caramelo-8 text-neutral disabled:border-gray-5 disabled:text-gray-8',
        handoff: 'bg-whatsapp',
        destructive:
          'bg-transparent border-[1.5px] border-danger/50 text-danger hover:border-danger disabled:border-gray-5 disabled:text-gray-8',
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
      <Text variant="medium" weight="semibold" color={textColor}>
        {children}
      </Text>
    </Slot>
  );
};

export type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
};
