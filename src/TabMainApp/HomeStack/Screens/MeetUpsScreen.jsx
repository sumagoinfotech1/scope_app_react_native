

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
    const [heading, setHeading] = useState([]);

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
                setHeading(response.data.data[0].event_type_id.name)
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
    const gotodetails = (id) => {
        navigation.navigate('MeetUpsDetails', { id });
    };
   
    return (
        <GradientContainer style={styles.mainContainer}>
            {/* Background Header */}
            <ImageBackground
                source={require('../../../assets/icons/image.png')}
                style={styles.imageContainer}
                resizeMode="cover"
            >
                <MainAppScreenHeader headername={heading} />
            </ImageBackground>

            {/* Meetup List */}
            <View style={styles.listContainer}>
            <FlatList
                data={meetupData}
                keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
                renderItem={({ item }) => (
                    <MeetAndWorkCard item={item} onpress={() => gotodetails(item.id)} />
                )}
                contentContainerStyle={{
                    paddingBottom: hp("15"),
                    flexGrow: 1, // Ensure proper layout
                }}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMoreMeetups} // Load more when reaching bottom
                onEndReachedThreshold={0.5} // Trigger when 50% close to end
                ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="#000" /> : null} // Show loader at bottom
                ListEmptyComponent={ // Show message if no events available
                    !loading && (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 20 }}>
                            <Text style={{  fontSize: wp("5"), fontWeight: "bold", color: "gray" }}>
                                No events available
                            </Text>
                        </View>
                    )
                }
            />
            {/* Loading Overlay */}
            <Loader visible={loading} />
        </View>
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
