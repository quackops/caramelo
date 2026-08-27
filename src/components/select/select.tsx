import type { ReactNode, SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const Select = ({
  label,
  id,
  className,
  children,
  ...rest
}: SelectProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-[7px] block">
          <Text variant="small" weight="medium" color="neutral-2">
            {label}
          </Text>
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          className={cn(
            'h-13 w-full appearance-none rounded-control border border-gray-6 bg-gray-3 px-16 font-roboto text-[15px] font-light text-neutral',
            '[&_option]:bg-surface [&_option]:text-neutral',
            'focus:border-[1.5px] focus:border-brand',
            'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
            className,
          )}
          {...rest}
        >
          {children}
        </select>
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 font-poppins text-xs text-neutral-3">
          ▾
        </span>
      </div>
    </div>
  );
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  children: ReactNode;
};
