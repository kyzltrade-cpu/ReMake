import Svg, { Circle, Path } from 'react-native-svg';

// Precision Detection — crosshair/target icon
export function PrecisionIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={12}
        r={9}
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle
        cx={12}
        cy={12}
        r={5}
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle
        cx={12}
        cy={12}
        r={1.5}
        fill={color}
      />
      <Path
        d="M12 3v3M12 18v3M3 12h3M18 12h3"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}