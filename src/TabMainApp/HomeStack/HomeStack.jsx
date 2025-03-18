import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


import MeetUpsDetails from './Screens/MeetUpsDetails';
import MeetUpsScreen from './Screens/MeetUpsScreen';
import RewardsScreen from './Screens/RewardsScreen';
import CongratsScreen from './Screens/CongratsScreen';
import { useFocusEffect } from '@react-navigation/native';
import Home from './Screens/Home';
const Stack = createNativeStackNavigator();
const HomeStack = ({navigation}) => {
  // useFocusEffect(
  //   useCallback(() => {
  //     navigation.navigate("Event", { screen: "Home" })
  //   }, [navigation])
  // );

  return (
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    {/* <Stack.Screen name="WorkShopScreen" component={WorkShopScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WorkShopDetails" component={WorkShopDetails} options={{ headerShown: false }} /> */}
    <Stack.Screen name="MeetUpsScreen" component={MeetUpsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MeetUpsDetails" component={MeetUpsDetails} options={{ headerShown: false }} />
    <Stack.Screen name="RewardsScreen" component={RewardsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CongratsScreen" component={CongratsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})