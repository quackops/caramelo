import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NoticeRow } from './notice-row';

describe('NoticeRow', () => {
  it('renders the message and the timestamp', () => {
    render(
      <NoticeRow message="Marina demonstrou interesse" timestamp="há 12 min" />,
    );

    expect(screen.getByText('Marina demonstrou interesse')).toBeInTheDocument();
    expect(screen.getByText(/há 12 min/)).toBeInTheDocument();
  });

  it('appends the hint to the timestamp line', () => {
    render(
      <NoticeRow
        message="A ONG aceitou conversar"
        timestamp="há 12 minutos"
        hint="toque para abrir o WhatsApp"
      />,
    );

    expect(screen.getByText(/toque para abrir o WhatsApp/)).toBeInTheDocument();
  });

  it('announces the unread state instead of relying on the dot', () => {
    render(<NoticeRow message="Nova mensagem" timestamp="agora" />);
    expect(screen.getByText('não lido')).toBeInTheDocument();
  });

  it('stays silent about the state once read', () => {
    render(<NoticeRow message="Nova mensagem" timestamp="agora" read />);
    expect(screen.queryByText('não lido')).not.toBeInTheDocument();
  });

  it('renders as a button and calls onClick when interactive', () => {
    const onClick = vi.fn();
    render(
      <NoticeRow
        message="Abrir o WhatsApp"
        timestamp="agora"
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('stays a plain row without onClick', () => {
    render(<NoticeRow message="Sem destino" timestamp="agora" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
