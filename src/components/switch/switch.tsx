import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export const Switch = ({ checked, className, id, ...rest }: SwitchProps) => {
  return (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-block h-32 w-13 cursor-pointer',
        className,
      )}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        checked={checked}
        aria-checked={checked}
        className="peer sr-only"
        {...rest}
      />
      <span
        className={cn(
          'absolute inset-0 rounded-full transition-colors duration-200 ease-out',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2',
          checked ? 'bg-brand' : 'bg-gray-6',
        )}
      />
      <span
        className={cn(
          'absolute top-[3px] h-[26px] w-[26px] rounded-full',
          'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out',
          'motion-safe:peer-active:w-[32px]',
          checked ? 'right-[3px] bg-gray-1' : 'left-[3px] bg-gray-12',
        )}
      />
    </label>
  );
};

export type SwitchProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'role'
>;
