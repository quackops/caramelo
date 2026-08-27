import { cn } from '../../utils/cn';
import { Fab } from '../fab/fab';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

export const TabBar = ({
  items,
  activeValue,
  onPublish,
  className,
}: TabBarProps) => {
  return (
    <nav
      className={cn(
        'flex h-[83px] items-start justify-around gap-2 rounded-b-[18px] border-t border-gray-6 bg-gray-2 px-2 pt-2.5',
        className,
      )}
    >
      {items.map((item) =>
        item.isPublish ? (
          <div
            key={item.value}
            className="-mt-16 flex w-[62px] flex-col items-center"
          >
            <Fab
              aria-label={item.label}
              onClick={onPublish}
              icon={item.icon}
              className="size-[52px] rounded-[18px]"
            />
            <Text
              variant="small"
              weight="medium"
              color="neutral-3"
              className="mt-[5px] text-[10px]"
            >
              {item.label}
            </Text>
          </div>
        ) : (
          <button
            key={item.value}
            type="button"
            className="relative flex w-[62px] cursor-pointer flex-col items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
          >
            <Icon
              name={item.icon}
              size={23}
              className={
                item.value === activeValue ? 'text-link' : 'text-neutral-3'
              }
            />
            <Text
              variant="small"
              weight="medium"
              className={cn(
                'text-[10px]',
                item.value === activeValue ? 'text-link' : 'text-neutral-3',
              )}
            >
              {item.label}
            </Text>
            {typeof item.badgeCount === 'number' && (
              <span className="absolute -top-[3px] right-[13px] flex h-16 min-w-16 items-center justify-center rounded-full border-2 border-gray-2 bg-danger px-1">
                <Text
                  variant="small"
                  weight="semibold"
                  color="neutral-inverse"
                  className="text-[10px]"
                >
                  {item.badgeCount}
                </Text>
              </span>
            )}
          </button>
        ),
      )}
    </nav>
  );
};

export type TabBarItem = {
  value: string;
  label: string;
  icon: IconName;
  isPublish?: boolean;
  badgeCount?: number;
};

export type TabBarProps = {
  items: TabBarItem[];
  activeValue?: string;
  onPublish?: () => void;
  className?: string;
};
