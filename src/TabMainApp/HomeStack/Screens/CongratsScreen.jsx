import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, Dimensions, ImageBackground, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import CustomButton from '../../../ReusableComponents/CustomButton';
import Colors from '../../../ReusableComponents/Colors';

const { width } = Dimensions.get('window');

const transactions = [
    { id: '1', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
    { id: '2', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
];

const CongratsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <ImageBackground source={require('../../../assets/icons/congratsback.png')} style={styles.headerContainer}>
                <View style={{ top: wp('8') }}>
                    <MainAppScreenHeader
                        headername={'Congratulation!!.'}
                        fontFamily={Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive'}
                        fontSize={wp('12')} />
                </View>
                <View style={styles.header}>
                    <Image source={require('../../../assets/icons/RefereEarnCoin.png')} style={styles.coinIcon} />
                    <Text style={styles.rewardText}>
                        You earned
                    </Text>
                    <Text style={styles.points}>
                        6000 Points
                    </Text>
                    <Text style={styles.rewardText}>
                        by attending the meetup.
                    </Text>
                </View>
            </ImageBackground>
            <View style={{ marginTop: hp('7') }}>
                <Text style={styles.rewardText1}>
                    keep earning reward something exciting awaiting for you
                </Text>
            </View>
            <View>
                <CustomButton
                    title="Explore"
                    align="center"
                    style={styles.registerButton}
                    textstyle={styles.registerText}
                // onPress={() => setModalVisible(true)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        // backgroundColor: 'yellow',
        // borderBottomLeftRadius: 90,
        // borderBottomRightRadius: 90,
        paddingBottom: wp('1%'),
        width: wp("100%"),
        height: wp("120%"),
        justifyContent: "center",
        // resizeMode:'center'

    },
    header: {
        alignItems: 'center',
        paddingTop: wp('10%'),
        resizeMode: 'contain'
    },
    coinIcon: {
        width: wp('42%'),
        height: wp('42%'),
        marginBottom: wp('2%'),
    },
    points: {
        fontSize: wp('9%'),
        fontWeight: 'bold',
        color: 'white',
    },
    pointsText: {
        fontSize: wp('4.5%'),
        color: 'white',
        elevation: 10
    },
    rewardText: {
        color: 'white',
        textAlign: 'center',

        fontSize: wp('4%'),
    },
    rewardText1: {
        color: '#000',
        textAlign: 'center',
        fontSize: wp('5.5%'),
        fontWeight: 'bold',
        width: wp('80%'),
        alignSelf: 'center'
    },
    listContainer: {
        paddingHorizontal: wp('5%'),
        paddingTop: wp('5%'),
    },
    transactionCard: {
        backgroundColor: 'white',
        padding: wp('4%'),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: wp('3%'),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1
    },
    transactionContent: {
        flex: 1,

    },
    transactionTitle: {
        fontSize: wp('3.5%'),
        fontWeight: 'bold',
        color: '#000',
        width: wp('55')
    },
    transactionTime: {
        fontSize: wp('3.5%'),
        color: 'gray',
        marginTop: 3,
    },
    transactionPoints: {
        color: '#FFA500',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
    registerButton: {
        padding: wp("2.6%"),
        backgroundColor: Colors.black,
        borderRadius: wp("3%"),
        // width: "100%",
        marginTop: wp("5%"),
        paddingHorizontal: wp("7%"),
    },
    registerText: {
        fontSize: wp("4%"),
        color: Colors.white,
        textAlign: "center",
    },
});

export default CongratsScreen;

// import React from 'react';
// import { View, FlatList, StyleSheet, Text, Image, Dimensions, ImageBackground, Platform } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// import CustomButton from '../../../ReusableComponents/CustomButton';
// import Colors from '../../../ReusableComponents/Colors';
// import FastImage from "react-native-fast-image";
// const { width } = Dimensions.get('window');

// const transactions = [
//     { id: '1', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
//     { id: '2', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
// ];

// const CongratsScreen = () => {
//     return (
//         <View style={styles.container}>
//             {/* Header Section */}
//             <ImageBackground source={require('../../../assets/icons/congratsback.png')} style={styles.headerContainer}>
//                 <View style={{ top: wp('8') }}>
//                     <MainAppScreenHeader
//                         headername={'Congratulation!!.'}
//                         fontFamily={Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive'}
//                         fontSize={wp('12')} />
//                 </View>
//                 <View style={styles.header}>
//                     <FastImage source={require('../../../assets/gif/coin.gif')} style={styles.coinIcon} />
//                     <Text style={styles.rewardText}>
//                         You earned
//                     </Text>
//                     <Text style={styles.points}>
//                         6000 Points
//                     </Text>
//                     <Text style={styles.rewardText}>
//                         by attending the meetup.
//                     </Text>
//                 </View>
//             </ImageBackground>
//             <View style={{ marginTop: hp('7') }}>
//                 <Text style={styles.rewardText1}>
//                     keep earning reward something exciting awaiting for you
//                 </Text>
//             </View>
//             <View>
//                 <CustomButton
//                     title="Explore"
//                     align="center"
//                     style={styles.registerButton}
//                     textstyle={styles.registerText}
//                 // onPress={() => setModalVisible(true)}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     headerContainer: {
//         // backgroundColor: 'yellow',
//         // borderBottomLeftRadius: 90,
//         // borderBottomRightRadius: 90,
//         paddingBottom: wp('1%'),
//         width: wp("100%"),
//         height: wp("120%"),
//         justifyContent: "center",
//         // resizeMode:'center'

//     },
//     header: {
//         alignItems: 'center',
//         paddingTop: wp('10%'),
//         // resizeMode: 'contain'
//     },
//     coinIcon: {
//         width: wp('72%'),
//         height: wp('45%'),
//         // marginBottom: wp('2%'),
//         resizeMode:'cover'
//     },
//     points: {
//         fontSize: wp('9%'),
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     pointsText: {
//         fontSize: wp('4.5%'),
//         color: 'white',
//         elevation: 10
//     },
//     rewardText: {
//         color: 'white',
//         textAlign: 'center',

//         fontSize: wp('4%'),
//     },
//     rewardText1: {
//         color: '#000',
//         textAlign: 'center',
//         fontSize: wp('5.5%'),
//         fontWeight: 'bold',
//         width: wp('80%'),
//         alignSelf: 'center'
//     },
//     listContainer: {
//         paddingHorizontal: wp('5%'),
//         paddingTop: wp('5%'),
//     },
//     transactionCard: {
//         backgroundColor: 'white',
//         padding: wp('4%'),
//         borderRadius: 15,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         marginBottom: wp('3%'),
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//         borderWidth: 1
//     },
//     transactionContent: {
//         flex: 1,

//     },
//     transactionTitle: {
//         fontSize: wp('3.5%'),
//         fontWeight: 'bold',
//         color: '#000',
//         width: wp('55')
//     },
//     transactionTime: {
//         fontSize: wp('3.5%'),
//         color: 'gray',
//         marginTop: 3,
//     },
//     transactionPoints: {
//         color: '#FFA500',
//         fontSize: wp('4.5%'),
//         fontWeight: 'bold',
//     },
//     registerButton: {
//         padding: wp("2.6%"),
//         backgroundColor: Colors.black,
//         borderRadius: wp("3%"),
//         // width: "100%",
//         marginTop: wp("5%"),
//         paddingHorizontal: wp("7%"),
//     },
//     registerText: {
//         fontSize: wp("4%"),
//         color: Colors.white,
//         textAlign: "center",
//     },
// });

// export default CongratsScreen;
