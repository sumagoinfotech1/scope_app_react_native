import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Platform, ScrollView } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import Colors from "../../../ReusableComponents/Colors";
import GradientContainer from "../../../ReusableComponents/GradientContainer";
import CustomButton from "../../../ReusableComponents/CustomButton";
import ImageCard from "../../../ReusableComponents/ImageCard";
import VerifyEmailModal from "../../../ReusableComponents/VerifyEmailModal";
import ConfirmModal from "../../../ReusableComponents/ConfirmModal";
const WorkShopDetails = () => {
    // const [modalVisible, setModalVisible] = useState(false);
    const [isModalVisible, setModalVisible1] = useState(false);
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

    return (

        <GradientContainer colors={["#000", "#FFFF"]} style={styles.container}>
            <ScrollView>
                {/* Image Section */}
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image source={data.image} style={styles.image} />
                    </View>

                    {/* Text Section */}
                    <View style={styles.textContainer}>
                        <Text style={styles.advancedText}>ADVANCED</Text>
                        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{data.title}</Text>
                        <Text style={styles.description}>{data.description}</Text>
                    </View>
                </View>

                {/* What You'll Learn Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>What You’ll Learn</Text>
                    {data.topics.map((topic, index) => (
                        <Text key={index} style={styles.listItem}>✔ {topic}</Text>
                    ))}
                </View>

                {/* Summary Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Summary</Text>
                    {data.topics.map((topic, index) => (
                        <Text key={index} style={styles.listItem}>✔ {topic}</Text>
                    ))}
                    <View>
                        <CustomButton
                            title="Register"
                            align="center"
                            style={styles.registerButton}
                            textstyle={styles.registerText}
                            onPress={() => setModalVisible1(true)}
                        />
                    </View>
                </View>
                <ImageCard
                    imageUrl="https://i.pinimg.com/736x/06/16/32/061632d4efe20eb88834e335ccbee1e9.jpg"
                />

                {/* <VerifyEmailModal
                    isVisible={modalVisible}
                    onClose={() => setModalVisible1(false)}
                    onConfirm={() => {
                        setModalVisible(false);
                        console.log("Email Verified!");
                    }}
                /> */}
                <ConfirmModal
                    isVisible={isModalVisible}
                    onClose={() => setModalVisible1(false)}
                    onConfirm={() => setModalVisible1(false)}
                    title="Are You Sure You Want To Confirm Your Registration?"
                />
            </ScrollView>
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

export default WorkShopDetails;
