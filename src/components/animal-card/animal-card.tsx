import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Badge, type BadgeProps } from '../badge/badge';
import { Icon } from '../icon/icon';
import { LoadingSkeleton } from '../loading-skeleton/loading-skeleton';
import { Tag } from '../tag/tag';
import { Text } from '../text/text';

const cardClasses = 'rounded-card border border-gray-5 bg-gray-2';

export const AnimalCard = ({
  name,
  photoSrc,
  photoAlt,
  badge,
  details,
  meta,
  tags = [],
  variant = 'list',
  favorited,
  onFavoriteToggle,
  favoriteLabel,
  unavailable,
  loading,
  className,
  ...rest
}: AnimalCardProps) => {
  const grid = variant === 'grid';

  if (loading) {
    return (
      <div
        className={cn(
          cardClasses,
          grid ? 'overflow-hidden' : 'flex gap-3.5 p-3',
          className,
        )}
        {...rest}
      >
        <LoadingSkeleton
          className={cn(
            grid
              ? 'aspect-[4/5] w-full rounded-none'
              : 'size-[104px] flex-none rounded-photo',
          )}
        />
        <div className={cn('flex-1', grid ? 'p-3' : 'pt-0.5')}>
          <LoadingSkeleton className="mb-2 h-4 w-2/3" />
          <LoadingSkeleton className="h-3 w-1/2" />
        </div>
      </div>
    );
  }

  const badgeNode = unavailable ? (
    <Badge variant="adopted" size="compact" />
  ) : badge ? (
    <Badge variant={badge} size="compact" />
  ) : null;

  const favorite = onFavoriteToggle && !unavailable && (
    <button
      type="button"
      aria-pressed={Boolean(favorited)}
      aria-label={favoriteLabel ?? `Salvar ${name}`}
      onClick={(event) => {
        event.stopPropagation();
        onFavoriteToggle();
      }}
      className={cn(
        'absolute top-1.5 right-1.5 flex size-11 cursor-pointer items-center justify-center rounded-full',
        'motion-safe:transition-colors motion-safe:duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        favorited ? 'text-brand' : 'text-neutral',
      )}
    >
      <Icon name="heart" size={22} />
    </button>
  );

  const photo = (
    <>
      {photoSrc ? (
        <img
          src={photoSrc}
          alt={photoAlt ?? name}
          className={cn(
            'object-cover',
            grid
              ? 'aspect-[4/5] w-full'
              : 'size-[104px] flex-none rounded-photo',
            unavailable && 'opacity-40',
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={photoAlt ?? name}
          className={cn(
            'bg-caramelo-3',
            grid
              ? 'aspect-[4/5] w-full'
              : 'size-[104px] flex-none rounded-photo',
            unavailable && 'opacity-40',
          )}
        />
      )}
      {grid && badgeNode && (
        <span className="absolute top-1.5 left-1.5">{badgeNode}</span>
      )}
      {favorite}
    </>
  );

  if (grid) {
    return (
      <div className={cn(cardClasses, 'overflow-hidden', className)} {...rest}>
        <div className="relative">{photo}</div>
        <div className="p-3">
          <Text
            as="p"
            variant="large"
            weight="semibold"
            className="text-card-title"
          >
            {name}
          </Text>
          {meta && (
            <Text
              as="p"
              variant="small"
              weight="medium"
              color="neutral-3"
              className="mt-0.5 text-micro"
            >
              {meta}
            </Text>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(cardClasses, 'flex gap-3.5 p-3', className)} {...rest}>
      <div className="relative flex-none">{photo}</div>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-[3px] flex items-center gap-[7px]">
          <Text variant="large" weight="semibold" className="text-card-title">
            {name}
          </Text>
          {badgeNode}
        </div>
        {details && (
          <Text
            as="p"
            variant="small"
            color="neutral-2"
            className="mb-2 font-roboto text-label font-light"
          >
            {details}
          </Text>
        )}
        {meta && (
          <Text
            as="p"
            variant="small"
            weight="medium"
            color="neutral-3"
            className="mb-[9px] text-caption"
          >
            {meta}
          </Text>
        )}
        {tags.length > 0 && (
          <div className="flex gap-1.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export type AnimalCardProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  photoSrc?: string;
  photoAlt?: string;
  badge?: BadgeProps['variant'];
  details?: string;
  meta?: string;
  tags?: string[];
  variant?: 'list' | 'grid';
  favorited?: boolean;
  onFavoriteToggle?: () => void;
  favoriteLabel?: string;
  unavailable?: boolean;
  loading?: boolean;
};
