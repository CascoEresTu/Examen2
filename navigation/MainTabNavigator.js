

import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from 'TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LogScreen from '../screens/LogScreen';
import SignUpScreen from '../screens/SignUpScreen';
import AmigosScreen from '../screens/AmigosScreen';
import PrivateScreen from '../screens/PrivateScreen';
import AddPostScreen from '../screens/AddPostScreen';
//import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LoginStack = createStackNavigator({
  Login: LogScreen,
});

LoginStack.navigationOptions = {
  tabBarLabel: 'Log In',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const SignUpStack = createStackNavigator({
  SignUp: SignUpScreen,
});

SignUpStack.navigationOptions = {
  tabBarLabel: 'SignUp',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-star'}
    />
  ),
};

const AmigosStack = createStackNavigator({
  Amigos: AmigosScreen,
});

AmigosStack.navigationOptions = {
  tabBarLabel: 'Amigos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const PrivateStack = createStackNavigator({
  Private: PrivateScreen,
});

PrivateStack.navigationOptions = {
  tabBarLabel: 'Private',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const AddNewStack = createStackNavigator({
  AddPost: AddPostScreen,
});

AddNewStack.navigationOptions = {
  tabBarLabel: 'New Post',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};





export default createMaterialTopTabNavigator({
  Privados: {screen : PrivateStack},
  Home: { screen: HomeStack },
  Amigos: {screen : AmigosStack} ,
  LogIn: {screen :LoginStack },
  SignUp: {screen: SignUpStack},
  Nuevo: {screen: AddNewStack}
 }, {
   initialRouteName: 'Home',
   activeColor: '#f40b07',
   inactiveColor: '#f40b07',
   barStyle: { backgroundColor: '#f40b07' },
 });


/*
export default createBottomTabNavigator({
    LoginStack,
    HomeStack,
  SignUpStack,
 // NewPostStack,
 // SettingsStack,
}); */