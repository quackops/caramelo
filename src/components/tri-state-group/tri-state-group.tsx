import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

type TriStateValue = true | false | null;

const optionClasses =
  'relative flex h-[42px] flex-1 basis-0 items-center justify-center gap-1.5 box-border cursor-pointer whitespace-nowrap rounded-xl border has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand has-[:focus-visible]:outline-offset-2';

export const TriStateGroup = ({
  label,
  value,
  onChange,
  unknownLabel = 'Não sei',
  className,
  ...rest
}: TriStateGroupProps) => {
  const name = useId();

  const options: { key: string; value: TriStateValue; label: string }[] = [
    { key: 'yes', value: true, label: 'Sim' },
    { key: 'no', value: false, label: 'Não' },
    { key: 'unknown', value: null, label: unknownLabel },
  ];

  return (
    <div className={className} {...rest}>
      <Text weight="medium" className="mb-[9px] block text-[14px]">
        {label}
      </Text>
      <div role="radiogroup" aria-label={label} className="flex w-full gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          const isUnknown = option.value === null;

          return (
            <label
              key={option.key}
              className={cn(
                optionClasses,
                selected &&
                  isUnknown &&
                  'border-dashed border-gray-7 bg-gray-3',
                selected &&
                  !isUnknown &&
                  'border-transparent bg-brand text-surface-on-brand',
                !selected && 'border-border text-neutral-2',
              )}
            >
              <input
                type="radio"
                name={name}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              {selected && !isUnknown && (
                <span aria-hidden="true">{option.value ? '✓' : '✗'}</span>
              )}
              <Text
                as="span"
                weight="medium"
                color={selected && !isUnknown ? undefined : 'neutral-2'}
                className={cn(
                  'text-[14px]',
                  selected && !isUnknown && 'text-inherit',
                )}
              >
                {option.label}
              </Text>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const Field = ({ children, className, ...rest }: FieldProps) => (
  <div className={cn('flex flex-col gap-4', className)} {...rest}>
    {children}
  </div>
);

TriStateGroup.Field = Field;

type FieldProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type TriStateGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> & {
  label: string;
  value: TriStateValue;
  onChange: (value: TriStateValue) => void;
  unknownLabel?: string;
};
