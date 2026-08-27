import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const Divider = ({
  label,
  orientation = 'horizontal',
  className,
  ...rest
}: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <hr
        aria-hidden
        className={cn('h-auto w-px self-stretch border-0 bg-border', className)}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      // biome-ignore lint/a11y/useSemanticElements: an <hr> cannot contain the label
      // biome-ignore lint/a11y/useFocusableInteractive: a labelled rule is a static separator, not a splitter
      <div
        // biome-ignore lint/a11y/useAriaPropsForRole: aria-valuenow only applies to a focusable splitter
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-16', className)}
        {...rest}
      >
        <span className="h-px flex-1 bg-border" />
        <Text
          as="span"
          variant="small"
          color="neutral-3"
          className="text-micro"
        >
          {label}
        </Text>
        <span className="h-px flex-1 bg-border" />
      </div>
    );
  }

  return <hr className={cn('h-px border-0 bg-border', className)} {...rest} />;
};

export type DividerProps = HTMLAttributes<HTMLElement> & {
  label?: string;
  orientation?: 'horizontal' | 'vertical';
};
