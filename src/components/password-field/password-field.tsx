import { useId, useState } from 'react';
import { cn } from '../../utils/cn';
import { IconButton } from '../icon-button/icon-button';
import { Input, type InputProps } from '../input/input';
import { Text } from '../text/text';

const strengthSegments = [1, 2, 3, 4] as const;

const segmentFillByStrength: Record<
  NonNullable<PasswordFieldProps['strength']>,
  string
> = {
  0: 'bg-gray-6',
  1: 'bg-danger',
  2: 'bg-gray-8',
  3: 'bg-gray-8',
  4: 'bg-success',
};

export const PasswordField = ({
  strength,
  strengthLabel,
  showToggle = true,
  id,
  ...rest
}: PasswordFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [revealed, setRevealed] = useState(false);

  return (
    <div>
      <Input
        {...rest}
        id={fieldId}
        type={revealed ? 'text' : 'password'}
        trailing={
          showToggle ? (
            <IconButton
              icon="eye"
              aria-pressed={revealed}
              aria-label={revealed ? 'Ocultar senha' : 'Mostrar senha'}
              onClick={() => setRevealed((current) => !current)}
              className="border-none bg-transparent text-neutral-3"
            />
          ) : undefined
        }
      />
      {strength !== undefined && strengthLabel && !rest.error && (
        <div className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <div aria-hidden className="flex min-w-[120px] flex-1 gap-1">
            {strengthSegments.map((segment) => (
              <span
                key={segment}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  'motion-safe:transition-colors motion-safe:duration-150',
                  segment <= strength
                    ? segmentFillByStrength[strength]
                    : 'bg-gray-6',
                )}
              />
            ))}
          </div>
          <Text
            as="span"
            aria-live="polite"
            variant="small"
            weight="medium"
            color="neutral-2"
            className="text-caption"
          >
            {strengthLabel}
          </Text>
        </div>
      )}
    </div>
  );
};

export type PasswordFieldProps = Omit<InputProps, 'type' | 'trailing'> & {
  strength?: 0 | 1 | 2 | 3 | 4;
  strengthLabel?: string;
  showToggle?: boolean;
};
