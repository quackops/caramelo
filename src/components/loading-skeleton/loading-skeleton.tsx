import { cn } from '../../utils/cn';

export const LoadingSkeleton = ({
  variant = 'block',
  className,
  ...rest
}: LoadingSkeletonProps) => {
  if (variant === 'spinner') {
    return (
      <output
        aria-label="Carregando"
        className={cn(
          'inline-block size-7 rounded-full border-[3px] border-gray-5 border-t-brand motion-safe:animate-spin',
          className,
        )}
        {...rest}
      />
    );
  }

  return (
    <output
      aria-label="Carregando"
      className={cn(
        'block rounded-lg bg-gray-3 motion-safe:animate-pulse',
        className,
      )}
      {...rest}
    />
  );
};

export type LoadingSkeletonProps = {
  variant?: 'block' | 'spinner';
  className?: string;
};
