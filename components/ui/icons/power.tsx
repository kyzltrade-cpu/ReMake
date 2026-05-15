import Svg, { Path, Circle } from 'react-native-svg';

// AI Power — brain/spark icon representing GPT-4o vision
export function PowerIcon({
  size = 24,
  color = '#D4AF37',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M13 2L4.5 12.5L7 15L15 6L13 2Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M11 4L20 13L17.5 15.5L8 6.5L11 4Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Circle
        cx={17}
        cy={17}
        r={5}
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M15 17h4M17 15v4"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}