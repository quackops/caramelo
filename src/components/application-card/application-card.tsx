import { cn } from '../../utils/cn';
import { Avatar } from '../avatar/avatar';
import { Badge } from '../badge/badge';
import { Button } from '../button/button';
import { Tag } from '../tag/tag';
import { Text } from '../text/text';

export const ApplicationCard = ({
  applicantName,
  avatarSrc,
  meta,
  status,
  unread,
  answers = [],
  message,
  progressLabel,
  statusDetail,
  acceptLabel = 'Aceitar e conversar',
  rejectLabel = 'Recusar',
  viewAnswersLabel = 'Ver respostas',
  onAccept,
  onReject,
  onViewAnswers,
  className,
}: ApplicationCardProps) => {
  const open = status === 'review';
  const detail = statusDetail ?? progressLabel;

  return (
    <div
      className={cn(
        'rounded-2xl border border-gray-5 bg-gray-2 p-16',
        className,
      )}
    >
      <div className={cn('flex items-center gap-3', open && 'mb-3.5')}>
        <Avatar
          size="small"
          src={avatarSrc}
          alt={applicantName}
          initials={applicantName.slice(0, 1)}
          className="flex-none"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <Text
              as="span"
              variant="medium"
              weight="semibold"
              className="text-[14px]"
            >
              {applicantName}
            </Text>
            {unread && <Badge variant="new" size="compact" />}
          </div>
          {meta && (
            <Text
              as="p"
              variant="small"
              weight="medium"
              color="neutral-3"
              className="text-micro"
            >
              {meta}
            </Text>
          )}
          {detail && (
            <Text
              as="p"
              variant="small"
              weight="medium"
              color="neutral-3"
              className="text-[11px]"
            >
              {detail}
            </Text>
          )}
        </div>
        <Badge variant={status} size="compact" className="flex-none" />
      </div>
      {open && answers.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {answers.map((answer) => (
            <Tag key={answer}>{answer}</Tag>
          ))}
        </div>
      )}
      {open && message && (
        <Text
          as="p"
          variant="small"
          color="neutral-2"
          className="mb-3.5 rounded-control bg-gray-3 p-3 font-roboto text-body font-light"
        >
          {message}
        </Text>
      )}
      {open && (
        <div className="flex flex-wrap gap-2.5">
          {onAccept && (
            <Button onClick={onAccept} className="h-11 flex-1">
              {acceptLabel}
            </Button>
          )}
          {onViewAnswers && (
            <Button
              variant="secondary"
              onClick={onViewAnswers}
              className="h-11 flex-1"
            >
              {viewAnswersLabel}
            </Button>
          )}
          {onReject && (
            <Button variant="ghost" onClick={onReject} className="h-11">
              {rejectLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export type ApplicationCardStatus =
  | 'review'
  | 'accepted'
  | 'rejected'
  | 'interview'
  | 'approved'
  | 'withdrawn'
  | 'expired'
  | 'completed';

export type ApplicationCardProps = {
  applicantName: string;
  avatarSrc?: string;
  meta?: string;
  status: ApplicationCardStatus;
  unread?: boolean;
  answers?: string[];
  message?: string;
  progressLabel?: string;
  statusDetail?: string;
  acceptLabel?: string;
  rejectLabel?: string;
  viewAnswersLabel?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onViewAnswers?: () => void;
  className?: string;
};
