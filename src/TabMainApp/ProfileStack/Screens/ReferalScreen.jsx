import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import Colors from '../../../ReusableComponents/Colors';
import CustomButton from '../../../ReusableComponents/CustomButton';
import Clipboard from '@react-native-clipboard/clipboard';
import { showToast } from '../../../utils/toastService';
import TicketModal from '../../../ReusableComponents/TicketModal';

const ReferalScreen = () => {
    const [referralCode] = useState('SDSGDHG');
    const [ticketmodalVisible, setTicketModalVisible] = useState(false);
    const copyToClipboard = () => {
        Clipboard.setString(referralCode);
        showToast('info', 'Copied');
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


            <CustomButton
                title="Refer To Friends"
                align="right"
                onPress={()=>setTicketModalVisible(true)}
                style={{ padding: wp('2.8'), backgroundColor: Colors.black, marginHorizontal: wp('7'), marginVertical: wp('4') }}
                textstyle={{ fontSize: wp("4.2%") }}
            />
            <TicketModal visible={ticketmodalVisible} onClose={() => setTicketModalVisible(false)} />
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
