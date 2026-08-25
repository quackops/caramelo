import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../button/button';
import { Text } from '../text/text';

export const Sidebar = ({
  logo,
  items,
  activeValue,
  onPublish,
  collapsed,
  className,
}: SidebarProps) => {
  return (
    <nav
      className={cn(
        'flex flex-col rounded-2xl border border-gray-5 bg-gray-2 p-3',
        collapsed ? 'w-[72px]' : 'w-[248px]',
        className,
      )}
    >
      <div className="mb-16 flex items-center gap-2.5 px-2">
        <span className="flex size-7 items-center justify-center rounded-[9px] bg-brand">
          <Text variant="small" weight="semibold" color="on-brand-strong">
            {logo.mark}
          </Text>
        </span>
        {!collapsed && (
          <Text variant="medium" weight="semibold">
            {logo.name}
          </Text>
        )}
      </div>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => {
          const active = item.value === activeValue;

          return (
            <button
              key={item.value}
              type="button"
              className={cn(
                'flex h-11 cursor-pointer items-center gap-[11px] rounded-xl px-3 hover:bg-gray-3 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                active && 'bg-caramelo-4',
              )}
            >
              <span className="size-[18px]">{item.icon}</span>
              {!collapsed && (
                <Text
                  variant="small"
                  weight="medium"
                  className={active ? 'text-caramelo-12' : 'text-neutral-2'}
                >
                  {item.label}
                </Text>
              )}
              {!collapsed && typeof item.badgeCount === 'number' && (
                <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5">
                  <Text
                    variant="small"
                    weight="semibold"
                    color="neutral-inverse"
                    className="text-[11px]"
                  >
                    {item.badgeCount}
                  </Text>
                </span>
              )}
            </button>
          );
        })}
      </div>
      <Button onClick={onPublish} className="mt-16 h-11">
        {collapsed ? '+' : 'Publicar'}
      </Button>
    </nav>
  );
};

export type SidebarItem = {
  value: string;
  label: string;
  icon: ReactNode;
  badgeCount?: number;
};

export type SidebarProps = {
  logo: { mark: ReactNode; name: string };
  items: SidebarItem[];
  activeValue?: string;
  onPublish?: () => void;
  collapsed?: boolean;
  className?: string;
};
