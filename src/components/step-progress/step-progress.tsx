import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const StepProgress = ({
  total,
  current,
  variant = 'bars',
  tone = 'default',
  label,
  className,
  ...rest
}: StepProgressProps) => {
  const steps = Array.from({ length: total }, (_, index) => ({
    id: `step-${index}`,
    done: index < current,
  }));

  return (
    <div
      role="progressbar"
      aria-valuemin={1}
      aria-valuenow={current}
      aria-valuemax={total}
      className={className}
      {...rest}
    >
      <div
        className={cn(
          'flex items-center gap-1.5',
          variant === 'bars' && 'gap-1.5',
        )}
      >
        {steps.map((step) =>
          variant === 'bars' ? (
            <span
              key={step.id}
              className={cn(
                'h-1 flex-1 rounded-sm motion-safe:transition-colors motion-safe:duration-150',
                step.done ? 'bg-brand' : 'bg-gray-6',
              )}
            />
          ) : (
            <span
              key={step.id}
              className={cn(
                'h-[5px] rounded-[3px] motion-safe:transition-all motion-safe:duration-150',
                step.done ? 'w-[22px]' : 'w-[5px]',
                tone === 'over-photo'
                  ? step.done
                    ? 'bg-neutral'
                    : 'bg-neutral/45'
                  : step.done
                    ? 'bg-brand'
                    : 'bg-gray-7',
              )}
            />
          ),
        )}
      </div>
      {label && (
        <Text
          weight="medium"
          color="neutral-3"
          className="mt-2.5 block text-[11px] leading-[14px]"
        >
          {label}
        </Text>
      )}
    </div>
  );
};

export type StepProgressProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  total: number;
  current: number;
  variant?: 'bars' | 'dots';
  tone?: 'default' | 'over-photo';
  label?: string;
};
