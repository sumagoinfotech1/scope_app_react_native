// import React from 'react';
// import { View, FlatList, StyleSheet, Text, Image, Dimensions } from 'react-native';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// const { width } = Dimensions.get('window');

// const transactions = [
//     { id: '1', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
//     { id: '2', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
// ];

// const RewardsScreen = () => {
//     return (
//         <View style={styles.container}>
//             {/* Header Section */}
//             <View style={styles.headerContainer}>
//                 <View style={styles.header}>
//                     <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' }} style={styles.coinIcon} />
//                     <Text style={styles.points}>
//                         6000 <Text style={styles.pointsText}>Points</Text>
//                     </Text>
//                     <Text style={styles.rewardText}>
//                         Keep Earning Reward Something{"\n"}Exciting Awaiting For You
//                     </Text>
//                 </View>
//             </View>

//             {/* Transactions List */}
//             <FlatList
//                 data={transactions}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <View style={styles.transactionCard}>
//                         <View style={styles.transactionContent}>
//                             <Text style={styles.transactionTitle}>{item.title}</Text>
//                             <Text style={styles.transactionTime}>{item.time}</Text>
//                         </View>
//                         <Text style={styles.transactionPoints}>{item.points}</Text>
//                     </View>
//                 )}
//                 contentContainerStyle={styles.listContainer}
//                 showsVerticalScrollIndicator={false}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#181818',
//     },
//     headerContainer: {
//         backgroundColor: '#222',
//         borderBottomLeftRadius: 120,
//         borderBottomRightRadius: 120,
//         paddingBottom: wp('1%'),
//         width: wp("100%"),
//         height: wp("100%"),
//         // justifyContent:"flex-end"
        
//     },
//     header: {
//         alignItems: 'center',
//         paddingTop: wp('10%'),
//     },
//     coinIcon: {
//         width: wp('12%'),
//         height: wp('12%'),
//         marginBottom: wp('2%'),
//     },
//     points: {
//         fontSize: wp('8%'),
//         fontWeight: 'bold',
//         color: 'white',
//     },
//     pointsText: {
//         fontSize: wp('4.5%'),
//         color: 'white',
//     },
//     rewardText: {
//         color: 'white',
//         textAlign: 'center',
//         marginTop: 10,
//         fontSize: wp('4%'),
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
//         alignItems: 'center',
//         marginBottom: wp('3%'),
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowRadius: 5,
//         elevation: 3,
//     },
//     transactionContent: {
//         flex: 1,
//     },
//     transactionTitle: {
//         fontSize: wp('4%'),
//         fontWeight: 'bold',
//         color: '#000',
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
// });

// export default RewardsScreen;

import React from 'react';
import { View, FlatList, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const transactions = [
    { id: '1', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
    { id: '2', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
];

// Function to calculate the curved shape
const degToRad = (deg) => (deg * Math.PI) / 180;
const screenRadius = width / 2;
const theta = degToRad(30);
const horizontalAxisLength =
    (screenRadius / Math.SQRT2) *
    Math.sqrt(1 + Math.sqrt(1 + 4 / Math.tan(theta) ** 2));

const RewardsScreen = () => {
    return (
        <View style={styles.container}>
            {/* Curved Header Section */}
            <View style={styles.ovalSection}>
                <View style={styles.headerContent}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828884.png' }} style={styles.coinIcon} />
                    <Text style={styles.points}>
                        6000 <Text style={styles.pointsText}>Points</Text>
                    </Text>
                    <Text style={styles.rewardText}>
                        Keep Earning Rewards!{"\n"}Something Exciting Awaits You
                    </Text>
                </View>
            </View>

            {/* Transactions List */}
            <FlatList
                data={transactions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.transactionCard}>
                        <View style={styles.transactionContent}>
                            <Text style={styles.transactionTitle}>{item.title}</Text>
                            <Text style={styles.transactionTime}>{item.time}</Text>
                        </View>
                        <Text style={styles.transactionPoints}>{item.points}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
    },
    ovalSection: {
        backgroundColor: '#222',
        width: horizontalAxisLength * 2,
        height: 2 * screenRadius,
        borderBottomLeftRadius: `${horizontalAxisLength}px ${screenRadius}px`,
        borderBottomRightRadius: `${horizontalAxisLength}px ${screenRadius}px`,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
        paddingTop: wp('10%'),
    },
    coinIcon: {
        width: wp('12%'),
        height: wp('12%'),
        marginBottom: wp('2%'),
    },
    points: {
        fontSize: wp('8%'),
        fontWeight: 'bold',
        color: 'white',
    },
    pointsText: {
        fontSize: wp('4.5%'),
        color: 'white',
    },
    rewardText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 10,
        fontSize: wp('4%'),
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
        alignItems: 'center',
        marginBottom: wp('3%'),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    transactionContent: {
        flex: 1,
    },
    transactionTitle: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: '#000',
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
});

export default RewardsScreen;
