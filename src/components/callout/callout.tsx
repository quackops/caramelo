import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

const calloutVariants = cva('rounded-control p-16', {
  variants: {
    tone: {
      neutral: 'bg-gray-3',
      info: 'bg-caramelo-3',
      success: 'bg-success/16',
      warning: 'border border-warning bg-transparent',
    },
  },
  defaultVariants: {
    tone: 'neutral',
  },
});

const iconToneClasses: Record<NonNullable<CalloutProps['tone']>, string> = {
  neutral: 'text-neutral-3',
  info: 'text-on-brand-inverse',
  success: 'text-success',
  warning: 'text-warning',
};

export const Callout = ({
  title,
  children,
  tone,
  icon,
  action,
  className,
}: CalloutProps) => {
  const t = tone ?? 'neutral';

  return (
    <div className={cn(calloutVariants({ tone: t }), className)}>
      <div className="flex gap-3">
        {icon && (
          <Icon
            name={icon}
            size={20}
            className={cn('mt-px flex-none', iconToneClasses[t])}
          />
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <Text
              as="p"
              variant="small"
              weight="medium"
              color="neutral"
              className="mb-1"
            >
              {title}
            </Text>
          )}
          <Text
            as="div"
            variant="small"
            color="neutral-2"
            className="font-roboto text-body font-light"
          >
            {children}
          </Text>
          {action && <div className="mt-2.5 flex">{action}</div>}
        </div>
      </div>
    </div>
  );
};

export type CalloutProps = VariantProps<typeof calloutVariants> & {
  title?: string;
  children: ReactNode;
  icon?: IconName;
  action?: ReactNode;
  className?: string;
};
