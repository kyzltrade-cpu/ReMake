import Svg, { Path, Rect } from 'react-native-svg';

export function MirrorIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="4" stroke={color} strokeWidth={1.5} />
      <Path d="M8 12H16M12 8V16" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}