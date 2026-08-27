import { cn } from '../../utils/cn';

const quietZoneModules = 4;

const filledCells = (matrix: boolean[][]) => {
  const cells: { x: number; y: number }[] = [];

  for (let y = 0; y < matrix.length; y += 1) {
    const row = matrix[y];
    for (let x = 0; x < row.length; x += 1) {
      if (row[x]) cells.push({ x, y });
    }
  }

  return cells;
};

export const QrCode = ({
  matrix,
  src,
  size = 200,
  label,
  className,
}: QrCodeProps) => {
  const plateClassName = cn(
    'inline-flex items-center justify-center rounded-photo bg-qr-plate p-3',
    className,
  );

  if (src) {
    return (
      <span className={plateClassName} style={{ width: size, height: size }}>
        <img src={src} alt={label} className="size-full" />
      </span>
    );
  }

  if (!matrix || matrix.length === 0) {
    return null;
  }

  const modules = matrix.length;
  const extent = modules + quietZoneModules * 2;

  return (
    <span className={plateClassName} style={{ width: size, height: size }}>
      <svg
        role="img"
        aria-label={label}
        viewBox={`0 0 ${extent} ${extent}`}
        shapeRendering="crispEdges"
        className="size-full"
      >
        <rect width={extent} height={extent} fill="var(--color-qr-plate)" />
        {filledCells(matrix).map((cell) => (
          <rect
            key={`${cell.y}-${cell.x}`}
            x={cell.x + quietZoneModules}
            y={cell.y + quietZoneModules}
            width={1}
            height={1}
            fill="var(--color-qr-module)"
          />
        ))}
      </svg>
    </span>
  );
};

export type QrCodeProps = {
  matrix?: boolean[][];
  src?: string;
  size?: number;
  label: string;
  className?: string;
};
