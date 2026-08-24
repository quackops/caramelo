import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

// Status pill / "selo". Accessibility rule from the spec: no status
// relies on color alone — verified, urgent and adopted always carry an
// icon glyph *and* the word, never just a color.
const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-lg px-[11px] py-[5px]',
  {
    variants: {
      variant: {
        verified: 'bg-success/16',
        tutor: 'bg-gray-4',
        urgent: 'bg-transparent border border-brand',
        new: 'bg-caramelo-4',
        adopted: 'bg-gray-3',
      },
    },
    defaultVariants: {
      variant: 'tutor',
    },
  },
);

const textColorByVariant: Record<NonNullable<BadgeProps['variant']>, string> = {
  verified: 'text-success',
  tutor: 'text-neutral-2',
  urgent: 'text-link',
  new: 'text-caramelo-12',
  adopted: 'text-neutral-3',
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

export const Badge = ({ variant, label, className, ...rest }: BadgeProps) => {
  const v = variant ?? 'tutor';
  const icon = iconByVariant[v];

  return (
    <span className={cn(badgeVariants({ variant: v }), className)} {...rest}>
      <Text
        as="span"
        variant="small"
        weight="semibold"
        className={cn('text-[11px]', textColorByVariant[v])}
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
