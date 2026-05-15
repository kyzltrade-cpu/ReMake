import Svg, { Path, Circle } from 'react-native-svg';

// Spark — small decorative sparkle for emphasis
export function SparkIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 3v4M12 17v4M3 12h4M17 12h4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle
        cx={12}
        cy={12}
        r={2}
        fill={color}
      />
    </Svg>
  );
}