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
import { API_URL } from '@env';
import api from "../utils/axiosInstance";
const { width } = Dimensions.get("window");

const SkillsScreen = ({ navigation }) => {

  const [step, setStep] = useState("intrest"); // Tracks the current step
  const [selectedItems, setSelectedItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [skill, setSkill] = useState([]);
  const [loading, setLoading] = useState(false); // Show loader while API fetches
  const [errorOccure, setErrorOccure] = useState(false);
  const [error, setError] = useState("");
  const [mainCategoryId, setMainCategory] = useState("");
  console.log(categories, 'categories');

  const data = [
    {
      id: "1",
      image: require("../assets/icons/i5.png"), // Replace with actual image URL
      title: "Design",
      description: "Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer.",
    },

    {
      id: "2",
      image: require("../assets/icons/i4.png"),
      title: "Marketing",
      description: "Another example description text goes here.",
    },
    {
      id: "3",
      image: require("../assets/icons/i3.png"),
      title: "Development",
      description: "Another example description text goes here.",
    },

    {
      id: "4",
      image: require("../assets/icons/i2.png"),
      title: "Product",
      description: "Another example description  s goes here.",
    },
    {
      id: "4",
      image: require("../assets/icons/i2.png"),
      title: "Scripts",
      description: "Another example description  s goes here.",
    },

  ];
  const data1 = [
    { id: "1", title: "📜 Research" },
    { id: "2", title: "🟩 Wire Frame" },
    { id: "3", title: "📋 Flow Making" },
    { id: "4", title: "💼 Sales" },
    { id: "5", title: "📞 Effective Communication" },
    { id: "6", title: "📝 Documentation" },
    { id: "7", title: "📞 Communication" },
    { id: "8", title: "🎥 Video Making" },
    { id: "9", title: "📑 Ms Excel" },
  ];
  useEffect(() => {
    fetchCategories()
    return () => { }
  }, [])
  const fetchCategories = () => {
    // console.log('function called');

    setLoading(true);
    setErrorOccure(false);
    setError("");

    // Retrieve Access Token
    AsyncStorage.getItem('accessToken')
      .then((accessToken) => {
        console.log('Access Token:', accessToken);

        if (!accessToken) {
          throw new Error('Authentication token not found');
        }

        console.log('Fetching Categories...');

        // Make GET API Request
        return api.get("category/all", {
       
        });
      })
      .then((response) => {
        // console.log('API Response:', response.data);

        if (response.data.result === true) {
          setCategories(response.data.data); // Store categories in state
          // Alert.alert('Categories fetched successfully');
          console.log('CategoriesRavi:', response.data.data.map(item => item.name));
        } else {
          setError(response.data?.message || 'Failed to fetch categories');
        }
      })
      .catch((error) => {
        console.error('Error in fetchCategories:', error);

        let errorMsg = 'Something went wrong. Please try again.';
        if (error.response) {
          errorMsg = error.response.data?.message || errorMsg;
        } else if (error.message) {
          errorMsg = error.message;
        }

        setLoading(false);
        setErrorOccure(true);
        setError(errorMsg);

      })
      .finally(() => {
        setLoading(false);
      });
  };




  // if (loading) {
  //   return (
  //     <View style={styles.center}>
  //       <ActivityIndicator size="large" color="#F66" />
  //     </View>
  //   );
  // }
  // const mainApp = () => {
  //   if (selectedItems.length >= 3) {
  //     navigation.replace("MainApp");
  //   } else {
  //     return Alert.alert('Select at least 3 items');
  //   }
  // };
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
        showToast('error', 'Error', data.message|| 'Failed to submit answers');
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
  const category = (id) => {
    setStep("skills")
  }
  const fetchSkillById =  (skillId) => {
    console.log('Fetching Skill kan:', skillId);
    navigation.navigate('Skills', { skillId });
    // setLoading(true);
    // setErrorOccure(false);
    // setError("");

    // try {
     

    //   // Make API Request
    //   const response = await api.get(`skill/all/${skillId}`, {
      
    //   });

    //   console.log('API Response:', response.data);

    //   if (response.data.result === true) {
    //     setSkill(response.data.data); // Store skill data in state
    //     setStep("skills")
    //     setMainCategory(skillId)

    //   } else {
    //     throw new Error(response.data?.message || 'Failed to fetch skill');
    //   }
    // } catch (error) {
    //   console.error('Error in fetchSkillById:', error);

    //   let errorMsg = 'Something went wrong. Please try again.';
    //   if (error.response) {
    //     errorMsg = error.response.data?.message || errorMsg;
    //   } else if (error.message) {
    //     errorMsg = error.message;
    //   }

    //   setErrorOccure(true);
    //   setError(errorMsg);

    // } finally {
    //   setLoading(false);
    // }
  };

  const CardItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => fetchSkillById(item.id)}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text> 
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };


  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        {/* Header */}
        <HeaderName />
        <View >
          <Text style={styles.subtitle}>{step === "intrest" ? "What are you interested in?" : "Skills"}</Text>
        </View>
      </View>
      {/* Form Section */}
     
      <LinearGradient colors={["#FFFFFF", "#FFFFFF"]} style={styles.formContainer}>
      {errorOccure ? <View style={styles.errorcontainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View> : null}
        {step === "intrest" && (
          <>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <CardItem item={item} />}
              numColumns={2} // Two-column layout
              columnWrapperStyle={styles.row} // Ensures spacing between columns
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
            {/* Proceed Button */}

          </>
        )}

       

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

export default SkillsScreen;
