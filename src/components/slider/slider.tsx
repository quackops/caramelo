import { type ChangeEvent, type InputHTMLAttributes, useId } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const thumbClasses = cn(
  '[&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full',
  '[&::-webkit-slider-thumb]:bg-neutral [&::-webkit-slider-thumb]:shadow-raised [&::-webkit-slider-thumb]:cursor-pointer',
  'motion-safe:[&::-webkit-slider-thumb]:transition-transform motion-safe:[&::-webkit-slider-thumb]:duration-150',
  'motion-safe:active:[&::-webkit-slider-thumb]:scale-110',
  'focus-visible:[&::-webkit-slider-thumb]:outline-2 focus-visible:[&::-webkit-slider-thumb]:outline-brand focus-visible:[&::-webkit-slider-thumb]:outline-offset-2',
  '[&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full',
  '[&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-neutral [&::-moz-range-thumb]:shadow-raised [&::-moz-range-thumb]:cursor-pointer',
  'motion-safe:[&::-moz-range-thumb]:transition-transform motion-safe:[&::-moz-range-thumb]:duration-150',
  'motion-safe:active:[&::-moz-range-thumb]:scale-110',
  'focus-visible:[&::-moz-range-thumb]:outline-2 focus-visible:[&::-moz-range-thumb]:outline-brand focus-visible:[&::-moz-range-thumb]:outline-offset-2',
);

export const Slider = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  formatValue,
  hint,
  id,
  className,
  ...rest
}: SliderProps) => {
  const generatedId = useId();
  const sliderId = id ?? generatedId;
  const hintId = `${sliderId}-hint`;
  const formatted = formatValue ? formatValue(value) : String(value);
  const filled = max === min ? 0 : ((value - min) / (max - min)) * 100;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={className}>
      {(label || formatValue) && (
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          {label && (
            <label htmlFor={sliderId}>
              <Text
                variant="small"
                weight="medium"
                color="neutral-2"
                className="text-label"
              >
                {label}
              </Text>
            </label>
          )}
          <Text
            as="span"
            variant="small"
            weight="semibold"
            color="neutral"
            className="text-label tabular-nums"
          >
            {formatted}
          </Text>
        </div>
      )}
      <input
        id={sliderId}
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        aria-valuetext={formatted}
        aria-describedby={hint ? hintId : undefined}
        style={{
          background: `linear-gradient(to right, var(--color-brand) ${filled}%, var(--color-gray-6) ${filled}%)`,
        }}
        className={cn(
          'h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-6 focus:outline-none',
          thumbClasses,
        )}
        {...rest}
      />
      {hint && (
        <Text
          as="p"
          id={hintId}
          variant="small"
          color="neutral-3"
          className="mt-2 font-roboto text-caption"
        >
          {hint}
        </Text>
      )}
    </div>
  );
};

export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange' | 'min' | 'max' | 'step'
> & {
  label?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  hint?: string;
};
