import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const VerifyEmailModal = ({ isVisible, onClose, onConfirm, error="gfghf" , errorOccure  }) => {
  const [email, setEmail] = useState("");



  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <MaterialCommunityIcons name="email-check" size={wp("7%")} color="#000" />
            <Text style={styles.title}>Verify Email</Text>
          </View>

          <Text style={styles.text}>To complete your registration, please verify your email address</Text>

          <TextInput
            style={styles.input}
            placeholder="youremail@gmail.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            cursorColor={'#000'}
          />
          {errorOccure===true ? <View style={styles.errorcontainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View> : null}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.noButton} onPress={onClose}>
              <Text style={styles.noButtonText}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.yesButton} onPress={() => onConfirm(email)}>
              <Text style={styles.yesButtonText}>SUBMIT</Text>
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
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 10,
    justifyContent: "center"
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
    color: 'black',
    marginLeft: wp("2%"),
  },
  text: {
    fontSize: wp("4%"),
    fontWeight: "400",
    marginBottom: hp("1%"),
    color: '#A1A1A1'
  },
  input: {
    width: "100%",
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp("2%"),
    paddingHorizontal: wp("3%"),
    fontSize: wp("4%"),
    // marginBottom: hp("1%"),
    textAlign: "left",
    color: 'black',

  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: hp("1%"),
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("0.3%"),
    alignItems: ""
  },
  errorcontainer: {
    alignItems: "center",
    justifyContent: 'center',
    // marginBottom: wp('1'),
    // alignSelf:"center"
  },
  errorText: {
    color: 'red',
    fontSize: wp('3.5')
  }
});

export default VerifyEmailModal;
