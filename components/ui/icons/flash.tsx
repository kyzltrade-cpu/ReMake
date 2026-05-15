import Svg, { Path } from 'react-native-svg';

// Flash — lightning bolt for camera flash toggle
export function FlashIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}