import Svg, { Path } from 'react-native-svg';

export function HapticsIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 14.5C7 15.88 5.88 17 4.5 17C3.12 17 2 15.88 2 14.5C2 13.12 3.12 12 4.5 12C5.88 12 7 13.12 7 14.5Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M22 14.5C22 15.88 20.88 17 19.5 17C18.12 17 17 15.88 17 14.5C17 13.12 18.12 12 19.5 12C20.88 12 22 13.12 22 14.5Z"
        stroke={color}
        strokeWidth={1.5}
      />
      <Path
        d="M3.5 14.5H9M15 14.5H20.5M9 14.5C9 12.01 11.01 10 13.5 10C15.99 10 18 12.01 18 14.5C18 16.99 15.99 19 13.5 19C11.01 19 9 16.99 9 14.5Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}