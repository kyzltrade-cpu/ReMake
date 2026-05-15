import Svg, { Path, Circle } from 'react-native-svg';

// Star — score/result highlight
export function StarIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L14.9 8.6L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9.1 8.6L12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
}