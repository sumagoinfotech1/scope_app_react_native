// import { StyleSheet, Text, View, Image, ImageBackground ,FlatList} from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import ScreenHeader from '../../../ReusableComponents/ScreenHeader';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// import GradientContainer from '../../../ReusableComponents/GradientContainer';
// import MeetAndWorkCard from '../../../ReusableComponents/MeetAndWorkCard';
// import { showToast } from '../../../utils/toastService';
// import api from '../../../utils/axiosInstance';
// import Loader from '../../../ReusableComponents/Loader';
// const meetupData = [
//     { id: '1', title: 'Visual Elements Of User Interface Design', date: '04 Feb 25', time: '02:40 PM', location: 'Govind Nagar Nashik', image: 'https://i.pinimg.com/736x/02/d9/78/02d9787575ca3e942ba0223e6e6eaaaf.jpg', price: '600', offerprice: '300', joinmembers: "400" ,paid_or_free:"Paa"},
//     { id: '2', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/50/35/57/503557d678025e87d3c017dd6a9fba14.jpg', price: '600', offerprice: '300', joinmembers: "400" },
//     { id: '3', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/f7/8c/ef/f78cef0dd20b57db43cc6c93cc4e7303.jpg', price: '600', offerprice: '300', joinmembers: "400" },
//     { id: '4', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/a5/77/4c/a5774cfed2b9a6bbc14ffea6148b7fb9.jpg', price: '600', offerprice: '300', joinmembers: "400" },
// ];
// const MeetUpsScreen = ({navigation,route}) => {
//     const {id}= route.params || {};
//     console.log('idd',id);
//     const [eventsbyId, setEventsById] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [isFetchingMore, setIsFetchingMore] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const getEventsByd = async (id, page = 1) => {
//         if (isFetchingMore || (!hasMore && page !== 1)) return; // Prevent unnecessary API calls
      
//         try {
//           if (page === 1) setLoading(true); // Show main loader for the first fetch
//           setIsFetchingMore(true);
      
//           // Make API Request with pagination in the request body
//           const response = await api.get(`event/get_by_eventype/${id}`, {
//             // pageSize: 10,
//             // currentPage: page
//           });
//       {}
//           if (response.status === 200 && response.data?.result) {
//             const newData = response.data.data;
      
//             setEventsById(prevData => (page === 1 ? newData : [...prevData, ...newData]));
//             setHasMore(newData.length === 10); // If fewer than 6 items are returned, no more data is available
//             setCurrentPage(page);
      
//             console.log('Fetched Events:', newData.map(item => item.name));
//           } else {
//             showToast('error', 'Error', response.data?.message || 'Failed to fetch events');
//             throw new Error(response.data?.message || 'Failed to fetch events');
//           }
//         } catch (error) {
//           console.error('Error in getEvents:', error);
//           let errorMsg = 'Something went wrong. Please try again.';
//           if (error.response) {
//             errorMsg = error.response.data?.message || errorMsg;
//           } else if (error.message) {
//             errorMsg = error.message;
//           }
//           setError(errorMsg);
//         } finally {
//           setLoading(false);
//           setIsFetchingMore(false);
//         }
//       };
      
//       // Function to load more data when scrolling
//       const loadMoreEvents = () => {
//         if (!isFetchingMore && hasMore) {
//           getEventsByd(id, currentPage + 1);
//         }
//       };
    
//       // Fetch data on component mount
//       useEffect(() => {
//         getEventsByd(id);
//       }, []);

//     const gotodetails=()=>{
//         navigation.navigate('MeetUpsDetails')
//             }
//     return (
//         <GradientContainer style={styles.mainContainer}>
//             <ImageBackground source={require('../../../assets/icons/image.png')} style={styles.imageContainer} resizeMode='cover'>
//                 <MainAppScreenHeader headername={"MEETUPS"} />
//             </ImageBackground>
//             <View >
//                 <FlatList
//                     data={meetupData}
//                     keyExtractor={(item) => item.id} // Unique key for each item
//                     renderItem={({ item }) => <MeetAndWorkCard item={item}  onpress={()=>gotodetails()} />}
//                     contentContainerStyle={{ paddingBottom:hp('15')}} // Optional styling
//                     showsVerticalScrollIndicator={false}
//                 />

//             </View>
//             <Loader visible={loading} />
//         </GradientContainer>
//     )
// }

// export default MeetUpsScreen

// const styles = StyleSheet.create({
//     mainContainer: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: 'flex-start'
//     },
//     imageContainer: {
//         backgroundColor: "red",
//         width: wp('100%'),
//         alignItems: "center",
//         height: hp('15'),
//         justifyContent: "center",

//     }
// })

import { StyleSheet, Text, View, ImageBackground, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import GradientContainer from '../../../ReusableComponents/GradientContainer';
import MeetAndWorkCard from '../../../ReusableComponents/MeetAndWorkCard';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';

const MeetUpsScreen = ({ navigation, route }) => {
    const { id } = route.params || {};
    console.log('Selected ID:', id);

    const [meetupData, setMeetupData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const getMeetups = async (page = 1) => {
        if (isFetchingMore || (totalPages !== null && page > totalPages)) return; // Prevent duplicate calls

        try {
            if (page === 1) setLoading(true); // Show full-screen loader for first page
            setIsFetchingMore(true);

            const response = await api.post(`event/get_by_eventype/${id}`, {
                pageSize: 10, // Number of items per page
                currentPage: page,
            });

            if (response.status === 200 && response.data?.result) {
                const newData = response.data.data;
                const totalItems = response.data.totalItems || 0;
                const calculatedTotalPages = Math.ceil(totalItems / 6);

                setMeetupData((prevData) => (page === 1 ? newData : [...prevData, ...newData]));
                setCurrentPage(page);
                setTotalPages(calculatedTotalPages);

                console.log(`Fetched Page ${page} / ${calculatedTotalPages}`, newData.map(item => item.name));
            } else {
                showToast('error', 'Error', response.data?.message || 'Failed to fetch meetups');
                console.warn(response.data?.message || 'Failed to fetch meetups');
            }
        } catch (error) {
            console.warn('Error fetching meetups:', error.message);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    // Load more data when user scrolls to the bottom
    const loadMoreMeetups = () => {
        if (!isFetchingMore && currentPage < totalPages) {
            setIsFetchingMore(true);
            getMeetups(currentPage + 1);
        }
    };

    // Fetch data on mount
    useEffect(() => {
        getMeetups();
    }, []);

    // Navigate to Meetup Details screen with ID
    const gotodetails = (meetupId) => {
        navigation.navigate('MeetUpsDetails', { id: meetupId });
    };

    return (
        <GradientContainer style={styles.mainContainer}>
            {/* Background Header */}
            <ImageBackground 
                source={require('../../../assets/icons/image.png')} 
                style={styles.imageContainer} 
                resizeMode="cover"
            >
                <MainAppScreenHeader headername={"MEETUPS"} />
            </ImageBackground>

            {/* Meetup List */}
            <View style={styles.listContainer}>
                <FlatList
                    data={meetupData}
                    keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
                    renderItem={({ item }) => (
                        <MeetAndWorkCard item={item} onpress={() => gotodetails(item)} />
                    )}
                    contentContainerStyle={{ paddingBottom: hp('15') }} // Extra padding at bottom
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreMeetups} // Load more when reaching bottom
                    onEndReachedThreshold={0.5} // Trigger when 50% close to end
                    ListFooterComponent={isFetchingMore ? <ActivityIndicator size="small" color="#000" /> : null} // Show loader at bottom
                />
            </View>

            {/* Loading Overlay */}
            <Loader visible={loading} />
        </GradientContainer>
    );
};

export default MeetUpsScreen;

const styles = StyleSheet.create({
    mainContainer: {
                flex: 1,
                alignItems: "center",
                justifyContent: 'flex-start'
            },
            imageContainer: {
                backgroundColor: "red",
                width: wp('100%'),
                alignItems: "center",
                height: hp('15'),
                justifyContent: "center",
        
            },
    listContainer: {
        // flex: 1,
        // width: '100%',
        paddingHorizontal: wp('0%'), // Add some padding
    }
});
