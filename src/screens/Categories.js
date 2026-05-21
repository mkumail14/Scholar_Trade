import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';

const CATEGORIES = [
  {
    title: 'Textbooks',
    data: ['Computer Science', 'Mathematics', 'Physics', 'Biology', 'Business'],
  },
  {
    title: 'Electronics/Calculators',
    data: ['Graphing Calculators', 'Laptops', 'Tablets', 'Clickers'],
  },
  {
    title: 'Handwritten Notes & Lab Coats',
    data: ['Lab Coats', 'Safety Goggles', 'Study Guides', 'Flashcards'],
  },
  {
    title: 'Dorm Essentials',
    data: ['Mini Fridges', 'Microwaves', 'Desk Lamps', 'Storage Containers'],
  },
];

export default function Categories({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={CATEGORIES}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 15,
  },
  headerContainer: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  itemContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});
