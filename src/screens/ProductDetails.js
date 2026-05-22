import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const getCategoryIcon = (category) => {
  if (category === 'Textbooks') return 'book';
  if (category === 'Electronics/Calculators') return 'calculator';
  if (category === 'Handwritten Notes & Lab Coats') return 'document-text';
  return 'pricetag-outline';
};

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'listings', item.id));
      await addDoc(collection(db, 'transactions'), {
        ...item,
        buyerId: user.uid,
        sellerId: item.sellerId,
        transactionDate: new Date().toISOString(),
      });
      navigation.navigate('MainTabs', { screen: 'Marketplace' });
    } catch (error) {
      console.log('Transaction Error:', error);
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name={getCategoryIcon(item.category)} size={80} color="#E91E63" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Rs. {item.price}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Buy Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: '#FFF0F5',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E91E63',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  actionContainer: {
    padding: 20,
  },
  buyButton: {
    backgroundColor: '#E91E63',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
