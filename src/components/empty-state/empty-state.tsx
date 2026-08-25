import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../button/button';
import { Text } from '../text/text';

const containerVariants = cva(
  'flex flex-col items-center rounded-card p-[22px] text-center',
  {
    variants: {
      variant: {
        empty: 'bg-gray-2 border border-gray-5 py-7',
        error: 'bg-gray-2 border border-danger/30 p-[18px]',
      },
    },
    defaultVariants: {
      variant: 'empty',
    },
  },
);

export const EmptyState = ({
  variant,
  illustration,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) => {
  const v = variant ?? 'empty';

  return (
    <div className={cn(containerVariants({ variant: v }), className)}>
      {v === 'empty' && (
        <div className="relative mb-16 flex size-[110px] items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-caramelo-7" />
          <div className="absolute inset-3.5 rounded-full border border-dashed border-caramelo-6" />
          <div className="flex size-[60px] items-center justify-center rounded-2xl bg-caramelo-4">
            {illustration}
          </div>
        </div>
      )}
      <Text
        variant={v === 'empty' ? 'large' : 'medium'}
        weight="semibold"
        color={v === 'error' ? 'danger' : 'neutral'}
        className={cn('mb-1.5', v === 'empty' ? 'text-[17px]' : 'text-[15px]')}
      >
        {title}
      </Text>
      <Text
        as="p"
        variant="small"
        color="neutral-2"
        className="mb-16 font-roboto font-light"
      >
        {description}
      </Text>
      {actionLabel && (
        <Button
          variant={v === 'error' ? 'secondary' : 'primary'}
          onClick={onAction}
          className="h-11"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export type EmptyStateProps = VariantProps<typeof containerVariants> & {
  illustration?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};
