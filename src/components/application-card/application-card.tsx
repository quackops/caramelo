import { cn } from '../../utils/cn';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Text } from '../text/text';

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
          <Text
            as="p"
            variant="medium"
            weight="semibold"
            className="text-[14px]"
          >
            {applicantName}
          </Text>
          <Text
            as="p"
            variant="small"
            weight="medium"
            color="neutral-3"
            className="text-[11px]"
          >
            {progressLabel}
          </Text>
        </div>
        <Badge variant={status} />
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

export type ApplicationCardProps = {
  applicantName: string;
  progressLabel: string;
  status: 'review' | 'accepted' | 'rejected' | 'completed';
  onAccept?: () => void;
  onViewAnswers?: () => void;
  className?: string;
};
