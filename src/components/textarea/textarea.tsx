import {
  type ChangeEvent,
  type TextareaHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const autoGrowMaxHeight = 200;
const countAnnounceDelay = 600;

export const Textarea = ({
  label,
  error,
  hint,
  showCount,
  autoGrow,
  id,
  rows = 3,
  className,
  onChange,
  ...rest
}: TextareaProps) => {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const messageId = `${textareaId}-message`;
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  const controlledValue = rest.value;
  const [uncontrolledLength, setUncontrolledLength] = useState(
    String(rest.defaultValue ?? '').length,
  );
  const length =
    controlledValue === undefined
      ? uncontrolledLength
      : String(controlledValue).length;

  const { maxLength } = rest;
  const limited = showCount && maxLength !== undefined;
  const nearLimit = limited && length >= maxLength * 0.9;

  const [announcedLength, setAnnouncedLength] = useState(length);

  useEffect(() => {
    if (!limited) return;
    const timeout = setTimeout(
      () => setAnnouncedLength(length),
      countAnnounceDelay,
    );
    return () => clearTimeout(timeout);
  }, [length, limited]);

  const grow = () => {
    const field = fieldRef.current;
    if (!autoGrow || !field) return;
    field.style.height = 'auto';
    field.style.height = `${Math.min(field.scrollHeight, autoGrowMaxHeight)}px`;
  };

  useEffect(grow);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (controlledValue === undefined) {
      setUncontrolledLength(event.target.value.length);
    }
    grow();
    onChange?.(event);
  };

  return (
    <div>
      {label && (
        <label htmlFor={textareaId} className="mb-[7px] block">
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
      <textarea
        id={textareaId}
        ref={fieldRef}
        rows={rows}
        onChange={handleChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(
          'w-full resize-none rounded-control border bg-gray-3 px-16 py-3 font-roboto text-body font-light text-neutral placeholder:text-neutral-3',
          'focus:border-[1.5px] focus:border-brand focus:bg-caramelo-3',
          'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
          autoGrow && 'overflow-y-auto',
          error && 'border-[1.5px] border-danger bg-danger/10',
          !error && 'border-gray-6',
          className,
        )}
        {...rest}
      />
      {(error || hint || limited) && (
        <div className="mt-1.5 flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
          <Text
            as="p"
            id={messageId}
            variant="small"
            color={error ? 'danger' : 'neutral-3'}
            className="font-roboto text-caption"
          >
            {error ?? hint}
          </Text>
          {limited && (
            <Text
              as="span"
              aria-hidden
              variant="small"
              weight="medium"
              color={nearLimit ? 'danger' : 'neutral-3'}
              className="ml-auto text-caption tabular-nums"
            >
              {length}/{maxLength}
            </Text>
          )}
        </div>
      )}
      {limited && (
        <span aria-live="polite" className="sr-only">
          {announcedLength} de {maxLength} caracteres
        </span>
      )}
    </div>
  );
};

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  autoGrow?: boolean;
};
