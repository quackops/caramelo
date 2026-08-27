import { type ChangeEvent, type KeyboardEvent, useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import { LoadingSkeleton } from '../loading-skeleton/loading-skeleton';
import { Text } from '../text/text';

export const Autocomplete = ({
  label,
  value,
  options,
  loading,
  emptyLabel,
  onQueryChange,
  onSelect,
  placeholder,
  error,
  variant = 'field',
  className,
}: AutocompleteProps) => {
  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (index: number) => `${baseId}-option-${index}`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const safeActiveIndex =
    options.length > 0 ? Math.min(activeIndex, options.length - 1) : 0;

  const showEmpty = Boolean(
    emptyLabel && !loading && options.length === 0 && value.length > 0,
  );
  const expanded = open && (loading || options.length > 0 || showEmpty);

  const select = (index: number) => {
    const option = options[index];
    if (!option) return;
    onSelect(option);
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
    setActiveIndex(0);
    setOpen(true);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      setOpen(false);
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      if (options.length === 0) return;
      const step = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((current) => {
        const from = Math.min(current, options.length - 1);
        return (from + step + options.length) % options.length;
      });
      return;
    }

    if (event.key === 'Enter' && expanded && options.length > 0) {
      event.preventDefault();
      select(safeActiveIndex);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Input
        label={label}
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={
          expanded && options.length > 0 ? optionId(safeActiveIndex) : undefined
        }
        autoComplete="off"
        leading={
          variant === 'search' ? <Icon name="search" size={18} /> : undefined
        }
        placeholder={placeholder}
        error={error}
        value={value}
        onChange={handleChange}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={handleKeyDown}
      />
      {expanded && (
        <div
          id={listId}
          role="listbox"
          aria-label={label}
          className={cn(
            'absolute inset-x-0 top-full z-20 mt-1.5 max-h-[280px] overflow-y-auto',
            'rounded-control border border-gray-6 bg-surface py-1 shadow-raised',
            'motion-safe:animate-fade-in-scale',
          )}
        >
          {loading && (
            <div className="flex justify-center py-16">
              <LoadingSkeleton variant="spinner" />
            </div>
          )}
          {!loading &&
            options.map((option, index) => (
              <div
                key={option.value}
                id={optionId(index)}
                role="option"
                tabIndex={-1}
                aria-selected={index === safeActiveIndex}
                onMouseDown={(event) => {
                  event.preventDefault();
                  select(index);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  'flex min-h-11 cursor-pointer items-center justify-between gap-3 px-16 py-2.5',
                  index === safeActiveIndex && 'bg-gray-3',
                )}
              >
                <span className="min-w-0">
                  <Text
                    as="span"
                    variant="small"
                    color="neutral"
                    className="block"
                  >
                    {option.label}
                  </Text>
                  {option.description && (
                    <Text
                      as="span"
                      variant="small"
                      color="neutral-3"
                      className="block text-micro"
                    >
                      {option.description}
                    </Text>
                  )}
                </span>
                {option.count !== undefined && (
                  <Text
                    as="span"
                    variant="small"
                    weight="medium"
                    color="neutral-3"
                    className="text-caption tabular-nums"
                  >
                    {option.count}
                  </Text>
                )}
              </div>
            ))}
          {showEmpty && (
            <div className="px-16 py-2.5">
              <Text as="span" variant="small" color="neutral-3">
                {emptyLabel}
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export type AutocompleteOption = {
  value: string;
  label: string;
  description?: string;
  count?: number;
};

export type AutocompleteProps = {
  label?: string;
  value: string;
  options: AutocompleteOption[];
  loading?: boolean;
  emptyLabel?: string;
  onQueryChange: (query: string) => void;
  onSelect: (option: AutocompleteOption) => void;
  placeholder?: string;
  error?: string;
  variant?: 'field' | 'search';
  className?: string;
};
