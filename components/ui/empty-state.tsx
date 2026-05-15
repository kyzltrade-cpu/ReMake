import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme';
import { ScanLensIcon } from './icons/scan-lens';
import { GlassButton } from '../glass-button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {icon || <ScanLensIcon size={48} color={tokens.colors.goldSoft} />}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction && (
        <GlassButton
          title={actionLabel}
          onPress={onAction}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: tokens.colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: tokens.fonts.serif,
    fontSize: 22,
    fontWeight: '600',
    color: tokens.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontFamily: tokens.fonts.regular,
    fontSize: 15,
    color: tokens.colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 280,
  },
  button: {
    marginTop: 24,
    minWidth: 160,
  },
});