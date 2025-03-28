


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Alert, Share } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import Colors from '../../../ReusableComponents/Colors';
import CustomButton from '../../../ReusableComponents/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { showToast } from '../../../utils/toastService';
import TicketModal from '../../../ReusableComponents/TicketModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import FontAwesome from "react-native-vector-icons/FontAwesome";
const ReferalScreen = () => {

  // const [ticketmodalVisible, setTicketModalVisible] = useState(false);
  const copyToClipboard = () => {
    Clipboard.setString(referralCode);
    showToast('info', "",'Copied');
  };
  const [loading, setLoading] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [userId, setUserid] = useState("");
  console.log(referralCode, referralCode);


  useEffect(() => {
    const fetchUserIdAndCreateReferral = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('User_id');
        if (storedUserId) {
          handleCreateReferral(storedUserId);
          setUserid(storedUserId)
        } else {
          showToast('error', 'User ID Missing', 'No user ID found in storage');
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserIdAndCreateReferral();
  }, []);
  const handleCreateReferral = async (userId) => {
    setErrorOccured(false);
    setLoading(true);

    try {
      const response = await api.post(`user-referral/create/${userId}`);

      console.log("Response:", response.data);

      if (response.data.result === true) {
        // showToast('success', 'Referral Created', 'Referral created successfully');
        setReferralCode(response.data.data.referral_code)
      } else {
        setErrorOccured(true);
        setError(response.data.message || "Failed to create referral");
        showToast('error', 'Referral Failed', response.data.message || "Failed to create referral");
      }
    } catch (error) {
      setErrorOccured(true);

      if (error.response) {
        console.log("Error Response:", error.response);

        if (error.response.status === 400 && error.response.data.result === false) {
          fetchUserReferral(userId)

        } else {
          setError(error.response.data?.message || "Error creating referral");
          showToast('error', 'Error', error.response.data?.message || "Error creating referral");
        }
      } else {
        setError("Network error. Please check your connection.");
        showToast('error', 'Network Error', "Please check your internet connection.");
      }
    }

    setLoading(false);
  };
  const fetchUserReferral = async (userId) => {

    try {


      const response = await api.get(`user-referral/user?id=${userId}`);

      console.log("ResponseFetch:", response.data.data[0].referral_code);

      if (response.status === 200) {
        // showToast('success', 'Referral Data Loaded', 'Referral details retrieved successfully');
        setReferralCode(response.data.data[0].referral_code)
        return response.data;
      } else {
        showToast('error', 'Error', 'Failed to fetch referral data');
        return null;
      }
    } catch (error) {
      if (error.response) {
        console.log("Error Responseee:", error.response);

        if (error.response.status === 400) {
          showToast('error', 'Bad Request', "Invalid request. Please check your data.");
        } else {
          showToast('error', 'Error', error.response.data?.message || "Error fetching referral data");
        }
      } else {
        showToast('error', 'Network Error', "Please check your internet connection.");
      }
      return null;
    }
  };

  const shareReferralLink = async () => {
    try {

      //   // Construct the referral link dynamically
      //   const referralLink = `https://yourapp.com/signup?referralCode=${userId}`;
      const referralLink = `https://website.sumagotraining.in/`;
      // Share the referral message
      const result = await Share.share({
        message: `🚀 Join our amazing app and earn rewards! 🎉\n\nUse my referral code: *${referralCode}* to sign up.\n\nClick here to join: ${referralLink}`,
      });

      if (result.action === Share.sharedAction) {
        showToast('success', 'Shared Successfully', 'Your referral link has been shared.');
      } else if (result.action === Share.dismissedAction) {
        showToast('info', 'Share Cancelled', 'You cancelled sharing.');
      }
    } catch (error) {
      console.error("Error sharing referral link:", error);
      showToast('error', 'Error', 'Failed to share referral link.');
    }
  };
  return (
    <View style={styles.container}>
      {/* Back Button */}
      {/* <TouchableOpacity style={styles.backButton}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
            </TouchableOpacity> */}

      {/* Heading */}
      {/* <Text style={styles.heading}>Refer & Earn Coins</Text> */}
      <View style={{ marginVertical: hp('1') }}>
        <MainAppScreenHeader headername={"Refer & Earn Coins"} color={'#000'} />
      </View>
      {/* Coin Section with Background */}
      <View style={styles.coinContainer}>
        <ImageBackground
          source={require('../../../assets/icons/ReferBack.png')} // Replace with your local background image
          style={styles.coinBackground}
          resizeMode="contain"
        >
          <Image
            source={require('../../../assets/icons/RefereEarnCoin.png')} // Replace with your local coin image
            style={styles.coinImage}
          />
        </ImageBackground>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <View style={styles.bulletPoint}>
          <View style={styles.icon} />
          <Text style={styles.descriptionText}> Share Code With Your Peers</Text>
        </View>
        <View style={styles.bulletPoint}>
          <View style={styles.icon} />
          <Text style={styles.descriptionText}> You And Your Peer Earn 20 Coins After Every Sign Up</Text>
        </View>
      </View>

      {/* Referral Code Box */}
      <View style={styles.referralBox}>
        <TextInput value={referralCode} style={styles.referralInput} editable={false} />
        <TouchableOpacity style={styles.copyButton} onPress={() => copyToClipboard()}>
          <FontAwesome5 name="copy" size={18} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Refer Button */}
      <TouchableOpacity style={styles.yesButton} onPress={() => shareReferralLink()}>
        <View style={{left:wp('1'), zIndex: 100 }}>
          <FontAwesome name="share" size={20} color="#fff" />
        </View>

        <View>
          <Text style={styles.yesButtonText}>Refer To Friends</Text>
        </View>

      </TouchableOpacity>

      {/* <CustomButton
        title=" Refer To Friends"
        align="right"
        onPress={() => shareReferralLink()}
        style={{ padding: wp('2.8'), backgroundColor: Colors.black, marginHorizontal: wp('7'), marginVertical: wp('4'), alignSelf: 'right' }}
        textstyle={{ fontSize: wp("4.2%") }}
      /> */}
      <Loader visible={loading} />
      {/* <TicketModal visible={ticketmodalVisible} onClose={() => setTicketModalVisible(false)} /> */}
    </View>
  );
};

export default ReferalScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', alignItems: 'center', paddingTop: hp('5%') },

  backButton: { position: 'absolute', top: hp('3%'), left: wp('5%') },

  heading: { fontSize: wp('6%'), fontWeight: 'bold', marginTop: hp('2%'), color: 'black' },

  coinContainer: { marginTop: hp('2%'), width: wp('55%'), height: wp('55%'), alignItems: 'center', justifyContent: 'center', elevation: 10 },

  coinBackground: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },

  coinImage: { width: wp('50%'), height: wp('50%') },

  descriptionContainer: { marginTop: hp('3%'), paddingHorizontal: wp('5%'), width: '90%' },

  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Keeps bullet aligned with the first line
    marginBottom: hp('1%'),
  },
  icon: {
    borderWidth: 4,
    borderRadius: 20,
    borderColor: Colors.background,
    padding: 4,
    marginTop: 2, // Adjust bullet alignment slightly
  },
  descriptionText: {
    fontSize: wp('4%'),
    color: 'black',
    marginLeft: wp('2%'),
    flexShrink: 1, // Ensures text wraps properly without pushing the bullet down
  },

  referralBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: wp('5%'), width: '85%', height: hp('6%'), marginTop: hp('3%'), elevation: 5 },

  referralInput: { flex: 1, fontSize: wp('4%'), fontWeight: 'bold', color: 'black' },

  copyButton: { padding: wp('2%') },

  referButton: { backgroundColor: 'black', paddingVertical: hp('1.5%'), paddingHorizontal: wp('10%'), borderRadius: 10, marginTop: hp('3%') },

  referButtonText: { color: 'white', fontSize: wp('4.5%'), fontWeight: 'bold' },
  // icon: {
  //   fontWeight: "bold",
  //   fontSize: wp('3'),
  //   borderWidth: 4,
  //   borderRadius: 20,
  //   borderColor: Colors.background,
  //   padding: 4
  // },
  yesButton: {
    backgroundColor: "#000",
    paddingVertical: hp("0.8%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    flexDirection: "row",
    width: wp('41'),
    justifyContent: "space-evenly",
    marginTop: wp("8%"),
    alignSelf:"flex-end",
    right:wp('7'),

  },
  yesButtonText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#fff",
    margin:wp('1')
  },
});