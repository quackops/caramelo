import { useEffect, useRef, useState } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const warningThresholdMs = 60_000;

const remainingMs = (deadline: number) => Math.max(deadline - Date.now(), 0);

const formatRemaining = (ms: number) => {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const Countdown = ({
  expiresAt,
  onExpire,
  label,
  expiredLabel,
  className,
}: CountdownProps) => {
  const deadline = new Date(expiresAt).getTime();
  const [remaining, setRemaining] = useState(() => remainingMs(deadline));
  const expiredRef = useRef(false);
  const warnedRef = useRef(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    expiredRef.current = false;
    warnedRef.current = false;

    const tick = () => {
      const next = remainingMs(deadline);
      setRemaining(next);

      if (next <= warningThresholdMs && next > 0 && !warnedRef.current) {
        warnedRef.current = true;
        setAnnouncement(formatRemaining(next));
      }

      if (next === 0 && !expiredRef.current) {
        expiredRef.current = true;
        setAnnouncement(expiredLabel ?? '');
        onExpire?.();
      }
    };

    tick();
    const interval = setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [deadline, expiredLabel, onExpire]);

  const expired = remaining === 0;

  return (
    <div className={cn('flex items-baseline gap-1.5', className)}>
      {label && !expired && (
        <Text as="span" variant="small" color="neutral-3">
          {label}
        </Text>
      )}
      <Text
        as="span"
        role="timer"
        aria-live="off"
        variant="small"
        weight="semibold"
        className={cn(
          'tabular-nums',
          expired || remaining <= warningThresholdMs
            ? 'text-warning'
            : 'text-neutral',
        )}
      >
        {expired
          ? (expiredLabel ?? formatRemaining(0))
          : formatRemaining(remaining)}
      </Text>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
};

export type CountdownProps = {
  expiresAt: string | Date;
  onExpire?: () => void;
  label?: string;
  expiredLabel?: string;
  className?: string;
};
