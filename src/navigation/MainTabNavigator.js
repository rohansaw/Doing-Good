import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import NewJobScreen from '../screens/NewJobScreen';

const HomeStack = createStackNavigator({
  Home: {
      screen : HomeScreen,
      navigationOptions: {
        header: null,
    },
  },
});


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

const NewJobStack = createStackNavigator({
  Create: {
      screen : NewJobScreen,
  },
});



export default createBottomTabNavigator({
  Home: HomeStack,
  NewJob: NewJobStack,
  Profile: ProfileStack,
});
