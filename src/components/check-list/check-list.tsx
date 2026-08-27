import { cn } from '../../utils/cn';
import { Icon, type IconName } from '../icon/icon';
import { Text } from '../text/text';

const glyphByState: Record<CheckListItem['state'], IconName | null> = {
  yes: 'check',
  no: 'x',
  unknown: null,
  required: 'check-circle',
};

const glyphToneByState: Record<CheckListItem['state'], string> = {
  yes: 'text-success',
  no: 'text-neutral-3',
  unknown: 'text-neutral-3',
  required: 'text-neutral-2',
};

const labelToneByState: Record<CheckListItem['state'], string> = {
  yes: 'text-neutral',
  no: 'text-neutral-3',
  unknown: 'text-neutral-3',
  required: 'text-neutral',
};

export const CheckList = ({ items, className }: CheckListProps) => {
  return (
    <ul className={cn('flex flex-col gap-2', className)}>
      {items.map((item) => {
        const glyph = glyphByState[item.state];

        return (
          <li
            key={item.id}
            className={cn(
              'flex min-h-8 items-center gap-2.5',
              item.state === 'unknown' &&
                'w-fit rounded-chip border border-dashed border-gray-7 px-2.5 py-1',
            )}
          >
            {glyph && (
              <Icon
                name={glyph}
                size={16}
                className={cn('flex-none', glyphToneByState[item.state])}
              />
            )}
            <Text
              as="span"
              variant="small"
              className={labelToneByState[item.state]}
            >
              {item.label}
              {item.state === 'unknown' && ' · não sei'}
            </Text>
          </li>
        );
      })}
    </ul>
  );
};

export type CheckListItem = {
  id: string;
  label: string;
  state: 'yes' | 'no' | 'unknown' | 'required';
};

export type CheckListProps = {
  items: CheckListItem[];
  className?: string;
};
