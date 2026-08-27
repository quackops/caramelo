import {
  Children,
  type KeyboardEvent,
  type ReactNode,
  type UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '../../utils/cn';
import { StepProgress } from '../step-progress/step-progress';
import { Text } from '../text/text';

const settleDelay = 120;

export const Carousel = ({
  index,
  onIndexChange,
  children,
  indicator = 'dots',
  indicatorTone = 'default',
  label,
  className,
}: CarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const settleTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [scrolling, setScrolling] = useState(false);
  const slides = Children.toArray(children);
  const total = slides.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || scrolling) return;

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) return;

    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' });
  }, [index, scrolling]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    setScrolling(true);
    clearTimeout(settleTimeout.current);

    settleTimeout.current = setTimeout(() => {
      setScrolling(false);
      const width = track.clientWidth;
      if (width === 0) return;
      const settled = Math.round(track.scrollLeft / width);
      if (settled !== index) onIndexChange(settled);
    }, settleDelay);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight' && index < total - 1) {
      event.preventDefault();
      onIndexChange(index + 1);
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      onIndexChange(index - 1);
    }
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cn('relative', className)}
    >
      {/* biome-ignore lint/a11y/noStaticElementInteractions: the track is the carousel's keyboard target */}
      <div
        ref={trackRef}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: the track is the carousel's keyboard target
        tabIndex={0}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
        )}
      >
        {slides.map((slide, slideIndex) => (
          // biome-ignore lint/a11y/useSemanticElements: a slide is a labelled group, not a form fieldset
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: slides are positional by definition
            key={slideIndex}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slideIndex + 1} de ${total}`}
            className="w-full shrink-0 snap-center snap-always"
          >
            {slide}
          </div>
        ))}
      </div>
      {indicator === 'dots' && (
        <StepProgress
          variant="dots"
          tone={indicatorTone === 'over-photo' ? 'over-photo' : 'default'}
          total={total}
          current={index + 1}
          className={cn(
            'mt-3 flex justify-center',
            indicatorTone === 'over-photo' &&
              'absolute inset-x-0 bottom-3 mt-0',
          )}
        />
      )}
      {indicator === 'counter' && (
        <span className="absolute right-3 bottom-3 rounded-chip bg-caramelo-1/70 px-2.5 py-1">
          <Text
            as="span"
            variant="small"
            weight="medium"
            className="text-caption text-neutral"
          >
            {index + 1} de {total}
          </Text>
        </span>
      )}
    </section>
  );
};

export type CarouselProps = {
  index: number;
  onIndexChange: (index: number) => void;
  children: ReactNode;
  indicator?: 'dots' | 'counter' | 'none';
  indicatorTone?: 'default' | 'over-photo';
  label: string;
  className?: string;
};
