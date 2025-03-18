import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Colors from './Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const CustomButton = ({ title, onPress, style, align = 'center',textstyle }) => {
  return (
    <View style={[styles.container, align === 'left' ? { alignItems: 'flex-start' } : align === 'right' ? { alignItems: 'flex-end' } : { alignItems: 'center' }]}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.buttonText,textstyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',  
    // marginBottom: wp("1%"), 
    // marginHorizontal:wp('3%')
    elevation: 4,
  },
  button: {
    // backgroundColor: Colors.black,
    padding: wp("2%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
   

  },
  buttonText: {
    color: '#fff',
    fontSize: wp("4%"),
    fontWeight: 'bold',
  },
});

export default CustomButton;
