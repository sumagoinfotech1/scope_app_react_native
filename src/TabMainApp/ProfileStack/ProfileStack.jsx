import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './Screens/ProfileScreen';
import RewardsScreen from '../HomeStack/Screens/RewardsScreen';
import ReferalScreen from './Screens/ReferalScreen';
import FAQScreen from './Screens/FAQScreen';
const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='ProfileScreen'>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReferalScreen" component={ReferalScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FAQScreen" component={FAQScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})