import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Screens/Profile';
const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Profile1" component={Profile} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})