import Svg, { Path } from 'react-native-svg';

// Streak — flame icon for streak tracking
export function StreakIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C12 2 8 6 8 10C8 12 9 13.5 10 14.5C9 13.5 8 12 8 10C8 8 9.5 6 12 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M12 22C16 22 19 18.5 19 14.5C19 10.5 16 8 12 4C8 8 5 10.5 5 14.5C5 18.5 8 22 12 22Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}