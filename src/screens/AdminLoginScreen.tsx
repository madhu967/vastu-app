import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumInput } from '@/components/PremiumInput';
import { cornerRadius, palette, spacing, typography } from '@/constants/theme';

export default function AdminLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Admin logged in successfully!');
      navigation.navigate('Home'); 
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.contentContainer}>
        {/* App Title Header */}
        <LinearGradient
          colors={["#5A0008", "#8B000F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.headerBanner}
        >
          <Text style={styles.headerTitle}>Admin Portal</Text>
          <Text style={styles.headerSubtitle}>Viswakarma Vastu Sarvaswam</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Secure Access</Text>
          <Text style={styles.sectionSubtitle}>Sign in to access approval dashboard</Text>

          <PremiumInput
            label="Admin Email"
            value={email}
            placeholder="admin@vastuapp.com"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <PremiumInput
            label="Admin Password"
            value={password}
            placeholder="••••••••"
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [styles.calcBtn, pressed && styles.btnPressed]}
            disabled={loading}
          >
            <LinearGradient
              colors={["#B71C1C", "#8B000F"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.calcBtnGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFD95C" />
              ) : (
                <Text style={styles.calcBtnText}>Login to Dashboard</Text>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
  },
  headerBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    alignItems: 'center',
    shadowColor: "#8B000F",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255,217,92,0.3)",
  },
  headerTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 28,
    color: "#FFD95C",
    lineHeight: 34,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: "#FFF8F0",
    opacity: 0.8,
    marginTop: 4,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: palette.surface,
    padding: spacing.xl,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: "CormorantGaramond_700Bold",
    fontSize: 24,
    color: palette.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...typography.body,
    color: palette.secondaryText,
    marginBottom: spacing.xl,
  },
  calcBtn: {
    borderRadius: cornerRadius.md,
    overflow: "hidden",
    shadowColor: "#8B000F",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginTop: spacing.md,
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  calcBtnGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  calcBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#FFD95C",
    letterSpacing: 0.5,
  },
});
