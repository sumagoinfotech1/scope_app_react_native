import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
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

const ReferalScreen = () => {

    // const [ticketmodalVisible, setTicketModalVisible] = useState(false);
    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        showToast('info', 'Copied');
    };
    const [loading, setLoading] = useState(true);
    const [referralCode, setReferralCode] = useState("");
    console.log(referralCode,referralCode);
    
//     useEffect(() => {
//         createUserReferral();
//       }, []);
// const createUserReferral = async () => {
//   try {
//     setLoading(true);

//     // Get user ID from AsyncStorage
//     const userId = await AsyncStorage.getItem("User_id");

//     if (!userId) {
//       throw new Error("User ID is required");
//     }
//     console.log(userId, 'viva');

//     // API Request to Create Referral
//     const response = await api.post(`user-referral/create/${userId}`);
//     console.log('response', response);

//     // ✅ Success Case: If result === true
//     if (response.data?.result === true) {
//       setReferralCode(response.data.data.referral_code);
//       showToast("success", "Success", response.data.message);
//     } 
//     // ❌ Failure Case: If result === false
//     else if (response.data?.result === false) {
//       showToast("error", "Error", response.data.message || "Referral creation failed");
//       console.log('////',response.data.message );
      
//     } 
//     // ❌ Handle unexpected responses
//     else {
//       throw new Error("Unexpected response from server");
//     }
//   } catch (error) {
//     console.error("❌ Error creating referral:", error);
//     showToast("error", "Error", error.response?.data?.message || error.message || "Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

      
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


            <CustomButton
                title="Refer To Friends"
                align="right"
                // onPress={()=>setTicketModalVisible(true)}
                style={{ padding: wp('2.8'), backgroundColor: Colors.black, marginHorizontal: wp('7'), marginVertical: wp('4') }}
                textstyle={{ fontSize: wp("4.2%") }}
            />
            <Loader visible={loading}/>
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

    bulletPoint: { flexDirection: 'row', alignItems: 'center', marginBottom: hp('1%') },

    descriptionText: { fontSize: wp('4%'), color: 'black', marginLeft: wp('2%') },

    referralBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, paddingHorizontal: wp('5%'), width: '85%', height: hp('6%'), marginTop: hp('3%'), elevation: 5 },

    referralInput: { flex: 1, fontSize: wp('4%'), fontWeight: 'bold', color: 'black' },

    copyButton: { padding: wp('2%') },

    referButton: { backgroundColor: 'black', paddingVertical: hp('1.5%'), paddingHorizontal: wp('10%'), borderRadius: 10, marginTop: hp('3%') },

    referButtonText: { color: 'white', fontSize: wp('4.5%'), fontWeight: 'bold' },
    icon: {
        fontWeight: "bold",
        fontSize: wp('3'),
        borderWidth: 4,
        borderRadius: 20,
        borderColor: Colors.background,
        padding: 4
    },
});
