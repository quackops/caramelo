import { cn } from '../../utils/cn';

// "CARREGANDO" — skeleton block (shimmer, 1200ms loop) for content
// placeholders, plus the 28px spinner used for inline loading. Both
// respect prefers-reduced-motion: the shimmer keyframe and spin
// animation are declared with `motion-safe:` so a reduced-motion
// viewer just sees the static surface / a static ring.
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
