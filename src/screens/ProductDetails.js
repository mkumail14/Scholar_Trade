import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function ProductDetails({ route, navigation }) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.buttonText}>Message Seller</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    height: 300,
    backgroundColor: '#ddd',
    width: '100%',
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
    color: '#28A745',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartButton: {
    flex: 1,
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#6c757d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
