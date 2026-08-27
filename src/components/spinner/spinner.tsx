import { cn } from '../../utils/cn';

export const Spinner = ({ className, ...rest }: SpinnerProps) => {
  return (
    <output
      aria-label="Carregando"
      className={cn(
        'inline-block size-7 rounded-full border-[3px] border-gray-5 border-t-brand motion-safe:animate-spin-slow',
        className,
      )}
      {...rest}
    />
  );
};

export type SpinnerProps = {
  className?: string;
};
