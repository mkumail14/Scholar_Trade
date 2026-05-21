import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function Profile({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {user?.email ? user.email.charAt(0).toUpperCase() : 'S'}
          </Text>
        </View>
        <Text style={styles.emailText}>{user?.email || 'Student'}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>My Listings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Purchase History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Saved Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton}>
          <Text style={styles.optionText}>Account Settings</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  emailText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  optionsContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
