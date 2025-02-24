import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../ReusableComponents/Colors"; // Replace with your Colors file

const VerifyEmailModal = ({ isVisible, onClose, onConfirm }) => {
  const [email, setEmail] = useState("");

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Verify Email</Text>

          <TextInput
            style={styles.input}
            placeholder="Name@Gmail.Com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.noButtonText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yesButton} onPress={onConfirm}>
              <Text style={styles.yesButtonText}>Yes</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "#fff",
    borderRadius: wp("3%"),
    padding: wp("5%"),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 10,
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("2%"),
    color:'black'
  },
  input: {
    width: "100%",
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    fontSize: wp("4%"),
    marginBottom: hp("3%"),
    textAlign: "center",
    color:'black'
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  noButton: {
    flex: 1,
    backgroundColor: "#E0E0E0",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
    marginRight: wp("2%"),
  },
  yesButton: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: hp("1.5%"),
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  noButtonText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#333",
  },
  yesButtonText: {
    fontSize: wp("4%"),
    fontWeight: "bold",
    color: "#fff",
  },
});

export default VerifyEmailModal;
