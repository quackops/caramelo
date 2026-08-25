import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const Tag = ({ children, className, ...rest }: TagProps) => {
  return (
    <span
      className={cn('rounded-[7px] bg-gray-3 px-[9px] py-1', className)}
      {...rest}
    >
      <Text
        variant="small"
        weight="medium"
        color="neutral-2"
        className="text-[11px]"
      >
        {children}
      </Text>
    </span>
  );
};

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};
