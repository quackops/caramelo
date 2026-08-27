import { cn } from '../../utils/cn';

export const LoadingSkeleton = ({
  className,
  ...rest
}: LoadingSkeletonProps) => {
  return (
    <output
      aria-label="Carregando"
      className={cn(
        'block rounded-lg bg-gray-3 motion-safe:bg-[linear-gradient(90deg,var(--color-gray-3),var(--color-gray-6),var(--color-gray-3))] motion-safe:bg-[length:200%_100%] motion-safe:animate-shimmer',
        className,
      )}
      {...rest}
    />
  );
};

export type LoadingSkeletonProps = {
  className?: string;
};
