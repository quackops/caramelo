import type { ReactNode } from 'react';
import { Avatar } from '../avatar/avatar';
import { Badge, type BadgeProps } from '../badge/badge';
import { Text } from '../text/text';

export const ProfileHeader = ({
  name,
  avatarSrc,
  avatarAlt,
  initials,
  coverSrc,
  coverAlt = '',
  badge,
  meta,
  bio,
  actions,
  className,
}: ProfileHeaderProps) => {
  return (
    <header className={className}>
      <div className="relative">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={coverAlt}
            className="aspect-[402/190] w-full rounded-b-card object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="aspect-[402/190] w-full rounded-b-card bg-caramelo-3"
          />
        )}
        <Avatar
          src={avatarSrc}
          alt={avatarAlt ?? name}
          initials={initials}
          className="-bottom-6 absolute left-16 border-[3px] border-bg"
        />
      </div>
      <div className="px-16 pt-8">
        <div className="flex flex-wrap items-center gap-2">
          <Text as="h1" variant="heading" weight="semibold" color="neutral">
            {name}
          </Text>
          {badge && <Badge variant={badge} size="compact" />}
        </div>
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
        {bio && (
          <Text
            as="div"
            variant="small"
            color="neutral-2"
            className="mt-2.5 font-roboto text-body font-light"
          >
            {bio}
          </Text>
        )}
        {actions && (
          <div className="mt-3.5 flex flex-wrap gap-2.5">{actions}</div>
        )}
      </div>
    </header>
  );
};

export type ProfileHeaderProps = {
  name: string;
  avatarSrc?: string;
  avatarAlt?: string;
  initials?: string;
  coverSrc?: string;
  coverAlt?: string;
  badge?: BadgeProps['variant'];
  meta?: string;
  bio?: ReactNode;
  actions?: ReactNode;
  className?: string;
};
