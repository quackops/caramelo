import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

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
        'flex h-13 items-center gap-2.5 rounded-[14px] border px-16',
        focused
          ? 'border-[1.5px] border-brand bg-caramelo-3'
          : 'border-gray-6 bg-gray-3',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-16 rounded-full border-2',
          focused ? 'border-link' : 'border-neutral-3',
        )}
      />
      <input
        value={value}
        className="flex-1 bg-transparent font-roboto text-[15px] font-light text-neutral placeholder:text-neutral-3 focus:outline-none"
        {...rest}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Limpar busca"
          className="flex size-[22px] cursor-pointer items-center justify-center rounded-full bg-gray-6"
        >
          <Text as="span" variant="small" color="neutral">
            ×
          </Text>
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
