import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

// Floating action button: 56x56, full radius, caramelo-9 surface,
// gray-1 (on-brand-strong) icon, and the only other shadowed element
// besides the sheet: 0 8px 24px oklch(17.8% .0119 80.9 / .6).
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
        'shadow-[0_8px_24px_oklch(17.8%_0.0119_80.9_/_0.6)]',
        'active:scale-95 transition-transform duration-150',
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
