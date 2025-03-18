import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const DeleteAccountModal = ({ visible, onClose, onDelete }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={{ backgroundColor: "#ffe6e6", alignItems: "center", justifyContent: "center", borderRadius: wp('9'), padding: wp('1.5'), width: wp('13'), height: wp('13') }}>
                        <Icon name="trash-can-outline" size={hp(4)} color="#e60000" style={styles.icon} />
                    </View>
                    <Text style={styles.title}>Delete Account</Text>
                    <Text style={styles.message}>
                        Are you sure you want to delete the account
                        {/* <Text style={styles.email}> products1@nicelydone.com?</Text> */}
                    </Text>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isChecked}
                            onValueChange={setIsChecked}
                            tintColors={{ true: "#e60000", false: "#ccc" }}
                        />
                        <Text style={styles.checkboxText}>I understand that I won’t be able to recover my account.</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.deleteButton, !isChecked && { opacity: 0.5 }]}
                            disabled={!isChecked}
                            onPress={onDelete}
                        >
                            <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelText}>Cancel</Text>
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: wp(85),
        backgroundColor: "#fff",
        padding: hp(2.5),
        borderRadius: hp(1.5),
        alignItems: "flex-start",
        // justifyContent: "flex-start",
    },
    icon: {
        marginBottom: hp(1),
    },
    title: {
        fontSize: hp(2.3),
        fontWeight: "bold",
        marginVertical: hp(0.5),
        color: "#000"
    },
    message: {
        fontSize: wp('4.1'),
        textAlign: "justify",
        marginBottom: hp(1),
        color: '#808080'
    },
    email: {
        fontWeight: "bold",
        color: "#333",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp(2),
    },
    checkboxText: {
        fontSize: hp(1.8),
        marginLeft: wp(2),
        flexShrink: 1,
        color: "red"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        // width: "100%",
    },
    deleteButton: {
        flex: 1,
        backgroundColor: "#ff0000",
        paddingVertical: hp(1),
        borderRadius: hp(1),
        alignItems: "center",
        marginRight: wp(2),
        height: wp('10')
    },
    deleteText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: hp(1.9),
    },
    cancelButton: {
        flex: 1,
        backgroundColor: "#ccc",
        paddingVertical: hp(1),
        borderRadius: hp(1),
        alignItems: "center",
        height: wp('10')
    },
    cancelText: {
        fontWeight: "bold",
        fontSize: hp(1.9),
    },
});

export default DeleteAccountModal;
