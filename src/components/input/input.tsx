import { type ComponentProps, type ReactNode, useId } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const Input = ({
  label,
  error,
  hint,
  leading,
  trailing,
  id,
  className,
  ...rest
}: InputProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  return (
    <div>
      {label && (
        <label htmlFor={inputId} className="mb-[7px] block">
          <Text
            variant="small"
            weight="medium"
            color="neutral-2"
            className="text-label"
          >
            {label}
          </Text>
        </label>
      )}
      <div
        className={cn(
          'flex h-13 w-full items-center rounded-control border bg-gray-3',
          'focus-within:border-[1.5px] focus-within:border-brand focus-within:bg-caramelo-3',
          'focus-within:outline-2 focus-within:outline-brand focus-within:outline-offset-2',
          error && 'border-[1.5px] border-danger bg-danger/10',
          !error && 'border-gray-6',
        )}
      >
        {leading && (
          <span
            aria-hidden
            className="flex items-center pl-16 font-roboto text-body font-light text-neutral-3"
          >
            {leading}
          </span>
        )}
        <input
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent px-16 font-roboto text-body font-light text-neutral placeholder:text-neutral-3',
            'focus:outline-none',
            leading && 'pl-2',
            trailing && 'pr-2',
            className,
          )}
          {...rest}
        />
        {trailing && (
          <span className="flex items-center pr-2 text-neutral-3">
            {trailing}
          </span>
        )}
      </div>
      {(error || hint) && (
        <Text
          as="p"
          id={messageId}
          variant="small"
          color={error ? 'danger' : 'neutral-3'}
          className="mt-1.5 font-roboto text-caption"
        >
          {error ?? hint}
        </Text>
      )}
    </div>
  );
};

export type InputProps = ComponentProps<'input'> & {
  label?: string;
  error?: string;
  hint?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};
