import Svg, { Path } from 'react-native-svg';

// Lipstick — lip color indicator for Lips category
export function LipstickIcon({
  size = 24,
  color = '#D98A96',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 21C12 21 8 17 8 13C8 10 10 8 12 6C14 8 16 10 16 13C16 17 12 21 12 21Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M12 6V4M9 4h6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}