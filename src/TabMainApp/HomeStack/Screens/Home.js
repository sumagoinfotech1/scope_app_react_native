

import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ScreenHeader from '../../../ReusableComponents/ScreenHeader'
import GradientContainer from '../../../ReusableComponents/GradientContainer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CarouselComponent from '../../../ReusableComponents/CarouselComponent';
import Colors from '../../../ReusableComponents/Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from '../../../ReusableComponents/CustomButton';
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../../utils/axiosInstance";
import { showToast } from '../../../utils/toastService';
import Loader from '../../../ReusableComponents/Loader';
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { formatTime } from '../../../utils/timeUtils';



const Home = ({ navigation }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isFocused = useIsFocused();
  const [slider, setSlider] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState(new Set()); // Store registered event IDs
  // console.log('api',events[0].events);

  const getEvents = async () => {
    try {
      setLoading(true);
      // console.log('Fetching Events...');

      // Make API Request
      const response = await api.get('event/get_events_grouped_by_eventtype');

      if (response.status === 200 && response.data?.result) {
        setEvents(response.data.data); // Store data in state
        // console.log('data 13', response.data.data);

      } else {
        // console.log('raviiBhai',response.data?.message);

        showToast('error', 'Error', response.data?.message || 'Failed to fetch events');
        throw new Error(response.data?.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error in getEvents:', error);

      let errorMsg = 'Something went wrong. Please try again.';
      if (error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  const getSlider = async () => {
    try {
      setLoading(true);
      // console.log('Fetching Events...');

      // Make API Request
      const response = await api.get('home-slider/all');

      if (response.status === 200 && response.data?.result) {
        setSlider(response.data.data); // Store data in state
        // console.log('dataRavi', response.data.data.map((item) => item.name));

      } else {
        // showToast('error', 'Error', response.data?.message || 'Failed to fetch events');
        throw new Error(response.data?.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error in getEvents:', error);

      let errorMsg = 'Something went wrong. Please try again.';
      if (error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  // ✅ Fetch Registered Events
  const fetchRegisteredEvents = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('User_id');

      if (!userId) {
        showToast('error', 'Error', 'User ID not found.');
        throw new Error('User ID not found');
      }

      console.log('Fetching registered events for user:', userId);
      const response = await api.get(`event-registration/registered-event/user?id=${userId}`);

      if (response.status === 200 && response.data?.result) {
        const registeredSet = new Set(response.data.data.map(event => event.event_id)); // Store event IDs in Set
        setRegisteredEvents(registeredSet);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Check if Event is Registered
  const checkIfRegistered = (eventId) => {
    return registeredEvents.has(eventId);
  };

  // Ensure userId is available before calling API
  useEffect(() => {

    fetchRegisteredEvents();

  }, []);
  // Fetch data on component mount

  useEffect(() => {
    if (isFocused) {
      getEvents();
      getSlider()
    }
  }, [isFocused]);
  useEffect(() => {
    checkAccessToken()
  }, []);

  const checkAccessToken = async () => {
    try {
      const oldFMCToken = await AsyncStorage.getItem('oldFMCToken');
      const FMCToken = await AsyncStorage.getItem('FMCToken');
      console.log('new', FMCToken);
      console.log('old', oldFMCToken);

      if (oldFMCToken === FMCToken) {
        console.log('old and new same');

        return
      } else {
        createDeviceToken(FMCToken)

        await AsyncStorage.setItem('oldFMCToken', FMCToken);
      }
    } catch (error) {
      console.error('Error retrieving or saving access token:', error);
    }
  };

  const createDeviceToken = async (token) => {
    try {
      setLoading(true);
      setError(null);

      console.log('Creating Device Token:', token);

      // API Request
      const response = await api.post('device-token/create', {
        token
      });

      console.log('Device Token Response:', response.data);

      if (response.data?.result === true) {
        // showToast("success", "Device Token Registered", "Your device has been successfully registered.");
        return response.data;
      } else {
        showToast("error", "Failed to register device", response.data?.message || "Unable to register device token.");
        throw new Error(response.data?.message || "Unable to register device token.");
      }
    } catch (error) {
      console.error('Error in createDeviceToken:', error);

      let errorMsg = "Something went wrong. Please try again.";
      if (error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }

      showToast("error", "Error", errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };


  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: item.image }} style={{ width: wp("93%"), height: hp("24%"), borderRadius: 20, backgroundColor: "black", resizeMode: "cover", borderWidth: 2, borderColor: Colors.white }} />
    </View>
  );

  const gotoMeetup = (id) => {
    // console.log('iddd',id);

    navigation.navigate('MeetUpsScreen', { id })
  }
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
  const MeetupCard = ({ item, isRegistered }) => {
    console.log('isRegistered', isRegistered);

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
        </View>
        <View style={{ padding: wp("1.9%"), }}>
          {/* Content Section */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>

          {/* Date and Time */}
          <View style={styles.infoRow}>
            <Text style={styles.date}>{formatDate(item.from_date)} <Text style={{ color: '#000' }}>To</Text> {formatDate(item.to_date)}</Text>
            {/* <Text style={styles.date}>{formatDate(item.to_date)}</Text> */}
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color="black" />
            <Text style={styles.time}>{formatTime(item.from_time)} <Text style={{ color: '#000' }}>To</Text> {formatTime(item.to_time)}</Text>
          </View>
          {/* Location */}
          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.3'), borderRadius: wp('4'), width: wp("45"), }]}>
              <FontAwesome name="map-marker" size={16} color="black" />
              <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.location}</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
            {isRegistered === true ?  <View style={{ padding: wp('2.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('40') }}>
                <Text style={{
                  color: '#fff',
                  fontSize: wp("3.9%%"),
                  fontWeight: 'bold',
                }}> Already Registered</Text>
              </View> : <CustomButton
                title="Register"
                align="right"
                onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}
                style={{ padding: wp('3'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('30') }}
                textstyle={{ fontSize: wp("3.9%") }}
              />}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const WorkShopCard = ({ item, isRegistered }) => {
    // console.log('workisRegistered',isRegistered);

    return (
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
        </View>
        <View style={{ padding: wp("1.9%"), }}>
          {/* Content Section */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>


          {/* Date and Time */}
          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <Text style={styles.date}>{formatDate(item.from_date)} <Text style={{ color: '#000' }}>To</Text> {formatDate(item.to_date)}</Text>
            {/* <Text style={styles.date}>{formatDate(item.to_date)}</Text> */}
            {/* Date and Time */}
            <View style={styles.infoRow}>
              <Text style={styles.date}>₹ {item.early_bird_price || 0}</Text>
              <MaterialIcons name="local-offer" size={16} color="black" />
              <Text style={[styles.time, { textDecorationLine: 'line-through', fontWeight: 'bold' }]}>
                ₹ {item.initial_price || 0}
              </Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={16} color="black" />
            <Text style={styles.time}>{formatTime(item.from_time)} <Text style={{ color: '#000' }}>To</Text> {formatTime(item.to_time)}</Text>
          </View>
          {/* Location */}
          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.3'), borderRadius: wp('4'), width: wp("45"), }]}>
              <FontAwesome name="user" size={22} color="#8C8C8C" />
              <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail"><Text style={{ fontWeight: "bold", fontSize: wp('3.6') }}>{item.max_attendees}</Text> Members Joined</Text>
            </View>

            <View style={{ alignItems: "flex-end" }}>
              {isRegistered === true ?  <View style={{ padding: wp('2.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('40') }}>
                <Text style={{
                  color: '#fff',
                  fontSize: wp("3.9%%"),
                  fontWeight: 'bold',
                }}> Already Registered</Text>
              </View> : <CustomButton
                title="Register"
                align="right"
                onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}
                style={{ padding: wp('3'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('30') }}
                textstyle={{ fontSize: wp("3.9%") }}
              />}
             
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <GradientContainer style={styles.maincontainer}>
      <ScrollView nestedScrollEnabled={true} style={{ flex: 1 }}>
        <View style={{ position: 'static', }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RewardsScreen')}>
            <Image source={require('../../../assets/icons/Maskgroup.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: Platform.OS === 'ios' ? hp("7%") : hp("2%"), marginBottom: hp("1%") }}>
          <ScreenHeader headername={"EVENTS"} />
        </View>
        <View style={styles.bannerContainer}>
          <CarouselComponent data={slider} renderItem={renderItem} height={hp("28%")} />
        </View>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ width: '100%' }}>
              <ScreenHeader headername={item.name} />
              {/* FlatList to show events horizontally if multiple exist */}
              <FlatList
                data={item.events}
                keyExtractor={(event) => event.id}
                horizontal={item.events.length > 1} // Show in a row if more than 1 event
                renderItem={({ item }) => (
                  <View style={{ marginLeft: wp('1') }}>
                    {item.paid_or_free === 'Paid' ? (
                      <WorkShopCard item={item} isRegistered={checkIfRegistered(item.id)} />
                    ) : (
                      <MeetupCard item={item} isRegistered={checkIfRegistered(item.id)} />
                    )}
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={true}
              />
              {/* "See More" button appears once per item */}
              <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "flex-end", marginRight: wp('2'), }}>
                <CustomButton
                  title="See More "
                  align="right"
                  onPress={() => gotoMeetup(item.id)}
                  style={{

                    marginBottom: wp('1'),
                    alignSelf: 'flex-end', // Align button to the right
                    paddingRight: -wp('5')
                  }}
                  textstyle={{ color: '#000', fontSize: wp('4.5') }}
                />
                <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
              </View>
            </View>
          )}
          nestedScrollEnabled={true}
          scrollEnabled={false}
        />

        <ScreenHeader headername={"EARN REWARDS"} />

        <View style={styles.ImageCard}>
          <Image
            // source={{ uri: "https://i.pinimg.com/736x/06/16/32/061632d4efe20eb88834e335ccbee1e9.jpg" }}
            source={require('../../../assets/icons/Banner.png')}
            style={styles.CardImage}
            resizeMode="contain" // You can change to "contain" or "stretch" if needed
          />
        </View>
        <Loader visible={loading} />
      </ScrollView>
    </GradientContainer>
  )
}

export default Home

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bannerContainer: {
    // flex:1,
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: hp("1%"),
    width: wp("100%"),

  },

  card: {
    width: wp("94%"),
    // height: wp("80%"),
    backgroundColor: '#fff',
    borderRadius: wp("2%"),
    // padding: wp("1.9%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    // alignItems: 'center',
    marginBottom: wp("2%"),
    margin: wp("1%"),
    alignSelf: "center"
  },
  header: {
    alignItems: 'center',
  },
  headerImage: {
    width: wp("94%"),
    height: wp("39%"),
    resizeMode: 'contain',
    borderRadius: wp("2%"),
  },

  title: {
    fontSize: wp('5'),
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    color: Colors.black
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp("1%"),
    // elevation: 3
  },
  date: {
    color: '#c94f69',
    fontWeight: 'bold',
    marginRight: wp("2.5%"),
  },
  time: {
    marginLeft: wp("1%"),
    color: '#000'
  },
  location: {
    marginLeft: wp("1%"),
    color: Colors.black,
    fontSize: wp("3.5%"),
    padding: wp("1%"),
    width: wp("40")

  },

  ImageCard: {
    alignItems: "center",
    justifyContent: "center",
    // elevation: 18,
    borderRadius: wp("3%"),
    alignSelf: "center",
    marginBottom: wp("3.9%")
  },
  CardImage: {
    width: wp("96%"),
    height: hp("32%"),
    borderRadius: wp("3%"),



  },
  button: {
    position: 'absolute',
    // bottom: wp('5%'),
    // right: wp('5%'),
    backgroundColor: '#E7E7E7',
    width: wp('14%'),
    height: wp('12%'),
    // borderRadius: wp('7%'),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    alignSelf: "flex-end",
    marginVertical: wp('3'),
    borderTopLeftRadius: wp('7%'),
    borderBottomLeftRadius: wp('7%'),
    paddingHorizontal: wp('8'),

  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
    tintColor: '#000',
    resizeMode: 'cover'
  },

})
