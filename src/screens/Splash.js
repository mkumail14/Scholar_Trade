import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScholarTrade</Text>
      <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
});
