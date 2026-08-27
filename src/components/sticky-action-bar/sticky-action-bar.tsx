import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  type ProtectionSurface,
  protectionGradient,
} from '../../utils/protection-gradient';

export const StickyActionBar = ({
  surface = 'bg',
  children,
  className,
  ...rest
}: StickyActionBarProps) => {
  return (
    <div
      className={cn(
        'sticky bottom-0 flex items-center gap-12 px-16 pt-3.5 pb-24',
        '[&>button]:flex-1 [&>button.size-11]:flex-none',
        protectionGradient(surface),
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export type StickyActionBarProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  surface?: ProtectionSurface;
};
