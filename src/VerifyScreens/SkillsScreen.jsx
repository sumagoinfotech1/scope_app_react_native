import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList, Alert } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Svg, Circle } from "react-native-svg";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Colors from "../ReusableComponents/Colors";
import CustomButton from "../ReusableComponents/CustomButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import CarouselComponent from "../ReusableComponents/CarouselComponent";
import HeaderName from "../ReusableComponents/HeaderName";
import { ScrollView } from "react-native-gesture-handler";
const { width } = Dimensions.get("window");

const SkillsScreen = ({ navigation }) => {

  const [step, setStep] = useState("intrest"); // Tracks the current step
  const [selectedItems, setSelectedItems] = useState([]);

  const [loading, setLoading] = useState(false); // Show loader while API fetches

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
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F66" />
      </View>
    );
  }
  const mainApp = () => {
    if (selectedItems.length >= 3) {
        navigation.replace("MainApp");
    } else {
        return Alert.alert('Select at least 3 items');
    }
};

  const category = (id) => {
    setStep("skills")
  }
  const CardItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.card} onPress={() => category(item.id)}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">
          {item.description}
        </Text>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  const toggleSelection = (id) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((item) => item !== id)
        : [...prevSelected, id]
    );
  };

  const renderItem1 = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <TouchableOpacity
        onPress={() => toggleSelection(item.id)}
        style={[styles.card1, isSelected && styles.selectedCard]}
      >
        <Text style={[styles.title, isSelected && styles.selectedText]}>
          {item.title}
        </Text>
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
      <LinearGradient colors={["#F3B2B2", "#FFFFFF"]} style={styles.formContainer}>
        {step === "intrest" && (
          <>
            <FlatList
              data={data}
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

        {step === "skills" && (
          <>
            <Text style={styles.heading}>Select At Least Three <Text style={{ color: "red" }}>*</Text></Text>
            <FlatList
              data={data1}
              keyExtractor={(item) => item.id}
              renderItem={renderItem1}
              numColumns={2}
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />

            <CustomButton
              title="Next"
              align="right"
              onPress={() => mainApp()}
              style={{ paddingHorizontal: 30, backgroundColor: "black" }}
            />
          </>
        )}

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: hp("6")
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
    alignSelf:'flex-end'
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    justifyContent: "space-evenly",
  },
  card1: {
    // flex: 1,
    width: wp("40"),
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: wp("2%"),
    paddingHorizontal: wp("2%"),
    alignItems: "center",
    margin: wp("1.7%"),
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
});

export default SkillsScreen;
