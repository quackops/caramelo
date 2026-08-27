import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Select } from '../select/select';
import { Tag } from '../tag/tag';
import { Text } from '../text/text';

export const SavedSearchRow = ({
  name,
  filters,
  frequency,
  frequencyOptions,
  frequencyLabel,
  pausedLabel,
  onFrequencyChange,
  paused,
  newCount,
  onClick,
  actions,
  className,
}: SavedSearchRowProps) => {
  return (
    <div
      className={cn(
        'relative rounded-card border border-gray-5 bg-surface p-16',
        paused && 'opacity-70',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          {onClick ? (
            <button
              type="button"
              onClick={onClick}
              className={cn(
                'cursor-pointer text-left after:absolute after:inset-0 after:content-[""]',
                'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
              )}
            >
              <Text
                as="span"
                variant="medium"
                weight="medium"
                color="neutral"
                className="text-card-title"
              >
                {name}
              </Text>
            </button>
          ) : (
            <Text
              as="p"
              variant="medium"
              weight="medium"
              color="neutral"
              className="text-card-title"
            >
              {name}
            </Text>
          )}
          {filters.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {filters.map((filter) => (
                <Tag key={filter}>{filter}</Tag>
              ))}
            </div>
          )}
        </div>
        {actions && (
          <div className="relative z-10 flex flex-none gap-1">{actions}</div>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="relative z-10 flex items-center gap-1.5">
          <Text
            as="span"
            variant="small"
            color="neutral-3"
            className="text-label"
          >
            {paused ? pausedLabel : frequencyLabel}
          </Text>
          <Select
            variant="ghost"
            label={frequencyLabel}
            value={frequency}
            onChange={(event) =>
              onFrequencyChange(event.target.value as SavedSearchFrequency)
            }
            className="font-poppins text-label font-medium"
          >
            {frequencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        {typeof newCount === 'number' && newCount > 0 && (
          <span className="rounded-chip bg-caramelo-4 px-2.5 py-1">
            <Text
              as="span"
              variant="small"
              weight="medium"
              className="text-caption text-on-brand-inverse"
            >
              {newCount} novos
            </Text>
          </span>
        )}
      </div>
    </div>
  );
};

export type SavedSearchFrequency = 'instant' | 'daily' | 'weekly';

export type SavedSearchFrequencyOption = {
  value: SavedSearchFrequency;
  label: string;
};

export type SavedSearchRowProps = {
  name: string;
  filters: string[];
  frequency: SavedSearchFrequency;
  frequencyOptions: SavedSearchFrequencyOption[];
  frequencyLabel: string;
  pausedLabel?: string;
  onFrequencyChange: (frequency: SavedSearchFrequency) => void;
  paused?: boolean;
  newCount?: number;
  onClick?: () => void;
  actions?: ReactNode;
  className?: string;
};
