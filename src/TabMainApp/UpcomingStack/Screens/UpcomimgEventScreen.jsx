import React, { useEffect, useState, useMemo, useCallback, memo } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Platform, Linking, Alert, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from '../../../ReusableComponents/Colors';
import CustomButton from '../../../ReusableComponents/CustomButton';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";
import { formatTime } from '../../../utils/timeUtils';



const MeetupCard = memo(({ item, onPress }) => {

  // ✅ Memoizing event start & end times to prevent unnecessary recalculations
  const eventTimes = useMemo(() => ({
    start: new Date(`${item.event_from_date}T${item.event_from_time}`),
    end: new Date(`${item.event_to_date}T${item.event_to_time}`)
  }), [item.event_from_date, item.event_from_time, item.event_to_date, item.event_to_time]);

  // ✅ Memoizing time calculation function
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();

    if (now >= eventTimes.end) {
      return { status: "Session Completed" };
    } else if (now >= eventTimes.start) {
      return { status: "Session Ongoing" };
    } else {
      const timeDiff = eventTimes.start - now;
      return {
        days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
        status: "Timer Ongoing",
      };
    }
  }, [eventTimes]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft()); // Initialize timer immediately

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);
  // return timeLeft;


  const formatDate = (dateString) => {
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };
  const openGoogleMaps = (url) => {

    Linking.openURL(url).catch(err => console.error("Failed to open Google Maps", err));
  };
  const openMeeting = (url) => {

    Linking.openURL(url).catch(err => console.error("Failed to open Zoom App", err));
  };
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.event_event_image }} style={styles.headerImage} />
      <View style={{ padding: wp('3%'), backgroundColor: '#ffff' }}>
        <Text style={styles.title}>{item?.event_title}</Text>
        <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
          {/* <Text style={styles.date}>{formatDate(item.event_from_date)}</Text> */}
          <Text style={styles.date}>{formatDate(item?.event_from_date)} <Text style={{ color: '#000' }}>To</Text> {formatDate(item?.event_to_date)}</Text>

          {item?.event_paid_or_free === 'Paid' ? <View>
            <Text style={styles.pricetag} numberOfLines={1} ellipsizeMode="tail">₹{item.early_bird_price || 0}</Text>
          </View> : null}
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={22} color="black" />
          <Text style={styles.time}>{formatTime(item?.event_from_time)} <Text style={{ color: '#000' }}>To</Text> {formatTime(item?.event_to_time)}</Text>
        </View>
        <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.1'), borderRadius: wp('4'), width: wp("60"), marginVertical: wp('1.5') }]}>
          <FontAwesome name="map-marker" size={16} color="black" />
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.event_location}</Text>
        </View>
        <View style={styles.registerButton}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: wp('50%'), flexDirection: 'row' }}>
            <View style={{ padding: wp('1') }}>
              <MaterialCommunityIcons name="timer-sand" size={32} color="black" />
            </View>

            <View>
              {timeLeft?.status === "Timer Ongoing" ? (
                <>
                  <Text style={styles.text}>Starting In</Text>
                  <Text style={styles.text}>
                    {timeLeft.days}d {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}Sec
                  </Text>
                </>
              ) : (
                <Text style={[styles.text, { fontSize: wp('4') }]}>{timeLeft.status}</Text>
              )}
            </View>

          </View>
          {item?.event_mode_of_event == 'online' ? <View style={{ width: wp('35%'), flexDirection: 'row', backgroundColor: "#000", borderRadius: wp('3'), justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 0 }}>
            <View style={{ left: wp('5'), zIndex: 100 }}>
              <FontAwesome name="video-camera" size={24} color="#fff" />
            </View>

            <View>
              <CustomButton
                title="Join"
                align="right"
                onPress={() => openMeeting(item?.event_meeting_Link)}
                style={{ margin: wp('0'), padding: wp('2.9'), backgroundColor: Colors.black, marginVertical: wp('0%'), width: wp('20%') }}

              />
            </View>

          </View> : <View style={{ width: wp('35%'), flexDirection: 'row', backgroundColor: "#000", borderRadius: wp('3'), justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 0 }}>
            <View style={{ left: wp('5'), zIndex: 100 }}>
              <FontAwesome name="map" size={24} color="#fff" />
            </View>

            <View>
              <CustomButton
                title="Direction"
                align="right"
                onPress={() => openGoogleMaps(item?.event_google_map_link)}
                style={{ margin: wp('0'), padding: wp('2.9'), backgroundColor: Colors.black, marginVertical: wp('0%'), width: wp('28%') }}

              />
            </View>

          </View>}

        </View>
      </View>
    </TouchableOpacity>
  );
});

const UpcomimgEventScreen = () => {
  const isFocused = useIsFocused();
  const [eventRegistration, setEventRegistration] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const pageSize = 10; // Fixed page size
  console.log('gggg', eventRegistration);

  // const getEventRegistration = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Get user ID from AsyncStorage
  //     const userId = await AsyncStorage.getItem("User_id");

  //     if (!userId) {
  //       throw new Error("User ID not found");
  //     }

  //     // Make API request
  //     const response = await api.get(`event-registration/user?id=${userId}`);

  //     if (response.status === 200 && response.data?.result) {
  //       setEventRegistration(response.data.data); // Store data in state
  //       console.log('setEventRegistration', response.data.data);

  //     } else {
  //       showToast("error", response.data?.message || "No event registrations found");
  //       throw new Error(response.data?.message || "No event registrations found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching event registration:", error);

  //     // Handle specific 400 status errors
  //     if (error.response && error.response.status === 400) {
  //       setError("No event registrations found.");
  //       showToast("error", error.response.data?.message || "No event registrations found");
  //     } else {
  //       setError(error.message || "Something went wrong");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getEventRegistration = async (page = 1) => {
    if (page > totalPages) return; // ✅ Prevent extra API calls

    try {
      if (page === 1) setLoading(true); // ✅ Show full-screen loader only for first load
      setIsFetchingMore(page !== 1); // ✅ Show bottom loader for pagination

      const userId = await AsyncStorage.getItem("User_id");
      if (!userId) throw new Error("User ID not found");

      const response = await api.get(
        `event-registration/user?id=${userId}&pageSize=${pageSize}&currentPage=${page}`
      );

      if (response.status === 200 && response.data?.result === true) {
        setEventRegistration(prevData =>
          page === 1 ? response.data.data : [...prevData, ...response.data.data]
        );
        setTotalPages(response.data.pagination.totalPages); // ✅ Store total pages
        setCurrentPage(page); // ✅ Update current page
      } else {
        // Alert.alert('oooo')

        throw new Error(response.data?.message || "No event registrations found");
      }
    } catch (error) {
      console.error("Error fetching event registration:", error);
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };
  const loadMoreData = () => {
    if (!isFetchingMore && currentPage < totalPages) {
      getEventRegistration(currentPage + 1); // ✅ Load next page
    }
  };
  useEffect(() => {
    if (isFocused) {
      getEventRegistration();
    }
  }, [isFocused]);
  const handlePress = (item) => {
    console.log("Pressed item:", item);
  };

  const renderItem = useCallback(({ item }) => <MeetupCard item={item} onPress={handlePress} />, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader visible={loading} /> // ✅ Full-screen loader for first load
      ) : eventRegistration.length === 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: wp("5"), fontWeight: "bold", color: "gray" }}>
            No registered events
          </Text>
        </View>
      ) : (
        <FlatList
          data={eventRegistration}
          keyExtractor={(item) => item.registration_id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5} // ✅ Optimize rendering
          removeClippedSubviews={true} // ✅ Memory optimization
          onEndReached={loadMoreData} // ✅ Load more data when scrolling
          onEndReachedThreshold={0.5} // ✅ Trigger load at halfway point
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="black" /> : null} // ✅ Small bottom loader
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: wp("3%"),
    backgroundColor: '#fff',
    justifyContent: "center"
  },
  card: {
    width: wp("93%"),
    backgroundColor: '#ffff',
    borderRadius: wp("2%"),
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    padding: wp('1'),
    alignItems: "center",
    marginTop: Platform.OS === 'ios' ? wp('10%') : wp("3%"),
    margin: wp("1%"),
  },
  headerImage: {
    width: wp("91%"),
    height: wp("40%"),
    resizeMode: 'contain',
    borderRadius: wp("2%"),
  },
  title: {
    fontSize: wp('4.6%'),
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    color: 'black',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: wp("1%"),
    // elevation: 1,
  },
  date: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: wp("2.5%"),
    fontSize: wp('5'),
  },
  time: {
    marginLeft: wp("1%"),
    fontSize: wp('4'),
    color: "black"
  },
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: "#E2E2E2",
    padding: wp('1.3%'),
    borderRadius: wp('4%'),
    width: wp("60%"),
    alignItems: 'center',
    paddingHorizontal: wp('3%')
  },
  registerButton: {
    padding: wp('0%'),
    backgroundColor: '#fff',
    borderRadius: wp('3.5%'),
    width: wp('87%'),
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: wp('3'),
    // backgroundColor:'red'

  },
  registerText: {
    fontSize: wp("4.5%"),
    color: 'white',
    textAlign: 'center'
  },
  pricetag: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: "red",
    // width: wp('25%'),
  },
  location: {
    marginLeft: wp("1%"),
    color: Colors.black,
    fontSize: wp("3.5%"),
    padding: wp("1%"),
    width: wp("40")

  },
  text: { color: 'black', fontWeight: 'bold' }
});

export default UpcomimgEventScreen;
