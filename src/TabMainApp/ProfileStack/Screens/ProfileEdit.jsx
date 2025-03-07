

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../../ReusableComponents/CustomButton';
import Colors from '../../../ReusableComponents/Colors';
const ProfileEdit = ({ navigation, route }) => {
    const { profileData } = route.params || {};
    const [email, setEmail] = useState(profileData.email); // Default email
    const [name, setName] = useState(profileData.name);
    const [loading, setLoading] = useState(false);
    const [errorOccured, setErrorOccured] = useState(false);
    const [error, setError] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [selected, setSelected] = useState(null);
    console.log('profileDataww', profileData);

    const updateUser = async (field) => {
        setLoading(true);
        setErrorOccured(false);

        let payload = {};
        if (field === 'email') {
            payload = { email };
        } else if (field === 'name') {
            payload = { name };
        }

        if (Object.keys(payload).length === 0) {
            setLoading(false);
            return;
        }

        try {
            const response = await api.put(`users/update/${profileData.id}`, payload);
            console.log("Response:", response.data);

            if (response.data.result === true) {
                showToast('success', 'User Updated', 'User details updated successfully');
            } else {
                setErrorOccured(true);
                setError(response.data.message || "Failed to update user");
                showToast('error', 'Update Failed', response.data.message || "Failed to update user");
            }
        } catch (error) {
            setErrorOccured(true);
            if (error.response) {
                setError(error.response.data?.message || "Error updating user");
                showToast('error', 'Error', error.response.data?.message || "Error updating user");
            } else {
                setError("Network error. Please check your connection.");
                showToast('error', 'Network Error', "Please check your internet connection.");
            }
        }

        setLoading(false);
    };
    const options = [
        { id: 1, label: 'Student' },
        { id: 2, label: 'Working Professional' },
        { id: 3, label: 'Freelancer' },
        { id: 4, label: 'Entrepreneur' },
    ];
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MainAppScreenHeader headername="Profile" color="#fff" />
            </View>

            {/* Card for Email */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.label}>Email</Text>
                    <TouchableOpacity
                        onPress={async () => {
                            if (isEditingEmail) {
                                await updateUser('email');
                            }
                            setIsEditingEmail(!isEditingEmail);
                        }}
                        style={{ margin: 5 }}
                    >
                        <FontAwesome5
                            name={isEditingEmail ? "check" : "edit"}
                            size={wp('4%')}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                {isEditingEmail ? (
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        keyboardType="email-address"
                    />
                ) : (
                    <Text style={styles.answer}>{email}</Text>
                )}
            </View>

            {/* Card for Name */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.label}>Name</Text>
                    <TouchableOpacity
                        onPress={async () => {
                            if (isEditingName) {
                                await updateUser('name');
                            }
                            setIsEditingName(!isEditingName);
                        }}
                    >
                        <FontAwesome5 name={isEditingName ? "check" : "edit"} size={wp('4%')} color="#000" />
                    </TouchableOpacity>
                </View>
                {isEditingName ? (
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter User Name"
                        keyboardType="default"
                    />
                ) : (
                    <Text style={styles.answer}>{name}</Text>
                )}
            </View>
            <View style={styles.Subcontainer}>
                <Text style={styles.question}>Are You Student Or Working Professional?</Text>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.option, selected === item.label && styles.selectedOption]}
                        onPress={() => setSelected(item.label)}
                    >
                        <Text style={styles.optionText}>{item.label}</Text>
                        <Ionicons
                            name={selected === item.label ? 'radio-button-on' : 'radio-button-off'}
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                ))}


                <View style={{ alignItems: "flex-end" }}>
                    <CustomButton
                        title="Next"
                        align="center"
                        onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}
                        style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
                        textstyle={{ fontSize: wp("3.9%") }}
                    />
                </View>
                
            </View>
            <View style={styles.Subcontainer}>
                <Text style={styles.question}>Are You Student Or Working Professional?</Text>
                {options.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[styles.option, selected === item.label && styles.selectedOption]}
                        onPress={() => setSelected(item.label)}
                    >
                        <Text style={styles.optionText}>{item.label}</Text>
                        <Ionicons
                            name={selected === item.label ? 'radio-button-on' : 'radio-button-off'}
                            size={30}
                            color="black"
                        />
                    </TouchableOpacity>
                ))}


                <View style={{ alignItems: "flex-end" }}>
                    <CustomButton
                        title="Next"
                        align="center"
                        onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}
                        style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
                        textstyle={{ fontSize: wp("3.9%") }}
                    />
                </View>
                
            </View>
            <Loader visible={loading} />
        </View>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',

    },
    Subcontainer: {

        marginTop: hp('3%'),
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('3')
    },
    header: {
        width: wp('100%'),
        height: hp('10%'),
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: wp('93%'),
        backgroundColor: '#ffff',
        borderRadius: wp('3%'),
        marginTop: hp('1.5%'),
        padding: wp('4%'),
        elevation: 10,
        marginHorizontal: wp('5%'),
        alignSelf: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: '#000',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: "#fff",
        borderRadius: wp("2%"),
        padding: wp("2.5%"),
        fontSize: wp("3.9%"),
        color: "#000",
        marginTop: hp('1%'),
        elevation: 7,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    answer: {
        fontSize: wp('4%'),
        color: '#000',
    },
    question: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
        textAlign: 'center',
        color: "#000"
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: wp('80%'),
        padding: hp('1%'),
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: wp('3'),
        backgroundColor: '#fff',
        marginBottom: hp('2%'),
        elevation: 5,
        borderColor: '#aaa'
    },
    selectedOption: {
        backgroundColor: '#EAEAEA',
    },
    optionText: {
        fontSize: wp('4%'),
        color: "#000"

    },
    nextButton: {
        backgroundColor: 'black',
        width: wp('80%'),
        padding: hp('2%'),
        alignItems: 'center',
        borderRadius: 10,
        marginTop: hp('3%'),
    },
    nextText: {
        color: 'white',
        fontSize: wp('4.5%'),
        fontWeight: 'bold',
    },
});
