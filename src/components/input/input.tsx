import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const Input = ({ label, error, id, className, ...rest }: InputProps) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-[7px] block">
          <Text
            variant="small"
            weight="medium"
            color="neutral-2"
            className="text-[13px]"
          >
            {label}
          </Text>
        </label>
      )}
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        className={cn(
          'h-13 w-full rounded-control border bg-gray-3 px-16 font-roboto text-[15px] font-light text-neutral placeholder:text-neutral-3',
          'focus:border-[1.5px] focus:border-brand focus:bg-caramelo-3',
          'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          error && 'border-[1.5px] border-danger bg-danger/10',
          !error && 'border-gray-6',
          className,
        )}
        {...rest}
      />
      {error && (
        <Text
          as="p"
          variant="small"
          color="danger"
          className="mt-1.5 font-roboto text-xs"
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};
