import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import N1 from './Screens/N1';
const Stack = createNativeStackNavigator();
const NotificationStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="N1" component={N1} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default NotificationStack

const styles = StyleSheet.create({})