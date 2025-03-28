import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal,Linking } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const VerifyLinkModal = ({ isVisible, onClose, email }) => {
    const openEmailApp = () => {
        Linking.openURL("https://mail.google.com/mail/u/0/#inbox");

      };
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header Section with Icon */}
          <View style={styles.header}>
            <MaterialIcons name="email" size={wp("7%")} color="#000" />
            <Text style={styles.title}>Email Sent! Please Verify</Text>
          </View>

          {/* Message */}
          <Text style={styles.message}>
            A verification link was sent to{" "}
            <Text style={styles.email} onPress={openEmailApp}>{email}</Text>.{"\n"}
            Check your inbox, click the link, and then try registering again.
          </Text>

          {/* OK Button */}
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp("85%"),
    backgroundColor: "#ffff",
    borderRadius: wp("3%"),
    padding: wp("5%"),
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  title: {
    fontSize: wp("5.6%"),
    fontWeight: "bold",
    color: "black",
    marginLeft: wp("2%"),
  },
  message: {
    fontSize: wp("4.2%"),
    color: "#555",
    textAlign: "left",
    marginBottom: hp("3%"),
  },
  email: {
    fontWeight: "bold",
    color: "#000",
  },
  okButton: {
    backgroundColor: "#000",
    paddingVertical: hp("1.5%"),
    paddingHorizontal: wp("10%"),
    borderRadius: wp("2%"),
    alignSelf: "center",
    // width:'100%'
  },
  okButtonText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#fff",
    textAlign:"center"
  },
});

export default VerifyLinkModal;
