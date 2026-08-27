import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { BottomSheet } from './bottom-sheet';

describe('BottomSheet', () => {
  it('renders nothing when closed', () => {
    render(
      <BottomSheet open={false} onClose={vi.fn()}>
        Conteúdo
      </BottomSheet>,
    );
    expect(screen.queryByText('Conteúdo')).not.toBeInTheDocument();
  });

  it('renders title and children when open', () => {
    render(
      <BottomSheet open title="Filtros" onClose={vi.fn()}>
        Conteúdo
      </BottomSheet>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Filtros')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });

  it('calls onClose when the scrim is clicked', () => {
    const onClose = vi.fn();
    render(
      <BottomSheet open onClose={onClose}>
        Conteúdo
      </BottomSheet>,
    );
    fireEvent.click(screen.getByLabelText('Fechar'));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
