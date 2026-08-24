import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Slot, type SlotProps } from '../slot/slot';
import { Text } from '../text/text';

// Button height 52 / radius 14 per spec. Variants map 1:1 to the
// "BOTÕES" swatches in the design doc: primário, pressionado (via
// active/hover states, not a separate prop), desabilitado (via
// disabled attribute), secondário, handoff (whatsapp) and destrutivo.
const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center h-13 rounded-[14px] px-6 cursor-pointer',
    'active:scale-95 transition-transform duration-150',
    'disabled:cursor-not-allowed disabled:active:scale-100',
  ),
  {
    variants: {
      variant: {
        // gray-1 on caramelo-9 (on-brand-strong), hover/pressed -> caramelo-10
        primary:
          'bg-brand hover:bg-brand-pressed active:bg-brand-pressed disabled:bg-gray-4 disabled:text-gray-8',
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
      className={buttonVariants({ variant })}
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
