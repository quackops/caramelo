import { type KeyboardEvent, useLayoutEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const stepByKey: Record<string, number> = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

const accessibleName = (item: TabItem) =>
  item.count === undefined ? item.label : `${item.label}, ${item.count} itens`;

export const Tabs = ({ items, value, onChange, className }: TabsProps) => {
  const stripRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const selected = stripRef.current?.querySelector<HTMLButtonElement>(
      `[data-value="${value}"]`,
    );
    if (!selected) return;
    setIndicator({ left: selected.offsetLeft, width: selected.offsetWidth });
  }, [value]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = stepByKey[event.key];
    if (!step) return;

    const selectable = items.filter((item) => !item.disabled);
    if (selectable.length === 0) return;

    event.preventDefault();
    const current = selectable.findIndex((item) => item.value === value);
    const next =
      selectable[
        (Math.max(current, 0) + step + selectable.length) % selectable.length
      ];

    onChange(next.value);
    stripRef.current
      ?.querySelector<HTMLButtonElement>(`[data-value="${next.value}"]`)
      ?.focus();
  };

  return (
    <div
      ref={stripRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        'relative flex gap-6 overflow-x-auto border-b border-border',
        className,
      )}
    >
      {items.map((item) => {
        const selected = item.value === value;

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            data-value={item.value}
            aria-selected={selected}
            aria-label={
              item.count === undefined ? undefined : accessibleName(item)
            }
            disabled={item.disabled}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(item.value)}
            className={cn(
              'flex min-h-11 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap border-none bg-transparent px-1 pb-2.5',
              'motion-safe:transition-colors motion-safe:duration-150',
              'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
              'disabled:cursor-not-allowed disabled:text-gray-8',
              selected ? 'text-neutral' : 'text-neutral-3 hover:text-neutral-2',
            )}
          >
            <Text
              as="span"
              variant="small"
              weight={selected ? 'semibold' : 'medium'}
              className="text-inherit"
            >
              {item.label}
            </Text>
            {item.count !== undefined && (
              <Text
                as="span"
                aria-hidden
                variant="small"
                weight="medium"
                color="neutral-3"
                className="text-caption tabular-nums"
              >
                {item.count}
              </Text>
            )}
          </button>
        );
      })}
      <span
        aria-hidden
        style={{ left: indicator.left, width: indicator.width }}
        className="absolute bottom-0 h-0.5 rounded-full bg-brand motion-safe:transition-all motion-safe:duration-150"
      />
    </div>
  );
};

export type TabItem = {
  value: string;
  label: string;
  count?: number;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};
