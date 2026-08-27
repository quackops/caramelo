import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { IconButton } from '../icon-button/icon-button';
import { Text } from '../text/text';

const bannerVariants = cva(
  cn(
    'sticky top-0 z-30 flex w-full items-center gap-2.5 px-16 py-12',
    'motion-safe:animate-slide-down-banner',
  ),
  {
    variants: {
      tone: {
        neutral: 'bg-gray-3 text-neutral-2',
        warning: 'border-b border-warning bg-transparent text-warning',
        danger: 'bg-danger/12 text-danger',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export const StatusBanner = ({
  message,
  tone,
  icon,
  action,
  onDismiss,
  className,
}: StatusBannerProps) => {
  return (
    <output
      aria-live="polite"
      className={cn(bannerVariants({ tone }), className)}
    >
      {icon && <Icon name={icon} size={18} className="flex-none" />}
      <Text
        as="span"
        variant="small"
        weight="medium"
        className="min-w-0 flex-1 text-micro text-inherit"
      >
        {message}
      </Text>
      {action}
      {onDismiss && (
        <IconButton
          icon="x"
          aria-label="Dispensar aviso"
          onClick={onDismiss}
          className="size-8 flex-none border-none bg-transparent text-inherit"
        />
      )}
    </output>
  );
};

export type StatusBannerProps = VariantProps<typeof bannerVariants> & {
  message: string;
  icon?: IconName;
  action?: ReactNode;
  onDismiss?: () => void;
  className?: string;
};
