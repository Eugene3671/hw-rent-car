interface IconProps {
  name: string;
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Icon({
  name,
  width = 16,
  height = 16,
  className,
}: IconProps) {
  return (
    <svg width={width} height={height} className={className}>
      <use href={`/icons.svg#icon-${name}`} />
    </svg>
  );
}
