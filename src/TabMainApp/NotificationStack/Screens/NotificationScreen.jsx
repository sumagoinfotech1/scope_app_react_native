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
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialNotifications = [
    { id: '1', title: 'New Event Added 🚀', message: 'A New Workshop On React Native is Now Live! Register Before Seats Fill Up!', isNew: true, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '2', title: 'Upcoming Event Reminder 🎟️', message: 'Your JavaScript Workshop Starts In 1 Hour. Get Ready!', isNew: false, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '3', title: 'System Update 🔄', message: 'Your App Has Been Updated To The Latest Version!', isNew: false, isRead: true, icon: require('../../../assets/icons/i3.png') },
    { id: '4', title: 'New Event Added 🚀', message: 'A New Workshop On UI/UX is Now Live! Register Before Seats Fill Up!', isNew: true, isRead: false, icon: require('../../../assets/icons/i3.png') },
    { id: '5', title: 'Upcoming Webinar 📢', message: 'Join Our Live Q&A Session At 7 PM!', isNew: false, isRead: true, icon: require('../../../assets/icons/i3.png') },
];

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [loading, setLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [heading, setHeading] = useState([]);
  const isFocused = useIsFocused();
//    useEffect(() => {
//       if (isFocused) {
//         getNotifications()
//       }
//     }, [isFocused]);
    const handlePress = (id) => {
        setNotifications((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isRead: true } : item
            )
        );
    };
//     const getNotifications = async (page = 1) => {
//         if (isFetchingMore || (totalPages !== null && page > totalPages)) return; // Prevent duplicate calls
    
//         try {
//             setIsFetchingMore(true);
//             if (page === 1) setLoading(true); // Show full-screen loader for first page
    
//             const user_id = await AsyncStorage.getItem('User_id');
    
//             if (!user_id) {
//                 showToast('error', 'Error', 'User ID not found.');
//                 throw new Error('User ID not found');
//             }
    
//             // API Request
//             const response = await api.get(`notification/user`, {
//                 params: {
//                     id: user_id, // ✅ Dynamically using retrieved user_id
//                     pageSize: 4, 
//                     currentPage: page,
//                 },
//             });
    
//             if (response.status === 200 && response.data?.result) {
//                 const newData = response.data.data;
//                 const totalItems = response.data.pagination?.totalItems || 0;
//                 const calculatedTotalPages = Math.ceil(totalItems / 4);
    
//                 setNotifications((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
//                 setCurrentPage(page);
//                 setTotalPages(calculatedTotalPages);
    
//                 console.log(`Fetched Page ${page} / ${calculatedTotalPages}`, newData);
//             } else {
//                 showToast("error", "Error", response.data?.message || "Failed to fetch notifications");
//                 console.warn(response.data?.message || "Failed to fetch notifications");
//             }
//         } catch (error) {
//             console.warn("Error fetching notifications:", error.message);
//         } finally {
//             setLoading(false);
//             setIsFetchingMore(false);
//         }
//     };
//    // Load more data when user scrolls to the bottom
//    const loadMoreMeetups = () => {
//     if (!isFetchingMore && currentPage < totalPages) {
//         setIsFetchingMore(true);
//         getMeetups(currentPage + 1);
//     }
// };


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
