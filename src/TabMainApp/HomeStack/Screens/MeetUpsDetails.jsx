import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Platform, ScrollView, Alert } from "react-native";
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
const MeetUpsDetails = ({ navigation, route }) => {
    const { id } = route.params || {};
    const [modalVisible, setModalVisible] = useState(false);
    const [ticketModal, setTicketModal] = useState(false);
    const [details, setEventsDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [heading, setHeading] = useState();
    const [isconfiremmodal, setCinfirmModal] = useState(false);
    // const [verificationmodal, setverificationmodal] = useState(false);
    const [userId, setUserId] = useState('')
    console.log('12', userId);

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
                Alert.alert("Email Send", response.data?.message)
            } else {
                Alert.alert("verify")
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
    const registerForEvent = async () => {
        try {
            setLoading(true);

            // API request to register for the event
            const response = await api.post('event-registration/register', {
                userId: userId,
                eventId: id,
            });
            console.log("responseee".response);

            if (response.data?.result === true) {
                showToast('success', 'Success', response.data?.message);
                setCinfirmModal(false);
                setTicketModal(true)
            } else {
                if (response.data?.message === "Email not verified") {
                    setModalVisible(true); // Show email verification modal
                } else {
                    showToast('error', 'Error', response.data?.message);
                }
            }
        } catch (error) {
            showToast('error', 'Error', 'Something went wrong. Please try again.');
            console.error('Error registering for event:', error);
        } finally {
            setLoading(false);
        }
    };




    return (

        <GradientContainer colors={["#000", "#FFFF"]} style={styles.container}>
            <ScrollView>
                <View style={{ marginVertical: hp('1') }}>
                    <MainAppScreenHeader headername={heading} />
                </View>
                {/* Image Section */}
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: details.image }} style={styles.image} />
                    </View>

                    {/* Text Section */}
                    <View style={styles.textContainer}>
                        <Text style={styles.advancedText}>ADVANCED</Text>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{details.title}</Text>
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
                <ImageCard
                    imageUrl={require('../../../assets/icons/share.png')}
                />


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
        width: "100%",
        height: 150,
        borderRadius: 10,
        resizeMode: 'contain'
    },
    textContainer: {
        paddingVertical: wp("3%"),
    },
    advancedText: {
        color: "#E63946",
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
});

export default MeetUpsDetails;
