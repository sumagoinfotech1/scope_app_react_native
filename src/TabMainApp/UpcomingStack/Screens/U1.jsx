import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { memo,useState } from 'react'
import ScreenHeader from '../../../ReusableComponents/ScreenHeader'
import GradientContainer from '../../../ReusableComponents/GradientContainer'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../../../ReusableComponents/Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CustomButton from '../../../ReusableComponents/CustomButton';

const DATA = [
  {
    id: '1',
    title: 'Visual Elements Of User Interface Design',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '2',
    title: 'User Interface Design',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '3',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '4',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '5',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '6',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '7',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
  {
    id: '8',
    title: 'Project Management',
    date: 'Wed, 1 Feb 2025',
    image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg', // Replace with actual image URL
  },
];
const U1 = () => {
  const [bannerImage, setBannerImage] = useState(true);
  const CardItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      {/* Left side - Image */}
      <Image source={{ uri: item.image }} style={styles.image} />
      
      {/* Middle Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
  
      {/* Right side - Arrow */}
      <TouchableOpacity style={styles.arrowButton}>
        <Icon name="arrow-right" size={24} color="#999" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  const ImageCard = () => (
    <View style={styles.ImageCard}>
      <Image
        source={{ uri: "https://i.pinimg.com/736x/06/16/32/061632d4efe20eb88834e335ccbee1e9.jpg" }}
        style={styles.CardImage}
        resizeMode="cover"
      />
    </View>
  );
  return (
    <GradientContainer style={styles.maincontainer}>
  
    <View style={{ marginTop: Platform.OS === 'ios' ? hp("7%") : hp("2%"), marginBottom:hp("2%")}}>
        <ScreenHeader headername={"UPCOMING EVENTS"} />
      </View>
      
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View>
            <CardItem item={item} />
            {/* Show ImageCard only once after the third card */}
            {index === 2 && bannerImage && <ImageCard />}
          </View>
        )}
      />

  </GradientContainer>
  )
}

export default memo(U1)

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    
  },
 
  card: {
    // width:"100%",
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: wp("5%"),
    padding: wp("3%"),
    marginHorizontal: wp("3%"),
    marginBottom: wp("3%"),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth:1,
    borderColor:"#B2B2B2",
    overflow: 'hidden'
  },
  image: {
    width: wp("20%"),
    height: wp("21%"),
    borderRadius: wp("10%"),
    elevation:10
  },
  textContainer: {
    flex: 1,
    marginLeft: wp("3.4%"),
  },
  title: {
    fontSize: wp("5 %"),
    fontWeight: 'bold',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  arrowButton: {
    padding: wp("3%"),
    borderRadius: wp("7%"),
    backgroundColor: '#F1F1F1',
  },
  ImageCard: {
    alignItems: "center",
    justifyContent: "center",
 
    borderRadius: wp("5%"),
    alignSelf: "center",
    marginBottom: wp("3.9%"),
  
  },
  CardImage: {
    width: wp("96%"),
    height: hp("22%"),
    borderRadius: wp("5%"),
    marginVertical:wp("2%")




  },

})