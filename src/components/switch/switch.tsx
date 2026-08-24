import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// Toggle: 52x32 track, 26px knob. On = brand track with gray-1 knob
// (on-brand-strong). Off = neutral track with gray-12 knob.
export const Switch = ({ checked, className, id, ...rest }: SwitchProps) => {
  return (
    <label
      htmlFor={id}
      className={cn('relative inline-block h-8 w-13 cursor-pointer', className)}
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
          'absolute inset-0 rounded-full transition-colors',
          checked ? 'bg-brand' : 'bg-gray-6',
        )}
      />
      <span
        className={cn(
          'absolute top-[3px] size-[26px] rounded-full transition-all',
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
