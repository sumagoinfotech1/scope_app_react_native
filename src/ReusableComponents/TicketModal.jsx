import React, { useEffect, useState } from "react";
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // Import icons
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import Colors from "./Colors";
import { formatTime } from "../utils/timeUtils";
const { width } = Dimensions.get("window");

const TicketModal = ({ visible, onClose, item, setTicketModal }) => {
  const [showFirstComponent, setShowFirstComponent] = useState(true);

  const navigation = useNavigation();
  const formatDate = (dateString) => {
    const months = [
      "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = String(date.getFullYear()).slice(-2);

    return `${day} ${month} ${year}`;
  };
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setShowFirstComponent(false);
      }, 7000); // 5 seconds

      return () => clearTimeout(timer); // Cleanup timeout to avoid memory leaks
    }
  }, [visible]);
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.ticketContainer}>
          {/* Top Image Section */}
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.image }} style={styles.imageSection} />

          </View>

          {/* Cutout Effect */}
          <View style={styles.cutoutWrapper}>
            <View style={styles.cutoutLeft} /><Text style={{ fontSize: wp('8'), fontWeight: 'bold', color: '#ccc' }}>- - - - - - - - - - - - - - - - </Text>
            {/* <View style={styles.separator} /> */}
            <View style={styles.cutoutRight} />
          </View>

          {/* Registration Message */} 
          <View style={styles.content}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Successfully Done</Text>

            {/* Gift Icon */}

            {showFirstComponent ?
              <FastImage source={require("../assets/gif/Love.gif")} style={styles.giftIcon} /> : <View style={{ margin: wp('5'), alignItems: "center" }}>
                <Text style={{ fontSize: wp('5'), color: '#000', fontWeight: 'bold' }}>On Visual Elements</Text>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={{ fontSize: wp('3.4'), color: '#c94f69', fontWeight: 'bold', marginRight: wp('4') }}>{formatDate(item.to_date)}</Text>
                  <Text style={{ fontSize: wp('3.4'), color: '#c94f69', fontWeight: 'bold', marginRight: wp('4') }}>{formatTime(item.from_time)}</Text>
                </View>
                <CustomButton
                  title="Explore More"
                  align="center"
                  style={{ padding: wp('2.5'), backgroundColor: Colors.black, marginHorizontal: wp('7'), marginVertical: wp('2'), width: wp('35') }}
                  textstyle={{ fontSize: wp("4%") }}
                  onPress={() => { onClose, navigation.navigate('Home') }}
                />
              </View>}

          </View>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="closecircle" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    // padding: wp('10')
  },
  ticketContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: width * 0.9,
    overflow: "hidden",
    alignItems: "center",
    // height: hp('50%')
   
    
  },
  imageSection: {
    width: wp("80%"),
    height: wp("45%"),
    borderRadius: 10,
    resizeMode: 'cover',
    elevation: 10,
    // margin:wp('10')
    // backgroundColor: "red"
  },
  cutoutWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  cutoutLeft: {
    width: wp('11'),
    height: wp('11'),
    borderRadius: wp('10'),
    backgroundColor: "rgba(0,0,0,0.5)",
    marginLeft: -wp('7'),
  },
  separator: {
    flex: 1,
    borderBottomWidth: 4,
    borderColor: "#ccc",
    borderStyle: "dashed",
  },
  cutoutRight: {
    width: wp('11'),
    height: wp('11'),
    borderRadius: wp('10'),
    backgroundColor: "rgba(0,0,0,0.5)",
    marginRight: -wp('7'),
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: wp('10'),
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: wp('5'),
    color: "#000",
    marginTop: 5,
  },
  giftIcon: {
    width: wp('95'),
    height: wp('50'),
    // marginTop:wp('1'),
    // resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  imageContainer: {
    alignItems: "center",
    elevation: 7,
    backgroundColor: "#ffff",
    borderRadius: 10,
    margin: wp('3'),
    //  backgroundColor:"yellow"

  },
});

export default TicketModal;
