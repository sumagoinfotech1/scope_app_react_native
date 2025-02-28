


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import StarRating from 'react-native-star-rating-widget';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ProfileScreen = ({ navigation }) => {
    const [rating, setRating] = useState(4);
    const [isModalVisible, setModalVisible] = useState(false);
    const [islogin, setLogin] = useState('');
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


                console.log("isLogin", isLogin);
                setLogin(isLogin)


            } catch (error) {
                console.error("Error fetching profile status:", error);
                setLoading(false)
            }
        };

        checkUserStatus();
    }, []); // Removed `navigation` from dependencies

    const logout = async () => {
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


    return (
        <View style={styles.container}>
            <View style={styles.header}>

                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.phone}>{user.phone}</Text>
                    <Text style={styles.email}>{user.email}</Text>

                </View>
            </View>

            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
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

                <TouchableOpacity style={styles.menuItem} onPress={() => logout()}>
                    <FontAwesome5 name="sign-out-alt" size={20} color="red" />
                    <Text style={[styles.menuText, { color: 'red' }]}>Logout</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem}>
                    <FontAwesome5 name="trash-alt" size={20} color="red" />
                    <Text style={[styles.menuText, { color: 'red' }]}>Delete Account</Text>
                    <FontAwesome5 name="chevron-right" size={15} color="#aaa" />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Terms & Condition | V1.0.0 | Privacy Policy</Text>
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
                    />
                    <Text style={styles.ratingText}>Rate Us {rating}.0</Text>
                    <StarRating rating={rating} onChange={setRating} starSize={22} />

                    <TouchableOpacity style={styles.saveButton}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        height: hp('25%'),
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

