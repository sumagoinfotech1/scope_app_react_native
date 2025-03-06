import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
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



const MeetupCard = ({ item, onPress }) => {

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearInterval(timer);
  }, [eventStartTime]); // Add dependency
  
  
  const eventStartTime = new Date(`${item.event_from_date}T${item.event_from_time}`);
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDiff = eventStartTime - now;
  
    if (timeDiff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, eventStarted: true };
    }
  
    return {
      days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
      eventStarted: false
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
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
  

  
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.event_event_image }} style={styles.headerImage} />
      <View style={{ padding: wp('3%'),backgroundColor:'#ffff' }}>
        <Text style={styles.title}>{item.event_title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.date}>{formatDate(item.event_from_date)}</Text>
          <MaterialIcons name="access-time" size={22} color="black" />
          <Text style={styles.time}>{item.event_from_time}</Text>
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
              <Text style={styles.text}>Starting In</Text>
              <Text style={styles.text}>{timeLeft.days}d {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}Sec</Text>
            </View>

          </View>
          <View style={{ width: wp('35%'), flexDirection: 'row', backgroundColor: "#000", borderRadius: wp('3'), justifyContent: "space-evenly", alignItems: "center", paddingHorizontal: 0 }}>
            <View style={{ left: wp('5'), zIndex: 100 }}>
              <FontAwesome name="video-camera" size={24} color="#fff" />
            </View>
            <View>
              <CustomButton
                title="Join"
                align="right"
                // onPress={()=>gotoWorkShop()}
                style={{ margin: wp('0'), padding: wp('2.9'), backgroundColor: Colors.black, marginVertical: wp('0%'), width: wp('20%') }}

              />
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const UpcomimgEventScreen = () => {
  const isFocused = useIsFocused();
  const [eventRegistration, setEventRegistration] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const getEventRegistration = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID from AsyncStorage
      const userId = await AsyncStorage.getItem("User_id");

      if (!userId) {
        throw new Error("User ID not found");
      }

      // Make API request
      const response = await api.get(`event-registration/user?id=${userId}`);

      if (response.status === 200 && response.data?.result) {
        setEventRegistration(response.data.data); // Store data in state
        console.log('setEventRegistration',response.data.data);
        
      } else {
        showToast("error", response.data?.message || "No event registrations found");
        throw new Error(response.data?.message || "No event registrations found");
      }
    } catch (error) {
      console.error("Error fetching event registration:", error);

      // Handle specific 400 status errors
      if (error.response && error.response.status === 400) {
        setError("No event registrations found.");
        showToast("error", error.response.data?.message || "No event registrations found");
      } else {
        setError(error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };
  // const getEventRegistration = async (currentPage = 1) => {
  //   if (!hasMore && currentPage !== 1) return;
  
  //   try {
  //     setLoading(true);
  //     setError(null);
  
  //     // Get user ID from AsyncStorage
  //     const userId = await AsyncStorage.getItem("User_id");
  //     if (!userId) throw new Error("User ID not found");
  
  //     // API request with pagination
  //     const response = await api.get(`event-registration/user?id=${userId}&page=${currentPage}&pageSize=10`);
  
  //     if (response.status === 200 && response.data?.result) {
  //       const newEvents = response.data.data || [];
  //       const pagination = response.data.pagination;
  
  //       setEventRegistration((prev) =>
  //         currentPage === 1 ? newEvents : [...prev, ...newEvents]
  //       );
  
  //       setHasMore(pagination.currentPage < pagination.totalPages);
  //       setPage(pagination.currentPage + 1);
  // setLoading(false);
  //       console.log("Fetched Events:", newEvents.map((item) => item.event_title));
  //     } else {
  //       showToast("error", response.data?.message || "No event registrations found");
  //       setHasMore(false);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching event registration:", error);
  //     setError(error.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  useEffect(() => {
    if (isFocused) {
      getEventRegistration();
    }
  }, [isFocused]);
  const handlePress = (item) => {
    console.log("Pressed item:", item);
  };

  
  return (
    <View style={styles.container}>
      <FlatList
        data={eventRegistration}
        keyExtractor={(item) => item.registration_id}
        renderItem={({ item }) => (
          <MeetupCard item={item} onPress={handlePress} />
        )}
        showsVerticalScrollIndicator={false}
      />
       <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: wp("3%"),
    backgroundColor: '#fff'
  },
  card: {
    width: wp("91%"),
    backgroundColor: '#ffff',
    // borderRadius: wp("2%"),
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: { width: 0, height: 5 },
    // elevation: 6,

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
    elevation: 3,
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
    color: "red"
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
