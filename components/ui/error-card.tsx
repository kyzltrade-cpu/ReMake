import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { tokens } from '../theme';
import { WarningIcon } from './icons/warning';
import { GlassButton } from '../glass-button';

export interface ErrorCardProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorCard({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <WarningIcon size={32} color={tokens.colors.pinkDeep} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <GlassButton
          title="Try Again"
          onPress={onRetry}
          variant="primary"
          style={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: tokens.colors.ivory,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: tokens.colors.pink,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: tokens.fonts.serif,
    fontSize: 18,
    fontWeight: '600',
    color: tokens.colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontFamily: tokens.fonts.regular,
    fontSize: 14,
    color: tokens.colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  button: {
    marginTop: 20,
    minWidth: 140,
  },
});