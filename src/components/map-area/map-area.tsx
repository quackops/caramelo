import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const MapArea = ({
  label,
  radiusLabel,
  backdrop,
  className,
}: MapAreaProps) => {
  return (
    <div
      className={cn(
        'relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-photo bg-gray-3',
        className,
      )}
    >
      {backdrop}
      <span
        aria-hidden
        className="absolute size-1/2 rounded-full border-2 border-brand border-dashed bg-brand/10"
      />
      <Text
        as="p"
        variant="small"
        weight="medium"
        color="neutral-2"
        className="relative z-10 px-16 text-center text-micro"
      >
        {label}
        {radiusLabel && (
          <span className="text-neutral-3"> · {radiusLabel}</span>
        )}
      </Text>
    </div>
  );
};

export type MapAreaProps = {
  label: string;
  radiusLabel?: string;
  backdrop?: ReactNode;
  className?: string;
};
