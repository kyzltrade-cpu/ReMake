import Svg, { Path, Circle } from 'react-native-svg';

// Sparkle — decorative star/diamond accent ◊
export function SparkleIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L13.5 9L20 10.5L13.5 12L12 20L10.5 12L4 10.5L10.5 9L12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}