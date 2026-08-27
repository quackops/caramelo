import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

const stateWording: Record<TimelineEvent['state'], string> = {
  done: 'concluído',
  current: 'etapa atual',
  pending: 'pendente',
};

const markerClasses: Record<TimelineEvent['state'], string> = {
  done: 'bg-brand text-on-brand-strong',
  current: 'border-2 border-brand bg-bg text-transparent',
  pending: 'bg-gray-6 text-transparent',
};

export const StatusTimeline = ({
  events,
  marker = 'check',
  className,
}: StatusTimelineProps) => {
  return (
    <ol className={cn('flex flex-col', className)}>
      {events.map((event, index) => {
        const next = events[index + 1];

        return (
          <li key={event.id} className="flex gap-3">
            <div className="flex flex-none flex-col items-center">
              <span
                aria-hidden
                className={cn(
                  'flex size-6 flex-none items-center justify-center rounded-full',
                  markerClasses[event.state],
                )}
              >
                {marker === 'check' ? (
                  <Icon name="check" size={14} />
                ) : (
                  <Text
                    as="span"
                    variant="small"
                    weight="semibold"
                    className={cn(
                      'text-caption',
                      event.state === 'done'
                        ? 'text-inherit'
                        : 'text-neutral-2',
                    )}
                  >
                    {index + 1}
                  </Text>
                )}
              </span>
              {next && (
                <span
                  className={cn(
                    'w-0.5 flex-1',
                    next.state === 'pending' ? 'bg-gray-6' : 'bg-brand',
                  )}
                />
              )}
            </div>
            <div className="min-w-0 flex-1 pb-16">
              <Text
                as="p"
                variant="small"
                weight="medium"
                color={event.state === 'pending' ? 'neutral-3' : 'neutral'}
              >
                {event.title}
                <span className="sr-only"> · {stateWording[event.state]}</span>
              </Text>
              {(event.timestamp || event.detail) && (
                <Text
                  as="p"
                  variant="small"
                  color="neutral-3"
                  className="mt-0.5 font-roboto text-micro"
                >
                  {[event.timestamp, event.detail].filter(Boolean).join(' · ')}
                </Text>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export type TimelineEvent = {
  id: string;
  title: string;
  detail?: string;
  timestamp?: string;
  state: 'done' | 'current' | 'pending';
};

export type StatusTimelineProps = {
  events: TimelineEvent[];
  marker?: 'check' | 'number';
  className?: string;
};
