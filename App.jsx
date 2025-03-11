
// globalThis.RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;
// globalThis.RNFB_MODULAR_DEPRECATION_STRICT_MODE = true;

// import { View, Text, Button, StatusBar, Alert ,PermissionsAndroid, Platform } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Mobile from './src/VerifyScreens/Mobile';
// import MainApp from './src/TabMainApp/MainApp';
// import SplashScreen from 'react-native-splash-screen';
// import SkillsScreen from './src/VerifyScreens/SkillsScreen';
// import Toast from 'react-native-toast-message';
// import api, { navigationRef } from './src/utils/axiosInstance';
// import Skills from './src/VerifyScreens/Skills';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';


// const Stack = createNativeStackNavigator();

// const RootStack = ({ initialRoute }) => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
//       <Stack.Screen name="Mobile" component={Mobile} />
//       <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
//       <Stack.Screen name="Skills" component={Skills} />
//       <Stack.Screen name="MainApp" component={MainApp} />
//     </Stack.Navigator>
//   );
// };

// // 🔹 Request Notification Permission
// async function requestUserPermission() {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//       console.log('Push Notification Permission Granted!');
//       getFCMToken();
//   }
// }

// // 🔹 Get FCM Token
// async function getFCMToken() {
//   const token = await messaging().getToken();
//   console.log('FCM Token:', token);
// }
// const App = () => {
//   const [loading, setLoading] = useState(true);
//   const [initialRoute, setInitialRoute] = useState("Mobile");

//   useEffect(() => {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 3000);
//   }, []);


//   useEffect(() => {
//     const checkUserConfig = async () => {
//       try {
//         const isLogin = await AsyncStorage.getItem("isLogin");
  
//         console.log("isLogin:", isLogin);
  
//         if (isLogin !== "true") {
//           setInitialRoute("Mobile");
//           setLoading(false);
//           return; // Exit early if the user is not logged in
//         }
  
//         const userId = await AsyncStorage.getItem("User_id");
//         if (!userId) {
//           setInitialRoute("Mobile");
//           setLoading(false);
//           return;
//         }
  
//         // Fetch user config only if userId exists
//         const response = await api.get(`users/config?id=${userId}`);
  
//         if (response.status === 200 && response.data?.result) {
//           const userConfig = response.data.data;
  
//           const profileCompleted = !!userConfig.isProfileCompleted;
//           const answerSubmitted = !!userConfig.isAnswerSubmitted;
  
//           await AsyncStorage.multiSet([
//             ["isProfileCompleted", JSON.stringify(profileCompleted)],
//             ["isAnswerSubmitted", JSON.stringify(answerSubmitted)],
//           ]);
  
//           setInitialRoute(
//             profileCompleted ? (answerSubmitted ? "MainApp" : "SkillsScreen") : "Mobile"
//           );
//         } else {
//           throw new Error(response.data?.message || "Failed to fetch user config");
//         }
//       } catch (error) {
//         console.error("Error fetching user config:", error);
//         setInitialRoute("Mobile");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     checkUserConfig();
//   }, []);
 
//   useEffect(() => {
//     requestUserPermission();

//     // Foreground Notifications
//     const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
    //   Toast.show({
    //     type: 'info',  // 'success' | 'error' | 'info'
    //     text1: 'New Notification',
    //     text2: remoteMessage.notification?.body || 'You have a new message',
    //     position: 'top', // 'top' | 'bottom'
    //     autoHide: false, // 🔥 Toast will stay until dismissed manually
    //     onPress: () => Toast.hide(), // Dismiss toast when tapped
    // });
//     });

//     return () => unsubscribeForeground(); // ✅ Correct cleanup function
// }, []);
 
//   return (
//     <NavigationContainer ref={navigationRef}>
//       <StatusBar hidden={true} />
//       {!loading ? <RootStack initialRoute={initialRoute} /> : null}
//       <Toast />
//     </NavigationContainer>
//   );
// };

// export default App;



import { View, Text, Button, StatusBar, Alert, PermissionsAndroid, Platform } from 'react-native';
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
import PushNotification from 'react-native-push-notification';

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

// Request notification permission
async function requestUserPermission() {
  try {
      let authStatus = await messaging().requestPermission();
      let enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (Platform.OS === 'android' && Platform.Version >= 33) {
          const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              console.log('✅ POST_NOTIFICATIONS permission granted.');
              enabled = true;
            
          } else {
              console.warn('⚠️ POST_NOTIFICATIONS permission denied.');
          }
      }

      if (enabled) {
          console.log('✅ Notification permission granted.');
          return true;
      } else {
          console.warn('⚠️ Notification permission denied.');
          return false;
      }
  } catch (error) {
      console.error('❌ Permission request failed:', error);
      return false;
  }
}

// Get FCM token
async function getFCMToken() {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
    } catch (error) {
        console.error('Failed to get FCM token:', error);
    }
}

// Configure local notifications
const configurePushNotifications = () => {
    PushNotification.createChannel(
        {
            channelId: "default-channel", // Channel ID
            channelName: "Default Channel",
            channelDescription: "A channel to receive notifications",
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
    );

    PushNotification.configure({
        onNotification: function (notification) {
            console.log("LOCAL NOTIFICATION:", notification);
            // Alert.alert(notification.title, notification.message);
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
};

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
                    return;
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
        getFCMToken();
        configurePushNotifications();

        // Foreground Notifications
        const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
            console.log("Foreground Notification:", remoteMessage);
       
            PushNotification.localNotification({
                channelId: "default-channel",
                title: remoteMessage.data?.title,
                message: remoteMessage.data?.message || "You have a new message",
                bigText: remoteMessage.data?.desc || "No description available", 
                playSound: true,
                soundName: "default",
            });
        });

        // App Opened from Notification (Background & Kill-State)
        const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("App opened from notification:", remoteMessage);
        });

        // App Opened from Quit State
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log("App opened from quit state:", remoteMessage);
                }
            });

        return () => {
            unsubscribeForeground();
            unsubscribeNotificationOpened();
        };
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
