import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Marketplace from '../screens/Marketplace';
import Categories from '../screens/Categories';
import Cart from '../screens/Cart';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen name="Marketplace" component={Marketplace} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
