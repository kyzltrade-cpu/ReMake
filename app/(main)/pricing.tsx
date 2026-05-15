import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { tokens } from '@/components/theme';
import { GlassButton } from '@/components/glass-button';
import { CrownIcon } from '@/components/ui/icons/crown';
import { XIcon } from '@/components/ui/icons/x';
import { useSubscription } from '@/contexts/subscription-context';

const MONTHLY = { label: 'Monthly', price: '$4.99', period: '/month' };
const YEARLY = { label: 'Yearly', price: '$39.99', period: '/year', equiv: '$3.33/month' };

type Billing = 'monthly' | 'yearly';

function CancelFlow({ onCancel }: { onCancel: () => void }) {
  const handleCancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Cancel your subscription?',
      "You'll lose access to unlimited scans at the end of your billing period. You can resubscribe anytime.",
      [
        { text: 'Keep Subscription', style: 'cancel' },
        { text: 'Cancel Anyway', style: 'destructive', onPress: onCancel },
      ]
    );
  };
  return (
    <Pressable onPress={handleCancel} style={styles.cancelBtn}>
      <Text style={styles.cancelBtnText}>Cancel subscription</Text>
    </Pressable>
  );
}

export default function PricingScreen() {
  const router = useRouter();
  const { subscription } = useSubscription();
  const [billing, setBilling] = useState<Billing>('monthly');

  const isActive = subscription?.status === 'active';
  const isYearlyBilling = billing === 'yearly';
  const isCurrentPlan = (plan: Billing) =>
    subscription?.status === 'active' &&
    ((plan === 'yearly' && isYearlyBilling) || (plan === 'monthly' && !isYearlyBilling));

  const handleSubscribe = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // TODO: wire to Stripe checkout
    Alert.alert('Coming soon', 'Stripe checkout will be integrated shortly.');
  };

  const handleCancel = () => {
    // TODO: wire to Stripe billing portal or backend cancel endpoint
    Alert.alert('Done', 'Cancellation request received. Access continues until end of billing period.');
  };

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(main)/settings');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.header}>
        <Pressable onPress={handleClose} hitSlop={12} style={styles.closeBtn}>
          <XIcon size={20} color={tokens.colors.text} />
        </Pressable>
        <Text style={styles.headerTitle}>
          {isActive ? 'Your Plan' : 'Choose Your Plan'}
        </Text>
        <View style={styles.closeBtn} />
      </Animated.View>

      {/* Plan cards */}
      <ScrollView contentContainerStyle={styles.cardsWrap} showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.cards}>
          {([MONTHLY, YEARLY] as const).map((plan) => {
            const isSelected = isYearlyBilling ? plan === YEARLY : plan === MONTHLY;
            const isYearly = plan === YEARLY;
            return (
              <Pressable
                key={plan.label}
                style={[styles.planCard, isSelected && styles.planCardActive]}
                onPress={() => {
                  Haptics.selectionAsync();
                  setBilling(plan === YEARLY ? 'yearly' : 'monthly');
                }}
              >
                {isYearly && (
                  <View style={[styles.bestValueChip, !isSelected && styles.bestValueChipInactive]}>
                    <Text style={[styles.bestValueText, !isSelected && styles.bestValueTextInactive]}>
                      Best Value
                    </Text>
                  </View>
                )}
                <Text style={styles.planLabel}>{plan.label}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
                {isYearly && (
                  <Text style={styles.planSavings}>{YEARLY.equiv}</Text>
                )}
              </Pressable>
            );
          })}
        </Animated.View>

        {/* Feature list */}
        <Animated.View entering={FadeInUp.delay(280).duration(600)} style={styles.features}>
          {[
            'Unlimited AI scans',
            'Detailed category breakdown',
            'Personalized coaching tips',
            'Streak tracking & insights',
          ].map((feature) => (
            <View key={feature} style={styles.featureRow}>
              <Text style={styles.featureCheck}>✦</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Bottom */}
      <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.bottom}>
        {isActive ? (
          <CancelFlow onCancel={handleCancel} />
        ) : (
          <>
            <GlassButton
              title="Change Your Plan"
              onPress={handleSubscribe}
              variant="primary"
              style={styles.cta}
            />
          </>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.ivory,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 68,
    paddingBottom: 20,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: tokens.colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: tokens.fonts.serif,
    fontSize: 20,
    fontWeight: '400',
    color: tokens.colors.text,
    letterSpacing: 0.2,
  },

  // Cards
  cardsWrap: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 8 },
  cards: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  planCard: {
    flex: 1,
    backgroundColor: tokens.colors.white,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: tokens.colors.border,
    padding: 20,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'flex-start',
    paddingTop: 16,
  },
  planCardActive: {
    borderColor: tokens.colors.gold,
    backgroundColor: tokens.colors.cream,
  },
  bestValueChip: {
    alignSelf: 'center',
    backgroundColor: tokens.colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  bestValueChipInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.colors.goldSoft,
  },
  bestValueText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 9,
    fontWeight: '600',
    color: tokens.colors.white,
    letterSpacing: 0.05,
  },
  bestValueTextInactive: {
    color: tokens.colors.gold,
  },
  currentChip: {
    alignSelf: 'center',
    backgroundColor: tokens.colors.gold,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 80,
    alignItems: 'center',
  },
  currentChipInactive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: tokens.colors.goldSoft,
  },
  currentChipText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 9,
    fontWeight: '600',
    color: tokens.colors.white,
    letterSpacing: 0.05,
  },
  currentChipTextInactive: {
    color: 'transparent',
  },
  planLabel: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.08,
    color: tokens.colors.gray,
    marginBottom: 6,
  },
  planPrice: {
    fontFamily: tokens.fonts.serif,
    fontSize: 28,
    fontWeight: '400',
    color: tokens.colors.text,
  },
  planPeriod: {
    fontFamily: tokens.fonts.regular,
    fontSize: 13,
    fontWeight: '300',
    color: tokens.colors.gray,
    marginTop: 2,
  },
  planSavings: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11,
    color: tokens.colors.gold,
    fontWeight: '500',
    marginTop: 6,
  },

  // Features
  features: {
    backgroundColor: tokens.colors.white,
    borderRadius: 16,
    padding: 20,
    gap: 12,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureCheck: {
    fontSize: 12,
    color: tokens.colors.gold,
  },
  featureText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 14,
    color: tokens.colors.text,
  },

  // Bottom
  bottom: { alignItems: 'center', gap: 12, paddingHorizontal: 24, paddingBottom: 48 },
  cta: { width: '100%' },
  legalText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11,
    color: tokens.colors.grayLight,
  },
  cancelBtn: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontFamily: tokens.fonts.regular,
    fontSize: 13,
    color: tokens.colors.gray,
    textDecorationLine: 'underline',
  },
});