import Svg, { Path, Circle } from 'react-native-svg';

// Warning — ◉ replacement for alerts/warnings
export function WarningIcon({
  size = 24,
  color = '#E8A0AA',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L22 20H2L12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M12 9v5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Circle
        cx={12}
        cy={17}
        r={1}
        fill={color}
      />
    </Svg>
  );
}