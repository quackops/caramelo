import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

const badgeVariants = cva('inline-flex items-center gap-1 rounded-lg', {
  variants: {
    voice: {
      success: 'bg-success/16 text-success',
      info: 'bg-caramelo-4 text-caramelo-12',
      warning: 'bg-transparent border border-warning text-warning',
      neutral: 'bg-gray-3 text-neutral-3',
    },
    size: {
      default: 'px-[11px] py-[5px]',
      compact: 'px-[7px] py-[3px]',
    },
  },
  defaultVariants: {
    voice: 'neutral',
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

export const badgePresets = {
  verified: { voice: 'success', icon: 'check', label: 'ONG VERIFICADA' },
  tutor: { voice: 'neutral', label: 'TUTOR' },
  urgent: { voice: 'warning', icon: 'alert-circle', label: 'URGENTE' },
  new: { voice: 'info', label: 'NOVO' },
  adopted: { voice: 'neutral', icon: 'check', label: 'ADOTADO' },
  active: { voice: 'success', icon: 'check', label: 'ATIVO' },
  paused: { voice: 'neutral', icon: 'pause', label: 'PAUSADO' },
  review: { voice: 'info', icon: 'clock', label: 'EM ANÁLISE' },
  accepted: { voice: 'success', icon: 'check', label: 'ACEITA' },
  interview: { voice: 'info', icon: 'clock', label: 'ENTREVISTA' },
  approved: { voice: 'success', icon: 'check', label: 'APROVADA' },
  rejected: { voice: 'neutral', icon: 'x', label: 'RECUSADA' },
  withdrawn: { voice: 'neutral', icon: 'x', label: 'DESISTIU' },
  expired: { voice: 'neutral', icon: 'clock', label: 'EXPIRADA' },
  completed: { voice: 'neutral', icon: 'check-circle', label: 'CONCLUÍDA' },
} satisfies Record<string, Omit<BadgeProps, 'size' | 'className'>>;

export const Badge = ({
  voice,
  size,
  icon,
  label,
  className,
  ...rest
}: BadgeProps) => {
  const s = size ?? 'default';

  return (
    <span
      className={cn(
        badgeVariants({ voice: voice ?? 'neutral', size: s }),
        className,
      )}
      {...rest}
    >
      {icon && <Icon name={icon} size={iconSizeBySize[s]} />}
      <Text
        as="span"
        variant="small"
        weight="semibold"
        className={cn(textSizeBySize[s], 'text-inherit')}
      >
        {label}
      </Text>
    </span>
  );
};

export type BadgeVoice = NonNullable<
  VariantProps<typeof badgeVariants>['voice']
>;

export type BadgePreset = keyof typeof badgePresets;

export type BadgeProps = VariantProps<typeof badgeVariants> &
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    icon?: IconName;
    label: string;
  };
