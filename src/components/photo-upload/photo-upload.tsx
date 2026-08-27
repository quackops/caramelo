import { type KeyboardEvent, useState } from 'react';
import { cn } from '../../utils/cn';
import { Icon } from '../icon/icon';
import { Text } from '../text/text';

const moveKeys: Record<string, number> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
};

const reorder = (order: string[], from: number, to: number) => {
  const next = [...order];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};

export const PhotoUpload = ({
  photos,
  max,
  min,
  onRemove,
  onAdd,
  onReorder,
  onRetry,
  dropzoneLabel = 'Solte as fotos aqui',
  cameraLabel = 'Câmera',
  galleryLabel = 'Galeria',
  coverLabel = 'CAPA',
  requirementLabel,
  failedLabel = 'Falhou',
  className,
}: PhotoUploadProps) => {
  const canAddMore = photos.length < max;
  const belowMinimum = min !== undefined && photos.length < min;
  const [liftedId, setLiftedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState('');

  const move = (id: string, step: number) => {
    const order = photos.map((photo) => photo.id);
    const from = order.indexOf(id);
    const to = Math.min(Math.max(from + step, 0), order.length - 1);
    if (from === to) return;

    onReorder?.(reorder(order, from, to));
    setAnnouncement(`Foto na posição ${to + 1} de ${order.length}`);
  };

  const handleTileKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    id: string,
    uploading: boolean,
  ) => {
    if (uploading || !onReorder) return;

    if (event.key === ' ') {
      event.preventDefault();
      setLiftedId((current) => (current === id ? null : id));
      setAnnouncement(liftedId === id ? 'Foto solta' : 'Foto levantada');
      return;
    }

    const step = moveKeys[event.key];
    if (!step || liftedId !== id) return;

    event.preventDefault();
    move(id, step);
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((photo, index) => {
          const uploading = photo.status === 'uploading';
          const failed = photo.status === 'failed';

          return (
            // biome-ignore lint/a11y/useSemanticElements: a photo tile is a labelled group, not a form fieldset
            <div
              key={photo.id}
              role="group"
              aria-label={`Foto ${index + 1} de ${photos.length}`}
              aria-grabbed={onReorder ? liftedId === photo.id : undefined}
              tabIndex={onReorder && !uploading ? 0 : undefined}
              onKeyDown={(event) =>
                handleTileKeyDown(event, photo.id, uploading)
              }
              draggable={Boolean(onReorder) && !uploading}
              className={cn(
                'relative aspect-square overflow-hidden rounded-control bg-caramelo-3',
                'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                uploading && 'opacity-60',
                failed && 'border-[1.5px] border-danger border-dashed',
                liftedId === photo.id && 'ring-2 ring-brand',
              )}
            >
              {photo.src && (
                <img
                  src={photo.src}
                  alt=""
                  className="size-full object-cover"
                />
              )}
              {index === 0 && !uploading && !failed && (
                <span className="absolute bottom-1.5 left-1.5 rounded-md bg-brand px-[7px] py-0.5">
                  <Text
                    as="span"
                    variant="small"
                    weight="semibold"
                    color="on-brand-strong"
                    className="text-badge"
                  >
                    {coverLabel}
                  </Text>
                </span>
              )}
              {uploading && (
                <span className="absolute inset-x-1.5 bottom-1.5 h-1 overflow-hidden rounded-chip bg-gray-6">
                  <span
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuenow={photo.progress ?? 0}
                    aria-valuemax={100}
                    style={{ width: `${photo.progress ?? 0}%` }}
                    className="block h-full rounded-chip bg-brand motion-safe:transition-[width] motion-safe:duration-150"
                  />
                </span>
              )}
              {failed && (
                <button
                  type="button"
                  onClick={() => onRetry?.(photo.id)}
                  className={cn(
                    'absolute inset-0 flex cursor-pointer flex-col items-center justify-center gap-1 bg-caramelo-1/70 text-danger',
                    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                  )}
                >
                  <Icon name="refresh" size={18} />
                  <Text
                    as="span"
                    variant="small"
                    weight="medium"
                    className="text-badge text-danger"
                  >
                    {failedLabel}
                  </Text>
                </button>
              )}
              {!uploading && (
                <button
                  type="button"
                  onClick={() => onRemove?.(photo.id)}
                  aria-label={`Remover foto ${index + 1}`}
                  className="absolute top-[5px] right-[5px] flex size-5 cursor-pointer items-center justify-center rounded-full bg-caramelo-1/80 text-neutral"
                >
                  <Icon name="x" size={11} />
                </button>
              )}
            </div>
          );
        })}
        {canAddMore && (
          <div className="flex aspect-square flex-col gap-1.5 rounded-control border-[1.5px] border-gray-7 border-dashed bg-gray-2 p-1.5">
            <button
              type="button"
              onClick={() => onAdd?.('camera')}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg text-neutral-3 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <Icon name="camera" size={18} />
              <Text
                as="span"
                variant="small"
                weight="medium"
                color="neutral-3"
                className="text-badge"
              >
                {cameraLabel}
              </Text>
            </button>
            <button
              type="button"
              onClick={() => onAdd?.('gallery')}
              className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg text-neutral-3 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
            >
              <Icon name="image" size={18} />
              <Text
                as="span"
                variant="small"
                weight="medium"
                color="neutral-3"
                className="text-badge"
              >
                {galleryLabel}
              </Text>
            </button>
            <Text
              as="span"
              variant="small"
              weight="medium"
              color={belowMinimum ? 'danger' : 'neutral-3'}
              className="text-center text-micro"
            >
              {belowMinimum && requirementLabel
                ? requirementLabel
                : `${photos.length} / ${max}`}
            </Text>
          </div>
        )}
      </div>
      <div className="rounded-control border-[1.5px] border-caramelo-8 border-dashed bg-caramelo-3 p-[26px] text-center">
        <Text variant="small" weight="medium" className="text-caramelo-12">
          {dropzoneLabel}
        </Text>
      </div>
      <span aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
};

export type PhotoUploadPhoto = {
  id: string;
  src?: string;
  status?: 'uploading' | 'ready' | 'failed';
  progress?: number;
};

export type PhotoUploadSource = 'camera' | 'gallery';

export type PhotoUploadProps = {
  photos: PhotoUploadPhoto[];
  max: number;
  min?: number;
  onAdd?: (source: PhotoUploadSource) => void;
  onRemove?: (id: string) => void;
  onReorder?: (order: string[]) => void;
  onRetry?: (id: string) => void;
  dropzoneLabel?: string;
  cameraLabel?: string;
  galleryLabel?: string;
  coverLabel?: string;
  requirementLabel?: string;
  failedLabel?: string;
  className?: string;
};
