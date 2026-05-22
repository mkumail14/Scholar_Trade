import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Register from '../screens/Register';
import AddListing from '../screens/AddListing';
import EditListing from '../screens/EditListing';
import ProductDetails from '../screens/ProductDetails';
import MyListings from '../screens/MyListings';
import History from '../screens/History';
import TabNavigator from './TabNavigator';
import AdminDashboard from '../screens/AdminDashboard';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="AddListing" component={AddListing} options={{ headerShown: true, title: 'New Listing' }} />
          <Stack.Screen name="EditListing" component={EditListing} options={{ headerShown: true, title: 'Edit Listing' }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: true, title: 'Details' }} />
          <Stack.Screen name="MyListings" component={MyListings} options={{ headerShown: true, title: 'My Listings' }} />
          <Stack.Screen name="History" component={History} options={{ headerShown: true, title: 'Purchase History' }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: true, title: 'Admin Dashboard' }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </>
      )}
    </Stack.Navigator>
  );
}
