import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Avatar, type AvatarProps } from '../avatar/avatar';
import { Badge, type BadgePreset, badgePresets } from '../badge/badge';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

export const PublisherRow = ({
  name,
  avatarSrc,
  avatarAlt,
  initials,
  avatarSize = 'medium',
  badge,
  meta,
  trailing,
  onClick,
  className,
}: PublisherRowProps) => {
  const content = (
    <>
      <Avatar
        src={avatarSrc}
        alt={avatarAlt ?? name}
        initials={initials}
        size={avatarSize}
        className="flex-none"
      />
      <span className="min-w-0 flex-1 text-left">
        <span className="flex flex-wrap items-center gap-1.5">
          <Text as="span" variant="small" weight="medium" color="neutral">
            {name}
          </Text>
          {badge && <Badge {...badgePresets[badge]} size="compact" />}
        </span>
        {meta && (
          <Text
            as="span"
            variant="small"
            weight="medium"
            color="neutral-3"
            className="mt-0.5 block text-micro"
          >
            {meta}
          </Text>
        )}
      </span>
      {trailing}
      {onClick && (
        <Icon
          name="chevron-right"
          size={20}
          className="flex-none text-neutral-3"
        />
      )}
    </>
  );

  const rowClassName = cn(
    'flex w-full items-center gap-3 py-2.5',
    onClick &&
      cn(
        'cursor-pointer rounded-control px-2 hover:bg-gray-3',
        'motion-safe:transition-colors motion-safe:duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
      ),
    className,
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={rowClassName}>
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
};

export type PublisherRowProps = {
  name: string;
  avatarSrc?: string;
  avatarAlt?: string;
  initials?: string;
  avatarSize?: AvatarProps['size'];
  badge?: BadgePreset;
  meta?: string;
  trailing?: ReactNode;
  onClick?: () => void;
  className?: string;
};
