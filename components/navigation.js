// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import EventScreen from './screens/EventScreen';
import EventCategoriesScreen from './screens/EventCategories';
import EventDetailScreen from './screens/EventDetailScreen';
import AddEventScreen from "./screens/AddEventScreen"
import RewardScreen from "./screens/RewardScreen"
import SettingScreen from "./screens/SettingScreen"
import EditProfileScreen from "./screens/EditProfileScreen"
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-home" color={color} size={20} />
            ),
             headerShown: false,
          }}
        />
        <Tab.Screen
          name="Event"
          component={EventCategoriesScreen}
          options={{
            title: 'Event',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-calendar" color={color} size={20} />
            ),
             headerShown: false,
          }}
        />
        <Tab.Screen
          name="AddEvent"
          component={AddEventScreen}
          options={{
            title: 'Events',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-add-circle" color={color} size={20} />
            ),
             headerShown: false,
          }}
        />
        <Tab.Screen
          name="Rewards"
          component={RewardScreen}
          options={{
            title: 'Reward',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-gift" color={color} size={20} />
            ),
             headerShown: false,
          }}
        />
        <Tab.Screen
          name="Account"
          component={SettingScreen}
          options={{
            title: 'Account',
            tabBarIcon: ({ color, size }) => (
              <Icon name="ios-person" color={color} size={20} />
            ),
             headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}