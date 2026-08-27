import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const ProgressMeter = ({
  label,
  value,
  max = 100,
  valueLabel,
  tone = 'brand',
  className,
}: ProgressMeterProps) => {
  const filled = max === 0 ? 0 : Math.min(Math.max(value / max, 0), 1) * 100;

  return (
    <div className={className}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <Text as="span" variant="small" color="neutral-2">
          {label}
        </Text>
        <Text
          as="span"
          variant="small"
          weight="semibold"
          color="neutral"
          className="tabular-nums"
        >
          {valueLabel}
        </Text>
      </div>
      {/* biome-ignore lint/a11y/useSemanticElements: a native <meter> cannot carry the design's styled fill */}
      <div
        role="meter"
        aria-label={label}
        aria-valuemin={0}
        aria-valuenow={value}
        aria-valuemax={max}
        aria-valuetext={valueLabel}
        className="h-1.5 w-full overflow-hidden rounded-chip bg-gray-6"
      >
        <span
          style={{ width: `${filled}%` }}
          className={cn(
            'block h-full rounded-chip',
            'motion-safe:transition-[width] motion-safe:duration-150',
            tone === 'brand' ? 'bg-brand' : 'bg-gray-8',
          )}
        />
      </div>
    </div>
  );
};

const Group = ({ children, className, ...rest }: GroupProps) => (
  <div className={cn('flex flex-col gap-12', className)} {...rest}>
    {children}
  </div>
);

ProgressMeter.Group = Group;

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type ProgressMeterProps = {
  label: string;
  value: number;
  max?: number;
  valueLabel: string;
  tone?: 'brand' | 'neutral';
  className?: string;
};
