import { type KeyboardEvent, type ReactNode, useEffect, useRef } from 'react';
import { BottomSheet } from '../bottom-sheet/bottom-sheet';
import { Button } from '../button/button';
import { Text } from '../text/text';

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export const AuthGateSheet = ({
  open,
  onClose,
  title,
  description,
  subjectImageSrc,
  subjectImageAlt = '',
  illustration,
  onCreateAccount,
  onSignIn,
  createAccountLabel,
  signInLabel,
  className,
}: AuthGateSheetProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;

    triggerRef.current = document.activeElement;
    const focusable =
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    focusable?.[0]?.focus();

    return () => {
      (triggerRef.current as HTMLElement | null)?.focus?.();
    };
  }, [open]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
      return;
    }

    if (event.key !== 'Tab') return;

    const focusable = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <BottomSheet
      open={open}
      size="short"
      onClose={onClose}
      scrim="strong"
      aria-label={title}
      ref={panelRef}
      onKeyDown={handleKeyDown}
      className={className}
    >
      <div className="flex flex-col items-center text-center">
        {subjectImageSrc && (
          <img
            src={subjectImageSrc}
            alt={subjectImageAlt}
            className="mb-3.5 aspect-[4/3] w-full max-w-[220px] rounded-photo object-cover"
          />
        )}
        {illustration && <div className="mb-3.5">{illustration}</div>}
        <Text as="h2" variant="large" weight="semibold" color="neutral">
          {title}
        </Text>
        {description && (
          <Text
            as="p"
            variant="small"
            color="neutral-2"
            className="mt-1.5 font-roboto text-body font-light"
          >
            {description}
          </Text>
        )}
        <div className="mt-16 flex w-full flex-col gap-2 [&>button]:w-full">
          <Button onClick={onCreateAccount}>{createAccountLabel}</Button>
          <Button variant="ghost" onClick={onSignIn}>
            {signInLabel}
          </Button>
        </div>
      </div>
    </BottomSheet>
  );
};

export type AuthGateSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: ReactNode;
  subjectImageSrc?: string;
  subjectImageAlt?: string;
  illustration?: ReactNode;
  onCreateAccount: () => void;
  onSignIn: () => void;
  createAccountLabel: string;
  signInLabel: string;
  className?: string;
};
