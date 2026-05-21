import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AddListing({ navigation }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddListing = async () => {
    setError('');

    if (!title || !price || !description || !category) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'listings'), {
        title,
        price: parseFloat(price),
        description,
        category,
        createdAt: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (err) {
      setError('Failed to add listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add New Listing</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <TextInput
        style={styles.input}
        placeholder="Item Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Price ($)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Category (e.g., Textbooks)"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddListing} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Post Listing</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});
