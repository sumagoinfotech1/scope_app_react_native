


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import SweetAlert from 'react-native-sweet-alert';
import { useIsFocused } from "@react-navigation/native";
const ProfileScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [rating, setRating] = useState(2);
    const [isModalVisible, setModalVisible] = useState(false);
    const [islogin, setLogin] = useState('');
    const [feedbackText, setfeedbackText] = useState('');
    const [errorOccured, setErrorOccure] = useState(false);
    const [UserId, setUser] = useState('');
    const [profileData, setProfileData] = useState({});
      const [error, setError] = useState(null);
    // console.log('profileData', profileData);

    const [loading, setLoading] = useState(false); // Show loader while API fetches
    const user = {
        name: "Anoop Nanekar",
        phone: "9888688998",
        email: "username@gmail.com",
        avatar: "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
    };
    useEffect(() => {
        const checkUserStatus = async () => {
            setLoading(true)
            try {
                const isLogin = await AsyncStorage.getItem("isLogin");
                const UserId = await AsyncStorage.getItem("User_id");

                console.log("isLogin", isLogin);
                setLogin(isLogin)
                setLoading(false)
                setUser(UserId)
                getUserData(UserId)

            } catch (error) {
                console.error("Error fetching profile status:", error);
                setLoading(false)
            }
        };
        checkUserStatus();
        if (isFocused) {}
    }, [isFocused]); // Removed `navigation` from dependencies
    const showDeleteAlert = () => {
        SweetAlert.showAlertWithOptions({
            title: "Are you sure?",
            subTitle: "Once deleted, you will lose access to your account, and this action cannot be reversed.",
            style: 'warning',
            //   confirmButtonTitle: "Yes, Delete",
            //   confirmButtonColor: "red",
            //   otherButtonTitle: "No, Cancel",
            //   otherButtonColor: "red",
            cancellable: true,
        }, (isConfirmed) => {
            if (isConfirmed) {
                deleteAccountRequest(); // Call your function to delete the account
            }
        });
    };
    const deleteAccountRequest = async () => {
        try {
            const response = await api.post('deleteAccountRequestRoute/create'); // No data sent in the request

            console.log("Delete Account Response:", response.data);

            if (response.data.result) {
                showToast('success', 'Request Submitted', 'Your account deletion request has been submitted successfully.');
                await AsyncStorage.clear()
                navigation.navigate('Mobile')
                return response.data;
            } else {
                showToast('error', 'Request Failed', response.data.message || 'Failed to submit deletion request.');
                return null;
            }
        } catch (error) {
            console.error("Delete Account Error:", error.response || error);

            if (error.response) {
                showToast('error', 'Error', error.response.data?.message || 'Error processing deletion request.');
                await AsyncStorage.clear()
                navigation.navigate('Mobile')
            } else {
                showToast('error', 'Network Error', 'Please check your internet connection.');
            }

            return null;
        }
    };
    const logoutUserApi = async () => {
       
        try {
            const response = await api.post(`users/logout/${UserId}`); // Sending a POST request to logout

            console.log("Logout Response:", response.data);

            if (response.data.result) {
                showToast('success', 'Logged Out', 'You have been logged out successfully.');
                // Alert.alert('jhhjhjh')
                return response.data;
            } else {
                showToast('error', 'Logout Failed', response.data.message || 'Failed to log out.');
                return null;
            }
        } catch (error) {
            console.error("Logout Error:", error.response || error);

            if (error.response) {
                showToast('error', 'Error', error.response.data?.message || 'Error processing logout request.');
            } else {
                showToast('error', 'Network Error', 'Please check your internet connection.');
            }

            return null;
        }
    };

    const logout = async () => {
        logoutUserApi()
        try {
            await AsyncStorage.setItem("isLogin", JSON.stringify(false));
            await AsyncStorage.removeItem("User_id");
            await AsyncStorage.removeItem("accessToken");
            await AsyncStorage.removeItem("refreshToken");
            await AsyncStorage.removeItem("mobile");// Optional: Remove user ID on logout
            console.log("User logged out successfully");
            // Navigate back to the Mobile screen
            navigation.replace("Mobile");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };
    const submitFeedback = async () => {
        try {
            setLoading(true);
            setErrorOccure(false);
    
            console.log('Submitting Feedback:', { feedback: feedbackText, rating });
    
            // API Request
            const response = await api.post('feedback/create', {
                feedback: feedbackText,
                rating: rating,
            });
    
            console.log('Feedback Response:', response.data);
    
            if (response.status === 200) {
                showToast('success', 'Feedback Submitted', 'Thank you for your feedback!');
                setModalVisible(false);
                // setFeedbackText('');
                // setRating(0);
            }
        } catch (error) {
            console.error('Error in submitFeedback:', error);
    
            let errorMsg = 'Something went wrong. Please try again.';
    
            if (error.response) {
                if (error.response.status === 400) {
                    errorMsg = error.response.data?.message || 'Feedback already submitted.';
                    showToast('error', 'Feedback Already Submitted', errorMsg);
                    setModalVisible(false);
                } else {
                    errorMsg = error.response.data?.message || errorMsg;
                    showToast('error', 'Error', errorMsg);
                }
            } else if (error.message) {
                errorMsg = error.message;
                showToast('error', 'Error', errorMsg);
            }
    
            setErrorOccure(true);
        } finally {
            setLoading(false);
        }
    };
    
    const getUserData = async (userId) => {
        try {
            setLoading(true);
            setError(null);
    
            // Make API request
            const response = await api.get(`users?id=${userId}`);
            console.log('User Data Response:', response.data.data);
    
            if (response.status === 200 && response.data?.result) {
                const userData = response.data.data;
                setProfileData(userData); // Store data in state
    
                // Display profile data in a toast message
                // showToast(
                //     "success",
                //     "Profile Data Fetched",
                //     "Data Fetch"
                // );
            } else {
                showToast("error", "Failed to fetch profile data.");
                setError("Failed to fetch profile data.");
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
    
            if (error.response) {
                const { status, data } = error.response;
                const errorMsg = data?.message || "An error occurred";
    
                if (status === 400) {
                    showToast("error", errorMsg);
                    setError(errorMsg);
                } else {
                    showToast("error", errorMsg);
                    setError(errorMsg);
                }
            } else {
                showToast("error", "Network error. Please check your internet connection.");
                setError("Network error. Please check your internet connection.");
            }
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{profileData.name}</Text>
                    <Text style={styles.phone}>{profileData.mobile}</Text>
                    <Text style={styles.email}>{profileData.email}</Text>

                </View>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ProfileEdit', { profileData })}>
                    <FontAwesome5 name="user" size={20} color="#000" />
                    <Text style={styles.menuText}>Profile Details</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('FAQScreen') }}>
                    <FontAwesome5 name="question-circle" size={20} color="#000" />
                    <Text style={styles.menuText}>FAQ</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
                    <FontAwesome5 name="comment-dots" size={20} color="#000" />
                    <Text style={styles.menuText}>Feedback</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('ReferalScreen') }}>
                    <FontAwesome5 name="user-friends" size={20} color="#000" />
                    <Text style={styles.menuText}>Referral</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => { navigation.navigate('UserSurvey',{profileData}) }}>
                    <MaterialIcons name="question-answer" size={20} color="#000" />
                    <Text style={styles.menuText}>User Survey</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => logout()}>
                    <FontAwesome5 name="sign-out-alt" size={20} color="red" />
                    <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={() => showDeleteAlert()}>
                    <FontAwesome5 name="trash-alt" size={20} color="red" />
                    <Text style={[styles.menuText, { color: 'red' }]}>Delete Account</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('TermAndPolicy', { webUrl: 'https://www.youtube.com/' })}>
                <Text style={styles.footerText}>Terms & Condition | V1.0.0 | </Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TermAndPolicy', { webUrl: 'https://web.sumagoinfotech.com/' })}>
                <Text style={styles.footerText}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            {/* Feedback Modal */}
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                style={styles.bottomModal}
                useNativeDriver
                hideModalContentWhileAnimating
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.feedbackTitle}><MaterialCommunityIcons name="message-text-outline" size={22} /> Feedback</Text>
                    <TextInput
                        style={styles.feedbackInput}
                        placeholder="Share your feedback"
                        multiline
                        onChangeText={(value) => setfeedbackText(value)}
                    />
                    <Text style={styles.ratingText}>Rate Us {rating}</Text>
                    <StarRating rating={rating} onChange={setRating} starSize={32} />

                    <TouchableOpacity style={styles.saveButton} onPress={() => submitFeedback()}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Loader visible={loading} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        backgroundColor: '#020202',
        // height: hp('20%'),
        alignItems: 'center',
        flexDirection: 'row',
        padding: wp('8%'),
        // justifyContent:'center'
        // bottom:wp('5')
    },
    avatar: {
        width: wp('20'),
        height: wp('20'),
        borderRadius: wp('15'),
        borderWidth: 3,
        borderColor: '#fff',
    },
    userInfo: {
        marginLeft: wp('5%'),
    },
    name: {
        color: '#fff',
        fontSize: wp('5%'),
        fontWeight: 'bold',
    },
    phone: {
        color: '#fff',
        fontSize: wp('4%'),
    },
    email: {
        color: '#ccc',
        fontSize: wp('3.5%'),
    },
    menuContainer: {
        paddingHorizontal: wp('5%'),
        marginTop: hp('2%'),
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: hp('1.5%'),
        borderRadius: 10,
        marginBottom: hp('1.5%'),
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
    },
    menuText: {
        flex: 1,
        fontSize: wp('4%'),
        marginLeft: wp('3%'),
        fontWeight: '500',
        color: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: hp('2%'),
        width: '100%',
        alignItems: 'center',
        // flexDirection:'row'
    },
    footerText: {
        fontSize: wp('3.5%'),
        color: '#888',
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: wp('5%'),
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: 'flex-start',
    },
    feedbackTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        marginBottom: hp('2%'),
        color: 'black',
    },
    feedbackInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: wp('3%'),
        borderRadius: 10,
        minHeight: hp('10%'),
        marginBottom: hp('2%'),
    },
    ratingText: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    saveButton: {
        backgroundColor: '#000',
        paddingVertical: hp('1.5%'),
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: hp('2%'),
    },
    saveText: {
        color: '#fff',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: hp('1.5%'),
        paddingVertical: hp('1%'),
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#ddd',
    },
    closeText: {
        color: '#000',
        fontSize: wp('4%'),
        fontWeight: 'bold',
    },
});

