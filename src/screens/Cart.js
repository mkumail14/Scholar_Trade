import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function Cart({ navigation }) {
  const [cartItems, setCartItems] = useState([
    { id: '1', title: 'Calculus Textbook', price: 45.00 },
    { id: '2', title: 'Lab Coat', price: 15.50 },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Your cart is empty.</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    color: '#333',
  },
  listContainer: {
    padding: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  price: {
    fontSize: 15,
    color: '#28A745',
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#ffe5e5',
    borderRadius: 6,
  },
  removeText: {
    color: '#d9534f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
