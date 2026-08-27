import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { Button } from '../button/button';

export const ExpandableText = ({
  children,
  lines = 3,
  expandLabel = 'Ler mais',
  collapseLabel = 'Ler menos',
  expanded,
  onExpandedChange,
  className,
}: ExpandableTextProps) => {
  const textId = useId();
  const textRef = useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = expanded ?? internalExpanded;

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const measure = () => {
      setOverflows(element.scrollHeight > element.clientHeight + 1);
    };

    measure();

    if (typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next = !isExpanded;
    if (expanded === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
  };

  return (
    <div className={className}>
      <p
        ref={textRef}
        id={textId}
        style={{ '--clamp-lines': lines } as CSSProperties}
        className={cn(
          'font-roboto text-body font-light text-neutral-2',
          !isExpanded &&
            'overflow-hidden [-webkit-box-orient:vertical] [-webkit-line-clamp:var(--clamp-lines)] [display:-webkit-box]',
        )}
      >
        {children}
      </p>
      {(overflows || isExpanded) && (
        <Button
          variant="ghost"
          onClick={toggle}
          aria-expanded={isExpanded}
          aria-controls={textId}
          className="px-0"
        >
          {isExpanded ? collapseLabel : expandLabel}
        </Button>
      )}
    </div>
  );
};

export type ExpandableTextProps = {
  children: ReactNode;
  lines?: number;
  expandLabel?: string;
  collapseLabel?: string;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
};
