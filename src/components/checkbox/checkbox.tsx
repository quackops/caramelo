import {
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  useId,
  useRef,
} from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

export const Checkbox = ({
  label,
  error,
  id,
  className,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const labelId = `${inputId}-label`;
  const messageId = `${inputId}-message`;
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleFromLabel = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a, button, input, select')) {
      return;
    }
    inputRef.current?.click();
  };

  return (
    <div className={className}>
      <div className="flex min-h-11 items-start gap-3 py-[11px]">
        <label htmlFor={inputId} className="flex cursor-pointer">
          <input
            id={inputId}
            ref={inputRef}
            type="checkbox"
            aria-invalid={error ? true : undefined}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={error ? messageId : undefined}
            className="peer sr-only"
            {...rest}
          />
          <span
            aria-hidden
            className={cn(
              'flex size-[22px] flex-none items-center justify-center rounded-lg border-[1.5px] text-transparent',
              error ? 'border-danger' : 'border-border',
              'peer-checked:border-transparent peer-checked:bg-brand peer-checked:text-on-brand-strong',
              'peer-disabled:border-gray-5 peer-disabled:bg-gray-3',
              'peer-focus-visible:outline-2 peer-focus-visible:outline-brand peer-focus-visible:outline-offset-2',
              'motion-safe:transition-colors motion-safe:duration-150',
            )}
          >
            <Icon name="check" size={14} />
          </span>
        </label>
        {label && (
          <Text
            as="span"
            id={labelId}
            variant="small"
            color="neutral-2"
            onClick={toggleFromLabel}
            className="flex-1 cursor-pointer font-roboto text-body font-light"
          >
            {label}
          </Text>
        )}
      </div>
      {error && (
        <Text
          as="p"
          id={messageId}
          variant="small"
          color="danger"
          className="mt-1.5 font-roboto text-caption"
        >
          {error}
        </Text>
      )}
    </div>
  );
};

export type CheckboxProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  label?: ReactNode;
  error?: string;
};
