import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProfileScreen from './Screens/ProfileScreen';
import RewardsScreen from '../HomeStack/Screens/RewardsScreen';
import ReferalScreen from './Screens/ReferalScreen';
import FAQScreen from './Screens/FAQScreen';
import ProfileEdit from './Screens/ProfileEdit';
import TermAndPolicy from './Screens/TermAndPolicy';
const Stack = createNativeStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='ProfileScreen'>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ReferalScreen" component={ReferalScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FAQScreen" component={FAQScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProfileEdit" component={ProfileEdit} options={{ headerShown: false }} />
    <Stack.Screen name="TermAndPolicy" component={TermAndPolicy} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ProfileStack

const styles = StyleSheet.create({})