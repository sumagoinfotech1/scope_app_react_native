import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, Alert, ActivityIndicator, ScrollView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Svg, Circle } from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../ReusableComponents/Colors";
import CustomButton from "../ReusableComponents/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import CarouselComponent from "../ReusableComponents/CarouselComponent";
import HeaderName from "../ReusableComponents/HeaderName";
import { showToast } from '../utils/toastService';
import axios from "axios";
import Loader from "../ReusableComponents/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../utils/axiosInstance";
const { width } = Dimensions.get("window");

const Skills = ({ navigation, route }) => {
    const { skillId } = route.params || {};
    const [step, setStep] = useState("intrest"); // Tracks the current step
    const [selectedItems, setSelectedItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [skill, setSkill] = useState([]);
    const [loading, setLoading] = useState(false); // Show loader while API fetches
    const [errorOccure, setErrorOccure] = useState(false);
    const [error, setError] = useState("");
    const [mainCategoryId, setMainCategory] = useState("");
    console.log(skillId, 'skillId');


    useEffect(() => {
      
        fetchSkillById();

        return () => {
            // Cleanup function (if needed)
        };
    }, []);


    const mainApp = async () => {
        if (selectedItems.length < 2) {
            return showToast('error', 'Error', 'Select at least 3 items');
        }

        try {
            setLoading(true);
            setErrorOccure(false);
            const User_id = await AsyncStorage.getItem('User_id');

            if (!User_id) {
                throw new Error('User Id not found');
            }
            // API Request Payload
            const payload = {
                user_id: User_id,
                main_category_id: mainCategoryId,
                skill_ids: selectedItems, // Assuming selectedItems contains skill_ids
            };

            console.log('Request Payload:', payload);

            // API Call
            const response = await api.post("answers/create", payload, {

            });

            const data = response.data;
            console.log('API Response:', data);

            if (data?.result === true) {
                showToast('success', 'Success', data.message);
                navigation.replace('MainApp');
            } else {
                setError(data.message || 'Failed to submit answers');
                showToast('error', 'Error', data.message || 'Failed to submit answers');
            }
        } catch (error) {
            let errorMsg = 'Something went wrong. Please try again.';

            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMsg = error.response.data?.message || 'Server error occurred';
                    console.log('Server Error:', error.response.data);
                } else if (error.request) {
                    errorMsg = 'No response from server. Check your internet connection.';
                    console.log('No Response:', error.request);
                } else {
                    console.log('Request Error:', error.message);
                }
            } else {
                errorMsg = error.message;
            }

            setErrorOccure(true);
            setError(errorMsg);

        } finally {
            setLoading(false);
        }
    };

    const fetchSkillById = async () => {
        console.log("fetchSkillById function called!",skillId); // Debugging
    
        if (!skillId) {
            console.warn("No skillId provided!");
            return;
        }
    
        setLoading(true);
        setErrorOccure(false);
        setError("");
    
        try {
            // Make API Request
            const response = await api.get(`skill/all/${skillId}`);
    
            console.log("API Response:", response.data);
    
            if (response.data?.result) {
                setSkill(response.data.data); // Store skill data in state
                setStep("skills");
                setMainCategory(skillId);
            } else {
                throw new Error(response.data?.message || "Failed to fetch skill");
            }
        } catch (error) {
            console.error("Error in fetchSkillById:", error);
    
            let errorMsg = "Something went wrong. Please try again.";
            if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            } else if (error.message) {
                errorMsg = error.message;
            }
    
            setErrorOccure(true);
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };
    

    const toggleSelection = (id) => {
        setSelectedItems((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((item) => item !== id)
                : [...prevSelected, id]
        );
    };


    return (
        <View style={{ flex: 1, backgroundColor: Colors.background }}>
            <View style={styles.container}>
                {/* Header */}
                <HeaderName />
                <View >
                    <Text style={styles.subtitle}>Skills</Text>
                </View>
            </View>
            {/* Form Section */}

            <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.formContainer}>
                {errorOccure ? <View style={styles.errorcontainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View> : null}

                <Text style={styles.heading}>Select At Least Three <Text style={{ color: "red" }}>*</Text></Text>
                {/* <FlatList
              data={skill}
              keyExtractor={(item) => item.id}
              renderItem={renderItem1}
              numColumns={3}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            /> */}
                <ScrollView >

                    <View style={styles.row}>
                        {skill.map((item) => {
                            const isSelected = selectedItems.includes(item.skill_id);
                            return (
                                <TouchableOpacity
                                    key={item.skill_id}
                                    onPress={() => toggleSelection(item.skill_id)}
                                    style={[styles.card1, isSelected && styles.selectedCard]}
                                >
                                    {/* <Image source={{ uri: `${API_URL}${item.image}` }} style={styles.skillImage} /> */}
                                    <Text style={[styles.title, isSelected && styles.selectedText]}>{item.skill_name}</Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </ScrollView>
                <CustomButton
                    title="Next"
                    align="right"
                    onPress={() => mainApp()}
                    style={{ paddingHorizontal: 30, backgroundColor: "black" }}
                />
            </LinearGradient>
            <Loader visible={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        top: hp("3")
    },

    bannerContainer: {
        // flex:1,
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: hp("5%"),
        width: wp("100%"),

    },

    formContainer: {
        flex: 2,
        padding: wp("5%"),
        width: "100%",
        alignItems: "center",
        borderTopLeftRadius: wp("7%"),
        borderTopRightRadius: wp("7%"),
        justifyContent: "center",
    },
    subtitle: {
        fontSize: wp("6.5%"),
        color: "#fff",
        marginBottom: hp("2%"),
        fontWeight: "bold"
    },


    card: {
        width: wp("40"), // Adjust width to fit two columns
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: wp("2.5"),
        alignItems: "center",
        margin: wp("1"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 7, // For Android shadow
        borderWidth: 3,
        borderColor: '#B8B5B5'
    },

    image: {
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 5,
        color: Colors.black
    },
    description: {
        fontSize: 12,
        textAlign: "center",
        color: "#666",
    },
    iconContainer: {
        position: "relative",
        margin: hp("1"),
        alignSelf: 'flex-end'
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    card1: {
        // flex: 1,
        // width: wp("40"),
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingVertical: wp("2%"),
        paddingHorizontal: wp("7%"),
        alignItems: "center",
        margin: wp("1%"),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 6,
        borderWidth: 2,
        borderColor: "#B8B5B5",
        justifyContent: "center",
    },
    selectedCard: {
        backgroundColor: "#333",
        borderColor: "#333",
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    selectedText: {
        color: "#fff",
    },
    listContainer: {
        paddingBottom: wp("3%"),
    },
    errorcontainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: wp('4')
    }
});

export default Skills;
