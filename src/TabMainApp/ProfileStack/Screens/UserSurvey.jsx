

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { showToast } from '../../../utils/toastService';
// import api from '../../../utils/axiosInstance';
// import Loader from '../../../ReusableComponents/Loader';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import CustomButton from '../../../ReusableComponents/CustomButton';
// import Colors from '../../../ReusableComponents/Colors';
// const UserSurvey = ({ navigation, route }) => {


// const [loading, setLoading] = useState(false);
// const [errorOccured, setErrorOccured] = useState(false);
// const [error, setError] = useState("");
// const [optionsPart, setOption] = useState('profession');
// const [selected, setSelected] = useState(null);

//     const options = [
//         { id: 1, label: 'Student' },
//         { id: 2, label: 'Working Professional' },
//         { id: 3, label: 'Freelancer' },
//         { id: 4, label: 'Entrepreneur' },
//     ];
//     const options2 = [
//         { id: 1, label: 'diploma' },
//         { id: 2, label: 'Under graduation (UG)' },
//         { id: 3, label: 'Post graduation (PG)' },
//     ];
//     const options3 = [
//         { id: 1, label: 'Male' },
//         { id: 2, label: 'Female' },

//     ];
//     return (
//         <View style={styles.container}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <MainAppScreenHeader headername="Profile" color="#fff" />
//             </View>

//           <ScrollView>
//             {optionsPart==='profession'? <View style={styles.Subcontainer}>
//                 <Text style={styles.question}>Are You Student Or Working Professional?</Text>
//                 {options.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selected === item.label && styles.selectedOption]}
//                         onPress={() => setSelected(item.label)}
//                     >
//                         <Text style={styles.optionText}>{item.label}</Text>
//                         <Ionicons
//                             name={selected === item.label ? 'radio-button-on' : 'radio-button-off'}
//                             size={30}
//                             color="black"
//                         />
//                     </TouchableOpacity>
//                 ))}


//                 <View style={{ alignItems: "flex-end" }}>
//                     <CustomButton
//                         title="Next"
//                         align="center"
//                         onPress={() =>setOption('currentstudy')}
//                         style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
//                         textstyle={{ fontSize: wp("3.9%") }}
//                     />
//                 </View>

//             </View>:null}
//            {optionsPart==='currentstudy'? <View style={styles.Subcontainer}>
//                 <Text style={styles.question}>Which course are you currently studying?</Text>
//                 {options2.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selected === item.label && styles.selectedOption]}
//                         onPress={() => setSelected(item.label)}
//                     >
//                         <Text style={styles.optionText}>{item.label}</Text>
//                         <Ionicons
//                             name={selected === item.label ? 'radio-button-on' : 'radio-button-off'}
//                             size={30}
//                             color="black"
//                         />
//                     </TouchableOpacity>
//                 ))}


// <View style={{ alignItems: "flex-end" }}>
//     <CustomButton
//         title="Next"
//         align="center"
//         onPress={() => setOption('gender')}
//         style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
//         textstyle={{ fontSize: wp("3.9%") }}
//     />
// </View>

//             </View>:null}
//            {optionsPart==='gender'?  <View style={styles.Subcontainer}>
//                 <Text style={styles.question}>What is your gender?</Text>
//                 {options3.map((item) => (
//                     <TouchableOpacity
//                         key={item.id}
//                         style={[styles.option, selected === item.label && styles.selectedOption]}
//                         onPress={() => setSelected(item.label)}
//                     >
//                         <Text style={styles.optionText}>{item.label}</Text>
//                         <Ionicons
//                             name={selected === item.label ? 'radio-button-on' : 'radio-button-off'}
//                             size={30}
//                             color="black"
//                         />
//                     </TouchableOpacity>
//                 ))}


// <View style={{ alignItems: "flex-end" }}>
//     <CustomButton
//         title="Next"
//         align="center"
//         // onPress={() => navigation.navigate('MeetUpsDetails', { id: (item.id) })}
//         style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
//         textstyle={{ fontSize: wp("3.9%") }}
//     />
// </View>

//             </View>:null}

//             </ScrollView>
//             <Loader visible={loading} />
//         </View>
//     );
// };

// export default UserSurvey;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7',

//     },
//     Subcontainer: {

//         marginTop: hp('3%'),
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: wp('3')
//     },
//     header: {
//         width: wp('100%'),
//         height: hp('10%'),
//         backgroundColor: '#000',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     label: {
//         color: '#000',
//         fontSize: wp('4%'),
//         fontWeight: 'bold',
//     },
//     input: {
//         backgroundColor: "#fff",
//         borderRadius: wp("2%"),
//         padding: wp("2.5%"),
//         fontSize: wp("3.9%"),
//         color: "#000",
//         marginTop: hp('1%'),
//         elevation: 7,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//     },
//     answer: {
//         fontSize: wp('4%'),
//         color: '#000',
//     },
//     question: {
//         fontSize: wp('5%'),
//         fontWeight: 'bold',
//         marginBottom: hp('1%'),
//         textAlign: 'center',
//         color: "#000"
//     },
//     option: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: wp('80%'),
//         padding: hp('1%'),
//         borderWidth: 1,
//         borderColor: '#000',
//         borderRadius: wp('3'),
//         backgroundColor: '#fff',
//         marginBottom: hp('2%'),
//         elevation: 5,
//         borderColor: '#aaa'
//     },
//     selectedOption: {
//         backgroundColor: '#EAEAEA',
//     },
//     optionText: {
//         fontSize: wp('4%'),
//         color: "#000"

//     },
//     nextButton: {
//         backgroundColor: 'black',
//         width: wp('80%'),
//         padding: hp('2%'),
//         alignItems: 'center',
//         borderRadius: 10,
//         marginTop: hp('3%'),
//     },
//     nextText: {
//         color: 'white',
//         fontSize: wp('4.5%'),
//         fontWeight: 'bold',
//     },
// });
import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../ReusableComponents/CustomButton';
import Colors from '../../../ReusableComponents/Colors';
const surveyData = {
    "types": { "category": ["common", "student", "professional"] },
    "questions": [
        {
            "id": 1,
            "question_text": "Are you a student or a professional?",
            "category": ["common"],
            "answers": [
                { "id": 1, "answer_text": "Student", "next_question_id": 2 },
                { "id": 2, "answer_text": "Professional", "next_question_id": 3 }
            ]
        },
        {
            "id": 2,
            "question_text": "What level of education are you pursuing?",
            "category": ["student"],
            "answers": [
                { "id": 3, "answer_text": "Undergraduate", "next_question_id": 4 },
                { "id": 4, "answer_text": "Graduate", "next_question_id": 4 },
                { "id": 5, "answer_text": "Postgraduate", "next_question_id": 4 }
            ]
        },
        {
            "id": 3,
            "question_text": "How many years of experience do you have?",
            "category": ["professional"],
            "answers": [
                { "id": 6, "answer_text": "1+ years", "next_question_id": 4 },
                { "id": 7, "answer_text": "3+ years", "next_question_id": 4 },
                { "id": 8, "answer_text": "5+ years", "next_question_id": 4 }
            ]
        },
        {
            "id": 4,
            "question_text": "What is your gender?",
            "category": ["common"],
            "answers": [
                { "id": 9, "answer_text": "Male" },
                { "id": 10, "answer_text": "Female" },
                { "id": 11, "answer_text": "Other" }
            ]
        }
    ]
};

const UserSurvey = ({ navigation, route }) => {
    const { profileData } = route.params || {};
    const [currentQuestion, setCurrentQuestion] = useState(surveyData.questions[0]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionHistory, setQuestionHistory] = useState([]);
    console.log('profileData', profileData);

    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [currentQuestion]);

    const handleSelectAnswer = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleNext = () => {
        if (selectedAnswer) {
            setQuestionHistory([...questionHistory, currentQuestion]);
            if (selectedAnswer.next_question_id) {
                const nextQuestion = surveyData.questions.find(q => q.id === selectedAnswer.next_question_id);
                if (nextQuestion) {
                    setCurrentQuestion(nextQuestion);
                    setSelectedAnswer(null);
                }
            } else {
                console.log("Survey Completed");
            }
        }
    };

    const handleBack = () => {
        if (questionHistory.length > 0) {
            const previousQuestion = questionHistory.pop();
            setCurrentQuestion(previousQuestion);
            setSelectedAnswer(null);
            setQuestionHistory([...questionHistory]);
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Back Button */}
            {/* <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>
                <MainAppScreenHeader headername="Survey" color="#fff" />
            </View> */}
            <View style={styles.header}>

                <Image source={{ uri: "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{profileData.name}</Text>
                    <Text style={styles.phone}>{profileData.mobile}</Text>
                    <Text style={styles.email}>{profileData.email}</Text>

                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {/* Question Text */}
                <Text style={styles.question}>{currentQuestion.question_text}</Text>

                {/* Answer Options */}
                {currentQuestion.answers.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.option,
                            selectedAnswer?.id === item.id ? styles.selectedOption : null
                        ]}
                        onPress={() => handleSelectAnswer(item)}
                    >
                        <Text style={styles.optionText}>{item.answer_text}</Text>
                        <Ionicons
                            name={selectedAnswer?.id === item.id ? "radio-button-on" : "radio-button-off"}
                            size={24}
                            color={selectedAnswer?.id === item.id ? "black" : "black"}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Next Button */}
            {selectedAnswer && (
                // <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                //     <Text style={styles.nextButtonText}>Next</Text>
                // </TouchableOpacity>
                <View style={{ alignItems: "center" }}>
                    <CustomButton
                        title="Next"
                        align="center"
                        onPress={handleNext}
                        style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
                        textstyle={{ fontSize: wp("3.9%") }}
                    />
                </View>
            )}
        </View>
    );
};

export default UserSurvey;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7'
    },

    // Header
    // header: {
    //     width: wp('100%'),
    //     height: hp('10%'),
    //     backgroundColor: '#000',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     paddingHorizontal: 15
    // },
    header: {
        backgroundColor: '#020202',
        // height: hp('20%'),
        alignItems: 'center',
        flexDirection: 'row',
        padding: wp('8%'),
        // justifyContent:'center'
        // bottom:wp('5')
    },
    backButton: {
        position: 'absolute',
        left: wp('4%'),
    },


    // Content
    content: {
        alignItems: 'center',
        padding: 20
    },

    // Question Text
    question: {
        fontSize: wp('5'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: '#000'
    },

    // Answer Options
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        padding: wp('3'),
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 6,
        borderColor: '#aaa'
    },
    selectedOption: {
        borderColor: "#aaa",
        backgroundColor: '#EAEAEA'
    },
    optionText: {
        fontSize: wp('4'),
        color: "#000"
    },

    // Next Button
    nextButton: {
        backgroundColor: "#000",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 20,
        width: "90%",
        alignSelf: "center"
    },
    nextButtonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
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
    avatar: {
        width: wp('20'),
        height: wp('20'),
        borderRadius: wp('15'),
        borderWidth: 3,
        borderColor: '#fff',
    },
});

