import Svg, { Path, Circle } from 'react-native-svg';

// Results — clipboard/checklist for scan results
export function ResultsIcon({
  size = 24,
  color = '#3D3532',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 5H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <Path
        d="M9 5a2 2 0 012-2h2a2 2 0 012 2v0a2 2 0 01-2 2h-2a2 2 0 01-2-2v0z"
        stroke={color}
        strokeWidth={1.5}
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