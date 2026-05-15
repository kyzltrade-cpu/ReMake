import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { tokens } from '@/components/theme';
import { useSettings } from '@/contexts/settings-context';
import { useSubscription } from '@/contexts/subscription-context';
import { SettingsIcon } from '@/components/ui/icons/settings';
import { CrownIcon } from '@/components/ui/icons/crown';
import { XIcon } from '@/components/ui/icons/x';

function Toggle({ value, onValueChange, disabled }: {
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) onValueChange(!value);
      }}
      style={[styles.toggle, value && styles.toggleOn, disabled && styles.toggleDisabled]}
    >
      <View style={[styles.toggleThumb, value && styles.toggleThumbOn]} />
    </Pressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings, toggleSetting } = useSettings();
  const { subscription } = useSubscription();
  const [pickingRef, setPickingRef] = useState(false);

  const pickReference = async () => {
    if (pickingRef) return;
    setPickingRef(true);
    if (settings.hapticsEnabled) Haptics.selectionAsync();
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        quality: 0.5,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.canceled && result.assets[0]?.uri) {
        updateSettings({ referencePhoto: result.assets[0].uri });
      }
    } finally {
      setPickingRef(false);
    }
  };

  const clearReference = () => {
    if (settings.hapticsEnabled) Haptics.selectionAsync();
    updateSettings({ referencePhoto: null });
  };

  const isPro = subscription?.status === 'active';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backBtn}>
          <XIcon size={18} color={tokens.colors.text} />
        </Pressable>

        {/* Page title */}
        <Animated.View entering={FadeInUp.delay(60).duration(500)}>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.pageSubtitle}>Personalize your experience</Text>
        </Animated.View>

        {/* Plan Banner */}
        <Animated.View entering={FadeInUp.delay(120).duration(500)}>
          {isPro ? (
            <View style={styles.planBannerPro}>
              <View style={styles.planBannerLeft}>
                <View style={styles.planBadge}>
                  <CrownIcon size={14} color={tokens.colors.gold} />
                </View>
                <View>
                  <Text style={styles.planTitle}>Pro Member</Text>
                  <Text style={styles.planDesc}>Unlimited scans unlocked</Text>
                </View>
              </View>
              <View style={styles.planCheck}>
                <Text style={styles.planCheckMark}>✓</Text>
              </View>
            </View>
          ) : (
            <Pressable
              style={styles.planBanner}
              onPress={() => {
                if (settings.hapticsEnabled) Haptics.selectionAsync();
                router.push('/(main)/pricing');
              }}
            >
              <View style={styles.planBannerLeft}>
                <View style={styles.planBadge}>
                  <CrownIcon size={14} color={tokens.colors.gold} />
                </View>
                <View>
                  <Text style={styles.planBannerTitle}>Upgrade to Pro</Text>
                  <Text style={styles.planBannerDesc}>Unlimited scans, insights & more</Text>
                </View>
              </View>
              <Text style={styles.planArrow}>→</Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View entering={FadeInUp.delay(180).duration(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Preferences</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
            onPress={() => toggleSetting('hapticsEnabled')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIcon, { backgroundColor: tokens.colors.pinkLight }]}>
                <SettingsIcon size={14} color={tokens.colors.pinkRich} />
              </View>
              <View>
                <Text style={styles.rowLabel}>Haptic feedback</Text>
                <Text style={styles.rowDesc}>Subtle vibration on interactions</Text>
              </View>
            </View>
            <Toggle
              value={settings.hapticsEnabled}
              onValueChange={() => toggleSetting('hapticsEnabled')}
            />
          </Pressable>

          <Pressable
            style={({ pressed }) => [styles.row, styles.rowLast, pressed && styles.rowPressed]}
            onPress={() => toggleSetting('mirrorPhotos')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIcon, { backgroundColor: tokens.colors.blush }]}>
                <Text style={styles.rowIconText}>↔</Text>
              </View>
              <View>
                <Text style={styles.rowLabel}>Mirror photos</Text>
                <Text style={styles.rowDesc}>Flip front camera horizontally</Text>
              </View>
            </View>
            <Toggle
              value={settings.mirrorPhotos}
              onValueChange={() => toggleSetting('mirrorPhotos')}
            />
          </Pressable>
        </Animated.View>

        {/* Notifications Section */}
        <Animated.View entering={FadeInUp.delay(240).duration(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Notifications</Text>
          </View>

          <Pressable
            style={({ pressed }) => [styles.row, styles.rowLast, pressed && styles.rowPressed]}
            onPress={() => toggleSetting('notificationsEnabled')}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.rowIcon, { backgroundColor: tokens.colors.beige }]}>
                <Text style={styles.rowIconText}>🔔</Text>
              </View>
              <View>
                <Text style={styles.rowLabel}>Push notifications</Text>
                <Text style={styles.rowDesc}>Scan results, tips & reminders</Text>
              </View>
            </View>
            <Toggle
              value={settings.notificationsEnabled}
              onValueChange={() => toggleSetting('notificationsEnabled')}
            />
          </Pressable>
        </Animated.View>

        {/* Reference Photo Section */}
        <Animated.View entering={FadeInUp.delay(340).duration(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Reference Photo</Text>
          </View>

          <View style={styles.refCard}>
            {settings.referencePhoto ? (
              <>
                <Pressable onPress={pickReference}>
                  <Image source={{ uri: settings.referencePhoto }} style={styles.refPhoto} />
                  <View style={styles.refOverlay}>
                    <Text style={styles.refOverlayText}>Change photo</Text>
                  </View>
                </Pressable>
                <Pressable style={styles.removeRef} onPress={clearReference}>
                  <Text style={styles.removeRefText}>Remove reference photo</Text>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.refEmpty} onPress={pickReference}>
                <View style={styles.refEmptyIcon}>
                  <Text style={styles.refEmptyIconText}>+</Text>
                </View>
                <Text style={styles.refEmptyTitle}>Add your reference photo</Text>
                <Text style={styles.refEmptyDesc}>This helps calibrate your analysis</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>

        {/* App info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Remake v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ✦ in San Francisco</Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.ivory },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 68 },

  // Header
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: tokens.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  pageTitle: {
    fontFamily: tokens.fonts.serif,
    fontSize: 32,
    color: tokens.colors.text,
    letterSpacing: -0.5,
    lineHeight: 38,
  },
  pageSubtitle: {
    fontFamily: tokens.fonts.regular,
    fontSize: 14,
    color: tokens.colors.gray,
    marginTop: 4,
    marginBottom: 28,
  },

  // Plan banner
  planBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.ivory,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: tokens.colors.gold,
    borderStyle: 'dashed',
    padding: 16,
    marginBottom: 32,
  },
  planBannerPro: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.cream,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: tokens.colors.gold + '50',
    padding: 16,
    marginBottom: 32,
  },
  planBannerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  planBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: tokens.colors.gold + '18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planTitle: {
    fontFamily: tokens.fonts.serif,
    fontSize: 15,
    color: tokens.colors.gold,
  },
  planDesc: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    color: tokens.colors.gray,
    marginTop: 1,
  },
  planBannerTitle: {
    fontFamily: tokens.fonts.serif,
    fontSize: 15,
    color: tokens.colors.text,
  },
  planBannerDesc: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    color: tokens.colors.gray,
    marginTop: 1,
  },
  planArrow: {
    fontFamily: tokens.fonts.regular,
    fontSize: 16,
    color: tokens.colors.gold,
    fontWeight: '600',
  },
  planCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: tokens.colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCheckMark: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    color: tokens.colors.white,
    fontWeight: '700',
  },

  // Section
  section: { marginBottom: 28 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 4,
  },
  sectionLabel: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: tokens.colors.gray,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.white,
    paddingLeft: 14,
    paddingRight: 16,
    paddingVertical: 14,
    borderRadius: 14,
  },
  rowPressed: { opacity: 0.7 },
  rowLast: { marginTop: 2 },
  rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowIconText: {
    fontSize: 14,
    color: tokens.colors.pinkRich,
  },
  rowLabel: {
    fontFamily: tokens.fonts.regular,
    fontSize: 14,
    fontWeight: '500',
    color: tokens.colors.text,
  },
  rowDesc: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11.5,
    color: tokens.colors.gray,
    marginTop: 1,
  },

  // Toggle
  toggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    backgroundColor: tokens.colors.grayLight,
    padding: 2,
    justifyContent: 'center',
  },
  toggleOn: { backgroundColor: tokens.colors.pinkRich },
  toggleDisabled: { opacity: 0.4 },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: tokens.colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  toggleThumbOn: { alignSelf: 'flex-end' },

  // Reference photo
  refCard: {
    backgroundColor: tokens.colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  refPhoto: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  refOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.38)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  refOverlayText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 13,
    color: tokens.colors.white,
    fontWeight: '500',
  },
  removeRef: {
    paddingVertical: 14,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
  },
  removeRefText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 13,
    color: tokens.colors.pinkRich,
    fontWeight: '500',
  },

  // Ref empty state
  refEmpty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    gap: 8,
  },
  refEmptyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: tokens.colors.pinkLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  refEmptyIconText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 24,
    color: tokens.colors.pinkRich,
    fontWeight: '300',
    marginTop: -2,
  },
  refEmptyTitle: {
    fontFamily: tokens.fonts.regular,
    fontSize: 14,
    color: tokens.colors.text,
    fontWeight: '500',
  },
  refEmptyDesc: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    color: tokens.colors.gray,
  },

  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: 28,
    paddingBottom: 8,
  },
  footerText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 12,
    color: tokens.colors.gray,
    letterSpacing: 0.3,
  },
  footerSubtext: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11,
    color: tokens.colors.grayLight,
    marginTop: 4,
  },
});