

import { View, Text, Button, StatusBar, Alert ,PermissionsAndroid, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Mobile from './src/VerifyScreens/Mobile';
import MainApp from './src/TabMainApp/MainApp';
import SplashScreen from 'react-native-splash-screen';
import SkillsScreen from './src/VerifyScreens/SkillsScreen';
import Toast from 'react-native-toast-message';
import api, { navigationRef } from './src/utils/axiosInstance';
import Skills from './src/VerifyScreens/Skills';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';


const Stack = createNativeStackNavigator();

const RootStack = ({ initialRoute }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Mobile" component={Mobile} />
      <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
      <Stack.Screen name="Skills" component={Skills} />
      <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
  );
};

// 🔹 Request Notification Permission
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
      console.log('Push Notification Permission Granted!');
      getFCMToken();
  }
}

// 🔹 Get FCM Token
async function getFCMToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
}
const App = () => {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Mobile");

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);


  useEffect(() => {
    const checkUserConfig = async () => {
      try {
        const isLogin = await AsyncStorage.getItem("isLogin");
  
        console.log("isLogin:", isLogin);
  
        if (isLogin !== "true") {
          setInitialRoute("Mobile");
          setLoading(false);
          return; // Exit early if the user is not logged in
        }
  
        const userId = await AsyncStorage.getItem("User_id");
        if (!userId) {
          setInitialRoute("Mobile");
          setLoading(false);
          return;
        }
  
        // Fetch user config only if userId exists
        const response = await api.get(`users/config?id=${userId}`);
  
        if (response.status === 200 && response.data?.result) {
          const userConfig = response.data.data;
  
          const profileCompleted = !!userConfig.isProfileCompleted;
          const answerSubmitted = !!userConfig.isAnswerSubmitted;
  
          await AsyncStorage.multiSet([
            ["isProfileCompleted", JSON.stringify(profileCompleted)],
            ["isAnswerSubmitted", JSON.stringify(answerSubmitted)],
          ]);
  
          setInitialRoute(
            profileCompleted ? (answerSubmitted ? "MainApp" : "SkillsScreen") : "Mobile"
          );
        } else {
          throw new Error(response.data?.message || "Failed to fetch user config");
        }
      } catch (error) {
        console.error("Error fetching user config:", error);
        setInitialRoute("Mobile");
      } finally {
        setLoading(false);
      }
    };
  
    checkUserConfig();
  }, []);
 
  useEffect(() => {
    requestUserPermission();

    // Foreground Notifications
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
        Alert.alert('New Notification', remoteMessage.notification?.body);
    });

    return unsubscribeForeground;
}, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar hidden={true} />
      {!loading ? <RootStack initialRoute={initialRoute} /> : null}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
