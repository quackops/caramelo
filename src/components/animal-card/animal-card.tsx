import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Badge, type BadgeProps } from '../badge/badge';
import { Text } from '../text/text';

// "CARD DE ANIMAL · lista" — gray-2 surface on the caramelo-1 page
// background, 104x104 photo (radius 16), radius 20 card.
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
        'flex gap-3.5 rounded-[20px] border border-gray-5 bg-gray-2 p-3',
        className,
      )}
      {...rest}
    >
      {photoSrc ? (
        // biome-ignore lint/performance/noImgElement: library component, no framework image optimizer available.
        <img
          src={photoSrc}
          alt={photoAlt ?? name}
          className="size-[104px] flex-none rounded-2xl object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={photoAlt ?? name}
          className="size-[104px] flex-none rounded-2xl bg-caramelo-3"
        />
      )}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="mb-[3px] flex items-center gap-[7px]">
          <Text variant="large" weight="semibold">
            {name}
          </Text>
          {badge && (
            <Badge variant={badge} className="px-[7px] py-[3px] text-[9px]" />
          )}
        </div>
        {details && (
          <Text as="p" variant="small" color="neutral-2" className="mb-2">
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
              <span key={tag} className="rounded-[7px] bg-gray-3 px-[9px] py-1">
                <Text
                  variant="small"
                  weight="medium"
                  color="neutral-2"
                  className="text-[11px]"
                >
                  {tag}
                </Text>
              </span>
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
