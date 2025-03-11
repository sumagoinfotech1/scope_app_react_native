// /**
//  * @format
//  */

// import { AppRegistry } from 'react-native';
// import App from './App';
// import { name as appName } from './app.json';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// // Register background message handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log("Background Message Received:", remoteMessage);

//     PushNotification.localNotification({
//         channelId: "default-channel",
//         title: remoteMessage.data?.title,
//         message: remoteMessage.data?.message || "You have a new message",
//         bigText: remoteMessage.data?.desc || "No description available", 
//         playSound: true,
//         soundName: "default",
//     });
// });
// AppRegistry.registerComponent(appName, () => App);


import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// Background & Kill-State Notification Handling
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("📩 Background Message:", remoteMessage);

    PushNotification.localNotification({
        channelId: "default-channel",
        title: remoteMessage.notification?.title || "New Notification",
        message: remoteMessage.notification?.body || "You have a new message",
        bigText: remoteMessage.data?.desc || "No description available",
        playSound: true,
        soundName: "default",
    });
});

AppRegistry.registerComponent(appName, () => App);
