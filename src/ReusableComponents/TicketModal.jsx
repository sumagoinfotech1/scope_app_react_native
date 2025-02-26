import React, { useEffect, useState } from "react";
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign"; // Import icons
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
import CustomButton from "./CustomButton";
import { useNavigation } from "@react-navigation/native";
import Colors from "./Colors";
const { width } = Dimensions.get("window");

const TicketModal = ({ visible, onClose }) => {
  const [showFirstComponent, setShowFirstComponent] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstComponent(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); // Cleanup timeout to avoid memory leaks
  }, []);
  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.ticketContainer}>
          {/* Top Image Section */}
          <View style={{
            alignItems: 'center',
            justifyContent: "center",
            height: wp('60'),
            // width: "100%",

          }}>
            <Image source={require("../assets/icons/Banner.png")} style={styles.imageSection} />

          </View>

          {/* Cutout Effect */}
          <View style={styles.cutoutWrapper}>
            <View style={styles.cutoutLeft} /><Text style={{ fontSize: wp('8'), fontWeight: 'bold', color: '#ccc' }}> - - - - - - - - - - - - - - - </Text>
            {/* <View style={styles.separator} /> */}
            <View style={styles.cutoutRight} />
          </View>

          {/* Registration Message */}
          <View style={styles.content}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Successfully Done</Text>

            {/* Gift Icon */}
            
            {showFirstComponent?
          <FastImage source={require("../assets/gif/Love.gif")} style={styles.giftIcon} />: <View style={{margin:wp('5'),alignItems:"center"}}>
          <Text style={{ fontSize: wp('5'), color: '#000', fontWeight: 'bold' }}>On Visual Elements</Text>
          <View style={{ flexDirection: 'row', }}>
            <Text style={{ fontSize: wp('3.4'), color: 'red', fontWeight: 'bold', marginRight: wp('4') }}>04 Feb 25</Text>
            <Text style={{ fontSize: wp('3.4'), color: '#000', }}>02:40pm</Text>
          </View>
          <CustomButton
            title="Explore More"
            align="center"
            style={{ padding: wp('2.5'), backgroundColor: Colors.black, marginHorizontal: wp('7'), marginVertical: wp('2'), width:wp('35')}}
            textstyle={{ fontSize: wp("4%") }}
            // onPress={() => navigation.navigate('Home')}
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
    width: wp('95%'),
    height: hp('25'),
    resizeMode: "contain",
    backgroundColor: "#fff",
    // margin:wp('10')

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
});

export default TicketModal;
