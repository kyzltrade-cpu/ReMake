import Svg, { Path, Rect, Circle } from 'react-native-svg';

// Gallery — image/photo picker icon
export function GalleryIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={3}
        width={18}
        height={18}
        rx={2}
        stroke={color}
        strokeWidth={1.5}
      />
      <Circle
        cx={8.5}
        cy={8.5}
        r={1.5}
        fill={color}
      />
      <Path
        d="M21 15l-5-5L5 21"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}