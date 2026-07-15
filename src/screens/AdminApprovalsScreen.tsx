import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { palette, spacing, cornerRadius } from '@/constants/theme';
import { ScreenHeader } from '@/components/ScreenHeader';

type UserData = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  requestDate: string;
};

type TabType = 'pending' | 'active' | 'blocked';

export default function AdminApprovalsScreen() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('pending');

  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const usersData: UserData[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as UserData);
      });
      // Sort by date, newest first
      usersData.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (userId: string, newStatus: UserData['status']) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        status: newStatus
      });
      Alert.alert('Success', `User status updated to ${newStatus}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to update user status');
    }
  };

  const handleDeleteUser = (userId: string) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to completely delete this user's data from the database? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'users', userId));
              Alert.alert('Deleted', 'User data has been removed from the database.');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete user');
            }
          }
        }
      ]
    );
  };

  const filteredUsers = users.filter(u => {
    if (activeTab === 'pending') return u.status === 'pending';
    if (activeTab === 'active') return u.status === 'approved';
    if (activeTab === 'blocked') return u.status === 'rejected' || u.status === 'suspended';
    return false;
  });

  const renderItem = ({ item }: { item: UserData }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name || 'Unknown User'}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        <Text style={styles.userPhone}>{item.phone || 'No Phone'}</Text>
        
        <View style={styles.metaRow}>
          <Text style={styles.userDate}>
            Registered: {new Date(item.requestDate).toLocaleDateString()}
          </Text>
          {item.status === 'suspended' && (
            <Text style={styles.suspendedBadge}>SUSPENDED</Text>
          )}
          {item.status === 'rejected' && (
            <Text style={styles.rejectedBadge}>REJECTED</Text>
          )}
        </View>
      </View>
      
      <View style={styles.actions}>
        {activeTab === 'pending' && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.approveBtn]}
              onPress={() => handleUpdateStatus(item.id, 'approved')}
            >
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.rejectBtn]}
              onPress={() => handleUpdateStatus(item.id, 'rejected')}
            >
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'active' && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.suspendBtn]}
              onPress={() => handleUpdateStatus(item.id, 'suspended')}
            >
              <Text style={styles.buttonText}>Suspend</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteBtn]}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'blocked' && (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.approveBtn]}
              onPress={() => handleUpdateStatus(item.id, 'approved')}
            >
              <Text style={styles.buttonText}>Restore</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.deleteBtn]}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

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
          <Text style={styles.appTitleText}>User Management</Text>
          <Text style={styles.appTitleSub}>Control access & administration</Text>
        </LinearGradient>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
            onPress={() => setActiveTab('pending')}
          >
            <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Pending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => setActiveTab('active')}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'blocked' && styles.activeTab]}
            onPress={() => setActiveTab('blocked')}
          >
            <Text style={[styles.tabText, activeTab === 'blocked' && styles.activeTabText]}>Blocked</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#8B000F" style={{ marginTop: 40 }} />
        ) : filteredUsers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found in this category.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
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
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: palette.surface,
    borderRadius: cornerRadius.md,
    padding: 4,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: palette.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: cornerRadius.sm,
  },
  activeTab: {
    backgroundColor: '#FEF3C7',
  },
  tabText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: palette.secondaryText,
  },
  activeTabText: {
    color: '#92400E',
    fontFamily: 'Manrope_700Bold',
  },
  listContainer: {
    paddingBottom: spacing.xxl,
  },
  userCard: {
    backgroundColor: palette.surface,
    padding: spacing.lg,
    borderRadius: cornerRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  userInfo: {
    marginBottom: spacing.md,
  },
  userName: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 18,
    color: palette.text,
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 14,
    color: palette.secondaryText,
    marginBottom: 2,
  },
  userPhone: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: palette.text,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDate: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: palette.secondaryText,
  },
  suspendedBadge: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#9A3412',
    backgroundColor: '#FFEDD5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  rejectedBadge: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#991B1B',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: cornerRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveBtn: {
    backgroundColor: '#059669',
  },
  rejectBtn: {
    backgroundColor: '#DC2626',
  },
  suspendBtn: {
    backgroundColor: '#D97706',
  },
  deleteBtn: {
    backgroundColor: '#991B1B',
  },
  buttonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
    color: palette.secondaryText,
  }
});
