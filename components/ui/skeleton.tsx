import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, DimensionValue } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { tokens } from '../theme';

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({
  width = '100%',
  height = 20,
  borderRadius = 8,
  style,
}: SkeletonProps) {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withTiming(1, { duration: 1200 }),
      -1,
      false
    );
  }, [shimmer]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmer.value ?? 0, [0, 1], [-200, 200]);
    return {
      transform: [{ translateX }],
    };
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: tokens.colors.beige,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      <Animated.View style={[styles.shimmer, animatedStyle]} />
    </View>
  );
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = '60%',
}: {
  lines?: number;
  lastLineWidth?: number | string;
}) {
  return (
    <View style={styles.textContainer}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          width={i === lines - 1 ? (lastLineWidth as DimensionValue) : '100%'}
          height={14}
          borderRadius={4}
          style={styles.textLine}
        />
      ))}
    </View>
  );
}

export function SkeletonCard({ style }: { style?: ViewStyle }) {
  return (
    <View style={[styles.card, style]}>
      <Skeleton width={60} height={60} borderRadius={12} />
      <View style={styles.cardContent}>
        <Skeleton width="70%" height={16} borderRadius={4} />
        <Skeleton width="50%" height={12} borderRadius={4} style={styles.cardSubtext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shimmer: {
    width: '50%',
    height: '100%',
    backgroundColor: tokens.colors.cream,
    opacity: 0.6,
  },
  textContainer: {
    gap: 8,
  },
  textLine: {
    marginBottom: 4,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.ivory,
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  cardSubtext: {
    marginTop: 4,
  },
});