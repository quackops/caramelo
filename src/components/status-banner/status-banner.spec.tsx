import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/button';
import { StatusBanner } from './status-banner';

describe('StatusBanner', () => {
  it('announces itself politely as a status', () => {
    render(<StatusBanner message="Você está offline" icon="wifi-off" />);
    const banner = screen.getByRole('status');

    expect(banner).toHaveTextContent('Você está offline');
    expect(banner).toHaveAttribute('aria-live', 'polite');
  });

  it('pins itself above the screen content', () => {
    render(<StatusBanner message="Você está offline" />);
    expect(screen.getByRole('status')).toHaveClass('sticky', 'top-0');
  });

  it('keeps the warning tone an outline, never a fill', () => {
    render(<StatusBanner message="Modo leitura" tone="warning" />);
    const banner = screen.getByRole('status');

    expect(banner).toHaveClass('border-warning', 'bg-transparent');
    expect(banner).not.toHaveClass('bg-warning');
  });

  it('renders a retry action', () => {
    render(
      <StatusBanner
        message="Você está offline"
        icon="wifi-off"
        action={<Button variant="ghost">Tentar de novo</Button>}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Tentar de novo' }),
    ).toBeInTheDocument();
  });

  it('can be dismissed', () => {
    const onDismiss = vi.fn();
    render(<StatusBanner message="Você está offline" onDismiss={onDismiss} />);

    fireEvent.click(screen.getByRole('button', { name: 'Dispensar aviso' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('does not take focus when it appears', () => {
    render(<StatusBanner message="Você está offline" />);
    expect(document.activeElement).toBe(document.body);
  });
});
