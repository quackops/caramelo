import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const SummaryRow = ({
  label,
  value,
  action,
  emphasis,
  className,
  ...rest
}: SummaryRowProps) => {
  return (
    <div
      className={cn(
        'flex flex-wrap items-baseline justify-between gap-x-16 gap-y-1 py-2.5',
        emphasis && 'mt-1 border-t border-border pt-3.5',
        className,
      )}
      {...rest}
    >
      <Text as="dt" variant="small" color="neutral-3" className="shrink-0">
        {label}
      </Text>
      <dd className="ml-auto flex min-w-0 items-baseline gap-3">
        <Text
          as="span"
          variant={emphasis ? 'large' : 'small'}
          weight={emphasis ? 'semibold' : 'regular'}
          color="neutral"
          className={cn('text-right', !emphasis && 'font-roboto')}
        >
          {value}
        </Text>
        {action}
      </dd>
    </div>
  );
};

const Group = ({ children, className, ...rest }: GroupProps) => (
  <dl className={cn('m-0', className)} {...rest}>
    {children}
  </dl>
);

SummaryRow.Group = Group;

type GroupProps = HTMLAttributes<HTMLDListElement> & {
  children: ReactNode;
};

export type SummaryRowProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'children'
> & {
  label: string;
  value: ReactNode;
  action?: ReactNode;
  emphasis?: boolean;
};
