import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';

export const Fab = ({
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: FabProps) => {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center size-14 rounded-full bg-brand text-on-brand-strong cursor-pointer',
        'shadow-[var(--shadow-raised)]',
        'motion-safe:active:scale-95 motion-safe:transition-transform motion-safe:duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        className,
      )}
      {...rest}
    >
      {icon ? <Icon name={icon} size={24} /> : children}
    </button>
  );
};

export type FabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName;
  children?: ReactNode;
};
