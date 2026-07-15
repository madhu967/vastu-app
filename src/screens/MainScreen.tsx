import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { HomeScreen } from './HomeScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import AdminApprovalsScreen from './AdminApprovalsScreen';
import StatusScreen from './StatusScreen';
import SignupScreen from './SignupScreen';
import { auth, db } from '../firebase';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { palette } from '@/constants/theme';

export default function MainScreen() {
  const [activeTab, setActiveTab] = useState<'home' | 'auth' | 'approvals' | 'status'>('home');
  const [user, setUser] = useState<any>(auth.currentUser);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [userStatus, setUserStatus] = useState<string>('pending');

  useEffect(() => {
    let unsubscribeSnapshot: () => void;

    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        if (u.email === 'admin@vastuapp.com') {
          setActiveTab('home');
        } else {
          // Listen to status in real-time
          unsubscribeSnapshot = onSnapshot(doc(db, 'users', u.uid), (docSnap) => {
            if (docSnap.exists()) {
              const status = docSnap.data().status;
              setUserStatus(status);
              
              // Only approved users can see Profile, everyone else gets Status
              if (status === 'approved') {
                // If they were stuck on status page, move them to home when approved
                setActiveTab(prev => prev === 'status' ? 'home' : prev);
              } else {
                // Force pending, rejected, or suspended users onto the status screen 
                // if they are trying to view a restricted tab like Profile
                setActiveTab(prev => prev === 'auth' ? 'status' : prev);
              }
            }
          });
        }
      } else {
        setActiveTab('home');
        if (unsubscribeSnapshot) unsubscribeSnapshot();
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const isAdmin = user?.email === 'admin@vastuapp.com';
  const isApproved = userStatus === 'approved';
  const isUnapproved = user && !isAdmin && !isApproved;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {activeTab === 'home' && <HomeScreen />}
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
          <Text style={[styles.tabLabel, activeTab === 'home' && styles.activeTabLabel]}>Home</Text>
        </TouchableOpacity>
        
        {isAdmin && (
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setActiveTab('approvals')}
          >
            <Text style={[styles.tabIcon, activeTab === 'approvals' && styles.activeTabIcon]}>✓</Text>
            <Text style={[styles.tabLabel, activeTab === 'approvals' && styles.activeTabLabel]}>Approvals</Text>
          </TouchableOpacity>
        )}

        {isUnapproved && (
          <TouchableOpacity 
            style={styles.tabItem} 
            onPress={() => setActiveTab('status')}
          >
            <Text style={[styles.tabIcon, activeTab === 'status' && styles.activeTabIcon]}>ℹ️</Text>
            <Text style={[styles.tabLabel, activeTab === 'status' && styles.activeTabLabel]}>Status</Text>
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
              {user ? 'Profile' : 'Login'}
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
