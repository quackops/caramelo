import {
  createContext,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  useContext,
  useId,
} from 'react';
import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

const GroupNameContext = createContext<string | undefined>(undefined);

export const OptionCard = ({
  title,
  description,
  icon,
  name,
  className,
  ...rest
}: OptionCardProps) => {
  const groupName = useContext(GroupNameContext);

  return (
    <label
      className={cn(
        'relative flex min-h-[72px] cursor-pointer items-center gap-3 rounded-card border border-border bg-surface p-16 text-neutral',
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
      {icon && <Icon name={icon} size={22} className="flex-none" />}
      <span className="min-w-0 flex-1">
        <Text
          as="span"
          variant="small"
          weight="semibold"
          className="block text-inherit"
        >
          {title}
        </Text>
        {description && (
          <Text
            as="span"
            variant="small"
            color="neutral-3"
            className="mt-0.5 block font-roboto text-micro"
          >
            {description}
          </Text>
        )}
      </span>
      <Icon
        name="check"
        size={18}
        className="flex-none opacity-0 peer-checked:opacity-100 motion-safe:transition-opacity motion-safe:duration-150"
      />
    </label>
  );
};

const Group = ({ label, children, className, ...rest }: GroupProps) => {
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
          className="flex flex-col gap-2.5"
        >
          {children}
        </div>
      </div>
    </GroupNameContext.Provider>
  );
};

OptionCard.Group = Group;

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  children: ReactNode;
};

export type OptionCardProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  title: string;
  description?: string;
  icon?: IconName;
};
