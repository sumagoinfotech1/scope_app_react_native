import React from "react";
import { View, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const GradientContainer = ({ colors = ["#F3B2B2", "#FFFF"], style, children }) => {
  return (
    <LinearGradient colors={colors} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // borderRadius: 10,
  },
});

export default GradientContainer;
