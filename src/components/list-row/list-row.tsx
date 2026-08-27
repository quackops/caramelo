import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Slot, type SlotProps } from '../slot/slot';
import { Text } from '../text/text';

export const defaultSlot = 'div';

export const ListRow = <S extends ElementType = typeof defaultSlot>({
  as,
  title,
  description,
  icon,
  leading,
  trailing,
  count,
  badgeCount,
  chevron,
  onClick,
  className,
  ...rest
}: SlotProps<ListRowProps, S>) => {
  const interactive = Boolean(onClick) || Boolean(as);
  const element = as ?? (onClick ? 'button' : defaultSlot);

  return (
    <Slot<ElementType>
      as={element}
      type={element === 'button' ? 'button' : undefined}
      onClick={onClick}
      className={cn(
        'flex min-h-13 w-full items-center gap-3 px-16 py-2.5 text-left',
        interactive &&
          cn(
            'cursor-pointer rounded-control hover:bg-gray-3',
            'motion-safe:transition-colors motion-safe:duration-150',
            'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          ),
        className,
      )}
      {...rest}
    >
      {icon && (
        <Icon name={icon} size={20} className="flex-none text-neutral-3" />
      )}
      {leading}
      <span className="min-w-0 flex-1">
        <Text as="span" variant="small" color="neutral" className="block">
          {title}
        </Text>
        {description && (
          <Text
            as="span"
            variant="small"
            color="neutral-3"
            className="mt-0.5 block font-roboto text-micro"
          >
            {description}
          </Text>
        )}
      </span>
      {count !== undefined && (
        <Text
          as="span"
          variant="small"
          weight="medium"
          color="neutral-3"
          className="flex-none tabular-nums"
        >
          {count}
        </Text>
      )}
      {badgeCount !== undefined && (
        <span className="flex h-16 min-w-16 flex-none items-center justify-center rounded-full bg-danger px-1">
          <Text
            variant="small"
            weight="semibold"
            color="neutral-inverse"
            className="text-micro"
          >
            {badgeCount}
          </Text>
        </span>
      )}
      {trailing}
      {chevron && (
        <Icon
          name="chevron-right"
          size={20}
          className="flex-none text-neutral-3"
        />
      )}
    </Slot>
  );
};

const Group = ({ children, className, ...rest }: GroupProps) => (
  <div className={cn('divide-y divide-gray-4', className)} {...rest}>
    {children}
  </div>
);

ListRow.Group = Group;

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type ListRowProps = {
  title: string;
  description?: string;
  icon?: IconName;
  leading?: ReactNode;
  trailing?: ReactNode;
  count?: number;
  badgeCount?: number;
  chevron?: boolean;
  onClick?: () => void;
};
