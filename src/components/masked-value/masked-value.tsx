import { cn } from '../../utils/cn';
import { IconButton } from '../icon-button/icon-button';
import { Text } from '../text/text';

const spokenValue = (value: string) => {
  const trailingDigits = value.match(/(\d+)\D*$/);
  return trailingDigits ? `terminado em ${trailingDigits[1]}` : value;
};

export const MaskedValue = ({
  value,
  revealedValue,
  hint,
  revealable,
  revealed,
  onRevealChange,
  revealLabel = 'Mostrar valor',
  hideLabel = 'Ocultar valor',
  className,
}: MaskedValueProps) => {
  const shown = revealed && revealedValue ? revealedValue : value;
  const accessibleValue =
    revealed && revealedValue ? revealedValue : spokenValue(value);

  return (
    <div
      className={cn('flex flex-wrap items-center gap-x-2 gap-y-0.5', className)}
    >
      <Text
        as="span"
        variant="small"
        color="neutral"
        aria-label={hint ? `${accessibleValue}, ${hint}` : accessibleValue}
        className="font-mono tabular-nums"
      >
        {shown}
      </Text>
      {hint && (
        <Text
          as="span"
          aria-hidden
          variant="small"
          weight="medium"
          color="neutral-3"
          className="text-micro"
        >
          {hint}
        </Text>
      )}
      {revealable && (
        <IconButton
          icon="eye"
          aria-pressed={revealed}
          aria-label={revealed ? hideLabel : revealLabel}
          onClick={() => onRevealChange?.(!revealed)}
          className="size-8 border-none bg-transparent text-neutral-3"
        />
      )}
    </div>
  );
};

export type MaskedValueProps = {
  value: string;
  revealedValue?: string;
  hint?: string;
  revealable?: boolean;
  revealed?: boolean;
  onRevealChange?: (revealed: boolean) => void;
  revealLabel?: string;
  hideLabel?: string;
  className?: string;
};
