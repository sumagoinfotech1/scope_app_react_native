import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Colors from '../../../ReusableComponents/Colors';
import CustomButton from '../../../ReusableComponents/CustomButton';
const meetupData = [
  { id: '1', title: 'Visual Elements Of User Interface Design', date: '04 Feb 25', time: '02:40 PM', location: 'Govind Nagar Nashik', image: 'https://i.pinimg.com/736x/02/d9/78/02d9787575ca3e942ba0223e6e6eaaaf.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '2', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/50/35/57/503557d678025e87d3c017dd6a9fba14.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '3', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/f7/8c/ef/f78cef0dd20b57db43cc6c93cc4e7303.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '4', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/a5/77/4c/a5774cfed2b9a6bbc14ffea6148b7fb9.jpg', price: '600', offerprice: '300', joinmembers: "400" },
];

const MeetupCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
      <Image source={{ uri: item.image }} style={styles.headerImage} />
      <View style={{ padding: wp('3%') }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialIcons name="access-time" size={22} color="black" />
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.1'), borderRadius: wp('4'), width: wp("45"), marginVertical: wp('1.5') }]}>
          <FontAwesome name="map-marker" size={16} color="black" />
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.location}</Text>
        </View>
        <View style={styles.registerButton}>
          <View style={{ alignItems: 'center', justifyContent: 'center', width: wp('50%'), flexDirection: 'row' }}>
            <View style={{ padding: wp('1') }}>
              <MaterialCommunityIcons name="timer-sand" size={32} color="black" />
            </View>
            <View>
              <Text style={styles.text}>Starting In</Text>
              <Text style={styles.text}>1:52:00 Sec</Text>
            </View>

          </View>
          <View style={{ width: wp('35%'), flexDirection: 'row', backgroundColor: "#000", borderRadius: wp('3') ,justifyContent:"space-evenly",alignItems:"center",paddingHorizontal:0}}>
            <View style={{left:wp('5'),zIndex:100}}>
            <FontAwesome name="video-camera" size={24} color="#fff" />
            </View>
            <View>
              <CustomButton
                title="Join"
                align="right"
                // onPress={()=>gotoWorkShop()}
                style={{ margin: wp('0'), padding: wp('2.9'), backgroundColor: Colors.black, marginVertical: wp('0%'),width: wp('20%')}}

              />
            </View>

          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const UpcomimgEventScreen = () => {
  const handlePress = (item) => {
    console.log("Pressed item:", item);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={meetupData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MeetupCard item={item} onPress={handlePress} />
        )}
        showsVerticalScrollIndicator={false}
      />
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
    marginTop: wp("3%"),
    margin: wp("1%"),
  },
  headerImage: {
    width: wp("91%"),
    height: wp("40%"),
    resizeMode: 'cover',
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
