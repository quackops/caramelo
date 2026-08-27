import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';

export const SearchBar = ({
  value,
  focused,
  onClear,
  className,
  ...rest
}: SearchBarProps) => {
  return (
    <div
      className={cn(
        'flex h-13 items-center gap-2.5 rounded-control border px-16',
        'focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-2',
        focused
          ? 'border-[1.5px] border-brand bg-caramelo-3'
          : 'border-gray-6 bg-gray-3',
        className,
      )}
    >
      <Icon
        name="search"
        size={16}
        className={focused ? 'text-link' : 'text-neutral-3'}
      />
      <input
        value={value}
        className="flex-1 bg-transparent font-roboto text-[15px] font-light text-neutral placeholder:text-neutral-3 focus:outline-none"
        {...rest}
      />
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpar busca"
          tabIndex={value ? 0 : -1}
          aria-hidden={!value}
          className={cn(
            'flex size-[22px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-6 text-neutral',
            !value && 'pointer-events-none invisible',
          )}
        >
          <Icon name="x" size={12} />
        </button>
      )}
    </div>
  );
};

export type SearchBarProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value'
> & {
  value?: string;
  focused?: boolean;
  onClear?: () => void;
};
