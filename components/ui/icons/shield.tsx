import Svg, { Path } from 'react-native-svg';

// Shield — privacy/security indicator
export function ShieldIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.5 4.5-1.35 8-6.25 8-11.5V6l-8-4z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}