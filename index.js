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
// import { createNavigationContainerRef } from "@react-navigation/native";
// export const navigationRef = createNavigationContainerRef();

// Background & Kill-State Notification Handling
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("📩 Background Message:", remoteMessage);

    // Prevent duplicate notifications
    if (!remoteMessage.notification) {
        PushNotification.localNotification({
            channelId: "default-channel",
            title: remoteMessage.data?.title || "New Notification",
            message: remoteMessage.data?.message || "You have a new message",
            bigText: remoteMessage.data?.desc || "No description available",
            playSound: true,
            soundName: "default",
        });
        handleNotificationNavigation(remoteMessage);

    }


});


const subscribeToTopic = async () => {
    try {
        await messaging().subscribeToTopic('all_users');
        console.log('Subscribed to topic: all_users');
    } catch (error) {
        console.error('Error subscribing to topic:', error);
    }
};
const handleNotificationNavigation = (remoteMessage) => {
    if (!remoteMessage?.data) return;

    const { eventId, eventType } = remoteMessage.data;

    console.log('Received Notification:', remoteMessage.data);

    if (navigationRef.current) {
        if (eventType === 'Meetups') {
            console.log('Navigating to MeetUpsDetails:', eventId);
            // navigationRef.current.navigate('MeetUpsDetails', { id: eventId });
            navigationRef.current.navigate('Event', { screen: 'MeetUpsDetails', params: { id: eventId } });

        } else if (eventType === 'Workshop') {
            console.log('Navigating to WorkshopDetails:', eventId);
            navigationRef.current.navigate('Event', { screen: 'MeetUpsDetails', params: { id: eventId } });

        } else {
            console.log('Navigating to Home');
            navigationRef.current.navigate('Home'); // Default screen
        }
    } else {
        console.error('Navigation reference is not available');
    }
};
subscribeToTopic()
AppRegistry.registerComponent(appName, () => App);
