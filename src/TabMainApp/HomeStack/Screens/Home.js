import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView ,Platform} from 'react-native'
import React, { memo } from 'react'
import ScreenHeader from '../../../ReusableComponents/ScreenHeader'
import GradientContainer from '../../../ReusableComponents/GradientContainer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CarouselComponent from '../../../ReusableComponents/CarouselComponent';
import Colors from '../../../ReusableComponents/Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from '../../../ReusableComponents/CustomButton';
const data = [
  { id: 1, title: 'Item 1', image: 'https://i.pinimg.com/736x/3d/c2/eb/3dc2eb4ec5899da8b73b07aac0f7c700.jpg' },
  { id: 2, title: 'Item 2', image: 'https://i.pinimg.com/736x/02/d9/78/02d9787575ca3e942ba0223e6e6eaaaf.jpg' },
  { id: 3, title: 'Item 3', image: 'https://i.pinimg.com/736x/1f/d1/6c/1fd16c0483c99a1e70b58c6a4698488d.jpg' },
];

const meetupData = [
  { id: '1', title: 'Visual Elements Of User Interface Design', date: '04 Feb 25', time: '02:40 PM', location: 'Govind Nagar Nashik', image: 'https://i.pinimg.com/736x/02/d9/78/02d9787575ca3e942ba0223e6e6eaaaf.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '2', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/50/35/57/503557d678025e87d3c017dd6a9fba14.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '3', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/f7/8c/ef/f78cef0dd20b57db43cc6c93cc4e7303.jpg', price: '600', offerprice: '300', joinmembers: "400" },
  { id: '4', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/a5/77/4c/a5774cfed2b9a6bbc14ffea6148b7fb9.jpg', price: '600', offerprice: '300', joinmembers: "400" },
];

const Home = () => {
  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: item.image }} style={{ width: wp("95%"), height: hp("20%"), borderRadius: 20, backgroundColor: "black", resizeMode: "cover", borderWidth: 2, borderColor: Colors.white }} />
    </View>
  );

  const MeetupCard = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
        </View>

        {/* Content Section */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>

        {/* Date and Time */}
        <View style={styles.infoRow}>
          <Text style={styles.date}>{item.date}</Text>
          <MaterialIcons name="access-time" size={16} color="black" />
          <Text style={styles.time}>{item.time}</Text>
        </View>

        {/* Location */}
        <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
          <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.3'), borderRadius: wp('4') ,width: wp("45"),}]}>
            <FontAwesome name="map-marker" size={16} color="black" />
            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{item.location}sdsdasdadddas</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <CustomButton
              title="Register"
              align="right"
              // onPress={handleSendOtp}
              style={{ padding: wp('1.4'), backgroundColor: Colors.black, borderRadius: wp('1') }}
              textstyle={{  fontSize: wp("3.9%") }}
            />
          </View>
        </View>
      </View>
    );
  };
  const WorkShopCard = ({ item }) => {
    return (
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: item.image }} style={styles.headerImage} />
        </View>

        {/* Content Section */}
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>

        {/* Date and Time */}
        <View style={styles.infoRow}>
          <Text style={styles.date}>{item.offerprice} Rs</Text>
          <MaterialIcons name="local-offer" size={16} color="black" />
          <Text style={[styles.time, { textDecorationLine: 'line-through', fontWeight: 'bold' }]}>
            {item.price} Rs
          </Text>
        </View>

        {/* Location */}
        <View style={[styles.infoRow, { justifyContent: "space-between" }]}>
          <View style={[styles.infoRow, { backgroundColor: "#E2E2E2", padding: wp('1.3'), borderRadius: wp('4') ,width: wp("45"),}]}>
            <FontAwesome name="user" size={22} color="#8C8C8C" />
            <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail"><Text style={{ fontWeight: "bold", fontSize: wp('3.6') }}>{item.joinmembers}</Text> Members Joined</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <CustomButton
              title="Register"
              align="right"
              // onPress={handleSendOtp}
              style={{ padding: wp('1.4'), backgroundColor: Colors.black, borderRadius: wp('1') }}
              textstyle={{ fontSize: wp("3.9%") }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <GradientContainer style={styles.maincontainer}>
      <ScrollView>
      <View style={{ marginTop: Platform.OS === 'ios' ? hp("7%") : hp("2%"), marginBottom:hp("2%")}}>
        <ScreenHeader headername={"EVENTS"} />
        </View>
        <View style={styles.bannerContainer}>
          <CarouselComponent data={data} renderItem={renderItem} />
        </View>
        <View style={{ marginBottom: hp('2') }}>
          <ScreenHeader headername={"MEET UPS"} />
        </View>
        <View style={{ overflow: 'hidden' }}>
          <FlatList
            data={meetupData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MeetupCard item={item} />}
            removeClippedSubviews={true}
          />
          <CustomButton
            title="See More"
            align="right"
            // onPress={handleSendOtp}
            style={{ marginRight: wp('2') }}

          />
        </View>
        <View style={{ margin: hp('2') }}>
          <ScreenHeader headername={"WORKSHOP"} />
        </View>
        <View style={{ overflow: 'hidden' }}>
          <FlatList
            data={meetupData}
            horizontal
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <WorkShopCard item={item} />}
            removeClippedSubviews={true}
          />
          <CustomButton
            title="See More"
            align="right"
            // onPress={handleSendOtp}
            style={{ marginRight: wp('2') }}

          />
        </View>
        <View style={{ margin: hp('2') }}>
          <ScreenHeader headername={"EARN REWARDS"} />
        </View>
        <View style={styles.ImageCard}>
          <Image
            // source={{ uri: "https://i.pinimg.com/736x/06/16/32/061632d4efe20eb88834e335ccbee1e9.jpg" }}
            source={require('../../../assets/icons/Banner.png')}
            style={styles.CardImage}
            resizeMode="contain" // You can change to "contain" or "stretch" if needed
          />
        </View>
      </ScrollView>
    </GradientContainer>
  )
}

export default memo(Home)

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
    width: wp("70%"),
    backgroundColor: '#fff',
    borderRadius: wp("2%"),
    padding: wp("1.5%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
    // alignItems: 'center',
    marginBottom: wp("2%"),
    margin: wp("1%"),
  },
  header: {
    alignItems: 'center',
  },
  headerImage: {
    width: wp("67%"),
    height: hp("14%"),
    resizeMode: 'cover',
    borderRadius: wp("2%"),
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'left',
    color: Colors.black
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp("1%"),
    elevation: 3
  },
  date: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: wp("2.5%"),
  },
  time: {
    marginLeft: wp("1%"),
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
    height: hp("38%"),
    borderRadius: wp("3%"),



  },

})