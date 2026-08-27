import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-lg', {
  variants: {
    variant: {
      verified: 'bg-success/16 text-success',
      tutor: 'bg-gray-4 text-neutral-2',
      urgent: 'bg-transparent border border-warning text-warning',
      new: 'bg-caramelo-4 text-caramelo-12',
      adopted: 'bg-gray-3 text-neutral-3',
      active: 'bg-success/16 text-success',
      paused: 'bg-gray-3 text-neutral-3',
      review: 'bg-caramelo-4 text-caramelo-12',
      accepted: 'bg-success/16 text-success',
      interview: 'bg-caramelo-4 text-caramelo-12',
      approved: 'bg-success/16 text-success',
      rejected: 'bg-gray-3 text-neutral-3',
      withdrawn: 'bg-gray-3 text-neutral-3',
      expired: 'bg-gray-3 text-neutral-3',
      completed: 'bg-gray-3 text-neutral-3',
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

const textSizeBySize: Record<NonNullable<BadgeProps['size']>, string> = {
  default: 'text-[11px]',
  compact: 'text-[9px]',
};

const iconSizeBySize: Record<NonNullable<BadgeProps['size']>, number> = {
  default: 12,
  compact: 10,
};

const labelByVariant: Record<NonNullable<BadgeProps['variant']>, string> = {
  verified: 'ONG VERIFICADA',
  tutor: 'TUTOR',
  urgent: 'URGENTE',
  new: 'NOVO',
  adopted: 'ADOTADO',
  active: 'ATIVO',
  paused: 'PAUSADO',
  review: 'EM ANÁLISE',
  accepted: 'ACEITA',
  interview: 'ENTREVISTA',
  approved: 'APROVADA',
  rejected: 'RECUSADA',
  withdrawn: 'DESISTIU',
  expired: 'EXPIRADA',
  completed: 'CONCLUÍDA',
};

const iconByVariant: Record<
  NonNullable<BadgeProps['variant']>,
  IconName | null
> = {
  verified: 'check',
  tutor: null,
  urgent: 'alert-circle',
  new: null,
  adopted: 'check',
  active: 'check',
  paused: 'pause',
  review: 'clock',
  accepted: 'check',
  interview: 'clock',
  approved: 'check',
  rejected: 'x',
  withdrawn: 'x',
  expired: 'clock',
  completed: 'check-circle',
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
      {icon && <Icon name={icon} size={iconSizeBySize[s]} />}
      <Text
        as="span"
        variant="small"
        weight="semibold"
        className={cn(textSizeBySize[s], 'text-inherit')}
      >
        {label ?? labelByVariant[v]}
      </Text>
    </span>
  );
};

export type BadgeProps = VariantProps<typeof badgeVariants> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    label?: string;
  };
