import { View, Text, Button, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Mobile from './src/VerifyScreens/Mobile'
import MainApp from './src/TabMainApp/MainApp'
import SplashScreen from 'react-native-splash-screen';
import SkillsScreen from './src/VerifyScreens/SkillsScreen'
const Stack = createNativeStackNavigator();


const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Mobile'>
      <Stack.Screen name="Mobile" component={Mobile} />
      <Stack.Screen name="SkillsScreen" component={SkillsScreen}  />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  )
}

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide(); // Hide splash screen after 2 seconds
    }, 3000);
  }, []);
  return (
    <NavigationContainer>
    <StatusBar hidden={true}/>
      <RootStack />
    </NavigationContainer>
  )
}

export default App