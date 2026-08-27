import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

export const ActionList = ({ items, onSelect, className }: ActionListProps) => {
  return (
    <div className={cn('flex flex-col divide-y divide-gray-4', className)}>
      {items.map((item) => {
        const destructive = item.tone === 'destructive';

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex min-h-13 w-full cursor-pointer items-center gap-3 px-16 py-2.5 text-left',
              'motion-safe:transition-colors motion-safe:duration-150',
              'hover:bg-gray-3',
              'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
              destructive ? 'text-danger' : 'text-neutral',
            )}
          >
            {item.icon && (
              <Icon name={item.icon} size={20} className="flex-none" />
            )}
            <span className="min-w-0 flex-1">
              <Text as="span" variant="small" className="block text-inherit">
                {item.label}
              </Text>
              {item.description && (
                <Text
                  as="span"
                  variant="small"
                  color="neutral-3"
                  className="mt-0.5 block font-roboto text-micro"
                >
                  {item.description}
                </Text>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export type ActionListItem = {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  tone?: 'default' | 'destructive';
};

export type ActionListProps = {
  items: ActionListItem[];
  onSelect: (id: string) => void;
  className?: string;
};
