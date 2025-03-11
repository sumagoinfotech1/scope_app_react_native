// import React from 'react';
// import { View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import { useNavigation } from '@react-navigation/native';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// MainAppScreenHeader
// const notifications = [
//     { id: '1', title: 'New Event Added 🚀', message: 'A New Workshop On [Topic] Is Now Live! Register Before Seats Fill Up!', isNew: true },
//     { id: '2', title: 'Upcoming Event Reminder 🎟️', message: 'Your [Meetup/Workshop] Starts In 1 Hour. Get Ready!', isNew: false },
//     { id: '3', title: 'Upcoming Event Reminder 🎟️', message: 'Your [Meetup/Workshop] Starts In 1 Hour. Get Ready!', isNew: false },
//     { id: '4', title: 'New Event Added 🚀', message: 'A New Workshop On [Topic] Is Now Live! Register Before Seats Fill Up!', isNew: true },
//     { id: '5', title: 'Upcoming Event Reminder 🎟️', message: 'Your [Meetup/Workshop] Starts In 1 Hour. Get Ready!', isNew: false },
// ];

// const NotificationScreen = ({navigation}) => {
//     // const navigation = useNavigation();

//     const renderItem = ({ item }) => (
//         <TouchableOpacity 
//             style={[styles.card, item.isNew && styles.newEventCard]}
            
//         >
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.message}>{item.message}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <View style={styles.container}>
//             <ImageBackground  style={styles.header}>
//             <MainAppScreenHeader headername={"NOTIFICATION"} />
//             </ImageBackground>

//             <FlatList
//                 data={notifications}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//                 contentContainerStyle={{ paddingBottom: hp('10%') }}
//                 showsVerticalScrollIndicator={false}
//             />
//         </View>
//     );
// };

// export default NotificationScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//     },
//     header: {
//         width: wp('100%'),
//         height: hp('12%'),
//         backgroundColor: '#3A3A3A',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerText: {
//         color: '#fff',
//         fontSize: wp('6%'),
//         fontWeight: 'bold',
//     },
//     card: {
//         backgroundColor: '#fff',
//         marginHorizontal: wp('4%'),
//         marginTop: hp('1.5%'),
//         padding: wp('4%'),
//         borderRadius: wp('3%'),
//         elevation: 3,
//         shadowColor: '#000',
//         shadowOpacity: 0.2,
//         shadowOffset: { width: 0, height: 2 },
//     },
//     newEventCard: {
//         backgroundColor: '#fff',
//         shadowOpacity: 0.3,
//         shadowRadius: 5,
//         elevation: 5,
//     },
//     title: {
//         fontSize: wp('4.5%'),
//         fontWeight: 'bold',
//         marginBottom: hp('0.5%'),
//         color:'black'
//     },
//     message: {
//         fontSize: wp('3.8%'),
//         color: '#444',
//     },
// });

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image,ImageBackground,Platform} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';

const initialNotifications = [
    { id: '1', title: 'New Event Added 🚀', message: 'A New Workshop On React Native is Now Live! Register Before Seats Fill Up!', isNew: true, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '2', title: 'Upcoming Event Reminder 🎟️', message: 'Your JavaScript Workshop Starts In 1 Hour. Get Ready!', isNew: false, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '3', title: 'System Update 🔄', message: 'Your App Has Been Updated To The Latest Version!', isNew: false, isRead: true, icon: require('../../../assets/icons/i3.png') },
    { id: '4', title: 'New Event Added 🚀', message: 'A New Workshop On UI/UX is Now Live! Register Before Seats Fill Up!', isNew: true, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '5', title: 'Upcoming Webinar 📢', message: 'Join Our Live Q&A Session At 7 PM!', isNew: false, isRead: true, icon: require('../../../assets/icons/i3.png') },
];

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    const handlePress = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isRead: true } : item
            )
        );
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, item.isNew && styles.newEventCard, item.isRead && styles.readNotification]}
            onPress={() => handlePress(item.id)}
        >
            <Image source={item.icon} style={styles.icon} />
            <View style={styles.textContainer}>
                <Text style={[styles.title, item.isRead && styles.readTitle]}>{item.title}</Text>
                <Text style={[styles.message, item.isRead && styles.readMessage]}>{item.message}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
               <ImageBackground  style={styles.header}>
             <MainAppScreenHeader headername={"NOTIFICATION"} />
           </ImageBackground>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: hp('10%') }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        marginHorizontal: wp('4%'),
        marginTop: hp('1.5%'),
        padding: wp('4%'),
        borderRadius: wp('3%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        alignItems: 'center',
    },
    newEventCard: {
        backgroundColor: '#FFF5E1', // Light orange for new events
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    readNotification: {
        backgroundColor: '#EAEAEA',
    },
    textContainer: {
        flex: 1,
        marginLeft: wp('3%'),
    },
    title: {
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
        marginBottom: hp('0.5%'),
        color: 'black',
    },
    readTitle: {
        color: '#888',
    },
    message: {
        fontSize: wp('3.8%'),
        color: '#444',
    },
    readMessage: {
        color: '#777',
    },
    icon: {
        width: wp('10%'),
        height: wp('10%'),
        resizeMode: 'contain',
    },
        header: {
        width: wp('100%'),
        height: hp('12%'),
        // backgroundColor: '#3A3A3A',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
       

    },
});
