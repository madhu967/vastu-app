import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { PremiumInput } from '@/components/PremiumInput';
import { cornerRadius, palette, spacing, typography } from '@/constants/theme';
import { ScreenHeader } from '@/components/ScreenHeader';

export default function SignupScreen({ onSwitchToLogin }: { onSwitchToLogin: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phone,
        email: user.email,
        status: 'pending',
        requestDate: new Date().toISOString()
      });

      Alert.alert('Success', 'Account created! Please wait for admin approval.');
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={["#5A0008", "#8B000F"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.appTitleBanner}
        >
          <Text style={styles.appTitleText}>Create Account</Text>
          <Text style={styles.appTitleSub}>Join Viswakarma Vastu Sarvaswam</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          <PremiumInput
            label="Full Name"
            value={name}
            placeholder="Enter your full name"
            onChangeText={setName}
            autoCapitalize="words"
          />

          <PremiumInput
            label="Phone Number"
            value={phone}
            placeholder="Enter your phone number"
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <PremiumInput
            label="Email Address"
            value={email}
            placeholder="Enter your email"
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <PremiumInput
            label="Password"
            value={password}
            placeholder="Create a password"
            onChangeText={setPassword}
            secureTextEntry
          />

          <PremiumInput
            label="Confirm Password"
            value={confirmPassword}
            placeholder="Confirm your password"
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <Pressable
            onPress={handleSignup}
            style={({ pressed }) => [styles.calcBtn, pressed && styles.btnPressed]}
            disabled={loading}
          >
            <LinearGradient
              colors={["#F4C430", "#C9830A"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.calcBtnGradient}
            >
              {loading ? (
                <ActivityIndicator color="#3B1F00" />
              ) : (
                <Text style={styles.calcBtnText}>Sign Up</Text>
              )}
            </LinearGradient>
          </Pressable>

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Pressable onPress={onSwitchToLogin} hitSlop={10}>
              <Text style={styles.loginText}>Sign In</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  appTitleBanner: {
    borderRadius: cornerRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
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
  formContainer: {
    backgroundColor: palette.surface,
    padding: spacing.lg,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  calcBtn: {
    borderRadius: cornerRadius.md,
    overflow: "hidden",
    shadowColor: "#F4C430",
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
    marginTop: spacing.sm,
  },
  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  calcBtnGradient: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  calcBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: "#3B1F00",
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
  },
  footerText: {
    fontFamily: 'Manrope_500Medium',
    color: palette.secondaryText,
    fontSize: 13,
  },
  loginText: {
    fontFamily: 'Manrope_700Bold',
    color: '#8B000F',
    fontSize: 13,
  },
});
