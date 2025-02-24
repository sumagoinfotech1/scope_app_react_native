import { StyleSheet, Text, View, Image, ImageBackground ,FlatList} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import ScreenHeader from '../../../ReusableComponents/ScreenHeader';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import GradientContainer from '../../../ReusableComponents/GradientContainer';
import MeetAndWorkCard from '../../../ReusableComponents/MeetAndWorkCard';
const meetupData = [
    { id: '1', title: 'Visual Elements Of User Interface Design', date: '04 Feb 25', time: '02:40 PM', location: 'Govind Nagar Nashik', image: 'https://i.pinimg.com/736x/02/d9/78/02d9787575ca3e942ba0223e6e6eaaaf.jpg', price: '600', offerprice: '300', joinmembers: "400" },
    { id: '2', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/50/35/57/503557d678025e87d3c017dd6a9fba14.jpg', price: '600', offerprice: '300', joinmembers: "400" },
    { id: '3', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/f7/8c/ef/f78cef0dd20b57db43cc6c93cc4e7303.jpg', price: '600', offerprice: '300', joinmembers: "400" },
    { id: '4', title: 'Advanced UX Strategies', date: '10 Mar 25', time: '03:00 PM', location: 'Downtown Mumbai', image: 'https://i.pinimg.com/736x/a5/77/4c/a5774cfed2b9a6bbc14ffea6148b7fb9.jpg', price: '600', offerprice: '300', joinmembers: "400" },
];
const MeetUpsScreen = ({navigation}) => {
    const gotodetails=()=>{
        navigation.navigate('MeetUpsDetails')
            }
    return (
        <GradientContainer style={styles.mainContainer}>
            <ImageBackground source={require('../../../assets/icons/image.png')} style={styles.imageContainer} resizeMode='cover'>
                <MainAppScreenHeader headername={"MEETUPS"} />
            </ImageBackground>
            <View >
                <FlatList
                    data={meetupData}
                    keyExtractor={(item) => item.id} // Unique key for each item
                    renderItem={({ item }) => <MeetAndWorkCard item={item}  onpress={()=>gotodetails()} />}
                    contentContainerStyle={{ paddingBottom:hp('15')}} // Optional styling
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </GradientContainer>
    )
}

export default MeetUpsScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start'
    },
    imageContainer: {
        backgroundColor: "red",
        width: wp('100%'),
        alignItems: "center",
        height: hp('15'),
        justifyContent: "center",

    }
})