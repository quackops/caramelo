import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { type FilledIconName, Icon } from '../icon/icon';
import { Text } from '../text/text';

const markByProvider: Record<SocialProvider, FilledIconName> = {
  apple: 'apple',
  google: 'google',
};

const markToneByProvider: Record<SocialProvider, string> = {
  apple: 'text-neutral',
  google: 'text-mark-google',
};

export const SocialButton = ({
  provider,
  label,
  compact,
  className,
  type = 'button',
  ...rest
}: SocialButtonProps) => {
  return (
    <button
      type={type}
      aria-label={compact ? label : undefined}
      className={cn(
        'inline-flex h-13 cursor-pointer items-center justify-center gap-2.5 rounded-control border border-border bg-surface-2 px-5',
        'motion-safe:active:scale-95 motion-safe:transition-all motion-safe:duration-150',
        'disabled:cursor-not-allowed disabled:border-gray-5 disabled:opacity-60 disabled:active:scale-100',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        className,
      )}
      {...rest}
    >
      <Icon
        name={markByProvider[provider]}
        size={20}
        className={cn('flex-none', markToneByProvider[provider])}
      />
      {!compact && (
        <Text
          as="span"
          variant="medium"
          weight="medium"
          color="neutral"
          className="whitespace-nowrap"
        >
          {label}
        </Text>
      )}
    </button>
  );
};

export type SocialProvider = 'apple' | 'google';

export type SocialButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  provider: SocialProvider;
  label?: string;
  compact?: boolean;
};
