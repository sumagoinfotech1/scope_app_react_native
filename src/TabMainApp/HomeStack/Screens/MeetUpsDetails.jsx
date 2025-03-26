import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Platform, ScrollView, Alert, TouchableOpacity, Share } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../../../ReusableComponents/Colors";
import GradientContainer from "../../../ReusableComponents/GradientContainer";
import CustomButton from "../../../ReusableComponents/CustomButton";
import ImageCard from "../../../ReusableComponents/ImageCard";
import VerifyEmailModal from "../../../ReusableComponents/VerifyEmailModal";
import ConfirmModal from "../../../ReusableComponents/ConfirmModal";
import MainAppScreenHeader from "../../../ReusableComponents/MainAppScreenHeader";
import { showToast } from "../../../utils/toastService";
import Loader from "../../../ReusableComponents/Loader";
import api from "../../../utils/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TicketModal from "../../../ReusableComponents/TicketModal";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatTime } from "../../../utils/timeUtils"
import FontAwesome from "react-native-vector-icons/FontAwesome";
const MeetUpsDetails = ({ navigation, route }) => {
    const { id } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [ticketModal, setTicketModal] = useState(false);
    const [details, setEventsDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState();
    const [isconfiremmodal, setCinfirmModal] = useState(false);
    const [referralCode, setReferralCode] = useState("");
    const [errorOccured, setErrorOccured] = useState(false);
    // const [verificationmodal, setverificationmodal] = useState(false);
    const [userId, setUserId] = useState('')
    console.log('referralCode', id);

    const data = {
        image: require("../../../assets/icons/image.png"), // Replace with actual image path
        title: "Visual Elements Of User Interface Design",
        description:
            "Visual Elements Are The Building Blocks Of User Interface (UI) Design. They Encompass The Visual Components That Make Up The Interface, Enhancing Its Appearance, Functionality, And User Experience.",
        topics: [
            "Understanding Your Goals And Objectives",
            "Identifying All Tasks And Projects",
            "Determining Urgency And Importance",
            "Assigning Priorities Based On Criteria",
            "Continuously Evaluating And Adjusting System",
        ],
    };


    const getEventsDetails = async () => {

        try {
            setLoading(true);
            // console.log('Fetching Events...');

            // Make API Request
            const response = await api.get(`event/${id}`);

            if (response.status === 200 && response.data?.result) {
                setEventsDetails(response.data.data); // Store data in state
                setHeading(response.data.data.event_type_id.name)
                // console.log('data 16', response.data.data);

            } else {
                showToast('error', 'Error', response.data?.message || 'Failed to fetch events');
                throw new Error(response.data?.message || 'Failed to fetch events');
            }
        } catch (error) {
            console.error('Error in getEvents:', error);

            let errorMsg = 'Something went wrong. Please try again.';
            if (error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error.message) {
                errorMsg = error.message;
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        getEventsDetails(); // Call event details after user ID is set
        fetchUserId();
        return () => { }
    }, []);
    const fetchUserId = async () => {
        try {
            const user_id = await AsyncStorage.getItem('User_id');

            if (!user_id) {
                showToast('error', 'Error', 'User ID not found.');
                throw new Error('User ID not found');
            }
            setUserId(user_id);
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };

    const getUserConfig = async () => {
        setLoading(true);
        try {

            // // Retrieve user_id from AsyncStorage
            // const user_id = await AsyncStorage.getItem('User_id');
            // setUserId(user_id)
            // if (!user_id) {
            //     showToast('error', 'Error', 'User ID not found.');
            //     throw new Error('User ID not found');
            // }

            // Fetch User Configuration
            const response = await api.get(`/users/config?id=${userId}`);

            if (response.status === 200 && response.data?.result) {
                const userConfig = response.data.data;
                console.log('userConfig', userConfig);

                if (userConfig.userisEmailVerified === false) {
                    setModalVisible(true);

                } else {

                    setCinfirmModal(true)
                }

                return userConfig; // Return user config for further use
            } else {
                showToast('error', 'Error', response.data?.message || 'Failed to fetch user config');
                throw new Error(response.data?.message || 'Failed to fetch user config');
            }
        } catch (error) {
            console.error('Error fetching user config:', error);

            let errorMsg = 'Something went wrong. Please try again.';
            if (error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error.message) {
                errorMsg = error.message;
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    const updateUser = async (email) => {
        console.log('email', email);

        try {
            setLoading(true);



            // Validate email format
            if (!email || !email.includes('@')) {
                showToast('error', 'Error', 'Invalid email address.');
                return;
            }

            // API request with proper headers
            const response = await api.put(
                `users/update/${userId}`,
                { email },
                // { headers: { 'Content-Type': 'application/json' } }
            );

            // Handle API response
            if (response?.data?.result === true) {
                showToast('success', 'Success', response.data?.message || 'Email updated successfully.');
                getVerifyEmail()
                console.log('sssss', response.data?.message);
                setModalVisible(false);


            } else {
                showToast('error', 'Error', response.data?.message || 'Failed to update email.');
                console.log('eeee', response.data?.message);

            }
        } catch (error) {
            if (error.response) {
                setModalVisible(false);
                console.error('Server Response:', error.response.data);
                showToast('error', 'Error', error.response.data?.message || 'Failed to update user.');
            } else if (error.request) {
                console.error('No response from server:', error.request);
                showToast('error', 'Error', 'No response from server.');
                setModalVisible(false);
            } else {
                console.error('Error:', error.message);
                showToast('error', 'Error', 'Something went wrong. Please try again.');
                setModalVisible(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const getVerifyEmail = async () => {
        try {
            setLoading(true);
            // console.log('Fetching Events...');

            // Make API Request
            const response = await api.post(`auth/email/send-verification`);

            if (response.status === 200 && response.data?.result === true) {
                showToast('success', 'Success', response.data?.message || 'Verification email sent successfully');
                // registerForEvent()
                // Alert.alert("Email Send", response.data?.message)
            } else {
                // Alert.alert("verify")
                showToast('error', 'Error', response.data?.message || 'Failed to Verify');
                throw new Error(response.data?.message || 'Failed to fetch events');

            }
        } catch (error) {
            console.error('Error in getEvents:', error);

            let errorMsg = 'Something went wrong. Please try again.';
            if (error.response) {
                errorMsg = error.response.data?.message || errorMsg;
            } else if (error.message) {
                errorMsg = error.message;
            }

            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    // const registerForEvent = async () => {
    //     try {
    //         setLoading(true);

    //         // API request to register for the event
    //         const response = await api.post('event-registration/register', {
    //             userId: userId,
    //             eventId: id,
    //         });
    //         console.log("responseee".response);

    //         if (response.data?.result === true) {
    //             showToast('success', 'Success', response.data?.message);
    //             setCinfirmModal(false);
    //             setTicketModal(true)
    //         } else {
    //             if (response.data?.message === "Email not verified") {
    //                 setModalVisible(true); // Show email verification modal
    //             } else {
    //                 showToast('error', 'Error', response.data?.message);
    //             }
    //         }
    //     } catch (error) {
    //         showToast('error', 'Error', 'Something went wrong. Please try again.');
    //         console.error('Error registering for event:', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const registerForEvent = async () => {
        try {
            setLoading(true);

            // API request to register for the event
            const response = await api.post('event-registration/register', {
                userId: userId,
                eventId: id,
            });

            console.log("API Response:", response);

            if (response.data?.result === true) {
                showToast('success', 'Success', response.data?.message);
                setCinfirmModal(false);
                setTicketModal(true);
            } else {
                if (response.data?.message === "Email not verified") {
                    setModalVisible(true); // Show email verification modal
                } else {
                    showToast('error', 'Error', response.data?.message);
                }
            }
        } catch (error) {
            console.error('Error registering for event:', error);

            let errorMsg = 'Something went wrong. Please try again.';

            if (error.response) {
                if (error.response.status === 400 && error.response.data?.result === false) {
                    errorMsg = error.response.data?.message || 'Registration failed';
                    setCinfirmModal(false);
                } else {
                    errorMsg = error.response.data?.message || errorMsg;
                    setCinfirmModal(false);
                }
            } else if (error.message) {
                errorMsg = error.message;
            }

            showToast('error', 'Error', errorMsg);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        const fetchUserIdAndCreateReferral = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('User_id');
                if (storedUserId) {
                    handleCreateReferral(storedUserId);
                    //   setUserid(storedUserId)
                } else {
                    showToast('error', 'User ID Missing', 'No user ID found in storage');
                }
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserIdAndCreateReferral();
    }, []);
    const handleCreateReferral = async (userId) => {
        setErrorOccured(false);
        setLoading(true);

        try {
            const response = await api.post(`user-referral/create/${userId}`);

            console.log("Response:", response.data);

            if (response.data.result === true) {
                // showToast('success', 'Referral Created', 'Referral created successfully');
                setReferralCode(response.data.data.referral_code)
            } else {
                setErrorOccured(true);
                setError(response.data.message || "Failed to create referral");
                showToast('error', 'Referral Failed', response.data.message || "Failed to create referral");
            }
        } catch (error) {
            setErrorOccured(true);

            if (error.response) {
                console.log("Error Response:", error.response);

                if (error.response.status === 400 && error.response.data.result === false) {
                    fetchUserReferral(userId)

                } else {
                    setError(error.response.data?.message || "Error creating referral");
                    showToast('error', 'Error', error.response.data?.message || "Error creating referral");
                }
            } else {
                setError("Network error. Please check your connection.");
                showToast('error', 'Network Error', "Please check your internet connection.");
            }
        }

        setLoading(false);
    };
    const fetchUserReferral = async (userId) => {

        try {


            const response = await api.get(`user-referral/user?id=${userId}`);

            console.log("ResponseFetch:", response.data.data[0].referral_code);

            if (response.status === 200) {
                // showToast('success', 'Referral Data Loaded', 'Referral details retrieved successfully');
                setReferralCode(response.data.data[0].referral_code)
                return response.data;
            } else {
                showToast('error', 'Error', 'Failed to fetch referral data');
                return null;
            }
        } catch (error) {
            if (error.response) {
                console.log("Error Responseee:", error.response);

                if (error.response.status === 400) {
                    showToast('error', 'Bad Request', "Invalid request. Please check your data.");
                } else {
                    showToast('error', 'Error', error.response.data?.message || "Error fetching referral data");
                }
            } else {
                showToast('error', 'Network Error', "Please check your internet connection.");
            }
            return null;
        }
    };
    const shareReferralLink = async () => {
        try {

            //   // Construct the referral link dynamically
            //   const referralLink = `https://yourapp.com/signup?referralCode=${userId}`;
            const referralLink = `https://website.sumagotraining.in/`;
            // Share the referral message
            const result = await Share.share({
                message: `🚀 Join our amazing app and earn rewards! 🎉\n\nUse my referral code: *${referralCode}* to sign up.\n\nClick here to join: ${referralLink}`,
            });

            if (result.action === Share.sharedAction) {
                showToast('success', 'Shared Successfully', 'Your referral link has been shared.');
            } else if (result.action === Share.dismissedAction) {
                showToast('info', 'Share Cancelled', 'You cancelled sharing.');
            }
        } catch (error) {
            console.error("Error sharing referral link:", error);
            showToast('error', 'Error', 'Failed to share referral link.');
        }
    };
    const formatDate = (dateString) => {
        const months = [
            "Jan", "Feb", "March", "April", "May", "June",
            "July", "Aug", "Sept", "Oct", "Nov", "Dec"
        ];

        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = months[date.getMonth()];
        const year = String(date.getFullYear()).slice(-2);

        return `${day}-${month}-${year}`;
    };

    return (

        <GradientContainer colors={["#000", "#FFFF"]} style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ marginVertical: hp('1') }}>
                    <MainAppScreenHeader headername={heading} />
                </View>
                {/* Image Section */}
                <View style={[styles.card,{padding:0}]}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: details.image }} style={styles.image} />
                    </View>

                    {/* Text Section */}
                    <View style={styles.textContainer}>
                        <View style={[styles.infoRow, { justifyContent: 'space-between' }]}>
                            <Text style={styles.advancedText}>ADVANCED</Text>

                            {details.paid_or_free === 'Paid' ? <Text style={styles.date}>₹ {details.early_bird_price || 0}</Text> : null}
                        </View>

                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{details.title}</Text>
                        <View style={styles.infoRow}>
                            <Text style={styles.date}>{formatDate(details.from_date)} <Text style={{ color: '#000' }}>To</Text> {formatDate(details.to_date)}</Text>

                        </View>
                        <View style={styles.infoRow}>
                            <MaterialIcons name="access-time" size={16} color="black" />
                            <Text style={styles.time}>{formatTime(details.from_time)} <Text style={{ color: '#000' }}>To</Text> {formatTime(details.to_time)}</Text>
                        </View>
                        <Text style={styles.description}>{details.description}</Text>

                    </View>
                </View>

                {/* What You'll Learn Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>What You’ll Learn</Text>
                    {(details.whatlearn || []).map((topic, index) => (
                        <Text key={index} style={styles.listItem}>✔ {topic}</Text>
                    ))}
                </View>


                {/* Summary Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Summary</Text>
                    {(details.summary || []).map((topic, index) => (
                        <Text key={index} style={styles.listItem}>✔ {topic}</Text>
                    ))}
                    <View>
                        <CustomButton
                            title="Register"
                            align="center"
                            style={styles.registerButton}
                            textstyle={styles.registerText}
                            onPress={() => getUserConfig()}
                        />
                    </View>
                </View>
                <View style={{ alignItems: "flex-end", justifyContent: "flex-end" }}>

                    <ImageCard
                        imageUrl={require('../../../assets/icons/share.png')}
                    />

                    {/* <TouchableOpacity style={styles.yesButton} onPress={() => shareReferralLink()} >
                        <Text style={styles.yesButtonText}>Invite</Text>
                    </TouchableOpacity> */}
                              <TouchableOpacity style={styles.yesButton} onPress={() => shareReferralLink()}>
                                <View style={{ left: wp('2'), zIndex: 100 }}>
                                  <FontAwesome name="share" size={16} color="#000" />
                                </View>
                    
                                <View>
                                  <Text style={styles.yesButtonText}>Invite</Text>
                                </View>
                    
                              </TouchableOpacity>

                </View>

                <VerifyEmailModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onConfirm={(item) => {
                        updateUser(item)

                    }}
                />


                <ConfirmModal
                    isVisible={isconfiremmodal}
                    onClose={() => setCinfirmModal(false)}
                    onConfirm={() => registerForEvent()}
                    title="Are You Sure You Want To Confirm Your Registration?"
                />
                <TicketModal
                    visible={ticketModal}
                    onClose={() => setTicketModal(false)}
                    item={details}

                />
            </ScrollView>
            <Loader visible={loading} />
        </GradientContainer>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp("4%"),
        paddingTop: Platform.OS === "ios" ? wp("13%") : wp("4%"), // Extra top margin for iOS
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: wp("3%"),
        padding: wp("4%"),
        marginBottom: wp("3%"),
        elevation: 10, // Android shadow
        shadowColor: "#000", // iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    imageContainer: {
        alignItems: "center",
        elevation: 10
    },
    image: {
        width: wp("94%"),
        height: wp("39%"),
        borderRadius: 10,
        resizeMode: 'contain'
    },
    textContainer: {
        padding: wp("4%"),
        
    },
    advancedText: {
        color: "#c94f69",
        fontWeight: "bold",
        textTransform: "uppercase",
        fontSize: wp("4%"),
    },
    title: {
        fontSize: wp("5%"),
        fontWeight: "bold",
        marginVertical: wp("1%"),
        color: 'black'
    },
    description: {
        fontSize: wp("4%"),
        color: "#555",
        marginTop: wp('2')
    },
    cardTitle: {
        fontSize: wp("4.5%"),
        fontWeight: "bold",
        marginBottom: wp("2%"),
        color: 'black'
    },
    listItem: {
        fontSize: wp("4%"),
        color: "#333",
    },
    registerButton: {
        padding: wp("3%"),
        backgroundColor: Colors.black,
        borderRadius: wp("3%"),
        width: "100%",
        marginTop: wp("5%"),
    },
    registerText: {
        fontSize: wp("4.5%"),
        color: Colors.white,
        textAlign: "center",
    },
    yesButton: {
        // flex: 1,
        backgroundColor: "#fff",
        paddingVertical: hp("0.8%"),
        borderRadius: wp("2%"),
        alignItems: "center",
        position: "absolute",
        right: wp('5'),
        bottom: wp('7'),
        flexDirection:"row",
        width:wp('18'),
        justifyContent:"space-between",
        paddingRight: wp('1.3')
    },
    yesButtonText: {
        fontSize: wp("4%"),
        fontWeight: "bold",
        color: "#000",
        // padding:wp('0.3'),
        // paddingHorizontal: wp('6')
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp("1%"),
        elevation: 3,
    },
    date: {
        color: '#c94f69',
        fontWeight: 'bold',
        marginRight: wp("2%"),
        fontSize: wp('4'),
    },
    time: {
        marginLeft: wp("1%"),
        fontSize: wp('3.5'),
         color:'#000'
    },
});

export default MeetUpsDetails;
