import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PhotoUpload } from './photo-upload';

describe('PhotoUpload', () => {
  it('marks the first photo as cover and shows the counter', () => {
    render(<PhotoUpload photos={[{ id: '1' }, { id: '2' }]} max={8} />);

    expect(screen.getByText('CAPA')).toBeInTheDocument();
    expect(screen.getByText('2 / 8')).toBeInTheDocument();
  });

  it('calls onRemove for a given photo', () => {
    const onRemove = vi.fn();
    render(<PhotoUpload photos={[{ id: '1' }]} max={8} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remover foto 1' }));

    expect(onRemove).toHaveBeenCalledWith('1');
  });

  it('hides the add slot once max is reached', () => {
    render(<PhotoUpload photos={[{ id: '1' }, { id: '2' }]} max={2} />);
    expect(screen.queryByText('2 / 2')).not.toBeInTheDocument();
  });
});
