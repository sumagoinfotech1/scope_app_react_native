

import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator, alert, Alert, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../ReusableComponents/Colors";
import CustomButton from "../ReusableComponents/CustomButton";
import FontAwesome from "react-native-vector-icons/Feather";
import CarouselComponent from "../ReusableComponents/CarouselComponent";
import HeaderName from "../ReusableComponents/HeaderName";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../ReusableComponents/Loader";
import { API_URL } from '@env';
import { showToast } from '../utils/toastService';
import api from "../utils/axiosInstance";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const Mobile = ({ navigation }) => {
  const [step, setStep] = useState("mobile"); // Tracks the current step
  const [mobile, setMobile] = useState(""); // Store mobile number
  const length = 4;
  const [otp, setOtp] = useState(new Array(length).fill("")); // Store OTP
  const inputRefs = useRef([]);

  const [profileName, setProfileName] = useState("");
  const [promocode, setPromocode] = useState("");  // Store Profile name
  const [loading, setLoading] = useState(false); // Show loader while API fetches
  const [error, setError] = useState("");
  const [errorOccure, setErrorOccure] = useState(false);
  const [verifiedcode, setVerifyCode] = useState(false);
  const OTP = otp.join('')
  const [timer, setTimer] = useState(60); // Start from 60 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true);
      try {
        const mobile = await AsyncStorage.getItem("mobile");
        const isLogin = await AsyncStorage.getItem("isLogin");
        console.log("isLogin:", isLogin); // Debugging

        if (isLogin !== "true") {
          setStep("mobile");
          return;
        }

        const storedProfileCompleted = await AsyncStorage.getItem("isProfileCompleted");
        const storedAnswerSubmitted = await AsyncStorage.getItem("isAnswerSubmitted");

        console.log("Raw Profile Completed:", storedProfileCompleted);
        console.log("Raw Answer Submitted:", storedAnswerSubmitted);

        const profileCompleted = storedProfileCompleted === "true";  // Convert to boolean
        const answerSubmitted = storedAnswerSubmitted === "true";  // Convert to boolean

        console.log("Converted Profile Completed:", profileCompleted);
        console.log("Converted Answer Submitted:", answerSubmitted);

        if (!profileCompleted) {
          setStep("profile");
          setMobile(mobile);
        } else {
          navigation.replace(answerSubmitted ? "MainApp" : "SkillsScreen");
        }
      } catch (error) {
        console.error("Error fetching login status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
    getSlider()
  }, []);

  const getSlider = async () => {
    try {
      setLoading(true);
      // console.log('Fetching Events...');

      // Make API Request
      const response = await api.get('onboardingSlider/getAll');

      if (response.status === 200 && response.data?.result) {
        setSlider(response.data.data); // Store data in state
        console.log('dataRavi', response.data.data.map((item) => item.name));

      } else {
        // showToast('error', 'Error', response.data?.message || 'Failed to fetch events');
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


  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );




  useEffect(() => {
    setIsResendDisabled(true);
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup on unmount
    } else {
      setIsResendDisabled(false); // Enable resend button when timer hits 0
    }
  }, [timer]);

  const handleSendOtp = async () => {
    setErrorOccure(false);
    setOtp(["", "", "", ""]);
    if (!/^\d{10}$/.test(mobile)) {
      setErrorOccure(true);
      setError("Enter a valid 10-digit mobile number");

      // Show error toast for invalid mobile number
      // showToast('error', 'Invalid Mobile', 'Enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("api/user/send-otp", {
        mobile: mobile,
      });

      console.log("Response:", response.data);

      if (response.data.result === true) {
        setStep("otp");
        setLoading(false);
        setTimer('60');

        // Show success toast
        showToast('success', 'OTP Sent', 'Check your phone for the OTP');
      } else {
        setErrorOccure(true);
        setError(response.data.message || "Failed to send OTP");

        // Show error toast
        showToast('error', 'OTP Failed', response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      setErrorOccure(true);
      setError(error.response?.data?.message || "Error sending OTP");

      // Show error toast for API failure
      // showToast('error', 'Error', error.response?.data?.message || "Error sending OTP");
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setErrorOccure(false);
    setError(""); // Clear previous errors

    // Ensure OTP is an array of exactly 4 digits
    if (!Array.isArray(otp) || otp.length !== 4 || otp.some((digit) => digit.trim() === "")) {
      setErrorOccure(true);
      setError("Enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);

    try {
      // API request to verify OTP
      const response = await api.post("auth/verify-otp", {
        mobile,
        otp: OTP // Convert array to string
      });

      console.log("response otp verify:", response.data);

      if (response.data.result === true) {
        const { accessToken, refreshToken, id, isProfileCompleted, mobile, is_answer_submitted } = response.data.data;

        // Store tokens securely
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
        await AsyncStorage.setItem("User_id", id);
        await AsyncStorage.setItem("mobile", mobile);
        await AsyncStorage.setItem("isProfileCompleted", JSON.stringify(isProfileCompleted));
        await AsyncStorage.setItem("isAnswerSubmitted", JSON.stringify(is_answer_submitted));
        await AsyncStorage.setItem("isLogin", JSON.stringify(true));
        
        showToast("success", "OTP Verified Successfully", response.data.message);
       console.log('User_id',id);
       
        // Determine next step based on profile completion and answer submission status
        if (!isProfileCompleted) {
          setStep("profile"); // Navigate to profile if it's not completed
        } else {
          navigation.replace(is_answer_submitted ? "MainApp" : "SkillsScreen");
        }

        setOtp(["", "", "", ""]); // Reset OTP input after success
      } else {
        setErrorOccure(true);
        setError(response.data.message || "OTP verification failed");
        setOtp(["", "", "", ""]); // Reset OTP input on failure
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);

      let errorMessage = "Error verifying OTP. Try again";

      if (error.response) {
        errorMessage = error.response.data.message || "Invalid OTP, please try again";
      } else if (error.request) {
        errorMessage = "Network error, please check your internet connection";
      }

      setErrorOccure(true);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };




  const validateName = (name) => {
    if (!name.trim()) {
      return "Name cannot be empty";
    }

    if (!/^[A-Za-z\s]+$/.test(name)) {
      return "Name must contain only letters and spaces";
    }

    if (name.length < 2 || name.length > 50) {
      return "Name must be between 2 and 50 characters";
    }

    return null; // No errors
  };



  const handleCompleteProfile = async () => {
    if (verifiedcode === false && promocode.length > 0) {
      verifyReferralCode();
      return;
    }
    setLoading(true);
    setErrorOccure(false);

    // Validate Profile Name
    const errorMessage = validateName(profileName);
    if (errorMessage) {
      setErrorOccure(true);
      setError(errorMessage);
      setLoading(false);
      return;
    }

    try {

      console.log('Request Payload:', { mobile, name: profileName });

      // Make API Request
      const response = await api.post(
        'auth/complete-profile',
        {
          mobile,
          name: profileName,
          // ...(promocode ? { referralCode: promocode } : {}), // Include only if promocode is available
        },

      );


      // console.log('API Response:', response);

      if (response.status === 200 && response.data?.result) {
        navigation.replace('SkillsScreen');
      } else {
        showToast('error', 'Error', response.data?.message || 'Profile update failed');

        throw new Error(response.data?.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Error in handleCompleteProfile:', error);

      let errorMsg = 'Something went wrong. Please try again.';
      if (error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setErrorOccure(true);
      setError(errorMsg);

    } finally {
      setLoading(false);
    }
  };


  const handleChangeText = (text, index) => {
    if (!/^\d?$/.test(text)) return; // Only allow numbers

    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to the next input if text is entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      let newOtp = [...otp];

      // Clear the current field and move focus back
      if (!newOtp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const verifyReferralCode = async () => {
    setLoading(true);

    setErrorOccure(false);
    setError("");

    // Validate Referral Code (8-digit alphanumeric)
    const referralCodePattern = /^[a-zA-Z0-9]{8}$/;
    if (!referralCodePattern.test(promocode)) {
      setErrorOccure(true);
      setError("Must be 8 alphanumeric characters.");
      setLoading(false);
      return;
    }

    try {
      console.log("Verifying Referral Code:", promocode);

      // Make API Request
      const response = await api.post("auth/verify-referral-code", {
        mobile,
        referralCode: promocode
      });

      console.log("API Response:", response.data);

      if (response.data?.result === true) {
        const { referralCode, reward } = response.data?.data || {};

        showToast("success", "Success", `Referral code verified successfully! You earned ${reward} points.`);
        setVerifyCode(true);
        setErrorOccure(false); // Clear previous errors if any

        // // Store referral code and reward for further use
        // setReferralCode(referralCode);
        // setRewardPoints(reward);
      } else {
        setVerifyCode(false);
        setErrorOccure(true);
        setError(response.data?.message || "Invalid referral code");
        showToast("error", "Error", response.data?.message || "Invalid referral code");
      }
    } catch (error) {
      let errorMsg = "Something went wrong. Please try again.";

      if (error.response) {
        errorMsg = error.response.data?.message || errorMsg;
      } else if (error.message) {
        errorMsg = error.message;
      }

      setVerifyCode(false);
      setErrorOccure(true);
      setError(errorMsg);
      showToast("error", "Error", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <HeaderName />
        <View style={styles.bannerContainer}>
          <CarouselComponent data={slider} renderItem={renderItem} height={hp("37%")} />
        </View>
      </View>

      <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.formContainer}>
        {step === "mobile" && (
          <View style={{ alignItems: 'center', width: wp('90%'), marginTop: hp('4') }}>
            <Text style={styles.label}>Enter your mobile number</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile number"
              keyboardType="numeric"
              value={mobile}
              onChangeText={setMobile}
              maxLength={10}
              cursorColor="black" 
            />
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}

            <CustomButton title="Proceed" align="right" onPress={handleSendOtp}
              style={{ paddingHorizontal: wp("4"), padding: wp("3.3%"), backgroundColor: '#000', }}
            />
          </View>
        )}

        {step === "otp" && (
          <>
            <Text style={styles.label}>OTP Verification</Text>

            <Text style={styles.extraText}>A 4 DIGIT CODE HAS BEEN SENT TO {"\n"}{mobile}
              <FontAwesome name="edit-2" size={18} color={"black"} onPress={() => { setStep("mobile"), setOtp(["", "", "", ""]), setErrorOccure(false) }} />
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={styles.inputOtp}
                  placeholder="-"
                  keyboardType="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  textAlign="center"
                  cursorColor="black" 
                />
              ))}
            </View>
            <TouchableOpacity disabled={isResendDisabled} onPress={() => { handleSendOtp() }} style={{ marginBottom: wp('2') }}>
              <Text style={{ fontWeight: "bold", fontSize: wp('3.5'), color: Colors.black }}>Resent OTP {isResendDisabled ? `In: 00:${timer}` : null}
              </Text>
            </TouchableOpacity>
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}
            <View style={{ marginTop: wp('2'), alignSelf: "flex-end" }}>
              <CustomButton title="Verify OTP" align="right" onPress={handleVerifyOtp}
                style={{ paddingHorizontal: wp("4"), padding: wp("3.3%"), backgroundColor: '#000' }}
              />
            </View>
          </>
        )}

        {step === "profile" && (
          <>
            <Text style={styles.label}>Complete Profile</Text>
            <TextInput style={styles.input}
              placeholder="Enter name"
              alue={profileName}
              onChangeText={setProfileName} />

            <TextInput
              style={styles.input}
              placeholder="Enter Mobile Number"
              value={mobile}

              editable={false}
            />
            <View style={[styles.input, { flexDirection: 'row' }]}>
              <TextInput
                placeholder="Enter Promo Code"
                value={promocode}
                onChangeText={setPromocode}
                style={{ width: wp("67") }}
                maxLength={8}
              />
              <CustomButton
                title="Apply"
                align="left"
                style={{ paddingHorizontal: wp("4"), padding: wp("4.3%"), right: -wp('3'), backgroundColor: '#000' }}
                textstyle={{ fontSize: wp("3.8%") }}
                onPress={verifyReferralCode}

              />

            </View>
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}
            <CustomButton title="Submit" align="right" onPress={handleCompleteProfile}
              style={{ paddingHorizontal: wp("4"), padding: wp("3.3%"), backgroundColor: '#000' }}
            />
          </>
        )}
      </LinearGradient>
      {step === "mobile" && (
        <View style={styles.avatarContainer}>
          <Image source={require("../assets/icons/I1.png")} style={styles.avatar} />
        </View>
      )}
      <Loader visible={loading} />
    </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1.5, alignItems: "center", justifyContent: "center" },

  bannerContainer: { alignItems: "center", justifyContent: 'center', marginBottom: hp("5%"), width: wp("100%") },

  avatarContainer: {
    // flex:1,
    position: "absolute",
    // bottom: hp("4%"),  
    alignItems: "center",
    justifyContent: "center",
    width: hp("15%"),
    height: hp("15%"),
    backgroundColor: Colors.secondary,
    borderRadius: hp("10%"),
    bottom: Platform.OS === 'ios' ? hp("31") : hp("31.8%"),

    alignSelf: 'center',
    zIndex: 10,
    // Android
    elevation: 10,

    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  avatar: { width: hp("10%"), height: hp("9%"), position: "absolute", resizeMode: 'contain', right: hp("1%") },

  formContainer: {
    flex: 1,
    padding: wp("5%"),
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: wp("7%"),
    borderTopRightRadius: wp("7%"),
    justifyContent: "center",

  },

  label: { fontSize: wp("4.9%"), fontWeight: "bold", marginBottom: hp("1.5%"), color: Colors.black },

  input: {
    width: "100%",
    // height: hp("5.7%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("2%"),
    paddingLeft: wp("3%"),
    marginBottom: hp("1%"),
    backgroundColor: Colors.white,
    elevation: 10,
    fontSize: wp("3.8%"),
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginVertical: hp('1'),
    color: '#000'
  },

  otpContainer: { flexDirection: "row", justifyContent: "center", marginBottom: hp("2%") },

  inputOtp: {
    width: wp("15%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("2%"),
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: wp("2%"),
    backgroundColor: Colors.white,
    color: '#000'
  },

  carouselImage: {
    width: wp("95%"),
    height: hp("33%"),
    borderRadius: 20,
    backgroundColor: "black",
    resizeMode: "stretch",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  extraText: {
    fontSize: wp("3%"),
    fontWeight: "400",
    marginBottom: hp("1.5%"),
    color: Colors.black,
    alignSelf: "center",
    textAlign: 'center',
    margin: wp("1%"),
  },
  errorcontainer: {
    alignItems: "center",
    justifyContent: 'center',
    marginBottom: wp('2')
  },
  errorText: {
    color: 'red',
    fontSize: wp('4')
  }
});

export default Mobile;
