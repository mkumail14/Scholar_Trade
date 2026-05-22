import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SectionList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

export default function History({ navigation }) {
  const { user } = useContext(AuthContext);
  const [boughtItems, setBoughtItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let boughtLoaded = false;
    let soldLoaded = false;

    const checkLoading = () => {
      if (boughtLoaded && soldLoaded) setLoading(false);
    };

    const qBought = query(collection(db, 'transactions'), where('buyerId', '==', user.uid));
    const unsubBought = onSnapshot(qBought, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBoughtItems(data);
      boughtLoaded = true;
      checkLoading();
    });

    const qSold = query(collection(db, 'transactions'), where('sellerId', '==', user.uid));
    const unsubSold = onSnapshot(qSold, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSoldItems(data);
      soldLoaded = true;
      checkLoading();
    });

    return () => {
      unsubBought();
      unsubSold();
    };
  }, [user]);

  const SECTIONS = [
    { title: 'Items Bought', data: boughtItems },
    { title: 'Items Sold', data: soldItems },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>
      <Text style={styles.date}>Date: {new Date(item.transactionDate).toLocaleDateString()}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#E91E63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SectionList
        sections={SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No transactions found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 15,
  },
  headerContainer: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 15,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: '#E91E63',
    fontWeight: '600',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});
