import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const MapCluster = ({
  count,
  label,
  type = 'button',
  className,
  ...rest
}: MapClusterProps) => {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(
        'inline-flex size-12 flex-none cursor-pointer items-center justify-center rounded-full border-2 border-brand bg-caramelo-4 shadow-raised',
        'motion-safe:transition-transform motion-safe:duration-150 motion-safe:active:scale-95',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        className,
      )}
      {...rest}
    >
      <Text
        as="span"
        variant="small"
        weight="semibold"
        color="on-brand-inverse"
        className="tabular-nums"
      >
        {count}
      </Text>
    </button>
  );
};

export type MapClusterProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  count: number;
  label: string;
};
