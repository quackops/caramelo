import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export const Fab = ({
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
        'active:scale-95 transition-transform duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export type FabProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
