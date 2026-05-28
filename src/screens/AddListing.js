import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, FlatList } from 'react-native';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { AuthContext } from '../context/AuthContext';

export default function AddListing({ navigation }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data().name);
      setCategories(data);
      setLoadingCategories(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddListing = async () => {
    setError('');

    if (!title || !price || !description || !category) {
      setError('Please fill in all fields.');
      return;
    }

    if (!user) {
      setError('You must be logged in to post.');
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'listings'), {
        title,
        price: parseFloat(price),
        description,
        category,
        sellerId: user.uid,
        createdAt: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setError('Failed to add listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => {
        setCategory(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

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
        placeholder="Price (Rs.)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.dropdownButton} onPress={() => setModalVisible(true)}>
        <Text style={category ? styles.dropdownButtonText : styles.dropdownPlaceholder}>
          {category || 'Select Category'}
        </Text>
      </TouchableOpacity>

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

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Select a Category</Text>
            {loadingCategories ? (
              <ActivityIndicator size="small" color="#2D3748" />
            ) : (
              <FlatList
                data={categories}
                keyExtractor={(item) => item}
                renderItem={renderCategoryItem}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No categories available.</Text>}
              />
            )}
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F2F4F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2D3748',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: '#EDF2F7',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: 'center',
  },
  dropdownPlaceholder: {
    color: '#718096',
    fontSize: 16,
  },
  dropdownButtonText: {
    color: '#2D3748',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2D3748',
    paddingVertical: 15,
    borderRadius: 12,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    maxHeight: '50%',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#2D3748',
  },
  categoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryText: {
    fontSize: 16,
    color: '#2D3748',
    textAlign: 'center',
  },
  closeModalButton: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#718096',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
