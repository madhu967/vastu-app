import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import * as FileSystem from 'expo-file-system/legacy';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const getSafeKey = (key: string) => encodeURIComponent(key);

const fileSystemStorage = {
  getItem: async (key: string) => {
    try {
      const uri = FileSystem.documentDirectory + getSafeKey(key) + '.txt';
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (fileInfo.exists) {
        return await FileSystem.readAsStringAsync(uri);
      }
      return null;
    } catch (e) {
      console.error("Firebase persistence getItem error:", e);
      return null;
    }
  },
  setItem: async (key: string, value: string) => {
    try {
      const uri = FileSystem.documentDirectory + getSafeKey(key) + '.txt';
      await FileSystem.writeAsStringAsync(uri, value);
    } catch (e) {
      console.error("Firebase persistence setItem error:", e);
    }
  },
  removeItem: async (key: string) => {
    try {
      const uri = FileSystem.documentDirectory + getSafeKey(key) + '.txt';
      await FileSystem.deleteAsync(uri, { idempotent: true });
    } catch (e) {
      console.error("Firebase persistence removeItem error:", e);
    }
  }
};

let auth: any;
try {
  const persistence = getReactNativePersistence(ReactNativeAsyncStorage);
  auth = initializeAuth(app, {
    persistence
  });
} catch (error: any) {
  // If initializeAuth fails (e.g. already initialized), fallback to getAuth
  try {
    auth = getAuth(app);
  } catch (e) {
    console.error("Firebase auth initialization error", error);
  }
}

const db = getFirestore(app);

import { Platform } from 'react-native';

let analytics: any;
// Initialize analytics only if in a web browser environment to prevent issues on native platforms
if (Platform.OS === 'web') {
  analytics = getAnalytics(app);
}

export { app, analytics, auth, db };
