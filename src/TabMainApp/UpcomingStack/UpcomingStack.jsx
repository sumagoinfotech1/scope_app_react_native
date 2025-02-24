import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import U1 from './Screens/U1';
import UpcomimgEventScreen from './Screens/UpcomimgEventScreen';

const Stack = createNativeStackNavigator();
const UpcomingStack = () => {
  return (
    <Stack.Navigator initialRouteName='UpcomimgEventScreen'>
    <Stack.Screen name="U1" component={U1} options={{ headerShown: false }} />
    <Stack.Screen name="UpcomimgEventScreen" component={UpcomimgEventScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default UpcomingStack

const styles = StyleSheet.create({})