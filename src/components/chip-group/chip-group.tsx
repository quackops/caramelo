import { type KeyboardEvent, useRef } from 'react';
import { Chip } from '../chip/chip';
import { Text } from '../text/text';

const stepByKey: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

export const ChipGroup = ({
  label,
  options,
  value,
  onChange,
  selection = 'multiple',
  max,
  hint,
  className,
}: ChipGroupProps) => {
  const single = selection === 'single';
  const listRef = useRef<HTMLDivElement & HTMLFieldSetElement>(null);
  const capReached = max !== undefined && value.length >= max;

  const focusOption = (optionValue: string) => {
    listRef.current
      ?.querySelector<HTMLButtonElement>(`[data-value="${optionValue}"]`)
      ?.focus();
  };

  const toggle = (optionValue: string) => {
    if (single) {
      onChange([optionValue]);
      return;
    }

    if (value.includes(optionValue)) {
      onChange(value.filter((entry) => entry !== optionValue));
      return;
    }

    if (capReached) return;
    onChange([...value, optionValue]);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = stepByKey[event.key];
    if (!single || !step) return;

    const selectable = options.filter((option) => !option.disabled);
    if (selectable.length === 0) return;

    event.preventDefault();
    const current = selectable.findIndex((option) => option.value === value[0]);
    const next =
      current < 0
        ? selectable[step > 0 ? 0 : selectable.length - 1]
        : selectable[(current + step + selectable.length) % selectable.length];

    onChange([next.value]);
    focusOption(next.value);
  };

  const rovingValue =
    value[0] ?? options.find((option) => !option.disabled)?.value;

  const chips = options.map((option) => {
    const selected = value.includes(option.value);
    const blocked = option.disabled || (!single && !selected && capReached);

    return (
      <Chip
        key={option.value}
        data-value={option.value}
        variant={selected ? 'selected' : blocked ? 'disabled' : 'default'}
        count={option.count}
        role={single ? 'radio' : undefined}
        aria-checked={single ? selected : undefined}
        aria-pressed={single ? undefined : selected}
        tabIndex={single && option.value !== rovingValue ? -1 : undefined}
        onClick={() => toggle(option.value)}
      >
        {option.label}
      </Chip>
    );
  });

  return (
    <div className={className}>
      {label && (
        <Text
          as="p"
          variant="small"
          weight="medium"
          color="neutral-2"
          className="mb-[9px] text-label"
        >
          {label}
          {hint && <span className="text-neutral-3"> · {hint}</span>}
        </Text>
      )}
      {single ? (
        <div
          ref={listRef}
          role="radiogroup"
          aria-label={label}
          onKeyDown={handleKeyDown}
          className="flex flex-wrap gap-2"
        >
          {chips}
        </div>
      ) : (
        <fieldset
          ref={listRef}
          aria-label={label}
          className="flex min-w-0 flex-wrap gap-2"
        >
          {chips}
        </fieldset>
      )}
    </div>
  );
};

export type ChipGroupOption = {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
};

export type ChipGroupProps = {
  label?: string;
  options: ChipGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
  selection?: 'single' | 'multiple';
  max?: number;
  hint?: string;
  className?: string;
};
