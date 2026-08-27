import { cva, type VariantProps } from 'class-variance-authority';
import { type ReactNode, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

const titleVariants = cva('mb-2', {
  variants: {
    size: {
      screen: 'text-display',
      sheet: 'text-title',
    },
    tone: {
      success: 'text-neutral',
      neutral: 'text-neutral',
      error: 'text-danger',
    },
  },
  defaultVariants: {
    size: 'screen',
    tone: 'neutral',
  },
});

export const ResultScreen = ({
  tone,
  size,
  illustration,
  title,
  description,
  children,
  actions,
  footnote,
  className,
}: ResultScreenProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center px-20 py-24 text-center',
        className,
      )}
    >
      {illustration && <div className="mb-16">{illustration}</div>}
      <Text
        as="h1"
        ref={titleRef}
        tabIndex={-1}
        weight="semibold"
        className={cn(
          titleVariants({ size, tone }),
          'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        )}
      >
        {title}
      </Text>
      {description && (
        <Text
          as="div"
          variant="small"
          color="neutral-2"
          className="font-roboto text-body font-light"
        >
          {description}
        </Text>
      )}
      {children && <div className="mt-16 w-full text-left">{children}</div>}
      <div className="mt-16 flex w-full flex-col gap-2.5 [&>button]:w-full">
        {actions}
      </div>
      {footnote && (
        <Text
          as="div"
          variant="small"
          color="neutral-3"
          className="mt-3.5 font-roboto text-caption"
        >
          {footnote}
        </Text>
      )}
    </div>
  );
};

export type ResultScreenProps = VariantProps<typeof titleVariants> & {
  illustration?: ReactNode;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  actions: ReactNode;
  footnote?: ReactNode;
  className?: string;
};
