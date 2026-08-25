import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';
import { Button } from '../button/button';
import { Text } from '../text/text';

const statusVariants = cva(
  'rounded-lg px-2.5 py-[5px] text-[10px] font-semibold',
  {
    variants: {
      status: {
        review: 'bg-caramelo-4 text-caramelo-12',
        accepted: 'bg-success/16 text-success',
        rejected: 'bg-danger/16 text-danger',
        completed: 'bg-gray-3 text-neutral-3',
      },
    },
  },
);

const statusLabel: Record<
  NonNullable<ApplicationCardProps['status']>,
  string
> = {
  review: 'EM ANÁLISE',
  accepted: 'ACEITA',
  rejected: 'RECUSADA',
  completed: 'CONCLUÍDA',
};

export const ApplicationCard = ({
  applicantName,
  progressLabel,
  status,
  onAccept,
  onViewAnswers,
  className,
}: ApplicationCardProps) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-5 bg-gray-2 p-16',
        className,
      )}
    >
      <div className="mb-3.5 flex items-center gap-3">
        <div className="size-10 flex-none rounded-full bg-gray-3" />
        <div className="flex-1">
          <Text variant="medium" weight="semibold">
            {applicantName}
          </Text>
          <Text
            variant="small"
            weight="medium"
            color="neutral-3"
            className="text-[11px]"
          >
            {progressLabel}
          </Text>
        </div>
        <span className={statusVariants({ status })}>
          {statusLabel[status]}
        </span>
      </div>
      {status === 'review' && (
        <div className="flex gap-2.5">
          <Button onClick={onAccept} className="h-11 flex-1">
            Aceitar
          </Button>
          <Button
            variant="secondary"
            onClick={onViewAnswers}
            className="h-11 flex-1"
          >
            Ver respostas
          </Button>
        </div>
      )}
    </div>
  );
};

export type ApplicationCardProps = VariantProps<typeof statusVariants> & {
  applicantName: string;
  progressLabel: string;
  status: 'review' | 'accepted' | 'rejected' | 'completed';
  onAccept?: () => void;
  onViewAnswers?: () => void;
  className?: string;
};
