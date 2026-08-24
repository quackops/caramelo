import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

// Doc only shows success/error; a neutral/info toast isn't in the
// spec, so we don't invent one.
const toastVariants = cva('rounded-[14px] border px-[15px] py-[13px]', {
  variants: {
    variant: {
      success: 'border-success/35 bg-success/12',
      error: 'border-danger/35 bg-danger/12',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

const textColor = {
  success: 'success',
  error: 'danger',
} as const;

export const Toast = ({
  variant,
  title,
  description,
  className,
  ...rest
}: ToastProps) => {
  const v = variant ?? 'success';

  return (
    <output className={cn(toastVariants({ variant: v }), className)} {...rest}>
      <Text variant="medium" weight="semibold" color={textColor[v]}>
        {title}
      </Text>
      <Text as="p" variant="small" color="neutral-2">
        {description}
      </Text>
    </output>
  );
};

export type ToastProps = VariantProps<typeof toastVariants> &
  Omit<HTMLAttributes<HTMLOutputElement>, 'title'> & {
    title: string;
    description: string;
  };
