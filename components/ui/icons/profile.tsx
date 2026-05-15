import Svg, { Circle, Path } from 'react-native-svg';

// Profile avatar — circular user silhouette
export function ProfileIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle
        cx={12}
        cy={8}
        r={4}
        stroke={color}
        strokeWidth={1.5}
        fill="none"
      />
      <Path
        d="M4 20c0-4 4-6 8-6s8 2 8 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}