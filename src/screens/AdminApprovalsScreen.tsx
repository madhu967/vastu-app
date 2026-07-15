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
  const [limit, setLimit] = useState(50);

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

  const displayedUsers = filteredUsers.slice(0, limit);

  const handleLoadMore = () => {
    if (limit < filteredUsers.length) {
      setLimit(prev => prev + 50);
    }
  };

  const renderItem = ({ item }: { item: UserData }) => {
    const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';

    return (
      <View style={styles.userCard}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <View style={styles.userInfoCol}>
            <Text style={styles.userName} numberOfLines={1}>{item.name || 'Unknown User'}</Text>
            <Text style={styles.userEmail} numberOfLines={1}>{item.email}</Text>
            {item.phone && <Text style={styles.userPhone}>{item.phone}</Text>}
          </View>
        </View>
        
        <View style={styles.metaRow}>
          <Text style={styles.userDate}>
            Joined: {new Date(item.requestDate).toLocaleDateString()}
          </Text>
          <View style={styles.badgesRow}>
            {item.status === 'suspended' && (
              <View style={styles.badgeSuspended}><Text style={styles.badgeSuspendedText}>SUSPENDED</Text></View>
            )}
            {item.status === 'rejected' && (
              <View style={styles.badgeRejected}><Text style={styles.badgeRejectedText}>REJECTED</Text></View>
            )}
          </View>
        </View>
        
        <View style={styles.actionsDivider} />
        
        <View style={styles.actions}>
          {activeTab === 'pending' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.approveBtn]}
                onPress={() => handleUpdateStatus(item.id, 'approved')}
              >
                <Text style={styles.successButtonText}>Approve</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.rejectBtn]}
                onPress={() => handleUpdateStatus(item.id, 'rejected')}
              >
                <Text style={styles.secondaryDangerButtonText}>Reject</Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === 'active' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.suspendBtn]}
                onPress={() => handleUpdateStatus(item.id, 'suspended')}
              >
                <Text style={styles.warningSolidButtonText}>Suspend</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.deleteBtn]}
                onPress={() => handleDeleteUser(item.id)}
              >
                <Text style={styles.dangerSolidButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}

          {activeTab === 'blocked' && (
            <>
              <TouchableOpacity 
                style={[styles.button, styles.restoreBtn]}
                onPress={() => handleUpdateStatus(item.id, 'approved')}
              >
                <Text style={styles.successButtonText}>Restore</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, styles.deleteBtn]}
                onPress={() => handleDeleteUser(item.id)}
              >
                <Text style={styles.dangerSolidButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
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
          <Text style={styles.appTitleText}>User Management</Text>
          <Text style={styles.appTitleSub}>Control access & administration</Text>
        </LinearGradient>

        <View style={styles.tabsContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
            onPress={() => { setActiveTab('pending'); setLimit(50); }}
          >
            <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>Pending</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'active' && styles.activeTab]}
            onPress={() => { setActiveTab('active'); setLimit(50); }}
          >
            <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>Active</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.tab, activeTab === 'blocked' && styles.activeTab]}
            onPress={() => { setActiveTab('blocked'); setLimit(50); }}
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
            data={displayedUsers}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            initialNumToRender={50}
            maxToRenderPerBatch={50}
            windowSize={11}
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
    backgroundColor: 'rgba(139, 0, 15, 0.05)',
    borderRadius: cornerRadius.lg,
    padding: 6,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: cornerRadius.md,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#8B000F",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  tabText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#8B000F',
    fontFamily: 'Manrope_700Bold',
  },
  listContainer: {
    paddingBottom: spacing.xxl,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.lg,
    borderRadius: cornerRadius.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(139, 0, 15, 0.05)',
    shadowColor: "#8B000F",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: 'rgba(244, 196, 48, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  avatarText: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 24,
    color: '#8B000F',
    marginTop: 2,
  },
  userInfoCol: {
    flex: 1,
  },
  userName: {
    fontFamily: 'CormorantGaramond_700Bold',
    fontSize: 22,
    color: '#3B1F00',
    marginBottom: 2,
  },
  userEmail: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#8B000F',
    opacity: 0.8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userDate: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 12,
    color: '#9CA3AF',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badgeSuspended: {
    backgroundColor: '#FFF7ED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  badgeSuspendedText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#C2410C',
    letterSpacing: 0.5,
  },
  badgeRejected: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  badgeRejectedText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 10,
    color: '#B91C1C',
    letterSpacing: 0.5,
  },
  actionsDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: cornerRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  approveBtn: {
    backgroundColor: '#047857',
    shadowColor: "#047857",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  restoreBtn: {
    backgroundColor: '#047857',
    shadowColor: "#047857",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rejectBtn: {
    backgroundColor: '#FEF2F2',
  },
  suspendBtn: {
    backgroundColor: '#F4C430',
    shadowColor: "#F4C430",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  deleteBtn: {
    backgroundColor: '#8B000F',
    shadowColor: "#8B000F",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  primaryButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#5A0008',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  successButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  dangerSolidButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#FFFFFF',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  warningSolidButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#3B1F00',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  dangerButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#B91C1C',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryDangerButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#B91C1C',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  secondaryWarningButtonText: {
    fontFamily: 'Manrope_700Bold',
    color: '#C2410C',
    fontSize: 14,
    letterSpacing: 0.5,
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
