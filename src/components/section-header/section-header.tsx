import { cva, type VariantProps } from 'class-variance-authority';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const titleVariants = cva('', {
  variants: {
    variant: {
      label: 'text-label font-medium text-neutral-2',
      eyebrow:
        'text-micro font-semibold uppercase tracking-[0.08em] text-neutral-3',
    },
  },
  defaultVariants: {
    variant: 'label',
  },
});

export const SectionHeader = ({
  title,
  titleAs = 'h2',
  action,
  variant,
  count,
  className,
  ...rest
}: SectionHeaderProps) => {
  return (
    <div
      className={cn('mb-2 flex items-center justify-between gap-3', className)}
      {...rest}
    >
      <Text as={titleAs} className={titleVariants({ variant })}>
        {title}
        {count !== undefined && (
          <span className="ml-1.5 text-neutral-3 tabular-nums">{count}</span>
        )}
      </Text>
      {action}
    </div>
  );
};

export type SectionHeaderProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof titleVariants> & {
    title: string;
    titleAs?: Extract<ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
    action?: ReactNode;
    count?: number;
  };
