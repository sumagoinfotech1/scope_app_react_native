import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import CustomButton from './CustomButton'; // Assuming you have a CustomButton component for reuse
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from './Colors';
import { formatTime } from '../utils/timeUtils';
import { showToast } from '../utils/toastService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/axiosInstance';

const MeetAndWorkCard = ({ item, onpress,navigation }) => {
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState('');
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
  console.log('itemitem', item.id);
  const getRegisteredEvents = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('User_id');

      if (!userId) {
        showToast('error', 'Error', 'User ID not found.');
        throw new Error('User ID not found');
      }
      console.log('Fetching registered events for user:', userId);

      // API request
      const response = await api.get(`event-registration/registered-event/user?id=${userId}`);

      console.log('API Response:', response);

      if (response.status === 200 && response.data?.result) {
        const registeredEvents = response.data.data; // Extract event data

        // Check if the eventId exists in the registered events list
        const isRegistered = registeredEvents.some(event => event.event_id === item.id);

        setIsRegistered(isRegistered); // Update state for UI
        console.log(`Eventr ${item.id} is ${isRegistered ? 'already registered' : 'not registered'}`);
      } else {
        const errorMsg = response.data?.message || 'Failed to fetch events';
        showToast('error', 'Error', errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Error fetching registered events:', error);

      let errorMsg = 'Something went wrong. Please try again.';
      if (error.response) {
        console.error('Server Response:', error.response.data);
        errorMsg = error.response.data?.message || errorMsg;
      }

      setError(errorMsg);
    } finally {
      console.log('Request completed.');
      setLoading(false);
    }
  };


  // Ensure userId is available before calling API
  useEffect(() => {

    getRegisteredEvents();

  }, []);
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onpress}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
        </View>
        <View style={{ paddingHorizontal: wp('3') }}>
          {/* Content Section */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>

          {/* Date and Time */}
          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <View style={styles.infoRow}>
              <Text style={styles.date}>{formatDate(item.from_date)} <Text style={{ color: '#000' }}>To</Text> {formatDate(item.to_date)}</Text>
            </View>
            {item.paid_or_free === 'Paid' ? <View>
              <Text style={styles.pricetag}>₹{item.early_bird_price || 0}</Text>
            </View> : null}

          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="access-time" size={22} color="black" />
            <Text style={styles.time}>{formatTime(item.from_time)} <Text style={{ color: '#000' }}>To</Text> {formatTime(item.to_time)}</Text>
          </View>
          {/* Location and Register Button */}
          <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={16} color="black" />
              {item.paid_or_free === 'Paid' ?
                <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                  {item.max_attendees} Members Joined
                </Text>
                : <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
                  {item.location}
                </Text>}

            </View>

          </View>



        </View>
      </TouchableOpacity>
      {isRegistered === true ?  <View style={styles.registerButton}>
                              <Text style={styles.registerText}>Event Already Registered</Text>
                          </View>  : <CustomButton
        title="Register"
        align="center"
        onPress={onpress}
        style={styles.registerButton}
        textstyle={styles.registerText}
      />}

    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: wp("91%"),
    backgroundColor: '#ffff',
    borderRadius: wp("2%"),
    paddingBottom: wp("2%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    marginTop: wp("3%"),
    // marginBottom: wp("15%"),
    margin: wp("1%"),
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
    color: Colors.black,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp("1%"),
    elevation: 3,
  },
  date: {
    color: '#c94f69',
    fontWeight: 'bold',
    marginRight: wp("2.5%"),
    fontSize: wp('4'),
  },
  time: {
    marginLeft: wp("1%"),
    fontSize: wp('4'),
  },
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: "#E2E2E2",
    padding: wp('1.1'),
    borderRadius: wp('4'),
    width: wp("60%"),
    alignItems: 'center',
    paddingHorizontal: wp('3'),
    marginBottom: wp('1.7')
  },
  location: {
    marginLeft: wp("2%"),
    color: Colors.black,
    fontSize: wp("4%"),
    padding: wp("0%"),
    width: wp("55%"),
  },
  registerButton: {
    padding: wp('2'),
    backgroundColor: Colors.black,
    borderRadius: wp('3.5'),
    width: wp('87%'),
    alignSelf:'center'
  },
  registerText: {
    fontSize: wp("4.5%"),
  
    color: Colors.white,
    textAlign: "center",
    fontWeight:'bold'

  },
  pricetag: {
    fontSize: wp('7'),
    fontWeight: 'bold',
    color: "#c94f69"
  }
});

export default MeetAndWorkCard;
