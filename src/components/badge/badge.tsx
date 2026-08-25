import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-lg', {
  variants: {
    variant: {
      verified: 'bg-success/16',
      tutor: 'bg-gray-4',
      urgent: 'bg-transparent border border-brand',
      new: 'bg-caramelo-4',
      adopted: 'bg-gray-3',
    },
    size: {
      default: 'px-[11px] py-[5px]',
      compact: 'px-[7px] py-[3px]',
    },
  },
  defaultVariants: {
    variant: 'tutor',
    size: 'default',
  },
});

const textColorByVariant: Record<NonNullable<BadgeProps['variant']>, string> = {
  verified: 'text-success',
  tutor: 'text-neutral-2',
  urgent: 'text-link',
  new: 'text-caramelo-12',
  adopted: 'text-neutral-3',
};

const textSizeBySize: Record<NonNullable<BadgeProps['size']>, string> = {
  default: 'text-[11px]',
  compact: 'text-[9px]',
};

const labelByVariant: Record<NonNullable<BadgeProps['variant']>, string> = {
  verified: 'ONG VERIFICADA',
  tutor: 'TUTOR',
  urgent: 'URGENTE',
  new: 'NOVO',
  adopted: 'ADOTADO',
};

const iconByVariant: Record<
  NonNullable<BadgeProps['variant']>,
  string | null
> = {
  verified: '✓',
  tutor: null,
  urgent: '!',
  new: null,
  adopted: '✓',
};

export const Badge = ({
  variant,
  size,
  label,
  className,
  ...rest
}: BadgeProps) => {
  const v = variant ?? 'tutor';
  const s = size ?? 'default';
  const icon = iconByVariant[v];

  return (
    <span
      className={cn(badgeVariants({ variant: v, size: s }), className)}
      {...rest}
    >
      <Text
        as="span"
        variant="small"
        weight="semibold"
        className={cn(textSizeBySize[s], textColorByVariant[v])}
      >
        {icon ? `${icon} ` : ''}
        {label ?? labelByVariant[v]}
      </Text>
    </span>
  );
};

export type BadgeProps = VariantProps<typeof badgeVariants> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    label?: string;
  };
