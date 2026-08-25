import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Badge, type BadgeProps } from '../badge/badge';
import { Tag } from '../tag/tag';
import { Text } from '../text/text';

export const AnimalCard = ({
  name,
  photoSrc,
  photoAlt,
  badge,
  details,
  meta,
  tags = [],
  className,
  ...rest
}: AnimalCardProps) => {
  return (
    <div
      className={cn(
        'flex gap-3.5 rounded-card border border-gray-5 bg-gray-2 p-3',
        className,
      )}
      {...rest}
    >
      {photoSrc ? (
        <img
          src={photoSrc}
          alt={photoAlt ?? name}
          className="size-[104px] flex-none rounded-photo object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={photoAlt ?? name}
          className="size-[104px] flex-none rounded-photo bg-caramelo-3"
        />
      )}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-[3px] flex items-center gap-[7px]">
          <Text variant="large" weight="semibold" className="text-[17px]">
            {name}
          </Text>
          {badge && <Badge variant={badge} size="compact" />}
        </div>
        {details && (
          <Text
            as="p"
            variant="small"
            color="neutral-2"
            className="mb-2 font-roboto text-[13px] font-light"
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
            className="mb-[9px] text-[11px]"
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
};
