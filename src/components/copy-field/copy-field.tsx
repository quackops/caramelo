import { type ReactNode, useEffect, useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../button/button';
import { Icon } from '../icon/icon';
import { IconButton } from '../icon-button/icon-button';
import { Text } from '../text/text';

const copiedResetDelay = 2000;

const legacyCopy = (value: string) => {
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();

  const copied = document.execCommand('copy');
  document.body.removeChild(field);

  if (!copied) throw new Error('copy rejected');
};

export const CopyField = ({
  value,
  label,
  display,
  variant = 'code',
  copyLabel = 'Copiar',
  copiedLabel = 'Copiado',
  failureLabel = 'Não foi possível copiar. Selecione e copie manualmente.',
  onCopy,
  className,
}: CopyFieldProps) => {
  const valueId = useId();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), copiedResetDelay);
    return () => clearTimeout(timeout);
  }, [copied]);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        legacyCopy(value);
      }
      setFailed(false);
      setCopied(true);
      onCopy?.(value);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  };

  const status = (
    <>
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ''}
      </span>
      {failed && (
        <Text
          as="p"
          role="alert"
          variant="small"
          color="danger"
          className="mt-2 font-roboto text-caption"
        >
          {failureLabel}
        </Text>
      )}
    </>
  );

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <Text
          as="span"
          id={valueId}
          variant="small"
          color="neutral-3"
          className="min-w-0 font-mono text-micro [overflow-wrap:anywhere]"
        >
          {display ?? value}
        </Text>
        <IconButton
          icon={copied ? 'check' : 'copy'}
          aria-label={copied ? copiedLabel : copyLabel}
          onClick={copy}
          className="size-8 border-none bg-transparent text-neutral-3"
        />
        {status}
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={className}>
        {label && (
          <Text
            as="p"
            variant="small"
            weight="medium"
            color="neutral-2"
            className="mb-[7px] text-label"
          >
            {label}
          </Text>
        )}
        <div
          id={valueId}
          className="rounded-photo rounded-bl-[4px] bg-surface-2 p-16 font-roboto text-body font-light text-neutral [overflow-wrap:anywhere]"
        >
          {display ?? value}
        </div>
        <Button variant="ghost" onClick={copy} className="mt-1">
          {copied ? copiedLabel : copyLabel}
        </Button>
        {status}
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <Text
          as="p"
          variant="small"
          weight="medium"
          color="neutral-2"
          className="mb-[7px] text-label"
        >
          {label}
        </Text>
      )}
      <div
        id={valueId}
        className="max-h-[6.5rem] overflow-y-auto rounded-control border border-gray-6 bg-surface-2 p-16 font-mono text-caption text-neutral [overflow-wrap:anywhere]"
      >
        {display ?? value}
      </div>
      <Button onClick={copy} className="mt-2.5 w-full">
        {copied ? (
          <span className="inline-flex items-center gap-2">
            <Icon name="check" size={18} />
            {copiedLabel}
          </span>
        ) : (
          copyLabel
        )}
      </Button>
      {status}
    </div>
  );
};

export type CopyFieldProps = {
  value: string;
  label?: string;
  display?: ReactNode;
  variant?: 'code' | 'text' | 'inline';
  copyLabel?: string;
  copiedLabel?: string;
  failureLabel?: string;
  onCopy?: (value: string) => void;
  className?: string;
};
