import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';

const toneClasses: Record<MapPinTone, string> = {
  default: 'border-brand bg-caramelo-3 text-on-brand-inverse',
  verified: 'border-success bg-caramelo-3 text-success',
};

const tailToneClasses: Record<MapPinTone, string> = {
  default: 'border-brand bg-caramelo-3',
  verified: 'border-success bg-caramelo-3',
};

export const MapPin = ({
  tone = 'default',
  selected,
  thumbnail,
  label,
  type = 'button',
  className,
  ...rest
}: MapPinProps) => {
  return (
    <button
      type={type}
      aria-pressed={selected}
      aria-label={label}
      className={cn(
        'relative inline-flex flex-none cursor-pointer items-center justify-center rounded-full border-2 shadow-raised',
        'motion-safe:transition-all motion-safe:duration-150',
        'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        toneClasses[tone],
        selected
          ? 'size-14 ring-2 ring-neutral ring-offset-2 ring-offset-bg'
          : 'size-11',
        className,
      )}
      {...rest}
    >
      <span className="size-full overflow-hidden rounded-full">
        {thumbnail ?? (
          <span className="flex size-full items-center justify-center">
            <Icon name={tone === 'verified' ? 'shield' : 'map-pin'} size={18} />
          </span>
        )}
      </span>
      <span
        aria-hidden
        className={cn(
          '-bottom-[5px] absolute size-2.5 rotate-45 border-r-2 border-b-2',
          tailToneClasses[tone],
        )}
      />
      {selected && (
        <span
          aria-hidden
          className="-top-1 -right-1 absolute flex size-5 items-center justify-center rounded-full bg-neutral text-neutral-inverse"
        >
          <Icon name="check" size={12} />
        </span>
      )}
    </button>
  );
};

export type MapPinTone = 'default' | 'verified';

export type MapPinProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> & {
  tone?: MapPinTone;
  selected?: boolean;
  thumbnail?: ReactNode;
  label: string;
};
