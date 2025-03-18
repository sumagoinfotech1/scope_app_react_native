import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const LogModel = ({ isVisible, onClose, onConfirm }) => {
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Logout Icon */}
          <Icon name="logout" size={hp(6)} color="#ff3b30" style={styles.icon} />

          {/* Title */}
          <Text style={styles.title}>Log Out</Text>

          {/* Description */}
          <Text style={styles.description}>
            Are you sure you want to log out from your account?
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={onConfirm}>
              <Icon name="check-circle-outline" size={hp(2.5)} color="#fff" />
              <Text style={styles.logoutText}> Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Icon name="close-circle-outline" size={hp(2.5)} color="#333" />
              <Text style={styles.cancelText}> Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// **Styles**
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: wp(75),
    backgroundColor: "#fff",
    borderRadius: hp(1.5),
    padding: hp(2),
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  icon: {
    marginBottom: hp(1.2),
  },
  title: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: hp(0.5),
  },
  description: {
    fontSize: hp(1.9),
    color: "#666",
    textAlign: "center",
    marginBottom: hp(2),
    paddingHorizontal: wp(5),
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: hp(1),
  },
  logoutButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#000",
    paddingVertical: hp(1),
    borderRadius: hp(1),
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2),
    height: wp('10')
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: hp(1.9),
    marginLeft: wp(1),
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    paddingVertical: hp(1),
    borderRadius: hp(1),
    alignItems: "center",
    justifyContent: "center",
    height: wp('10')
  },
  cancelText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: hp(1.9),
    marginLeft: wp(1),
  },
});

export default LogModel;
