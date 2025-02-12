import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import U1 from './Screens/U1';

const Stack = createNativeStackNavigator();
const UpcomingStack = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="U1" component={U1} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default UpcomingStack

const styles = StyleSheet.create({})