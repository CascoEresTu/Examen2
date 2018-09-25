import React from 'react';
import { FlatList, Text, View, StyleSheet , Button , TextInput } from 'react-native';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from 'TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AmigosScreen from '../screens/LogScreen';
import PrivateScreen from '../screens/SignUpScreen';

/*const HomeStack = createStackNavigator({
    Home: HomeScreen,
  }); */

/*  const HomeStack = createStackNavigator({
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


*/


export default createMaterialTopTabNavigator({
    Privados: {screen : PrivateScreen},
    Home: { screen: HomeScreen },
    Amigos: {screen : AmigosScreen} 



  //  Privados: {screen : PrivateStack},
//Home: { screen: HomeStack },
  //  Amigos: {screen : AmigosStack} 


   
   }, {
     initialRouteName: 'Home',
     activeColor: '#f40b07',
     inactiveColor: '#f40b07',
     barStyle: { backgroundColor: '#f40b07' },
   });