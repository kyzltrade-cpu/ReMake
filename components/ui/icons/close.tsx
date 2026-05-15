import Svg, { Path, Line } from 'react-native-svg';

// Close — X dismiss button
export function CloseIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line
        x1={6}
        y1={6}
        x2={18}
        y2={18}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Line
        x1={18}
        y1={6}
        x2={6}
        y2={18}
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}