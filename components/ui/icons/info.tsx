import Svg, { Circle, Path } from 'react-native-svg';

// Info — information tooltip
export function InfoIcon({
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
        r={10}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M12 16v-4M12 8h.01"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}