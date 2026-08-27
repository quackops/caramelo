import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const NoticeRow = ({
  message,
  timestamp,
  hint,
  thumbnail,
  read,
  onClick,
  className,
}: NoticeRowProps) => {
  const content = (
    <>
      <span
        aria-hidden
        className={cn(
          'mt-1.5 size-2 flex-none rounded-full',
          read ? 'bg-transparent' : 'bg-brand',
        )}
      />
      {!read && <span className="sr-only">não lido</span>}
      <div className="min-w-0 flex-1 text-left">
        <Text
          as="p"
          variant="medium"
          weight="regular"
          color={read ? 'neutral-2' : 'neutral'}
          className="font-roboto text-[14px]"
        >
          {message}
        </Text>
        <Text
          as="p"
          variant="small"
          weight="medium"
          color="neutral-3"
          className="mt-[3px] text-caption"
        >
          {timestamp}
          {hint && <span className="text-micro"> · {hint}</span>}
        </Text>
      </div>
      {thumbnail && (
        <div className="size-11 flex-none rounded-xl bg-caramelo-4">
          {thumbnail}
        </div>
      )}
    </>
  );

  const rowClassName = cn(
    'flex w-full gap-[13px] px-16 py-[15px]',
    read ? 'bg-gray-2' : 'bg-caramelo-3',
    onClick &&
      cn(
        'cursor-pointer text-left hover:bg-gray-3',
        'motion-safe:transition-colors motion-safe:duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
      ),
    className,
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={rowClassName}>
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
};

export type NoticeRowProps = {
  message: ReactNode;
  timestamp: string;
  hint?: string;
  thumbnail?: ReactNode;
  read?: boolean;
  onClick?: () => void;
  className?: string;
};
