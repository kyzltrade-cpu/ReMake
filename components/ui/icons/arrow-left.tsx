import Svg, { Path } from 'react-native-svg';

// Arrow left — back navigation
export function ArrowLeftIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 12H4M4 12L10 6M4 12L10 18"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}