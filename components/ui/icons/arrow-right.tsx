import Svg, { Path } from 'react-native-svg';

// Arrow right — forward navigation, CTA arrows
export function ArrowRightIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12H20M20 12L14 6M20 12L14 18"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}