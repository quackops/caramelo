export type ProtectionSurface = 'bg' | 'surface';

const gradientBySurface: Record<ProtectionSurface, string> = {
  bg: '[background:linear-gradient(to_top,var(--color-bg)_65%,transparent)]',
  surface:
    '[background:linear-gradient(to_top,var(--color-surface)_65%,transparent)]',
};

export const protectionGradient = (surface: ProtectionSurface) =>
  gradientBySurface[surface];
