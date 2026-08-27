import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Badge, badgePresets } from '../badge/badge';
import { Icon } from '../icon/icon';
import { StatGrid } from '../stat-grid/stat-grid';
import { Text } from '../text/text';

export const ListingManagerCard = ({
  name,
  photoSrc,
  photoAlt,
  status,
  statusDetail,
  metrics,
  pendingLabel,
  onPendingClick,
  actions,
  className,
}: ListingManagerCardProps) => {
  const unavailable = status === 'adopted';
  const showPending = Boolean(pendingLabel) && !unavailable;

  return (
    <div
      className={cn(
        'rounded-card border border-gray-5 bg-gray-2 p-3',
        className,
      )}
    >
      <div className="flex gap-3.5">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={photoAlt ?? name}
            className={cn(
              'size-[104px] flex-none rounded-photo object-cover',
              unavailable && 'opacity-40',
            )}
          />
        ) : (
          <div
            role="img"
            aria-label={photoAlt ?? name}
            className={cn(
              'size-[104px] flex-none rounded-photo bg-caramelo-3',
              unavailable && 'opacity-40',
            )}
          />
        )}
        <div className="min-w-0 flex-1 pt-0.5">
          <div className="mb-[3px] flex flex-wrap items-center gap-[7px]">
            <Text variant="large" weight="semibold" className="text-card-title">
              {name}
            </Text>
            <Badge {...badgePresets[status]} size="compact" />
          </div>
          {statusDetail && (
            <Text
              as="p"
              variant="small"
              weight="medium"
              color="neutral-3"
              className="mb-2 text-micro"
            >
              {statusDetail}
            </Text>
          )}
          {metrics && metrics.length > 0 && (
            <StatGrid
              variant="inline"
              order="value-first"
              columns={metrics.length === 2 ? 2 : 3}
              items={metrics.map((metric) => ({
                label: metric.label,
                value: metric.value,
              }))}
              className="mt-1.5"
            />
          )}
        </div>
      </div>
      {showPending && (
        <button
          type="button"
          onClick={onPendingClick}
          className={cn(
            'mt-3 flex min-h-11 w-full cursor-pointer items-center gap-2 rounded-control bg-caramelo-3 px-3 text-left',
            'motion-safe:transition-colors motion-safe:duration-150 hover:bg-caramelo-4',
            'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          )}
        >
          <Text
            as="span"
            variant="small"
            weight="medium"
            color="link"
            className="min-w-0 flex-1"
          >
            {pendingLabel}
          </Text>
          <Icon
            name="chevron-right"
            size={20}
            className="flex-none text-link"
          />
        </button>
      )}
      {actions && <div className="mt-3 flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
};

export type ListingManagerCardMetric = {
  label: string;
  value: number;
};

export type ListingManagerCardProps = {
  name: string;
  photoSrc?: string;
  photoAlt?: string;
  status: 'active' | 'paused' | 'adopted';
  statusDetail?: string;
  metrics?: ListingManagerCardMetric[];
  pendingLabel?: string;
  onPendingClick?: () => void;
  actions?: ReactNode;
  className?: string;
};
