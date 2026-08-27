import type { ElementType, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const columnClasses: Record<2 | 3 | 4, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-4',
};

export const StatGrid = ({
  items,
  columns = 3,
  variant = 'tiles',
  order = 'value-first',
  className,
}: StatGridProps) => {
  const interactive = items.some((item) => item.onClick);
  const valueFirst = order === 'value-first';

  const LabelTag: ElementType = interactive ? 'span' : 'dt';
  const ValueTag: ElementType = interactive ? 'span' : 'dd';

  const cellClassName = cn(
    'flex flex-col gap-1 text-left',
    variant === 'tiles' && 'rounded-control bg-surface p-16',
    variant === 'inline' && 'px-2 py-1',
  );

  const renderCell = (item: StatGridItem) => {
    const label = (
      <LabelTag className={valueFirst ? 'order-2' : undefined}>
        <Text
          as="span"
          variant="small"
          className="block text-badge font-semibold uppercase tracking-[0.08em] text-neutral-3"
        >
          {item.label}
        </Text>
      </LabelTag>
    );

    const value = (
      <ValueTag className={cn('m-0', valueFirst && 'order-1')}>
        <Text
          as="span"
          variant={valueFirst ? 'heading' : 'medium'}
          weight="semibold"
          color="neutral"
          className={cn('block', valueFirst ? 'text-title' : 'text-card-title')}
        >
          {item.value}
        </Text>
      </ValueTag>
    );

    return (
      <>
        {label}
        {value}
      </>
    );
  };

  const gridClassName = cn(
    'grid gap-2',
    columnClasses[columns],
    variant === 'inline' && 'gap-0 divide-x divide-gray-4',
    className,
  );

  if (!interactive) {
    return (
      <dl className={gridClassName}>
        {items.map((item) => (
          <div key={item.label} className={cellClassName}>
            {renderCell(item)}
          </div>
        ))}
      </dl>
    );
  }

  return (
    <div className={gridClassName}>
      {items.map((item) =>
        item.onClick ? (
          <button
            key={item.label}
            type="button"
            onClick={item.onClick}
            className={cn(
              cellClassName,
              'cursor-pointer',
              'motion-safe:transition-colors motion-safe:duration-150',
              variant === 'tiles' && 'hover:bg-surface-2',
              'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
            )}
          >
            {renderCell(item)}
          </button>
        ) : (
          <div key={item.label} className={cellClassName}>
            {renderCell(item)}
          </div>
        ),
      )}
    </div>
  );
};

export type StatGridItem = {
  label: string;
  value: ReactNode;
  onClick?: () => void;
};

export type StatGridProps = {
  items: StatGridItem[];
  columns?: 2 | 3 | 4;
  variant?: 'tiles' | 'inline';
  order?: 'value-first' | 'label-first';
  className?: string;
};
