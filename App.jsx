
// import React, { useEffect, useState } from 'react';
// import { View, StatusBar, Platform, PermissionsAndroid } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SplashScreen from 'react-native-splash-screen';
// import Toast from 'react-native-toast-message';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import api, { navigationRef } from './src/utils/axiosInstance';
// import Mobile from './src/VerifyScreens/Mobile';
// import MainApp from './src/TabMainApp/MainApp';
// import SkillsScreen from './src/VerifyScreens/SkillsScreen';
// import Skills from './src/VerifyScreens/Skills';
// import { showToast,ToastProvider } from './src/utils/toastService';

// const Stack = createNativeStackNavigator();

// const RootStack = ({ initialRoute }) => (
//     <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
//         <Stack.Screen name="Mobile" component={Mobile} />
//         <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
//         <Stack.Screen name="Skills" component={Skills} />
//         <Stack.Screen name="MainApp" component={MainApp} />
//     </Stack.Navigator>
// );

// const requestUserPermission = async () => {
//     try {
//         let authStatus = await messaging().requestPermission();
//         let enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//                       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        
//         if (Platform.OS === 'android' && Platform.Version >= 33) {
//             const granted = await PermissionsAndroid.request(
//                 PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
//             );
//             enabled = granted === PermissionsAndroid.RESULTS.GRANTED;
//         }
        
//         return enabled;
//     } catch (error) {
//         console.error('❌ Permission request failed:', error);
//         return false;
//     }
// };

// const getFCMToken = async () => {
//     try {
//         const token = await messaging().getToken();
//         console.log('FCM Token:', token);
//     } catch (error) {
//         console.error('Failed to get FCM token:', error);
//     }
// };

// const configurePushNotifications = () => {
//     PushNotification.createChannel(
//         {
//             channelId: "default-channel",
//             channelName: "Default Channel",
//             channelDescription: "A channel to receive notifications",
//             playSound: true,
//             soundName: "default",
//             importance: 4,
//             vibrate: true,
//         },
//         (created) => console.log(`Channel created: ${created}`)
//     );

//     PushNotification.configure({
//         onNotification: (notification) => {
//             console.log("LOCAL NOTIFICATION CLICKED:", notification);
    
//             // Ensure correct data extraction
//             const notificationData = notification?.data || notification;
            
//             if (notificationData) {
//                 handleNotificationNavigation(notificationData);
//             } else {
//                 console.error("Notification data is missing!");
//             }
//         },
//         popInitialNotification: true,
//         requestPermissions: true,
//     });
// };
// const handleNotificationNavigation = (data) => {
//     if (!data) return;
    
//     const { eventId, eventTypeName } = data;
//     console.log("Handling Notification:", data);

//     if (navigationRef.current) {
//         if (eventTypeName === "meetups") {
//             console.log("Navigating to MeetUpsDetails:", eventId);
//             navigationRef.current.navigate("MeetUpsDetails", { id: eventId });
//         } else if (eventTypeName === "workshop") {
//             console.log("Navigating to WorkshopDetails:", eventId);
//             navigationRef.current.navigate("MeetUpsDetails", { id: eventId });
//         } else {
//             console.log("Navigating to Home");
//             navigationRef.current.navigate("Home");
//         }
//     } else {
//         console.error("Navigation reference is not available");
//     }
// };
// const App = () => {
//     const [loading, setLoading] = useState(true);
//     const [initialRoute, setInitialRoute] = useState("Mobile");

//     useEffect(() => {
//         setTimeout(() => SplashScreen.hide(), 3000);
//     }, []);

    

    
//     //get info or status apk
//     useEffect(() => {
//         const checkUserConfig = async () => {
//             try {
//                 const isLogin = await AsyncStorage.getItem("isLogin");
//                 if (isLogin !== "true") {
//                     setInitialRoute("Mobile");
//                     setLoading(false);
//                     return;
//                 }
                
//                 const userId = await AsyncStorage.getItem("User_id");
//                 if (!userId) {
//                     setInitialRoute("Mobile");
//                     setLoading(false);
//                     return;
//                 }

//                 const response = await api.get(`users/config?id=${userId}`);
//                 if (response.status === 200 && response.data?.result) {
//                     const userConfig = response.data.data;
//                     const profileCompleted = !!userConfig.isProfileCompleted;
//                     const answerSubmitted = !!userConfig.isAnswerSubmitted;
                    
//                     await AsyncStorage.multiSet([
//                         ["isProfileCompleted", JSON.stringify(profileCompleted)],
//                         ["isAnswerSubmitted", JSON.stringify(answerSubmitted)],
//                     ]);
                    
//                     setInitialRoute(
//                         profileCompleted ? (answerSubmitted ? "MainApp" : "SkillsScreen") : "Mobile"
//                     );
//                 } else {
//                     throw new Error(response.data?.message || "Failed to fetch user config");
//                 }
//             } catch (error) {
//                 console.error("Error fetching user config:", error);
//                 setInitialRoute("Mobile");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         checkUserConfig();
//     }, []);


//     //push notifications 
//     useEffect(() => {
//         requestUserPermission();
//         getFCMToken();
//         configurePushNotifications();
    
//         // Foreground notification handling
//         const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//             console.log("Foreground Notification:", remoteMessage?.notification);
//             if (remoteMessage?.notification) {
//                 PushNotification.localNotification({
//                     channelId: "default-channel",
//                     title: remoteMessage.data?.notificationTitle || "New Notification",
//                     message: remoteMessage.data?.notificationMessage || "You have a new message",
//                     bigText: remoteMessage.data?.eventName || "No description available",
//                     playSound: true,
//                     soundName: "default",
//                     data: JSON.stringify(remoteMessage.data),
//                 });
//             }
//         });
    
//         // Background notification handling (when app is in background and clicked)
//         const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
//             console.log("App opened from background notification:", remoteMessage);
//             handleNotificationNavigation(remoteMessage.data);
//         });
    
//         // Background notification received (but not clicked)
//         const unsubscribeBackground = messaging().setBackgroundMessageHandler(async remoteMessage => {
//             console.log("Background notification received:", remoteMessage);
//         });
    
//         // 🔥 **Handle Killed State: Check if app was opened via a notification**
//         messaging()
//             .getInitialNotification()
//             .then(remoteMessage => {
//                 if (remoteMessage) {
//                     console.log("App opened from KILLED state notification:", remoteMessage);
//                     handleNotificationNavigation(remoteMessage.data);
//                 }
//             })
//             .catch(error => console.error("Error getting initial notification:", error));
    
//         return () => {
//             unsubscribeForeground();
//             unsubscribeNotificationOpened();
//             unsubscribeBackground();
//         };
//     }, []);
    

//     return (
//         <NavigationContainer ref={navigationRef}>
//             <StatusBar hidden={true} />
//             {!loading && <RootStack initialRoute={initialRoute} />}
//             {/* <Toast /> */}
//             <ToastProvider />
//         </NavigationContainer>
//     );
// };

// export default App;


import React, { useEffect, useState } from 'react';
import { View, StatusBar, Platform, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import api, { navigationRef } from './src/utils/axiosInstance';
import Mobile from './src/VerifyScreens/Mobile';
import MainApp from './src/TabMainApp/MainApp';
import SkillsScreen from './src/VerifyScreens/SkillsScreen';
import Skills from './src/VerifyScreens/Skills';
import { showToast, ToastProvider } from './src/utils/toastService';

const Stack = createNativeStackNavigator();

const RootStack = ({ initialRoute }) => (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Mobile" component={Mobile} />
        <Stack.Screen name="SkillsScreen" component={SkillsScreen} />
        <Stack.Screen name="Skills" component={Skills} />
        <Stack.Screen name="MainApp" component={MainApp} />
    </Stack.Navigator>
);

const requestUserPermission = async () => {
    try {
        let authStatus = await messaging().requestPermission();
        let enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (Platform.OS === 'android' && Platform.Version >= 33) {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
            );
            enabled = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        return enabled;
    } catch (error) {
        console.error('❌ Permission request failed:', error);
        return false;
    }
};

const getFCMToken = async () => {
    try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
    } catch (error) {
        console.error('Failed to get FCM token:', error);
    }
};

const configurePushNotifications = () => {
    PushNotification.createChannel(
        {
            channelId: "custom-channel",
            channelName: "custom-channel",
            channelDescription: "A channel to receive notifications",
            playSound: true,
            soundName: "default",
            importance: 4,
            vibrate: true,
        },
        (created) => console.log(`Channel created: ${created}`)
    );

    PushNotification.configure({
        onNotification: (notification) => {
            console.log("🔔 LOCAL NOTIFICATION CLICKED:", notification);

            const notificationData = notification?.data || notification;
            if (notificationData) {
                handleNotificationNavigation(notificationData);
            } else {
                console.error("❌ Notification data is missing!");
            }
        },
        popInitialNotification: true,
        requestPermissions: true,
    });
};

const waitForNavigationReady = () => {
    return new Promise((resolve) => {
        const checkNavigationReady = () => {
            if (navigationRef.isReady()) {
                resolve();
            } else {
                requestAnimationFrame(checkNavigationReady);
            }
        };
        checkNavigationReady();
    });
};

const handleNotificationNavigation = async (data) => {
    if (!data) return;

    const { eventId, eventTypeName } = data;
    console.log("Handling Notification:", data);

    await waitForNavigationReady(); // ✅ Wait until navigation is ready

    if (eventTypeName === "meetups") {
        console.log("Navigating to MeetUpsDetails:", eventId);
        navigationRef.current.navigate("MeetUpsDetails", { id: eventId });
    } else if (eventTypeName === "workshop") {
        console.log("Navigating to WorkshopDetails:", eventId);
        navigationRef.current.navigate("MeetUpsDetails", { id: eventId });
    } else {
        console.log("Navigating to Home");
        navigationRef.current.navigate("Home");
    }
};
const App = () => {
    const [loading, setLoading] = useState(true);
    const [initialRoute, setInitialRoute] = useState("Mobile");

    useEffect(() => {
        setTimeout(() => SplashScreen.hide(), 3000);
    }, []);




    //get info or status apk
    useEffect(() => {
        const checkUserConfig = async () => {
            try {
                const isLogin = await AsyncStorage.getItem("isLogin");
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


    //push notifications 
    useEffect(() => {
        requestUserPermission(); // Request permissions for notifications
        getFCMToken(); // Retrieve FCM Token
        configurePushNotifications(); // Configure local notifications

     // ✅ Handle Foreground Notifications (Suppress Firebase & Show Custom)
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
        console.log("Foreground Notification:", remoteMessage);

        // 🔴 Prevent Firebase from showing its default notification
        if (remoteMessage?.notification) {
            console.log("🔴 Default Firebase Notification intercepted and suppressed.");
        }

        // ✅ Show only React Native Push Notification
        if (remoteMessage?.data || remoteMessage?.notification) {
            PushNotification.localNotification({
                channelId: "custom-channel",
                title: remoteMessage.data?.notificationTitle || remoteMessage.notification?.title || "New Notification",
                message: remoteMessage.data?.notificationMessage || remoteMessage.notification?.body || "You have a new message",
                bigText: remoteMessage.data?.eventName || "No description available",
                playSound: true,
                soundName: "default",
                vibrate: true,
                priority: "high",
                ignoreInForeground: false,
                data: JSON.stringify(remoteMessage.data),
            });
        }
    });

        // 🟠 Handle Notification When App is in Background (Clicked)
        const unsubscribeNotificationOpened = messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("App opened from background notification:", remoteMessage);
            if (remoteMessage?.data) {
                handleNotificationNavigation(remoteMessage.data);
            }
        });

        // 🟡 Handle Background Notifications (Push received but not clicked)
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log("Background Notification app Received:", remoteMessage);
            
            if (remoteMessage?.data || remoteMessage?.notification) {
                PushNotification.localNotification({
                    channelId: "custom-channel",
                    title: remoteMessage.data?.notificationTitle || remoteMessage.notification?.title || "New Notification",
                    message: remoteMessage.data?.notificationMessage || remoteMessage.notification?.body || "You have a new message",
                    bigText: remoteMessage.data?.eventName || "No description available",
                    playSound: true,
                    soundName: "default",
                    vibrate: true,
                    priority: "high",
                    ignoreInForeground: false,
                    data: JSON.stringify(remoteMessage.data),
                });
            }
        });

        // ⚫ Handle Killed State (App opened from notification)
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage?.data) {
                    console.log("App opened from killed state notification:", remoteMessage);
                    
                    // handleNotificationNavigation(remoteMessage.data);
                }
            })
            .catch(error => console.error("Error getting initial notification:", error));

        return () => {
            unsubscribeForeground();
            unsubscribeNotificationOpened();
        };
    }, []);
    


    return (
        <NavigationContainer ref={navigationRef}>
            <StatusBar hidden={true} />
            {!loading && <RootStack initialRoute={initialRoute} />}
            {/* <Toast /> */}
            <ToastProvider />
        </NavigationContainer>
    );
};

export default App;
