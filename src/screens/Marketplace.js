import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

const getCategoryIcon = (category) => {
  if (category === 'Textbooks') return 'book';
  if (category === 'Electronics/Calculators') return 'calculator';
  if (category === 'Handwritten Notes & Lab Coats') return 'document-text';
  return 'pricetag-outline';
};

export default function Marketplace({ route, navigation }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryFilter = route.params?.categoryFilter;

  useEffect(() => {
    let q = collection(db, 'listings');
    
    if (categoryFilter) {
      q = query(q, where('category', '==', categoryFilter));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setListings(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [categoryFilter]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { item })}
    >
      <View style={styles.imagePlaceholder}>
        <Ionicons name={getCategoryIcon(item.category)} size={40} color="#E91E63" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.price}>Rs. {item.price}</Text>
    </TouchableOpacity>
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
      {categoryFilter ? (
        <View style={styles.filterHeader}>
          <Text style={styles.filterText}>Showing: {categoryFilter}</Text>
          <TouchableOpacity onPress={() => navigation.setParams({ categoryFilter: null })}>
            <Text style={styles.clearFilterText}>Clear</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No listings available.</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddListing')}
      >
        <Text style={styles.fabText}>+ Add Listing</Text>
      </TouchableOpacity>
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
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#E91E63',
  },
  filterText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  clearFilterText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  listContainer: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imagePlaceholder: {
    height: 100,
    backgroundColor: '#FFF0F5',
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#E91E63',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#E91E63',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
