import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { tokens } from '../theme';
import { CloseIcon } from './icons/close';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  primaryAction?: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  };
  secondaryAction?: {
    label: string;
    onPress: () => void;
  };
  showCloseButton?: boolean;
  children?: React.ReactNode;
}

export function Modal({
  visible,
  onClose,
  title,
  message,
  primaryAction,
  secondaryAction,
  showCloseButton = true,
  children,
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.container}>
          {showCloseButton && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon size={20} color={tokens.colors.gray} />
            </TouchableOpacity>
          )}

          {title && <Text style={styles.title}>{title}</Text>}
          {message && <Text style={styles.message}>{message}</Text>}

          {children}

          {(primaryAction || secondaryAction) && (
            <View style={styles.actions}>
              {secondaryAction && (
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={secondaryAction.onPress}
                >
                  <Text style={styles.secondaryButtonText}>
                    {secondaryAction.label}
                  </Text>
                </TouchableOpacity>
              )}
              {primaryAction && (
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    primaryAction.variant === 'danger' && styles.dangerButton,
                    primaryAction.variant === 'secondary' && styles.secondaryPrimaryButton,
                  ]}
                  onPress={primaryAction.onPress}
                >
                  <Text style={styles.primaryButtonText}>{primaryAction.label}</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(26, 23, 21, 0.6)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    width: SCREEN_WIDTH - 48,
    maxWidth: 340,
    backgroundColor: tokens.colors.ivory,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: tokens.colors.darkBg,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
    zIndex: 1,
  },
  title: {
    fontFamily: tokens.fonts.serif,
    fontSize: 20,
    fontWeight: '600',
    color: tokens.colors.text,
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  message: {
    fontFamily: tokens.fonts.regular,
    fontSize: 15,
    color: tokens.colors.gray,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: tokens.colors.border,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 15,
    fontWeight: '500',
    color: tokens.colors.text,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: tokens.colors.gold,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 15,
    fontWeight: '600',
    color: tokens.colors.white,
  },
  dangerButton: {
    backgroundColor: tokens.colors.pinkDeep,
  },
  secondaryPrimaryButton: {
    backgroundColor: tokens.colors.pinkRich,
  },
});