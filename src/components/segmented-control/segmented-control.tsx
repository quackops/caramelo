import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const SegmentedControl = ({
  options,
  value,
  onChange,
  className,
  ...rest
}: SegmentedControlProps) => {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex gap-0.5 rounded-xl border border-gray-6 bg-gray-3 p-[3px]',
        className,
      )}
      {...rest}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange?.(option.value)}
            className={cn(
              'rounded-[9px] px-[18px] py-[9px] cursor-pointer focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
              'motion-safe:transition-[color,background-color,transform] motion-safe:duration-150 motion-safe:ease-out',
              'motion-safe:active:scale-95',
              selected ? 'bg-brand' : 'bg-transparent hover:bg-gray-4',
            )}
          >
            <Text
              variant="small"
              weight="medium"
              color={selected ? 'on-brand-strong' : 'neutral-2'}
              className="text-[13px]"
            >
              {option.label}
            </Text>
          </button>
        );
      })}
    </div>
  );
};

export type SegmentedControlOption = {
  label: string;
  value: string;
};

export type SegmentedControlProps = {
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};
