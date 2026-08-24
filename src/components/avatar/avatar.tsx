import { cva, type VariantProps } from 'class-variance-authority';
import type { ImgHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { Text } from '../text/text';

// Avatar 48 (autoria) / 32 (pilha). Shows initials on a caramelo-4
// surface with a brand ring when there is no photo, per spec.
const avatarVariants = cva(
  'inline-flex items-center justify-center rounded-full bg-caramelo-4',
  {
    variants: {
      size: {
        medium: 'size-12 border-[1.5px] border-brand',
        small: 'size-8 border-2 border-gray-2',
      },
    },
    defaultVariants: {
      size: 'medium',
    },
  },
);

export const Avatar = ({
  size,
  src,
  alt,
  initials,
  className,
}: AvatarProps) => {
  if (src) {
    // biome-ignore lint/performance/noImgElement: library component, no framework image optimizer available.
    return (
      <img
        src={src}
        alt={alt ?? ''}
        className={cn(
          avatarVariants({ size }),
          'border-0 object-cover',
          className,
        )}
      />
    );
  }

  return (
    <span
      className={cn(avatarVariants({ size }), className)}
      role="img"
      aria-label={alt}
    >
      <Text
        variant={size === 'small' ? 'small' : 'medium'}
        weight="semibold"
        className="text-caramelo-12"
      >
        {initials}
      </Text>
    </span>
  );
};

export type AvatarProps = VariantProps<typeof avatarVariants> &
  Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
    initials?: string;
    className?: string;
  };
