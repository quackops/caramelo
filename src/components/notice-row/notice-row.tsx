import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const NoticeRow = ({
  message,
  timestamp,
  thumbnail,
  read,
  className,
}: NoticeRowProps) => {
  return (
    <div
      className={cn(
        'flex gap-[13px] p-4',
        read ? 'bg-gray-2' : 'bg-caramelo-3',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'mt-1.5 size-2 flex-none rounded-full',
          read ? 'bg-transparent' : 'bg-brand',
        )}
      />
      <div className="min-w-0 flex-1">
        <Text
          as="p"
          variant="medium"
          weight="regular"
          color={read ? 'neutral-2' : 'neutral'}
        >
          {message}
        </Text>
        <Text
          variant="small"
          weight="medium"
          color="neutral-3"
          className="mt-[3px] text-[11px]"
        >
          {timestamp}
        </Text>
      </div>
      {thumbnail && (
        <div className="size-11 flex-none rounded-xl bg-caramelo-4">
          {thumbnail}
        </div>
      )}
    </div>
  );
};

export type NoticeRowProps = {
  message: ReactNode;
  timestamp: string;
  thumbnail?: ReactNode;
  read?: boolean;
  className?: string;
};
