import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PhotoUpload } from './photo-upload';

const photos = [
  { id: 'a', src: '/a.jpg', status: 'ready' as const },
  { id: 'b', src: '/b.jpg', status: 'ready' as const },
];

describe('PhotoUpload', () => {
  it('marks the first photo as the cover', () => {
    render(<PhotoUpload photos={photos} max={5} />);
    expect(screen.getByText('CAPA')).toBeInTheDocument();
  });

  it('renders the actual photo', () => {
    const { container } = render(<PhotoUpload photos={photos} max={5} />);
    expect(container.querySelector('img[src="/a.jpg"]')).toBeInTheDocument();
  });

  it('offers camera and gallery as separate entry points', () => {
    const onAdd = vi.fn();
    render(<PhotoUpload photos={photos} max={5} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /Câmera/ }));
    expect(onAdd).toHaveBeenCalledWith('camera');

    fireEvent.click(screen.getByRole('button', { name: /Galeria/ }));
    expect(onAdd).toHaveBeenCalledWith('gallery');
  });

  it('counts against the maximum', () => {
    render(<PhotoUpload photos={photos} max={5} />);
    expect(screen.getByText('2 / 5')).toBeInTheDocument();
  });

  it('reads the counter as a requirement below the minimum', () => {
    render(
      <PhotoUpload
        photos={[photos[0]]}
        max={5}
        min={3}
        requirementLabel="Adicione 3 fotos"
      />,
    );

    expect(screen.getByText('Adicione 3 fotos')).toBeInTheDocument();
    expect(screen.queryByText('1 / 5')).not.toBeInTheDocument();
  });

  it('shows determinate progress while uploading and locks the tile', () => {
    render(
      <PhotoUpload
        photos={[{ id: 'a', status: 'uploading', progress: 40 }]}
        max={5}
        onReorder={vi.fn()}
      />,
    );

    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '40',
    );
    expect(screen.getByRole('group')).not.toHaveAttribute('tabindex');
    expect(
      screen.queryByRole('button', { name: 'Remover foto 1' }),
    ).not.toBeInTheDocument();
  });

  it('offers a retry and the word on a failed upload', () => {
    const onRetry = vi.fn();
    render(
      <PhotoUpload
        photos={[{ id: 'a', status: 'failed' }]}
        max={5}
        onRetry={onRetry}
      />,
    );

    const retry = screen.getByRole('button', { name: /Falhou/ });
    expect(screen.getByRole('group')).toHaveClass('border-danger');
    fireEvent.click(retry);
    expect(onRetry).toHaveBeenCalledWith('a');
  });

  it('reorders from the keyboard and announces the new position', () => {
    const onReorder = vi.fn();
    render(<PhotoUpload photos={photos} max={5} onReorder={onReorder} />);

    const first = screen.getByRole('group', { name: 'Foto 1 de 2' });
    fireEvent.keyDown(first, { key: ' ' });
    fireEvent.keyDown(first, { key: 'ArrowRight' });

    expect(onReorder).toHaveBeenCalledWith(['b', 'a']);
    expect(document.querySelector('[aria-live="polite"]')).toHaveTextContent(
      'Foto na posição 2 de 2',
    );
  });

  it('ignores arrow keys until the photo is lifted', () => {
    const onReorder = vi.fn();
    render(<PhotoUpload photos={photos} max={5} onReorder={onReorder} />);

    fireEvent.keyDown(screen.getByRole('group', { name: 'Foto 1 de 2' }), {
      key: 'ArrowRight',
    });
    expect(onReorder).not.toHaveBeenCalled();
  });

  it('removes a photo', () => {
    const onRemove = vi.fn();
    render(<PhotoUpload photos={photos} max={5} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remover foto 2' }));
    expect(onRemove).toHaveBeenCalledWith('b');
  });

  it('hides the add slot once the maximum is reached', () => {
    render(<PhotoUpload photos={photos} max={2} />);
    expect(screen.queryByRole('button', { name: /Câmera/ })).toBeNull();
  });
});
