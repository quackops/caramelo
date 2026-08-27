import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';

const iconButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center size-11 rounded-control border cursor-pointer',
    'motion-safe:active:scale-95 motion-safe:transition-transform motion-safe:duration-150',
    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
  ),
  {
    variants: {
      active: {
        false: 'bg-gray-3 border-gray-6 text-neutral',
        true: 'bg-caramelo-4 border-caramelo-7 text-on-brand-inverse',
      },
    },
    defaultVariants: {
      active: false,
    },
  },
);

export const IconButton = ({
  active,
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={cn(iconButtonVariants({ active }), className)}
      {...rest}
    >
      {icon ? <Icon name={icon} size={20} /> : children}
    </button>
  );
};

export type IconButtonProps = VariantProps<typeof iconButtonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    icon?: IconName;
    children?: ReactNode;
  };
