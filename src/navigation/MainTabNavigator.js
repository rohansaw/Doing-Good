import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewJobScreen from '../screens/NewJobScreen';
import MatchScreen from '../screens/MatchScreen';
import MatchesScreen from '../screens/MatchesScreen';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator({
  Home: {
      screen : HomeScreen,
      navigationOptions: {
        header: null,
    },
  },
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { 
    activeTintColor: Colors.weldonBlue,
  },
  tabBarIcon: ({ focused }) => (
    <Icon name='md-home' size={25} color={focused ? Colors.weldonBlue : Colors.stormcloud} /> 
  ),
};


const ProfileStack = createStackNavigator({
  Profile: {
      screen : ProfileScreen,
      navigationOptions: {
        header: null,
    },
  },
  Edit: {
    screen : EditProfileScreen,
  }
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: { 
    activeTintColor: Colors.weldonBlue,
  },
  tabBarIcon: ({ focused }) => (
    <Icon name='md-contact' size={25} color={focused ? Colors.weldonBlue : Colors.stormcloud} /> 
  ),
};

const NewJobStack = createStackNavigator({
  Create: {
      screen : NewJobScreen,
      navigationOptions: {
        header: null,
    },
  },
});

NewJobStack.navigationOptions = {
  tabBarLabel: 'Add Product',
  tabBarOptions: { 
    activeTintColor: Colors.weldonBlue,
  },
  tabBarIcon: ({ focused }) => (
    <Icon name='md-add' size={25} color={focused ? Colors.weldonBlue : Colors.stormcloud} /> 
  ),
};

const MatchesStack = createStackNavigator({
  Matches: {
      screen : MatchesScreen,
      navigationOptions: {
        header: null,
      },
  },
  Match: {
    screen : MatchScreen,
  },
});

MatchesStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarOptions: { 
    activeTintColor: Colors.weldonBlue,
  },
  tabBarIcon: ({ focused }) => (
    <Icon name='md-chatbubbles' size={25} color={focused ? Colors.weldonBlue : Colors.stormcloud} /> 
  ),
};

export default createBottomTabNavigator(
  {
  Home: HomeStack,
  Matches: MatchesStack,
  AddQuest: NewJobStack,
  Profile: ProfileStack,
});
