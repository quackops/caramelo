import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const surfaceVariants = cva(
  cn(
    'relative flex w-full max-w-[520px] flex-col rounded-t-sheet border-t border-border bg-surface shadow-raised',
    'motion-safe:animate-slide-up-sheet',
  ),
  {
    variants: {
      size: {
        short: 'max-h-[40dvh]',
        medium: 'max-h-[60dvh]',
        tall: 'max-h-[90dvh]',
        full: 'h-dvh max-h-none rounded-none',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const BottomSheet = ({
  open,
  size,
  title,
  action,
  footer,
  onClose,
  children,
  className,
  ...rest
}: BottomSheetProps) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-scrim motion-safe:animate-fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(surfaceVariants({ size }), className)}
        {...rest}
      >
        <span className="mx-auto mt-2.5 h-[5px] w-[38px] shrink-0 rounded-[3px] bg-gray-7" />
        {(title || action) && (
          <div className="flex items-center justify-between gap-3 px-5 pt-4">
            {title && (
              <Text as="h2" weight="semibold" className="text-[22px]">
                {title}
              </Text>
            )}
            {action && (
              <div className="shrink-0 text-[14px] text-link">{action}</div>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-5 pt-4 pb-6">{children}</div>
        {footer && (
          <div className="px-5 pt-3.5 pb-6 [background:linear-gradient(to_top,var(--color-surface)_65%,transparent)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export type BottomSheetProps = VariantProps<typeof surfaceVariants> &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    open: boolean;
    title?: string;
    action?: ReactNode;
    footer?: ReactNode;
    onClose: () => void;
    children?: ReactNode;
  };
