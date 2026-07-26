import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  Modal,
  Image,
  PanResponder,
  TouchableOpacity
} from 'react-native';
import { signOut, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, spacing, cornerRadius } from '@/constants/theme';
import { ScreenHeader } from '@/components/ScreenHeader';
import { PremiumInput } from '@/components/PremiumInput';
import * as ImagePicker from 'expo-image-picker';
import { sha1 } from '@/utils/sha1';

const CLOUDINARY_CLOUD_NAME = (process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dk6ewm6o3').trim().replace(/['"]/g, '');
const CLOUDINARY_API_KEY = (process.env.EXPO_PUBLIC_CLOUDINARY_API_KEY || '596222265113323').trim().replace(/['"]/g, '');
const CLOUDINARY_API_SECRET = (process.env.EXPO_PUBLIC_CLOUDINARY_API_SECRET || '596222265113323').trim().replace(/['"]/g, '');
const containerSize = 260;

export default function ProfileScreen() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [savingDetails, setSavingDetails] = useState(false);
  
  // Profile details state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [jyothishyalayam, setJyothishyalayam] = useState('');
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  // Custom Image Crop state
  const [pickedImage, setPickedImage] = useState<any>(null);
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [zoomVal, setZoomVal] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const panRef = useRef({ x: 0, y: 0 });
  const user = auth.currentUser;
  const isAdmin = user?.email === 'admin@vastuapp.com';


  // Initialize and track PanResponder for image cropping
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setTranslateX(panRef.current.x + gestureState.dx);
        setTranslateY(panRef.current.y + gestureState.dy);
      },
      onPanResponderRelease: (evt, gestureState) => {
        panRef.current.x += gestureState.dx;
        panRef.current.y += gestureState.dy;
      },
    })
  ).current;

  const fetchUser = async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setName(data.name || '');
        setPhone(data.phone || '');
        setJyothishyalayam(data.jyothishyalayam || '');
      } else if (isAdmin) {
        // Initialize admin profile document if not exists
        const defaultAdmin = {
          name: 'Administrator',
          phone: '',
          jyothishyalayam: '',
          email: user.email,
          status: 'approved',
          requestDate: new Date().toISOString()
        };
        await setDoc(docRef, defaultAdmin);
        setUserData(defaultAdmin);
        setName('Administrator');
        setPhone('');
        setJyothishyalayam('');
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Cloudinary Config Debug:", {
      cloudName: CLOUDINARY_CLOUD_NAME,
      apiKey: CLOUDINARY_API_KEY,
      apiSecretLength: CLOUDINARY_API_SECRET ? CLOUDINARY_API_SECRET.length : 0,
      apiSecretPrefix: CLOUDINARY_API_SECRET ? CLOUDINARY_API_SECRET.substring(0, 3) : 'none'
    });
    fetchUser();
  }, [user]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSaveDetails = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name field cannot be empty');
      return;
    }

    try {
      setSavingDetails(true);
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          name: name.trim(),
          phone: phone.trim(),
          jyothishyalayam: jyothishyalayam.trim(),
        }, { merge: true });
        
        Alert.alert('Success', 'Profile details updated successfully!');
        fetchUser();
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to update profile details.');
    } finally {
      setSavingDetails(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters');
      return;
    }

    try {
      setChangingPassword(true);
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Alert.alert('Success', 'Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (e: any) {
      Alert.alert('Failed to Change Password', e.message || 'Error occurred. Please verify current password.');
    } finally {
      setChangingPassword(false);
    }
  };

  const resetCrop = () => {
    setTranslateX(0);
    setTranslateY(0);
    panRef.current = { x: 0, y: 0 };
    setZoomVal(1);
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need photo library permissions to upload your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setPickedImage(asset);
      resetCrop();
      setCropModalVisible(true);
    }
  };

  // Perform upload using signed request and transformations
  const handleUploadImage = async () => {
    if (!pickedImage) return;

    try {
      setUploadingImage(true);

      const origW = pickedImage.width;
      const origH = pickedImage.height;

      // Fit scale calculations
      const minScale = Math.max(containerSize / origW, containerSize / origH);
      const scaleFactor = minScale * zoomVal;

      // Position calculations
      const dispW = origW * minScale;
      const dispH = origH * minScale;
      const effectiveW = dispW * zoomVal;
      const effectiveH = dispH * zoomVal;

      const initialX = (containerSize - effectiveW) / 2;
      const initialY = (containerSize - effectiveH) / 2;

      const left = initialX + translateX;
      const top = initialY + translateY;

      // Crop offsets relative to zoomed display dimensions
      const cropX = -left;
      const cropY = -top;

      // Map back to original image dimensions
      let origCropX = cropX / scaleFactor;
      let origCropY = cropY / scaleFactor;
      let origCropW = containerSize / scaleFactor;
      let origCropH = containerSize / scaleFactor;

      // Clamp values to original boundaries
      origCropX = Math.round(Math.max(0, Math.min(origW - origCropW, origCropX)));
      origCropY = Math.round(Math.max(0, Math.min(origH - origCropH, origCropY)));
      origCropW = Math.round(Math.min(origW, origCropW));
      origCropH = Math.round(Math.min(origH, origCropH));

      // 1. Try Signed upload first
      let uploadResult: any = null;
      let response;

      try {
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = sha1(`timestamp=${timestamp}${CLOUDINARY_API_SECRET}`);

        const formData = new FormData();
        formData.append('file', {
          uri: pickedImage.uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        } as any);
        formData.append('api_key', CLOUDINARY_API_KEY);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);

        response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.ok) {
          uploadResult = await response.json();
        } else {
          const errText = await response.text();
          console.warn("Signed upload returned status:", response.status, "body:", errText);
        }
      } catch (e) {
        console.warn("Signed upload failed with exception:", e);
      }

      // 2. Fall back to Unsigned upload if signed failed
      if (!uploadResult) {
        console.log("Attempting unsigned upload fallback using preset 'ml_default'...");
        const formData = new FormData();
        formData.append('file', {
          uri: pickedImage.uri,
          type: 'image/jpeg',
          name: 'avatar.jpg',
        } as any);
        formData.append('upload_preset', 'ml_default');

        response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Upload to Cloudinary failed (both signed and unsigned attempts)');
        }
        uploadResult = await response.json();
      }

      const secureUrl = uploadResult.secure_url;

      // 2. Append crop transformations to URL
      const finalCroppedUrl = secureUrl.replace(
        '/image/upload/',
        `/image/upload/c_crop,x_${origCropX},y_${origCropY},w_${origCropW},h_${origCropH}/c_scale,w_400,h_400/`
      );

      // 3. Save to Firestore
      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          profilePicUrl: finalCroppedUrl
        }, { merge: true });

        Alert.alert('Success', 'Profile picture updated successfully!');
        setCropModalVisible(false);
        fetchUser();
      }
    } catch (e: any) {
      console.error(e);
      Alert.alert('Upload Failed', e.message || 'Unable to upload photo. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSliderTouch = (event: any) => {
    const x = event.nativeEvent.locationX;
    const newZoom = Math.max(1, Math.min(3, 1 + (x / 200) * 2));
    setZoomVal(newZoom);
  };

  // Determine initial container styles
  const getCropperImageStyle = () => {
    if (!pickedImage) return {};
    const { width: oW, height: oH } = pickedImage;
    const minScale = Math.max(containerSize / oW, containerSize / oH);
    
    const dispW = oW * minScale;
    const dispH = oH * minScale;

    return {
      width: dispW,
      height: dispH,
      transform: [
        { scale: zoomVal },
        { translateX: translateX / zoomVal },
        { translateY: translateY / zoomVal },
      ]
    };
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
          <Text style={styles.appTitleText}>Your Profile</Text>
          <Text style={styles.appTitleSub}>Manage your details, security and photo</Text>
        </LinearGradient>

        {loading ? (
          <ActivityIndicator size="large" color="#B71C1C" style={{ marginTop: 40 }} />
        ) : (
          <View style={styles.mainCard}>
            {/* Avatar block */}
            <View style={styles.avatarWrapper}>
              <Pressable style={styles.avatarPressable} onPress={handlePickImage}>
                {userData?.profilePicUrl ? (
                  <Image source={{ uri: userData.profilePicUrl }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarFallback}>
                    <Text style={styles.avatarFallbackText}>
                      {isAdmin ? 'A' : (userData?.name ? userData.name.charAt(0).toUpperCase() : 'U')}
                    </Text>
                  </View>
                )}
                <View style={styles.editBadge}>
                  <Text style={styles.editBadgeIcon}>📷</Text>
                </View>
              </Pressable>
              <Text style={styles.roleTitle}>{isAdmin ? 'Administrator' : 'Verified Member'}</Text>
              <Text style={styles.emailSubText}>{user?.email}</Text>
            </View>

            <View style={styles.divider} />

            {/* Profile Info Form */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Personal Details</Text>
            </View>

            <PremiumInput
              label="Full Name"
              value={name}
              placeholder="Enter your name"
              onChangeText={setName}
              autoCapitalize="words"
            />

            <PremiumInput
              label="Phone Number"
              value={phone}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              onChangeText={setPhone}
            />

            <PremiumInput
              label="Jyothishyalayam"
              value={jyothishyalayam}
              placeholder="Enter Jyothishyalayam name"
              onChangeText={setJyothishyalayam}
              autoCapitalize="words"
            />

            <Pressable
              onPress={handleSaveDetails}
              style={({ pressed }) => [styles.saveBtn, pressed && styles.btnPressed]}
              disabled={savingDetails}
            >
              <LinearGradient
                colors={["#F4C430", "#C9830A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.saveBtnGradient}
              >
                {savingDetails ? (
                  <ActivityIndicator color="#3B1F00" />
                ) : (
                  <Text style={styles.saveBtnText}>Save Details</Text>
                )}
              </LinearGradient>
            </Pressable>

            <View style={[styles.divider, { marginVertical: spacing.xl }]} />

            {/* Change Password Form */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Security / Change Password</Text>
            </View>

            <PremiumInput
              label="Current Password"
              value={currentPassword}
              placeholder="Enter current password"
              secureTextEntry
              onChangeText={setCurrentPassword}
            />

            <PremiumInput
              label="New Password"
              value={newPassword}
              placeholder="Enter new password"
              secureTextEntry
              onChangeText={setNewPassword}
            />

            <PremiumInput
              label="Confirm New Password"
              value={confirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              onChangeText={setConfirmPassword}
            />

            <Pressable
              onPress={handleChangePassword}
              style={({ pressed }) => [styles.passwordBtn, pressed && styles.btnPressed]}
              disabled={changingPassword}
            >
              <LinearGradient
                colors={["#B71C1C", "#8B000F"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.passwordBtnGradient}
              >
                {changingPassword ? (
                  <ActivityIndicator color="#FFD95C" />
                ) : (
                  <Text style={styles.passwordBtnText}>Change Password</Text>
                )}
              </LinearGradient>
            </Pressable>
          </View>
        )}

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [styles.logoutBtn, pressed && styles.btnPressed]}
        >
          <Text style={styles.logoutText}>Sign Out</Text>
        </Pressable>
      </ScrollView>

      {/* Crop & Adjust Modal */}
      <Modal
        visible={cropModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setCropModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cropCard}>
            <Text style={styles.cropModalTitle}>Crop & Adjust Photo</Text>
            <Text style={styles.cropModalSubtitle}>Drag to reposition • Use slider to zoom</Text>

            {/* Viewport for cropping */}
            <View style={styles.viewportContainer}>
              <View 
                style={styles.viewport}
                {...panResponder.panHandlers}
              >
                {pickedImage && (
                  <Image
                    source={{ uri: pickedImage.uri }}
                    style={getCropperImageStyle()}
                  />
                )}
              </View>
              {/* Circular Overlay Mask */}
              <View style={styles.circularMask} pointerEvents="none" />
            </View>

            {/* Interactive Slider */}
            <Text style={styles.sliderLabel}>Zoom: {zoomVal.toFixed(1)}x</Text>
            <View style={styles.sliderWrapper}>
              <TouchableOpacity 
                style={styles.sliderBtn} 
                onPress={() => setZoomVal(prev => Math.max(1, prev - 0.2))}
              >
                <Text style={styles.sliderBtnText}>-</Text>
              </TouchableOpacity>
              <View 
                style={styles.sliderContainer}
                onTouchStart={handleSliderTouch}
                onTouchMove={handleSliderTouch}
              >
                <View style={styles.sliderLine} />
                <View style={[styles.sliderHandle, { left: ((zoomVal - 1) / 2) * 180 }]} />
              </View>
              <TouchableOpacity 
                style={styles.sliderBtn} 
                onPress={() => setZoomVal(prev => Math.min(3, prev + 0.2))}
              >
                <Text style={styles.sliderBtnText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.resetBtn} onPress={resetCrop}>
              <Text style={styles.resetBtnText}>↺ Reset Adjustments</Text>
            </TouchableOpacity>

            <View style={styles.modalActionRow}>
              <TouchableOpacity 
                style={styles.cancelModalBtn} 
                onPress={() => setCropModalVisible(false)}
                disabled={uploadingImage}
              >
                <Text style={styles.cancelModalBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.confirmModalBtn} 
                onPress={handleUploadImage}
                disabled={uploadingImage}
              >
                <LinearGradient
                  colors={["#F4C430", "#C9830A"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.confirmModalBtnGradient}
                >
                  {uploadingImage ? (
                    <ActivityIndicator color="#3B1F00" size="small" />
                  ) : (
                    <Text style={styles.confirmModalBtnText}>Crop & Save</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: spacing.xl,
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
  mainCard: {
    backgroundColor: palette.surface,
    padding: spacing.xl,
    borderRadius: cornerRadius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarWrapper: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  avatarPressable: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: palette.gold,
  },
  avatarFallback: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: palette.gold,
  },
  avatarFallbackText: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 40,
    color: '#92400E',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: palette.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  editBadgeIcon: {
    fontSize: 13,
  },
  roleTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    color: palette.text,
  },
  emailSubText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: palette.secondaryText,
    marginTop: 2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: palette.border,
    marginVertical: spacing.md,
  },
  sectionHeaderRow: {
    marginBottom: spacing.md,
  },
  sectionHeading: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 20,
    color: palette.primaryDark,
  },
  saveBtn: {
    borderRadius: cornerRadius.md,
    overflow: 'hidden',
    marginTop: spacing.sm,
    shadowColor: '#F4C430',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  saveBtnGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  saveBtnText: {
    fontFamily: 'Manrope_700Bold',
    color: '#3B1F00',
    fontSize: 15,
  },
  passwordBtn: {
    borderRadius: cornerRadius.md,
    overflow: 'hidden',
    marginTop: spacing.sm,
    shadowColor: '#8B000F',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  passwordBtnGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  passwordBtnText: {
    fontFamily: 'Manrope_700Bold',
    color: '#FFD95C',
    fontSize: 15,
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
    opacity: 0.75,
  },

  // Modal styling
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(90, 0, 8, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  cropCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: cornerRadius.lg,
    padding: spacing.xl,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    borderWidth: 1,
    borderColor: '#EFE3C7',
  },
  cropModalTitle: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 24,
    color: palette.primaryDark,
    marginBottom: 4,
  },
  cropModalSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 13,
    color: palette.secondaryText,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  viewportContainer: {
    width: containerSize,
    height: containerSize,
    position: 'relative',
    borderRadius: cornerRadius.md,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  viewport: {
    width: containerSize,
    height: containerSize,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circularMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: containerSize,
    height: containerSize,
    borderRadius: containerSize / 2,
    borderWidth: 3,
    borderColor: '#FFD95C',
    backgroundColor: 'transparent',
  },
  sliderLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: palette.textMedium,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  sliderBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette.background,
  },
  sliderBtnText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 18,
    color: palette.primary,
    marginTop: -2,
  },
  sliderContainer: {
    width: 200,
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    marginHorizontal: spacing.sm,
  },
  sliderLine: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EFE3C7',
  },
  sliderHandle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#C9830A',
    position: 'absolute',
    top: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  resetBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  resetBtnText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: palette.secondaryText,
  },
  modalActionRow: {
    flexDirection: 'row',
    width: '100%',
    marginTop: spacing.xl,
    justifyContent: 'space-between',
  },
  cancelModalBtn: {
    flex: 1,
    marginRight: spacing.sm,
    paddingVertical: 12,
    borderRadius: cornerRadius.md,
    borderWidth: 1,
    borderColor: palette.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelModalBtnText: {
    fontFamily: 'Manrope_700Bold',
    color: palette.secondaryText,
    fontSize: 14,
  },
  confirmModalBtn: {
    flex: 1.2,
    marginLeft: spacing.sm,
    borderRadius: cornerRadius.md,
    overflow: 'hidden',
  },
  confirmModalBtnGradient: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmModalBtnText: {
    fontFamily: 'Manrope_700Bold',
    color: '#3B1F00',
    fontSize: 14,
  },
});
