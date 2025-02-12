import React, { useState,memo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Pagination from 'react-native-snap-carousel/src/pagination/Pagination';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ColorSpace } from 'react-native-reanimated';
import Colors from './Colors';
const { width } = Dimensions.get('window');

const CarouselComponent = ({ data, renderItem ,height= hp("25%"),}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <View style={[styles.container,{height}]}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width * 0.8}
                loop
                autoplay
                autoplayInterval={3000}
                onSnapToItem={(index) => setActiveIndex(index)}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
            />
            <Pagination
                dotsLength={data.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.activeDot}
                inactiveDotStyle={styles.inactiveDot}
                inactiveDotOpacity={0.8}
                inactiveDotScale={1}
                dotContainerStyle={{ marginHorizontal: wp('0.3') }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: hp("2"),
        // width: hp("100%"),
        
      


    },
    paginationContainer: {
        paddingVertical: 5,

    },
    activeDot: {
        width: hp("3"),
        height: hp("3"),
        borderRadius: hp("2"),
        // marginHorizontal: 0,
        // Attractive color
        backgroundColor: '#d3d3d3',

    },
    inactiveDot: {
        width: hp("2.3"),
        height: hp("2.3"),
        borderRadius: hp("2"),
        margin: hp("0"),
        backgroundColor: Colors.white,

    },
});

export default memo(CarouselComponent);
