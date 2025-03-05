// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { showToast } from '../../../utils/toastService';
// import api from '../../../utils/axiosInstance';

// const ProfileEdit = ({ navigation, route }) => {
//     const { UserId } = route.params || {};
//     const [email, setEmail] = useState('example@mail.com'); // Default email
//     const [name, setName] = useState('Enter Name');
//     const [loading, setLoading] = useState(false);
//     const [errorOccured, setErrorOccured] = useState(false);
//       const [error, setError] = useState("");
//     // Default mobile number
//     const [isEditingEmail, setIsEditingEmail] = useState(false);
//     const [isEditingMobile, setIsEditingMobile] = useState(false);
//     console.log('UserId', UserId);

//     const updateUser = async () => {
//         setLoading(true);
//         setErrorOccured(false);

//         try {
//             const response = await api.put(`users/update/${UserId}`, {
//                 email,
//                 name
//             });

//             console.log("Response:", response.data);

//             if (response.data.result === true) {
//                 showToast('success', 'User Updated', 'User details updated successfully');
//             } else {
//                 setErrorOccured(true);
//                 setError(response.data.message || "Failed to update user");
//                 showToast('error', 'Update Failed', response.data.message || "Failed to update user");
//             }
//         } catch (error) {
//             setErrorOccured(true);

//             if (error.response) {
//                 setError(error.response.data?.message || "Error updating user");
//                 showToast('error', 'Error', error.response.data?.message || "Error updating user");
//             } else {
//                 setError("Network error. Please check your connection.");
//                 showToast('error', 'Network Error', "Please check your internet connection.");
//             }
//         }

//         setLoading(false);
//     };

//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <MainAppScreenHeader headername="Profile" color="#fff" />
//             </View>

//             {/* Card for Email */}
//             <View style={styles.card}>
//                 <View style={styles.cardHeader}>
//                     <Text style={styles.label}>Email</Text>
//                     <TouchableOpacity
//                         onPress={async () => {
//                             if (isEditingEmail) {
//                                 // Call API with the updated email when pressing "check"
//                                 await updateUser(email);
//                             }
//                             setIsEditingEmail(!isEditingEmail);
//                         }}
//                         style={{ margin: 5 }}
//                     >
//                         <FontAwesome5
//                             name={isEditingEmail ? "check" : "edit"}
//                             size={wp('4%')}
//                             color="#000"
//                         />
//                     </TouchableOpacity>
//                 </View>

//                 {isEditingEmail ? (
//                     <TextInput
//                         style={styles.input}
//                         value={email}
//                         onChangeText={setEmail}
//                         placeholder="Enter email"
//                         keyboardType="email-address"
//                     />
//                 ) : (
//                     <Text style={styles.answer}>{email}</Text>
//                 )}
//             </View>

//             {/* Card for Mobile Number */}
//             <View style={styles.card}>
//                 <View style={styles.cardHeader}>
//                     <Text style={styles.label}>Name</Text>
//                     <TouchableOpacity
//                         onPress={async () => {
//                             if (isEditingMobile) {
//                                 // Call API with the updated email when pressing "check"
//                                 await updateUser();
//                             }
//                             setIsEditingMobile(!isEditingMobile);
//                         }}
//                     >
//                         <FontAwesome5 name={isEditingMobile ? "check" : "edit"} size={wp('4%')} color="#000" />
//                     </TouchableOpacity>
//                 </View>
//                 {isEditingMobile ? (
//                     <TextInput
//                         style={styles.input}
//                         value={name}
//                         onChangeText={setName}
//                         placeholder="Enter User Name"
//                         keyboardType="default"

//                     />
//                 ) : (
//                     <Text style={styles.answer}>{name}</Text>
//                 )}
//             </View>
//         </View>
//     );
// };

// export default ProfileEdit;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7',
//     },
//     header: {
//         width: wp('100%'),
//         height: hp('10%'),
//         backgroundColor: '#000',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     card: {
//         width: wp('93%'),
//         backgroundColor: '#ffff',
//         borderRadius: wp('3%'),
//         marginTop: hp('1.5%'),
//         padding: wp('4%'),
//         elevation: 10,
//         marginHorizontal: wp('5%'),
//         // iOS shadow
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         alignSelf: "center"
//     },
//     cardHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         // marginTop: hp('1%'),
//         // position:"absolute",
//         // alignSelf:"flex-end"
//     },
//     label: {
//         color: '#000',
//         fontSize: wp('4%'),
//         fontWeight: 'bold',
//     },
//     input: {
//         backgroundColor: "#fff",
//         borderRadius: wp("2%"),
//         padding: wp("2.5%"),
//         fontSize: wp("3.7%"),
//         color: "#000",
//         // Border for visibility (optional)
//         // borderWidth: 1,
//         // borderColor: "#ccc",
//         marginTop: hp('1%'),
//         // Android shadow
//         elevation: 7,

//         // iOS shadow
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//     },

//     answer: {
//         fontSize: wp('3.8%'),
//         color: '#000',
//     },
// });


import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';

const ProfileEdit = ({ navigation, route }) => {
    const { UserId } = route.params || {};
    const [email, setEmail] = useState('example@mail.com'); // Default email
    const [name, setName] = useState('Enter Name');
    const [loading, setLoading] = useState(false);
    const [errorOccured, setErrorOccured] = useState(false);
    const [error, setError] = useState("");
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);

    console.log('UserId', UserId);

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
            const response = await api.put(`users/update/${UserId}`, payload);
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
        </View>
    );
};

export default ProfileEdit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
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
        fontSize: wp("3.7%"),
        color: "#000",
        marginTop: hp('1%'),
        elevation: 7,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    answer: {
        fontSize: wp('3.8%'),
        color: '#000',
    },
});
