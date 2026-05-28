import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().name);
      setCategories(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Marketplace', { categoryFilter: item })}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2D3748" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>All Available Categories</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7',
  },
  listContainer: {
    padding: 15,
  },
  headerContainer: {
    backgroundColor: '#2D3748',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#2D3748',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#2D3748',
    fontWeight: '600',
    textAlign: 'center',
  },
});
