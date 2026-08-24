import { cn } from '../../utils/cn';
import { Text } from '../text/text';

// "Seletor de modo" — shares the brand color with the selected chip and
// the primary button by design, which is why the spec forbids putting a
// segmented control on the same row as a primary CTA.
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
              'rounded-[9px] px-[18px] py-[9px] cursor-pointer',
              selected ? 'bg-brand' : 'bg-transparent',
            )}
          >
            <Text
              variant="small"
              weight="medium"
              color={selected ? 'on-brand-strong' : 'neutral-2'}
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
