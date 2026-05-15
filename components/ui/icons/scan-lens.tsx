import Svg, { Circle, Path } from 'react-native-svg';

// Scan lens — ◎ replacement for scan/analysis indicator
export function ScanLensIcon({
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
      <Circle
        cx={12}
        cy={12}
        r={6}
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle
        cx={12}
        cy={12}
        r={2}
        fill={color}
      />
      <Path
        d="M12 2v4M12 18v4M2 12h4M18 12h4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}