import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Countdown } from './countdown';

const at = (msFromNow: number) => new Date(Date.now() + msFromNow);

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date('2026-08-23T15:00:00Z'));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('Countdown', () => {
  it('renders mm:ss with tabular figures', () => {
    render(<Countdown expiresAt={at(9 * 60_000 + 42_000)} />);
    const timer = screen.getByRole('timer');

    expect(timer).toHaveTextContent('09:42');
    expect(timer).toHaveClass('tabular-nums');
  });

  it('recomputes from the deadline rather than decrementing', () => {
    render(<Countdown expiresAt={at(120_000)} />);

    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('01:30');

    act(() => {
      vi.setSystemTime(new Date('2026-08-23T15:01:30Z'));
      vi.advanceTimersByTime(1000);
    });
    expect(screen.getByRole('timer')).toHaveTextContent('00:29');
  });

  it('does not announce every second', () => {
    render(<Countdown expiresAt={at(600_000)} />);
    expect(screen.getByRole('timer')).toHaveAttribute('aria-live', 'off');
  });

  it('warns in colour below a minute', () => {
    render(<Countdown expiresAt={at(45_000)} />);
    expect(screen.getByRole('timer')).toHaveClass('text-warning');
  });

  it('stays neutral above a minute', () => {
    render(<Countdown expiresAt={at(120_000)} />);
    expect(screen.getByRole('timer')).toHaveClass('text-neutral');
  });

  it('fires onExpire exactly once', () => {
    const onExpire = vi.fn();
    render(<Countdown expiresAt={at(2000)} onExpire={onExpire} />);

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onExpire).toHaveBeenCalledOnce();
  });

  it('fires onExpire for a deadline that passed while hidden', () => {
    const onExpire = vi.fn();
    render(
      <Countdown
        expiresAt={at(-1000)}
        onExpire={onExpire}
        expiredLabel="Expirado"
      />,
    );

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(onExpire).toHaveBeenCalledOnce();
    expect(screen.getByRole('timer')).toHaveTextContent('Expirado');
  });

  it('recomputes when the tab becomes visible again', () => {
    render(<Countdown expiresAt={at(120_000)} />);

    act(() => {
      vi.setSystemTime(new Date('2026-08-23T15:01:00Z'));
      document.dispatchEvent(new Event('visibilitychange'));
    });

    expect(screen.getByRole('timer')).toHaveTextContent('01:00');
  });

  it('cleans its interval up on unmount', () => {
    const onExpire = vi.fn();
    const { unmount } = render(
      <Countdown expiresAt={at(2000)} onExpire={onExpire} />,
    );

    unmount();
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(onExpire).not.toHaveBeenCalled();
  });
});
