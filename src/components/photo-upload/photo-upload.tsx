import { cn } from '../../utils/cn';
import { Text } from '../text/text';

export const PhotoUpload = ({
  photos,
  max,
  onRemove,
  onAdd,
  dropzoneLabel = 'Solte as fotos aqui',
  className,
}: PhotoUploadProps) => {
  const canAddMore = photos.length < max;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative aspect-square rounded-control bg-caramelo-3"
          >
            {index === 0 && (
              <span className="absolute bottom-1.5 left-1.5 rounded-md bg-brand px-[7px] py-0.5">
                <Text
                  as="span"
                  variant="small"
                  weight="semibold"
                  color="on-brand-strong"
                  className="text-[9px]"
                >
                  CAPA
                </Text>
              </span>
            )}
            <button
              type="button"
              onClick={() => onRemove?.(photo.id)}
              aria-label={`Remover foto ${index + 1}`}
              className="absolute right-[5px] top-[5px] flex size-5 cursor-pointer items-center justify-center rounded-full bg-caramelo-1/80"
            >
              <Text
                as="span"
                variant="small"
                color="neutral"
                className="text-[11px]"
              >
                ×
              </Text>
            </button>
          </div>
        ))}
        {canAddMore && (
          <button
            type="button"
            onClick={onAdd}
            className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-control border-[1.5px] border-dashed border-gray-7 bg-gray-2"
          >
            <Text
              as="span"
              variant="large"
              weight="regular"
              color="neutral-3"
              className="text-2xl leading-none"
            >
              +
            </Text>
            <Text as="span" variant="small" weight="medium" color="neutral-3">
              {photos.length} / {max}
            </Text>
          </button>
        )}
      </div>
      <div className="rounded-control border-[1.5px] border-dashed border-caramelo-8 bg-caramelo-3 p-[26px] text-center">
        <Text variant="small" weight="medium" className="text-caramelo-12">
          {dropzoneLabel}
        </Text>
      </div>
    </div>
  );
};

export type PhotoUploadPhoto = {
  id: string;
};

export type PhotoUploadProps = {
  photos: PhotoUploadPhoto[];
  max: number;
  onRemove?: (id: string) => void;
  onAdd?: () => void;
  dropzoneLabel?: string;
  className?: string;
};
