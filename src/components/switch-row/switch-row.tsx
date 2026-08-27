import { type HTMLAttributes, type ReactNode, useId } from 'react';
import { cn } from '../../utils/cn';
import { Switch, type SwitchProps } from '../switch/switch';
import { Text } from '../text/text';

export const SwitchRow = ({
  label,
  description,
  className,
  ...rest
}: SwitchRowProps) => {
  const inputId = useId();
  const descriptionId = `${inputId}-description`;

  return (
    <div
      className={cn(
        'flex min-h-11 items-center justify-between gap-16 py-16',
        className,
      )}
    >
      <label htmlFor={inputId} className="min-w-0 flex-1 cursor-pointer">
        <Text as="span" variant="small" color="neutral" className="block">
          {label}
        </Text>
        {description && (
          <Text
            as="span"
            id={descriptionId}
            variant="small"
            color="neutral-3"
            className="mt-1 block text-micro"
          >
            {description}
          </Text>
        )}
      </label>
      <Switch
        id={inputId}
        aria-describedby={description ? descriptionId : undefined}
        {...rest}
      />
    </div>
  );
};

const Group = ({ children, className, ...rest }: GroupProps) => (
  <div className={cn('divide-y divide-gray-4', className)} {...rest}>
    {children}
  </div>
);

SwitchRow.Group = Group;

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export type SwitchRowProps = Omit<SwitchProps, 'id'> & {
  label: string;
  description?: string;
};
