import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, spacing, cornerRadius } from '@/constants/theme';
import { ScreenHeader } from '@/components/ScreenHeader';

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const isAdmin = user?.email === 'admin@vastuapp.com';

  useEffect(() => {
    const fetchUser = async () => {
      if (user && !isAdmin) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={styles.container}>
      <ScreenHeader />
      
      <View style={styles.content}>
        <LinearGradient
          colors={["#5A0008", "#8B000F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.appTitleBanner}
        >
          <Text style={styles.appTitleText}>Your Profile</Text>
          <Text style={styles.appTitleSub}>Manage your account details</Text>
        </LinearGradient>

        {loading ? (
          <ActivityIndicator size="large" color="#B71C1C" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.detailsCard}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {isAdmin ? 'A' : (userData?.name ? userData.name.charAt(0).toUpperCase() : 'U')}
              </Text>
            </View>

            <Text style={styles.roleTitle}>{isAdmin ? 'Administrator' : 'Verified User'}</Text>

            <View style={styles.divider} />

            {isAdmin ? (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Email:</Text>
                <Text style={styles.detailValue}>{user?.email}</Text>
              </View>
            ) : (
              <>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Full Name:</Text>
                  <Text style={styles.detailValue}>{userData?.name || 'N/A'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Phone:</Text>
                  <Text style={styles.detailValue}>{userData?.phone || 'N/A'}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Email:</Text>
                  <Text style={styles.detailValue}>{userData?.email || user?.email}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <Text style={[styles.detailValue, { color: '#065F46' }]}>Active & Approved</Text>
                </View>
              </>
            )}
          </View>
        )}

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  appTitleBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.xxl,
    shadowColor: "#8B000F",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.3)",
  },
  appTitleText: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 20,
    color: "#FFD95C",
    lineHeight: 26,
  },
  appTitleSub: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "#FFF8F0",
    opacity: 0.8,
  },
  detailsCard: {
    backgroundColor: palette.surface,
    padding: spacing.xl,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: '#F59E0B',
  },
  avatarText: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 36,
    color: '#92400E',
  },
  roleTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 24,
    color: palette.text,
    marginBottom: spacing.md,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: palette.border,
    marginBottom: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: spacing.sm,
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: palette.secondaryText,
  },
  detailValue: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 14,
    color: palette.text,
  },
  logoutBtn: {
    marginTop: spacing.xl,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#8B000F',
    paddingVertical: 14,
    borderRadius: cornerRadius.md,
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: 'Manrope_700Bold',
    color: '#8B000F',
    fontSize: 16,
  },
  btnPressed: {
    opacity: 0.7,
  }
});
