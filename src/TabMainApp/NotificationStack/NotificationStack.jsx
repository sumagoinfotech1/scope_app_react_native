import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NotificationScreen from './Screens/NotificationScreen';

const Stack = createNativeStackNavigator();
const NotificationStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default NotificationStack

const styles = StyleSheet.create({})