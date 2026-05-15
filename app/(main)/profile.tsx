import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { tokens } from '@/components/theme';
import { ProfileIcon } from '@/components/ui/icons/profile';
import { SparkleIcon } from '@/components/ui/icons/sparkle';
import { ScanLensIcon } from '@/components/ui/icons/scan-lens';
import { StarIcon } from '@/components/ui/icons/star';
import { ChevronRightIcon } from '@/components/ui/icons/chevron';
import { StreakIcon } from '@/components/ui/icons/streak';
import { ResultsIcon } from '@/components/ui/icons/results';
import { useAuth } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/user-context';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase';

interface ScanSummary {
  id: string;
  overall_score: number;
  created_at: string;
}

interface ProfileStats {
  scanCount: number;
  avgScore: number | null;
  currentStreak: number;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user: authUser } = useAuth();
  const { user: profile } = useUser();

  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [recentScans, setRecentScans] = useState<ScanSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser) return;
    const userId = authUser.id;

    const supabase = createClient();

    async function loadData() {
      setLoading(true);

      // Run stats and scans queries in parallel
      const [{ data: scansData, count }, { data: streakData }, { data: recentData }] = await Promise.all([
        supabase
          .from('scans')
          .select('overall_score', { count: 'exact', head: false })
          .eq('user_id', userId)
          .order('created_at', { ascending: false }),
        supabase
          .from('streaks')
          .select('current_streak')
          .eq('user_id', userId)
          .single(),
        supabase
          .from('scans')
          .select('id, overall_score, created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      const scanCount = count ?? 0;
      const scores = (scansData ?? []).map((s: { overall_score: number }) => s.overall_score).filter(Boolean);
      const avgScore = scores.length > 0
        ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
        : null;

      setStats({
        scanCount,
        avgScore,
        currentStreak: streakData?.current_streak ?? 0,
      });
      setRecentScans((recentData ?? []) as ScanSummary[]);
      setLoading(false);
    }

    loadData();
  }, [authUser]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.spacer} />
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <Animated.View entering={FadeInUp.delay(100).duration(600)} style={styles.profileCard}>
          <View style={styles.avatarRing}>
            <View style={styles.avatar}>
              <ProfileIcon size={32} color={tokens.colors.pinkRich} />
            </View>
            <View style={styles.avatarBadge}>
              <SparkleIcon size={10} color={tokens.colors.gold} />
            </View>
          </View>
          <Text style={styles.email}>{profile?.email ?? 'you@example.com'}</Text>
          <Text style={styles.memberSince}>
            {authUser
              ? `Member since ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`
              : 'Member since May 2026'}
          </Text>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.statsRow}>
          {loading ? (
            <>
              <View style={styles.stat}><Skeleton width={36} height={36} borderRadius={18} style={{ marginBottom: 10 }} /><Skeleton width={52} height={26} borderRadius={6} style={{ marginBottom: 6 }} /><Skeleton width={40} height={10} borderRadius={4} /></View>
              <View style={styles.stat}><Skeleton width={36} height={36} borderRadius={18} style={{ marginBottom: 10 }} /><Skeleton width={52} height={26} borderRadius={6} style={{ marginBottom: 6 }} /><Skeleton width={40} height={10} borderRadius={4} /></View>
              <View style={styles.stat}><Skeleton width={36} height={36} borderRadius={18} style={{ marginBottom: 10 }} /><Skeleton width={52} height={26} borderRadius={6} style={{ marginBottom: 6 }} /><Skeleton width={40} height={10} borderRadius={4} /></View>
            </>
          ) : (
            <>
              <View style={styles.stat}>
                <View style={styles.statIcon}><ScanLensIcon size={16} color={tokens.colors.gold} /></View>
                <Text style={styles.statVal}>{stats?.scanCount ?? 0}</Text>
                <Text style={styles.statLabel}>Scans</Text>
              </View>
              <View style={styles.stat}>
                <View style={styles.statIcon}><StreakIcon size={16} color={tokens.colors.gold} /></View>
                <Text style={styles.statVal}>{stats?.currentStreak ?? 0}</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.stat}>
                <View style={styles.statIcon}><StarIcon size={16} color={tokens.colors.gold} /></View>
                <Text style={styles.statVal}>{stats?.avgScore ?? '--'}</Text>
                <Text style={styles.statLabel}>Avg Score</Text>
              </View>
            </>
          )}
        </Animated.View>

        {/* History Section */}
        <Animated.View entering={FadeInUp.delay(300).duration(600)} style={styles.historySection}>
          <Text style={styles.sectionHeader}>Past Analyses</Text>
          {loading ? (
            <>
              <SkeletonCard style={{ marginBottom: 10 }} />
              <SkeletonCard />
            </>
          ) : recentScans.length === 0 ? (
            <View style={styles.emptyState}>
              <View style={styles.emptyIconWrap}>
                <ScanLensIcon size={28} color={tokens.colors.border} />
              </View>
              <Text style={styles.emptyText}>No analyses yet.</Text>
              <Text style={styles.emptySubtext}>Complete your first scan to see it here.</Text>
            </View>
          ) : (
            recentScans.map((scan) => {
              const date = new Date(scan.created_at);
              return (
                <Pressable
                  key={scan.id}
                  style={styles.scanRow}
                  onPress={() =>
                    router.push({
                      pathname: '/(main)/scan/results',
                      params: {
                        uri: '',
                        diagnosis: JSON.stringify({
                          overallScore: scan.overall_score,
                          categoryScores: { complexion: 0, eyes: 0, lips: 0, sculptGlow: 0 },
                          timestamp: scan.created_at,
                        }),
                        coaching: JSON.stringify({ suggestions: [] }),
                      },
                    })
                  }
                >
                  <View style={styles.scanLeft}>
                    <View style={styles.scanScore}>
                      <Text style={styles.scanScoreText}>{scan.overall_score}</Text>
                    </View>
                    <View>
                      <Text style={styles.scanDate}>
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </Text>
                      <Text style={styles.scanTime}>
                        {date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </Text>
                    </View>
                  </View>
                  <ChevronRightIcon size={16} color={tokens.colors.grayLight} />
                </Pressable>
              );
            })
          )}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.menuSection}>
          <Text style={styles.sectionHeader}>Quick Actions</Text>
          <Pressable
            style={styles.menuRow}
            onPress={() => router.push('/(main)/scan')}
          >
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}><ScanLensIcon size={18} color={tokens.colors.pinkRich} /></View>
              <Text style={styles.menuLabel}>Scan a product</Text>
            </View>
            <ChevronRightIcon size={16} color={tokens.colors.grayLight} />
          </Pressable>
          {recentScans[0] ? (
            <Pressable
              style={styles.menuRow}
              onPress={() =>
                router.push({
                  pathname: '/(main)/scan/results',
                  params: {
                    uri: '',
                    diagnosis: JSON.stringify({
                      overallScore: recentScans[0].overall_score,
                      categoryScores: { complexion: 0, eyes: 0, lips: 0, sculptGlow: 0 },
                      timestamp: recentScans[0].created_at,
                    }),
                    coaching: JSON.stringify({ suggestions: [] }),
                  },
                })
              }
            >
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}><ResultsIcon size={18} color={tokens.colors.pinkRich} /></View>
                <Text style={styles.menuLabel}>View last results</Text>
              </View>
              <ChevronRightIcon size={16} color={tokens.colors.grayLight} />
            </Pressable>
          ) : (
            <View style={[styles.menuRow, styles.menuRowDisabled]}>
              <View style={styles.menuLeft}>
                <View style={styles.menuIcon}><ResultsIcon size={18} color={tokens.colors.border} /></View>
                <Text style={[styles.menuLabel, styles.menuLabelDisabled]}>View last results</Text>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: tokens.colors.cream },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: tokens.colors.cream,
  },
  back: { fontSize: 32, color: tokens.colors.text, fontWeight: '300', marginTop: -4 },
  title: { fontFamily: tokens.fonts.serif, fontSize: 18, fontWeight: '400', color: tokens.colors.text, letterSpacing: 0.3 },
  spacer: { width: 28 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 28, paddingBottom: 50 },

  // Profile Header
  profileCard: { alignItems: 'center', paddingVertical: 36, paddingHorizontal: 20, marginBottom: 8 },
  avatarRing: { position: 'relative', marginBottom: 16 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: tokens.colors.pinkLight,
    borderWidth: 2,
    borderColor: tokens.colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: tokens.colors.darkBg,
    borderWidth: 2,
    borderColor: tokens.colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: { fontFamily: tokens.fonts.regular, fontSize: 16, fontWeight: '500', color: tokens.colors.text, marginBottom: 4 },
  memberSince: { fontFamily: tokens.fonts.regular, fontSize: 12, color: tokens.colors.gray, letterSpacing: 0.2 },

  // Stats Row
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
  stat: {
    flex: 1,
    backgroundColor: tokens.colors.white,
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: tokens.colors.border,
    shadowColor: tokens.colors.pinkDeep,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: tokens.colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statVal: { fontFamily: tokens.fonts.serif, fontSize: 26, color: tokens.colors.pinkDeep, marginBottom: 6 },
  statLabel: { fontFamily: tokens.fonts.regular, fontSize: 11, color: tokens.colors.gray, letterSpacing: 0.3, textTransform: 'uppercase' },

  // History Section
  historySection: { marginBottom: 24 },
  sectionHeader: {
    fontFamily: tokens.fonts.regular,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: tokens.colors.gray,
    fontWeight: '600',
    marginBottom: 16,
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
    backgroundColor: tokens.colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderStyle: 'dashed',
  },
  emptyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: tokens.colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emptyText: { fontFamily: tokens.fonts.serif, fontSize: 16, color: tokens.colors.text, marginBottom: 6 },
  emptySubtext: { fontFamily: tokens.fonts.regular, fontSize: 13, color: tokens.colors.gray, textAlign: 'center', lineHeight: 20 },

  // Quick Actions Menu
  menuSection: { marginBottom: 32 },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.white,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: tokens.colors.pinkLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: { fontFamily: tokens.fonts.regular, fontSize: 15, color: tokens.colors.text, fontWeight: '500' },
  menuRowDisabled: { opacity: 0.5 },
  menuLabelDisabled: { color: tokens.colors.gray },

  // Scan Row
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: tokens.colors.white,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  scanLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  scanScore: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: tokens.colors.beige,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanScoreText: { fontFamily: tokens.fonts.serif, fontSize: 16, color: tokens.colors.pinkDeep, fontWeight: '600' },
  scanDate: { fontFamily: tokens.fonts.regular, fontSize: 14, color: tokens.colors.text, fontWeight: '500', marginBottom: 2 },
  scanTime: { fontFamily: tokens.fonts.regular, fontSize: 12, color: tokens.colors.gray },
});