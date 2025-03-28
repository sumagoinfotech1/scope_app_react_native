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
import { navigationRef } from './src/utils/axiosInstance';
// Handle notifications in background/killed state
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Background Notification index Received:", remoteMessage);

    if (remoteMessage?.data) {
        PushNotification.localNotification({
            channelId: "custom-channel",
            title: remoteMessage.data.notificationTitle || "New Notification",
            message: remoteMessage.data.notificationMessage || "You have a new message",
            bigText: `🔔 Event: ${remoteMessage.data.eventName || "No description"}\n📢 Type: ${remoteMessage.data.eventTypeName || "Unknown"}`,
            playSound: true,
            soundName: "default",
            vibrate: true,
            priority: "high",
            ignoreInForeground: false, 
            data: JSON.stringify(remoteMessage.data),
        });
    }
});
// 🔥 Subscribe to Firebase Topic
const subscribeToTopic = async () => {
    try {
        await messaging().subscribeToTopic('all_users');
        console.log('✅ Subscribed to topic: all_users');
    } catch (error) {
        console.error('❌ Error subscribing to topic:', error);
    }
};

subscribeToTopic();
AppRegistry.registerComponent(appName, () => App);
