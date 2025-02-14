// import React, { useState, useEffect, useRef } from "react";
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from "react-native";
// import LinearGradient from "react-native-linear-gradient";
// import { Svg, Circle } from "react-native-svg";
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import Colors from "../ReusableComponents/Colors";
// import CustomButton from "../ReusableComponents/CustomButton";
// import FontAwesome from "react-native-vector-icons/Feather";
// import CarouselComponent from "../ReusableComponents/CarouselComponent";
// import HeaderName from "../ReusableComponents/HeaderName";
// import { ScrollView } from "react-native-gesture-handler";

// const Mobile = ({ navigation }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [step, setStep] = useState("mobile"); // Tracks the current step
//   const [mobile, setMobile] = useState(""); // Store mobile number
//   const [otp, setOtp] = useState(["", "", "", ""]); // Store OTP
//   const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
//   const [profile, setProfile] = useState(""); // Store Profile name
//   const [loading, setLoading] = useState(false); // Show loader while API fetches

//   const renderItem = ({ item }) => (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <Image source={{ uri: item.image }} style={{ width: wp("80%"), height: hp("35%"), borderRadius: 20, backgroundColor: "black", resizeMode: "cover", borderWidth: 2, borderColor: Colors.white }} />
//     </View>
//   );
//   const data = [
//     { id: 1, title: 'Item 1', image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg' },
//     { id: 2, title: 'Item 2', image: 'https://i.pinimg.com/736x/c8/a0/e8/c8a0e8eb808e4e217baa80e4e377a627.jpg' },
//     { id: 3, title: 'Item 3', image: 'https://i.pinimg.com/736x/51/d5/48/51d548911242e61017adcdfbed429f59.jpg' },
//     { id: 3, title: 'Item 3', image: 'https://i.pinimg.com/736x/2d/00/54/2d005496398074d4e03c2e26d703697d.jpg' },
//     { id: 3, title: 'Item 3', image: 'https://i.pinimg.com/736x/06/16/32/061632d4efe20eb88834e335ccbee1e9.jpg' },
//   ];
//   const handleSendOtp = async () => {
//     setStep("otp");
//     // if (mobile.length !== 10) {
//     //   alert("Enter a valid 10-digit mobile number");
//     //   return;
//     // }
//     // setLoading(true);
//     // try {
//     //   const response = await fetch("https://api.example.com/send-otp", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({ mobile }),
//     //   });
//     //   const json = await response.json();
//     //   if (json.success) {
//     //     setStep("otp");
//     //   } else {
//     //     alert(json.message || "Failed to send OTP");
//     //   }
//     // } catch (error) {
//     //   alert("Error sending OTP");
//     // }
//     setLoading(false);
//   };

//   const handleVerifyOtp = async () => {
//     setStep("profile");
//     // if (otp.length !== 6) {
//     //   alert("Enter a valid 6-digit OTP");
//     //   return;
//     // }
//     // setLoading(true);
//     // try {
//     //   const response = await fetch("https://api.example.com/verify-otp", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({ mobile, otp }),
//     //   });
//     //   const json = await response.json();
//     //   if (json.success) {
//     //     setStep("profile");
//     //   } else {
//     //     alert(json.message || "OTP verification failed");
//     //   }
//     // } catch (error) {
//     //   alert("Error verifying OTP");
//     // }
//     setLoading(false);
//   };

//   const handleSaveProfile = async () => {
//     navigation.navigate("SkillsScreen")
//     // if (!profile) {
//     //   alert("Enter your name");
//     //   return;
//     // }
//     // setLoading(true);
//     // try {
//     //   const response = await fetch("https://api.example.com/save-profile", {
//     //     method: "POST",
//     //     headers: { "Content-Type": "application/json" },
//     //     body: JSON.stringify({ mobile, profile }),
//     //   });
//     //   const json = await response.json();
//     //   if (json.success) {
//     //     setStep("interests");
//     //   } else {
//     //     alert(json.message || "Failed to save profile");
//     //   }
//     // } catch (error) {
//     //   alert("Error saving profile");
//     // }
//     setLoading(false);
//   };
//   const handleChangeText = (text, index) => {
//     if (text.length > 1) return;
//     let newOtp = [...otp];
//     newOtp[index] = text;
//     setOtp(newOtp);

//     if (text && index < 3) {
//       inputRefs[index + 1].current.focus();
//     }
//   };

//   const handleKeyPress = (e, index) => {
//     if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
//       inputRefs[index - 1].current.focus();
//     }
//   };
//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#F66" />
//       </View>
//     );
//   }
//   return (
//     <View style={{ flex: 1, backgroundColor: Colors.background }}>
//       <View style={styles.container}>
//         {/* Header */}
//         <HeaderName />
//         {/* Banner Section */}
//         <View style={styles.bannerContainer}>
//           <CarouselComponent data={data} renderItem={renderItem} height={hp("40%")} />
//         </View>
//       </View>
//       {/* Form Section */}
//       <LinearGradient colors={["#F3B2B2", "#FFFFFF"]} style={styles.formContainer}>
//         {step === "mobile" && (
//           <>
//             {/* Avatar */}
//             <View style={styles.avatarContainer}>
//               <Image source={require("../assets/icons/I1.png")} style={styles.avatar} />
//             </View>
//             {/* Label */}
//             <Text style={styles.label}>Enter your mobile number</Text>
//             {/* Input Field */}
//             <TextInput
//               style={styles.input}
//               placeholder="Mobile number"
//               keyboardType="numeric"
//               value={mobile}
//               onChangeText={setMobile}
//             />
//             {/* Proceed Button */}
//             <CustomButton
//               title="Proceed"
//               align="right"
//               onPress={handleSendOtp}
//               style={{ paddingHorizontal: 20 }}
//             />
//           </>
//         )}

//         {step === "otp" && (
//           <>
//             <Text style={styles.label}>OTP Verification</Text>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text style={styles.extraText}>A 4 Digit CODE HAS BEEN SENT TO {"\n"}{mobile}{" "}
//                 <FontAwesome name="edit-2" size={20} color={"red"} onPress={() => setStep("mobile")} />
//               </Text>
//             </View>

//             <View style={styles.otpContainer}>
//               {otp.map((value, index) => (
//                 <TextInput
//                   key={index}
//                   ref={inputRefs[index]}
//                   style={styles.inputotp}
//                   placeholder="-"
//                   keyboardType="numeric"
//                   maxLength={1}
//                   value={value}
//                   onChangeText={(text) => handleChangeText(text, index)}
//                   onKeyPress={(e) => handleKeyPress(e, index)}
//                 />
//               ))}
//             </View>
//             <CustomButton
//               title="Verify OTP"
//               align="right"
//               onPress={() => handleVerifyOtp(otp.join(""))}
//               style={{ paddingHorizontal: 20 }}
//             />

//           </>
//         )}

//         {step === "profile" && (
//           <>
//             <Text style={styles.label}>Complete Profile</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter name"
//               value={profile}
//               onChangeText={setProfile}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Mobile Number"
//               value={profile}
//               onChangeText={setProfile}
//               editable={false}
//             />
//             <View style={[styles.input, { flexDirection: 'row' }]}>
//               <TextInput
//                 placeholder="Enter Promo Code"
//                 value={profile}
//                 onChangeText={setProfile}
//               />
//               <CustomButton
//                 title="Apply"
//                 align="center"
//                 style={{ paddingHorizontal: wp("4"), padding: wp("1%"), }}
//                 textstyle={{ fontSize: wp("4%") }}

//               />
//             </View>
//             <CustomButton
//               title="Submit"
//               align="right"
//               onPress={handleSaveProfile}
//               style={{ paddingHorizontal: 20 }} />
//           </>
//         )}
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 2,
//     alignItems: "center",
//     justifyContent: "center",
//   },


//   logo: {
//     fontSize: wp("7%"),
//     fontWeight: "bold",
//     color: "#000",
//   },
//   wise: {
//     color: "#fff",
//   },
//   subtitle: {
//     fontSize: wp("3.5%"),
//     color: "#fff",
//     marginBottom: hp("2%"),
//   },
//   bannerContainer: {
//     // flex:1,
//     alignItems: "center",
//     justifyContent: 'center',
//     marginBottom: hp("5%"),
//     width: wp("100%"),

//   },

//   bannerText: {
//     fontSize: wp("8%"),
//     fontWeight: "bold",
//     color: "#fff",
//     position: "absolute",
//     top: hp("3%"),
//   },
//   bannerSubText: {
//     fontSize: wp("4.5%"),
//     color: "#fff",
//     position: "absolute",
//     top: hp("8%"),
//   },
//   dotsContainer: {
//     flexDirection: "row",
//     marginTop: hp("1.5%"),
//   },
//   dot: {
//     width: wp("2%"),
//     height: wp("2%"),
//     borderRadius: wp("1%"),
//     backgroundColor: "#fff",
//     marginHorizontal: wp("1.5%"),
//     opacity: 0.5,
//   },
//   activeDot: {
//     opacity: 1,
//   },
//   avatarContainer: {
//     // marginTop: hp("2%"),
//     alignItems: "center",
//     justifyContent: "center",
//     bottom: hp("4%"),
//     elevation: 10,
//     width: hp("15%"),
//     height: hp("15%"),
//     backgroundColor: Colors.secondary,
//     borderRadius: hp("10%"),

//   },
//   avatar: {
//     width: hp("10%"),
//     height: hp("9%"),
//     position: "absolute",
//     resizeMode: 'contain',
//     right: hp("1%")

//   },
//   formContainer: {
//     flex: 1,
//     padding: wp("5%"),
//     width: "100%",
//     alignItems: "center",
//     borderTopLeftRadius: wp("7%"),
//     borderTopRightRadius: wp("7%"),
//     justifyContent: "center",

//   },
//   label: {
//     fontSize: wp("4.5%"),
//     fontWeight: "bold",
//     marginBottom: hp("1.5%"),
//     color: Colors.black
//   },
//   extraText: {
//     fontSize: wp("3%"),
//     fontWeight: "400",
//     marginBottom: hp("1.5%"),
//     color: Colors.black,
//     alignSelf: "center",
//     textAlign: 'center',

//   },
//   input: {
//     width: "100%",
//     height: hp("6%"),
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: wp("2%"),
//     paddingLeft: wp("3%"),
//     marginBottom: hp("1.2%"),
//     elevation: 4,
//     backgroundColor: Colors.white

//   },
//   otpContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     marginBottom: hp("2%"),
//   },
//   inputotp: {
//     width: wp("15%"),
//     height: hp("6%"),
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: wp("2%"),
//     textAlign: "center",
//     fontSize: 20,
//     marginHorizontal: wp("2%"),
//     elevation: 4,
//     backgroundColor: Colors.white,
//   },
//   carouselItem: {
//     width: '100%', // Set width to full width
//     height: hp(28),
//     borderRadius: 10,
//     overflow: 'hidden',
//     // marginBottom: 10,

//   },
//   carouselImage: {
//     // flex: 1,
//     width: '100%',
//     height: '90%',
//     resizeMode: 'contain',
//   },
//   paginationContainer: {
//     position: 'absolute',
//     top: hp(20), // Adjust top position as needed

//   },
//   paginationDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 12,
//     backgroundColor: '#ffff',
//     marginHorizontal: 4,

//   },
//   paginationInactiveDot: {
//     backgroundColor: '#C4C4C4',

//   },
//   carouselwrap: {
//     alignItems: "center",
//     justifyContent: 'center',
//     height: '35%',
//     marginVertical: wp(4)

//   },
// });

// export default Mobile;


import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Platform, ActivityIndicator } from "react-native";
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
const Mobile = ({ navigation }) => {
  const [step, setStep] = useState("mobile"); // Tracks the current step
  const [mobile, setMobile] = useState(""); // Store mobile number
  const [otp, setOtp] = useState(["", "", "", ""]); // Store OTP
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [profileName, setProfileName] = useState("");
  const [promocode, setPromocode] = useState("");  // Store Profile name
  const [loading, setLoading] = useState(false); // Show loader while API fetches
  const [error, setError] = useState("");
  const [errorOccure, setErrorOccure] = useState(false);
const OTP=otp.join('')
console.log('otp4',OTP);

  const renderItem = ({ item }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
    </View>
  );

  const data = [
    { id: 1, image: 'https://i.pinimg.com/736x/2d/0f/75/2d0f756dbb05462074db54ae96da5474.jpg' },
    { id: 2, image: 'https://i.pinimg.com/736x/c8/a0/e8/c8a0e8eb808e4e217baa80e4e377a627.jpg' },
    { id: 3, image: 'https://i.pinimg.com/736x/51/d5/48/51d548911242e61017adcdfbed429f59.jpg' },
  ];

 

  const handleSendOtp = async () => {
    setErrorOccure(false);
  
    if (!/^\d{10}$/.test(mobile)) {
      setErrorOccure(true);
      setError("Enter a valid 10-digit mobile number");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("http://16.170.83.70:3001/api/user/send-otp", {
        mobile: mobile,
      });
  
      console.log("Response:", response.data);
  
      if (response.data.result) {
        setStep("otp");
      } else {
        alert(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  
    setLoading(false);
  };
  

  const handleVerifyOtp = async () => {
    setErrorOccure(false);
  
    // Validate OTP (Ensure 4-digit input)
    if (!Array.isArray(otp) || otp.length !== 4 || otp.some((digit) => !digit.trim())) {
      setErrorOccure(true);
      setError("Enter 4 digits OTP");
      return;
    }
  
    setLoading(true);
    try {
      const response = await axios.post("http://16.170.83.70:3001/auth/verify-otp", {
        mobile,
        otp: OTP, // Convert array to string
      });
  
      console.log("Response:", response.data);
  
      if (response.data.result) {
        const { accessToken, refreshToken } = response.data.data;
  
        // Store tokens securely in AsyncStorage
        await AsyncStorage.setItem("accessToken", accessToken);
        await AsyncStorage.setItem("refreshToken", refreshToken);
  
        setStep("profile"); // Move to the next step after successful verification
      } else {
        alert(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert(error.response?.data?.message || "Error verifying OTP");
    }
  
    setLoading(false);
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
  
  

  const handleSaveProfile = async () => {
    setErrorOccure(false);
  const errorMessage = validateName(profileName);
  if (errorMessage) {
    setErrorOccure(true);
    setError(errorMessage);
    return;
  }
    navigation.navigate("SkillsScreen");
    setLoading(false);
  };

  const handleChangeText = (text, index) => {
    if (text.length > 1 || !/^\d?$/.test(text)) return; // Allow only a single digit (0-9)
  
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  
    // Move focus to the next input if text is entered
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && index > 0 && !otp[index]) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F66" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <HeaderName />
        <View style={styles.bannerContainer}>
          <CarouselComponent data={data} renderItem={renderItem} height={hp("37%")} />
        </View>
      </View>
      
      <LinearGradient colors={["#F3B2B2", "#FFFFFF"]} style={styles.formContainer}>
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
            />
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}

            <CustomButton title="Proceed" align="right" onPress={handleSendOtp} />
          </View>
        )}

        {step === "otp" && (
          <>
            <Text style={styles.label}>OTP Verification</Text>

            <Text style={styles.extraText}>A 4 Digit CODE HAS BEEN SENT TO {"\n"}{mobile}
              <FontAwesome name="edit-2" size={18} color={"black"} onPress={() => setStep("mobile")} />
            </Text>
            <View style={styles.otpContainer}>
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={styles.inputOtp}
                  placeholder="-"
                  keyboardType="numeric"
                  maxLength={1}
                  value={value}
                  onChangeText={(text) => handleChangeText(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              ))}
             
            </View>
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}
            <CustomButton title="Verify OTP" align="right" onPress={handleVerifyOtp} />
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
              />
              <CustomButton
                title="Apply"
                align="center"
                style={{ paddingHorizontal: wp("4"), padding: wp("3%"), left: wp('3.3') }}
                textstyle={{ fontSize: wp("3.4%") }}

              />
              
            </View>
            {errorOccure ? <View style={styles.errorcontainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View> : null}
            <CustomButton title="Submit" align="right" onPress={handleSaveProfile} />
          </>
        )}
      </LinearGradient>
      {step === "mobile" && (
        <View style={styles.avatarContainer}>
          <Image source={require("../assets/icons/I1.png")} style={styles.avatar} />
        </View>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1.5, alignItems: "center", justifyContent: "center" },

  bannerContainer: { alignItems: "center", justifyContent: 'center', marginBottom: hp("5%"), width: wp("100%") },

  avatarContainer: {
    position: "absolute",
    bottom: hp("4%"),
    alignItems: "center",
    justifyContent: "center",
    width: hp("15%"),
    height: hp("15%"),
    backgroundColor: Colors.secondary,
    borderRadius: hp("10%"),
    bottom: Platform.OS === 'ios' ? hp("31") : hp("27.8%"),

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
    height: hp("5.7%"),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: wp("2%"),
    paddingLeft: wp("3%"),
    marginBottom: hp("1.2%"),
    backgroundColor: Colors.white,
    elevation: 10,
    fontSize: wp("3.8%"),
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    marginVertical: hp('1')
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
  },

  carouselImage: {
    width: wp("95%"),
    height: hp("33%"),
    borderRadius: 20,
    backgroundColor: "black",
    resizeMode: "cover",
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
  },
  errorText: {
    color: 'red',
    fontSize: wp('4')
  }
});

export default Mobile;
