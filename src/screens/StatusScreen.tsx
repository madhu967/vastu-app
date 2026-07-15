import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, spacing, cornerRadius } from '@/constants/theme';
import { ScreenHeader } from '@/components/ScreenHeader';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

export default function StatusScreen({ status }: { status: string }) {
  const [userData, setUserData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const u = auth.currentUser;
      if (u) {
        const docSnap = await getDoc(doc(db, 'users', u.uid));
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          title: 'Account Approved',
          message: 'Your account has been fully approved! You now have complete access to Viswakarma Vastu Sarvaswam.',
          colors: ['#065F46', '#047857'],
          icon: '✅',
        };
      case 'rejected':
        return {
          title: 'Access Denied',
          message: 'Unfortunately, your request for access has been rejected by the administrator.',
          colors: ['#991B1B', '#B91C1C'],
          icon: '❌',
        };
      case 'suspended':
        return {
          title: 'Account Suspended',
          message: 'Your account has been temporarily placed on hold by the administrator. Please contact support for more information.',
          colors: ['#9A3412', '#C2410C'],
          icon: '⏸️',
        };
      default:
        return {
          title: 'Approval Pending',
          message: 'Your account is currently under review by the administrator. Please check back later for access.',
          colors: ['#D97706', '#F59E0B'],
          icon: '⏳',
        };
    }
  };

  const config = getStatusConfig();

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
          <Text style={styles.appTitleText}>Account Status</Text>
          <Text style={styles.appTitleSub}>Check your access privileges</Text>
        </LinearGradient>

        <View style={styles.cardContainer}>
          <LinearGradient
            colors={config.colors as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.icon}>{config.icon}</Text>
            <Text style={styles.title}>{config.title}</Text>
            <Text style={styles.message}>{config.message}</Text>
          </LinearGradient>
        </View>

        {userData && (
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Registration Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Full Name:</Text>
              <Text style={styles.detailValue}>{userData.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailValue}>{userData.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Email:</Text>
              <Text style={styles.detailValue}>{userData.email}</Text>
            </View>
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
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: spacing.xl,
    borderRadius: cornerRadius.lg,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 24,
    color: palette.surface,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: palette.surface,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 22,
  },
  detailsCard: {
    backgroundColor: palette.surface,
    padding: spacing.lg,
    borderRadius: cornerRadius.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: palette.border,
  },
  detailsTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    color: palette.text,
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: palette.border,
    paddingBottom: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
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
    paddingVertical: 12,
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
