import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type Theme = 'caramelo' | 'pawee';

export const CarameloProvider = ({
  theme = 'caramelo',
  className,
  children,
  ...rest
}: CarameloProviderProps) => {
  return (
    <div
      key={theme}
      data-theme={theme}
      className={cn('bg-bg text-neutral', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export type CarameloProviderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'color'
> & {
  theme?: Theme;
  children: ReactNode;
};
