import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

const outerRadius = 74.25;
const innerRadius = 58.25;

export const OrbitalRings = ({
  size = 150,
  animated,
  children,
  className,
}: OrbitalRingsProps) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        'relative inline-flex flex-none items-center justify-center',
        className,
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 150 150"
        fill="none"
        className={cn(
          'absolute inset-0 size-full',
          animated && 'motion-safe:animate-orbit',
        )}
      >
        <circle
          cx="75"
          cy="75"
          r={outerRadius}
          stroke="var(--color-caramelo-7)"
          strokeWidth="1.5"
        />
        <circle
          cx="75"
          cy="75"
          r={innerRadius}
          stroke="var(--color-caramelo-6)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      </svg>
      {children}
    </div>
  );
};

export type OrbitalRingsProps = {
  size?: number;
  animated?: boolean;
  children?: ReactNode;
  className?: string;
};
