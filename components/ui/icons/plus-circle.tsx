import Svg, { Path, Circle } from 'react-native-svg';

export function PlusCircleIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={1.5} />
      <Path d="M12 8V16M8 12H16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}