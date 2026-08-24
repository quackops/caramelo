import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

// 44x44 tap target per spec ("alvo mínimo de toque"). Two states shown
// in the doc: neutral (gray-3 surface) and active (caramelo-3 surface
// with caramelo-7 border) — active uses on-brand-inverse text since the
// surface is a dark brand tint (caramelo-3/4 range).
const iconButtonVariants = cva(
  cn(
    'inline-flex items-center justify-center size-11 rounded-[14px] border cursor-pointer',
    'active:scale-95 transition-transform duration-150',
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
      {children}
    </button>
  );
};

export type IconButtonProps = VariantProps<typeof iconButtonVariants> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    children: ReactNode;
  };
