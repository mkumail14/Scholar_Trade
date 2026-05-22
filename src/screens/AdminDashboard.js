import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

export default function AdminDashboard({ navigation }) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'products'
  
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Security guard check
  useEffect(() => {
    if (user?.email !== 'admin@szabist.edu') {
      navigation.replace('MainTabs');
    }
  }, [user, navigation]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
      setLoadingUsers(false);
    });

    const unsubscribeProducts = onSnapshot(collection(db, 'listings'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
      setLoadingProducts(false);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
    };
  }, []);

  const handleToggleDisableUser = async (userId, currentState) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        disabled: !currentState
      });
    } catch (err) {
      console.log('Error toggling user status:', err);
    }
  };

  const handleForceRemoveProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'listings', productId));
    } catch (err) {
      console.log('Error deleting product:', err);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.email}</Text>
        <Text style={styles.cardSubtitle}>
          Registered: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
        {item.disabled && <Text style={{ color: 'red', fontWeight: 'bold' }}>DISABLED</Text>}
      </View>
      <TouchableOpacity 
        style={[styles.deleteButton, item.disabled ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#F56565' }]} 
        onPress={() => handleToggleDisableUser(item.id, item.disabled)}
      >
        <Text style={[styles.deleteText, { color: '#fff' }]}>{item.disabled ? 'Enable User' : 'Disable User'}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.cardSubtitle}>Rs. {item.price} - {item.category}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => handleForceRemoveProduct(item.id)}>
        <Text style={styles.deleteText}>Force Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Text style={[styles.tabText, activeTab === 'users' && styles.activeTabText]}>Manage Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'products' && styles.activeTab]}
          onPress={() => setActiveTab('products')}
        >
          <Text style={[styles.tabText, activeTab === 'products' && styles.activeTabText]}>Manage Products</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        {activeTab === 'users' ? (
          loadingUsers ? (
            <ActivityIndicator size="large" color="#2D3748" style={styles.loader} />
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={renderUserItem}
              ListEmptyComponent={<Text style={styles.emptyText}>No users found.</Text>}
            />
          )
        ) : (
          loadingProducts ? (
            <ActivityIndicator size="large" color="#2D3748" style={styles.loader} />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={renderProductItem}
              ListEmptyComponent={<Text style={styles.emptyText}>No active listings found.</Text>}
            />
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2D3748',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#718096',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  loader: {
    marginTop: 50,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  cardInfo: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#718096',
  },
  deleteButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  deleteText: {
    color: '#2D3748',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#718096',
  },
});
