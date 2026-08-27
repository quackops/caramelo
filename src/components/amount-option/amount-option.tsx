import {
  createContext,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useContext,
  useId,
} from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

const GroupNameContext = createContext<string | undefined>(undefined);

const columnClasses: Record<2 | 3, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
};

export const AmountOption = ({
  amountLabel,
  equivalence,
  name,
  className,
  ...rest
}: AmountOptionProps) => {
  const groupName = useContext(GroupNameContext);

  return (
    <label
      className={cn(
        'relative flex min-h-[64px] cursor-pointer flex-col items-center justify-center rounded-control border border-border bg-surface-2 px-2 py-2.5 text-center text-neutral',
        'motion-safe:transition-[color,background-color,border-color,transform] motion-safe:duration-150 motion-safe:ease-out',
        'motion-safe:active:scale-[0.97]',
        'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand has-[:focus-visible]:outline-offset-2',
        'has-[:checked]:border-caramelo-7 has-[:checked]:bg-caramelo-4 has-[:checked]:text-on-brand-inverse',
        'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-60',
        className,
      )}
    >
      <input
        type="radio"
        name={name ?? groupName}
        className="peer sr-only"
        {...rest}
      />
      <Text
        as="span"
        variant="large"
        weight="semibold"
        className="block text-inherit"
      >
        {amountLabel}
      </Text>
      {equivalence && (
        <Text
          as="span"
          variant="small"
          color="neutral-3"
          className="mt-0.5 block font-roboto text-badge"
        >
          {equivalence}
        </Text>
      )}
      <Icon
        name="check"
        size={14}
        className="absolute top-1.5 right-1.5 opacity-0 peer-checked:opacity-100 motion-safe:transition-opacity motion-safe:duration-150"
      />
    </label>
  );
};

const Group = ({
  label,
  columns = 3,
  children,
  className,
  ...rest
}: GroupProps) => {
  const name = useId();

  return (
    <GroupNameContext.Provider value={name}>
      <div className={className} {...rest}>
        {label && (
          <Text
            as="p"
            variant="small"
            weight="medium"
            color="neutral-2"
            className="mb-[9px] text-label"
          >
            {label}
          </Text>
        )}
        <div
          role="radiogroup"
          aria-label={label}
          className={cn('grid gap-2', columnClasses[columns])}
        >
          {children}
        </div>
      </div>
    </GroupNameContext.Provider>
  );
};

AmountOption.Group = Group;

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  columns?: 2 | 3;
  children: ReactNode;
};

export type AmountOptionProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  amountLabel: string;
  equivalence?: string;
};
