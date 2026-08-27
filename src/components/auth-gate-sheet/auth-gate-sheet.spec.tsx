import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AuthGateSheet } from './auth-gate-sheet';

const renderGate = (props: Partial<Parameters<typeof AuthGateSheet>[0]> = {}) =>
  render(
    <AuthGateSheet
      open
      onClose={vi.fn()}
      title="Para salvar a Nina, crie sua conta"
      description="Leva 40 segundos e a gente volta exatamente para onde você estava."
      onCreateAccount={vi.fn()}
      onSignIn={vi.fn()}
      createAccountLabel="Criar conta"
      signInLabel="Entrar"
      {...props}
    />,
  );

describe('AuthGateSheet', () => {
  it('interrupts with a sheet over the content rather than a redirect', () => {
    renderGate();
    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(
      screen.getByText('Para salvar a Nina, crie sua conta'),
    ).toBeInTheDocument();
  });

  it('renders nothing while closed', () => {
    renderGate({ open: false });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('ships no copy of its own', () => {
    renderGate({ title: 'Para seguir a ONG, crie sua conta' });
    expect(
      screen.getByText('Para seguir a ONG, crie sua conta'),
    ).toBeInTheDocument();
  });

  it('keeps the subject in view so context is never lost', () => {
    const { container } = renderGate({
      subjectImageSrc: '/nina.jpg',
      subjectImageAlt: 'Nina',
    });

    expect(container.querySelector('img[src="/nina.jpg"]')).toHaveAttribute(
      'alt',
      'Nina',
    );
  });

  it('offers create-account first and sign-in as the quiet option', () => {
    renderGate();

    expect(
      screen.getByRole('button', { name: 'Criar conta' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Entrar' })).toHaveClass(
      'text-link',
    );
  });

  it('calls back instead of navigating', () => {
    const onCreateAccount = vi.fn();
    const onSignIn = vi.fn();
    renderGate({ onCreateAccount, onSignIn });

    fireEvent.click(screen.getByRole('button', { name: 'Criar conta' }));
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    expect(onCreateAccount).toHaveBeenCalledOnce();
    expect(onSignIn).toHaveBeenCalledOnce();
  });

  it('moves focus into the sheet on open', () => {
    renderGate();
    expect(document.activeElement).not.toBe(document.body);
    expect(screen.getByRole('dialog').contains(document.activeElement)).toBe(
      true,
    );
  });

  it('traps Tab inside the sheet', () => {
    renderGate();
    const dialog = screen.getByRole('dialog');
    const create = screen.getByRole('button', { name: 'Criar conta' });
    const signIn = screen.getByRole('button', { name: 'Entrar' });

    signIn.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(create).toHaveFocus();

    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(signIn).toHaveFocus();
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    renderGate({ onClose });

    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('returns focus to the trigger on close', () => {
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();

    const { unmount } = renderGate();
    unmount();

    expect(trigger).toHaveFocus();
    trigger.remove();
  });
});
