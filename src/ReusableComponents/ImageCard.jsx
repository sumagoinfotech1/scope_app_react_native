import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const ImageCard = ({ imageUrl, style, imageStyle, resizeMode = "cover" }) => {
  return (
    <View style={[styles.imageCard, style]}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.cardImage, imageStyle]}
        resizeMode={resizeMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageCard: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp("5%"),
    alignSelf: "center",
    marginBottom: wp("3.9%"),
    backgroundColor: "#f0f0f0", // Fallback background color
    overflow: "hidden",
    width: wp("91%"),
  },
  cardImage: {
    width: wp("91%"),
    height: hp("22%"),
    borderRadius: wp("5%"),
    // marginVertical: wp("2%"),
  },
});

export default ImageCard;
