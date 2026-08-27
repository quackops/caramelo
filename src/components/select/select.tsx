import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode, type SelectHTMLAttributes, useId } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

const selectVariants = cva(
  cn(
    'w-full cursor-pointer appearance-none text-neutral',
    '[&_option]:bg-surface [&_option]:text-neutral',
    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
  ),
  {
    variants: {
      variant: {
        field: cn(
          'h-13 rounded-control border border-gray-6 bg-gray-3 px-16',
          'font-roboto text-body font-light',
          'focus:border-[1.5px] focus:border-brand',
        ),
        ghost: cn(
          'min-h-11 rounded-control border-none bg-transparent py-2 pr-6 pl-0',
          'font-[inherit] text-[length:inherit] leading-[inherit]',
        ),
      },
    },
    defaultVariants: {
      variant: 'field',
    },
  },
);

const chevronPositionByVariant: Record<
  NonNullable<SelectProps['variant']>,
  string
> = {
  field: 'right-16',
  ghost: 'right-0',
};

export const Select = ({
  label,
  variant,
  id,
  className,
  children,
  ...rest
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const v = variant ?? 'field';
  const ghost = v === 'ghost';

  return (
    <div className={ghost ? 'inline-block' : undefined}>
      {label && !ghost && (
        <label htmlFor={selectId} className="mb-[7px] block">
          <Text variant="small" weight="medium" color="neutral-2">
            {label}
          </Text>
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          aria-label={ghost ? label : undefined}
          className={cn(selectVariants({ variant: v }), className)}
          {...rest}
        >
          {children}
        </select>
        <Icon
          name="chevron-down"
          size={ghost ? 16 : 18}
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 text-neutral-3',
            chevronPositionByVariant[v],
          )}
        />
      </div>
    </div>
  );
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> &
  VariantProps<typeof selectVariants> & {
    label?: string;
    children: ReactNode;
  };
