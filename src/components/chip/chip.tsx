import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

// Height 34, radius 999 (chip). "selected" shares the brand color with
// the primary button on purpose (spec note: they must never sit in the
// same visual row). "disabled" is the dashed/unavailable state.
const chipVariants = cva(
  'inline-flex h-[34px] items-center gap-[7px] rounded-full px-3.5',
  {
    variants: {
      variant: {
        default: 'bg-gray-3 border border-gray-6',
        selected: 'bg-brand',
        disabled:
          'bg-transparent border border-dashed border-gray-6 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export const Chip = ({
  variant,
  count,
  children,
  disabled,
  className,
  ...rest
}: ChipProps) => {
  const textColor =
    variant === 'selected'
      ? 'on-brand-strong'
      : variant === 'disabled'
        ? 'neutral-3'
        : 'neutral-2';

  return (
    <button
      type="button"
      disabled={disabled ?? variant === 'disabled'}
      className={cn(chipVariants({ variant }), className)}
      {...rest}
    >
      <Text variant="small" weight="medium" color={textColor}>
        {children}
      </Text>
      {typeof count === 'number' && (
        <span className="inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-brand px-1">
          <Text
            variant="small"
            weight="semibold"
            color="on-brand-strong"
            className="text-[11px] leading-none"
          >
            {count}
          </Text>
        </span>
      )}
    </button>
  );
};

export type ChipProps = VariantProps<typeof chipVariants> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    children: ReactNode;
    count?: number;
  };
