import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import { HomeScreen } from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import AdminApprovalsScreen from './AdminApprovalsScreen';
import StatusScreen from './StatusScreen';
import SignupScreen from './SignupScreen';
import CompassScreen from './CompassScreen';
import { PatrikaScreen } from './PatrikaScreen';
import { auth, db } from '../firebase';
import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { palette } from '@/constants/theme';
import { useAppLanguage } from '@/context/AppLanguageContext';
import { getAppStrings } from '@/i18n/strings';

export default function MainScreen() {
  const { language } = useAppLanguage();
  const strings = getAppStrings(language);
  const [activeTab, setActiveTab] = useState<'home' | 'compass' | 'patrika' | 'auth' | 'approvals' | 'status'>('home');
  const [user, setUser] = useState<any>(auth.currentUser);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userStatus, setUserStatus] = useState<string>('pending');
  const [userRole, setUserRole] = useState<string>('user');

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const loadCachedAuth = async (uid: string) => {
      try {
        const cached = await AsyncStorage.getItem(`user_profile_${uid}`);
        if (cached) {
          const data = JSON.parse(cached);
          setUserStatus(data.status || 'pending');
          setUserRole(data.role || 'user');
          if (data.status === 'approved') {
            setActiveTab(prev => prev === 'status' ? 'home' : prev);
          }
        }
      } catch (e) {
        console.log("MainScreen load cache error:", e);
      }
    };

    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      setUser(u);
      if (u) {
        if (u.email === 'admin@vastuapp.com') {
          setActiveTab('home');
          setUserRole('admin');
          setUserStatus('approved');
          
          // Auto-repair admin document with role: 'admin' and status: 'approved'
          setDoc(doc(db, 'users', u.uid), {
            role: 'admin',
            status: 'approved',
            email: u.email,
            name: 'Administrator'
          }, { merge: true }).catch(err => {
            console.log("Admin auto-repair error:", err);
          });
        } else {
          // Load cache first
          loadCachedAuth(u.uid);

          // Listen to status and role in real-time
          unsubscribeSnapshot = onSnapshot(doc(db, 'users', u.uid), (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUserStatus(data.status);
              setUserRole(data.role || 'user');
              
              // Only approved users can see Profile, everyone else gets Status
              if (data.status === 'approved') {
                // If they were stuck on status page, move them to home when approved
                setActiveTab(prev => prev === 'status' ? 'home' : prev);
              } else {
                // Force pending, rejected, or suspended users onto the status screen 
                // if they are trying to view a restricted tab like Profile
                setActiveTab(prev => prev === 'auth' ? 'status' : prev);
              }
            } else {
              // The user document was deleted from Firestore database
              // Wait, check if the user is newly registered (within last 15 seconds) to avoid signup race condition
              const creationTime = u.metadata?.creationTime ? new Date(u.metadata.creationTime).getTime() : 0;
              const isVeryNew = Date.now() - creationTime < 15000; // 15 seconds
              
              if (isVeryNew) {
                console.log("User is newly created, skipping auto-deletion during registration window.");
                return;
              }

              console.log("User document deleted. Initiating account deletion from Firebase Auth...");
              setUserStatus('deleted');
              setUserRole('user');
              // Run account deletion asynchronously
              (async () => {
                try {
                  await u.delete();
                  Alert.alert("Account Deleted", "Your account has been removed by the administrator. Please register again to request access.");
                } catch (err: any) {
                  console.warn("Auth deletion failed (likely needs recent login). Signing out...", err);
                  Alert.alert("Account Deleted", "Your account has been deleted by the administrator. Signing out...");
                  await auth.signOut();
                }
              })();
            }
          }, (error) => {
            console.log("MainScreen snapshot error caught:", error);
          });
        }
      } else {
        setActiveTab('home');
        setUserRole('user');
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const isAdmin = user?.email === 'admin@vastuapp.com' || userRole === 'admin';
  const isApproved = userStatus === 'approved';
  const isUnapproved = user && !isAdmin && !isApproved;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
        {activeTab === 'compass' && <CompassScreen />}
        {activeTab === 'patrika' && <PatrikaScreen />}
        {activeTab === 'approvals' && <AdminApprovalsScreen />}
        {activeTab === 'status' && <StatusScreen status={userStatus} />}
        {activeTab === 'auth' && (
          user ? <ProfileScreen /> : 
          (authMode === 'login' ? 
            <LoginScreen onSwitchToSignup={() => setAuthMode('signup')} /> : 
            <SignupScreen onSwitchToLogin={() => setAuthMode('login')} />
          )
        )}
      </View>
      
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('home')}
        >
          <Text style={[styles.tabIcon, activeTab === 'home' && styles.activeTabIcon]}>🏠</Text>
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>{strings.homeTab}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('compass')}
        >
          <Text style={[styles.tabIcon, activeTab === 'compass' && styles.activeTabIcon]}>🧭</Text>
          <Text style={[styles.tabLabel, activeTab === 'compass' && styles.activeTabLabel]}>Compass</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem} 
          onPress={() => setActiveTab('patrika')}
        >
          <Text style={[styles.tabIcon, activeTab === 'patrika' && styles.activeTabIcon]}>📜</Text>
          <Text style={[styles.tabLabel, activeTab === 'patrika' && styles.activeTabLabel]}>{strings.patrikaTab}</Text>
        </TouchableOpacity>
        
        {isAdmin && (
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setActiveTab('approvals')}
          >
            <Text style={[styles.tabIcon, activeTab === 'approvals' && styles.activeTabIcon]}>✓</Text>
            <Text style={[styles.tabLabel, activeTab === 'approvals' && styles.activeTabLabel]}>{strings.approvalsTab}</Text>
          </TouchableOpacity>
        )}

        {isUnapproved && (
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setActiveTab('status')}
          >
            <Text style={[styles.tabIcon, activeTab === 'status' && styles.activeTabIcon]}>ℹ️</Text>
            <Text style={[styles.tabLabel, activeTab === 'status' && styles.activeTabLabel]}>{strings.statusTab}</Text>
          </TouchableOpacity>
        )}
        
        {!isUnapproved && (
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setActiveTab('auth')}
          >
            <Text style={[styles.tabIcon, activeTab === 'auth' && styles.activeTabIcon]}>
              {user ? '👤' : '🔑'}
            </Text>
            <Text style={[styles.tabLabel, activeTab === 'auth' && styles.activeTabLabel]}>
              {user ? strings.profileTab : strings.loginTab}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: palette.surface,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    paddingBottom: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 20,
    opacity: 0.5,
  },
  activeTabIcon: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: palette.secondaryText,
    fontFamily: 'Manrope_600SemiBold',
  },
  activeTabLabel: {
    color: palette.primary,
    fontWeight: 'bold',
  },
});
