import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ScreenHeader = ({headername}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>
       {headername}
      </Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    marginLeft:hp("3%"),
    marginBottom:hp("1%"),
  },
  logo: {
    fontSize: wp("6.5%"),
    fontWeight: "bold",
    color: "#000",
  },
  wise: {
    color: "#fff",
  },
  subtitle: {
    fontSize: wp("3.5%"),
    color: "#000000",
    marginBottom: hp("1%"),
  },
});

export default ScreenHeader;
