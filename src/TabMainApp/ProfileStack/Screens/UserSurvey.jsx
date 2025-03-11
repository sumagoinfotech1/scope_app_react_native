
// import React, { useState, useEffect } from 'react';
// import {
//     View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler, Image
// } from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import CustomButton from '../../../ReusableComponents/CustomButton';
// import Colors from '../../../ReusableComponents/Colors';
// import api from '../../../utils/axiosInstance';
// import Loader from '../../../ReusableComponents/Loader';
// import { useIsFocused } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// const surveyData = {
//     "types": {
//         "category": [
//             "common",
//             "professional",
//             "student"
//         ]
//     },
//     "questions": [
//         {
//             "id": "8b1b1aa0-d755-443e-a93b-e5514c3c8ce2",
//             "question_text": "Tell us about yourself?",
//             "category": [
//                 "common"
//             ],
//             "answers": [
//                 {
//                     "id": "160dda3c-e6c0-4a3a-a5d1-c689870db610",
//                     "answer_text": "professional",
//                     "next_question_id": "4c8672a2-fe04-4860-aa52-b78b57a950d1"
//                 },
//                 {
//                     "id": "7d55f2a1-023a-4fba-8c65-edc2fe01ed28",
//                     "answer_text": "student",
//                     "next_question_id": "bbf0016b-41ee-47bb-b667-d55aa47c9ada"
//                 }
//             ]
//         },
//         {
//             "id": "4c8672a2-fe04-4860-aa52-b78b57a950d1",
//             "question_text": "Tell us about your  experience ?",
//             "category": [
//                 "professional"
//             ],
//             "answers": [
//                 {
//                     "id": "6d935309-51f7-4c7b-ad72-87c13d8adebc",
//                     "answer_text": "5+ years",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 },
//                 {
//                     "id": "79ec79ae-bdde-4154-bfaf-9d6b2fdb7602",
//                     "answer_text": "4+ years",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 },
//                 {
//                     "id": "a7cf9751-cc1d-4464-8962-ea2e9fb88479",
//                     "answer_text": "2+ years",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 },
//                 {
//                     "id": "2b7f9755-92c0-421d-bb0d-6cad4284a28b",
//                     "answer_text": "1+ years",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 }
//             ]
//         },
//         {
//             "id": "d94f8b98-2e35-4677-9a22-7cc09a918899",
//             "question_text": "Tell us  about your gender",
//             "category": [
//                 "common"
//             ],
//             "answers": [
//                 {
//                     "id": "108eb509-6d89-48e1-929b-993dac0a7a0e",
//                     "answer_text": "Male",
//                     "next_question_id": null
//                 },
//                 {
//                     "id": "04b8544b-e51e-4792-b516-1041ab851798",
//                     "answer_text": "Other",
//                     "next_question_id": null
//                 },
//                 {
//                     "id": "165e0bf6-83c0-4075-9edd-e2360ec01ce6",
//                     "answer_text": "Female",
//                     "next_question_id": null
//                 }
//             ]
//         },
//         {
//             "id": "bbf0016b-41ee-47bb-b667-d55aa47c9ada",
//             "question_text": "Tell us about your education",
//             "category": [
//                 "student"
//             ],
//             "answers": [
//                 {
//                     "id": "ffa3797d-5cf4-41e2-8822-c0ad9d95234f",
//                     "answer_text": "under graduate",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 },
//                 {
//                     "id": "5572b03d-91e6-4a12-9154-3e3dfc2a11e7",
//                     "answer_text": "post-graduate",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 },
//                 {
//                     "id": "46debac8-7083-4370-a751-e07e3436b843",
//                     "answer_text": "graduate",
//                     "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
//                 }
//             ]
//         },
//         {
//             "id": "ffc27f8d-336c-4dcb-be1f-139a6e06fcdd",
//             "question_text": "What is your gender??",
//             "category": [
//                 "common"
//             ],
//             "answers": []
//         }
//     ]
// };

// const UserSurvey = ({ navigation, route }) => {
//     const { profileData } = route.params || {};
//     const [currentQuestion, setCurrentQuestion] = useState(null);
//     const [selectedAnswer, setSelectedAnswer] = useState(null);
//     const [questionHistory, setQuestionHistory] = useState([]);
//     const [questions, setQuestions] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const isFocused = useIsFocused();
// console.log('selectedAnswer',selectedAnswer);

//     useEffect(() => {
//         const backAction = () => {
//             handleBack();
//             return true;
//         };
//         const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
//         return () => backHandler.remove();
//     }, [currentQuestion]);

//     useEffect(() => {
//         if (isFocused) {
//             fetchQuestions();
//         }
//     }, [isFocused]);

//     const fetchQuestions = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const accessToken = await AsyncStorage.getItem("accessToken");
//             if (!accessToken) throw new Error("Authentication token not found");

//             const response = await api.get("survey/getAllQuestionsWithAnswers");
//             if (response.data.result) {
//                 setQuestions(response.data.data.questions);
//                 setCurrentQuestion(response.data.data.questions[0]);
//             } else {
//                 throw new Error(response.data.message || "Failed to fetch questions");
//             }
//         } catch (error) {
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSelectAnswer = (answer) => {
//         setSelectedAnswer(answer);
//     };

//     const handleNext = () => {
//         if (!selectedAnswer) return;
//         setQuestionHistory([...questionHistory, currentQuestion]);
//         const nextQuestion = questions.find(q => q.id === selectedAnswer.next_question_id);
//         if (nextQuestion) {
//             setCurrentQuestion(nextQuestion);
//             setSelectedAnswer(null);
//         } else {
//             console.log("Survey Completed", "Thank you for completing the survey.");
//         }
//     };

//     const handleBack = () => {
//         if (questionHistory.length > 0) {
//             const previousQuestion = questionHistory.pop();
//             setCurrentQuestion(previousQuestion);
//             setSelectedAnswer(null);
//             setQuestionHistory([...questionHistory]);
//         } else {
//             navigation.goBack();
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Image source={{ uri: profileData?.avatar || "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" }} style={styles.avatar} />
//                 <View style={styles.userInfo}>
//                     <Text style={styles.name}>{profileData?.name}</Text>
//                     <Text style={styles.phone}>{profileData?.mobile}</Text>
//                     <Text style={styles.email}>{profileData?.email}</Text>
//                 </View>
//             </View>
//             <ScrollView contentContainerStyle={styles.content}>
//                 {currentQuestion ? (
//                     <>
//                         <Text style={styles.question}>{currentQuestion.question_text}</Text>
//                         {currentQuestion.answers.map((item) => (
//                             <TouchableOpacity
//                                 key={item.id}
//                                 style={[styles.option, selectedAnswer?.id === item.id ? styles.selectedOption : null]}
//                                 onPress={() => handleSelectAnswer(item)}
//                             >
//                                 <Text style={styles.optionText}>{item.answer_text}</Text>
//                                 <Ionicons
//                                     name={selectedAnswer?.id === item.id ? "radio-button-on" : "radio-button-off"}
//                                     size={24}
//                                     color="black"
//                                 />
//                             </TouchableOpacity>
//                         ))}
//                     </>
//                 ) : (
//                     <Text style={styles.errorText}>No questions available.</Text>
//                 )}
//             </ScrollView>
//            {/* Next Button */}
//            {selectedAnswer && (
//                 // <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//                 //     <Text style={styles.nextButtonText}>Next</Text>
//                 // </TouchableOpacity>
//                 <View style={{ alignItems: "center" }}>
//                     <CustomButton
//                         title="Next"
//                         align="center"
//                         onPress={handleNext}
//                         style={{ padding: wp('3.5'), backgroundColor: Colors.black, borderRadius: wp('3.5'), width: wp('85') }}
//                         textstyle={{ fontSize: wp("3.9%") }}
//                     />
//                 </View>
//             )}
//             <Loader visible={loading} />
//         </View>
//     );
// };

// export default UserSurvey;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F7F7F7'
//     },

//     // Header
//     // header: {
//     //     width: wp('100%'),
//     //     height: hp('10%'),
//     //     backgroundColor: '#000',
//     //     flexDirection: 'row',
//     //     alignItems: 'center',
//     //     justifyContent: 'center',
//     //     paddingHorizontal: 15
//     // },
//     header: {
//         backgroundColor: '#020202',
//         // height: hp('20%'),
//         alignItems: 'center',
//         flexDirection: 'row',
//         padding: wp('8%'),
//         // justifyContent:'center'
//         // bottom:wp('5')
//     },
//     backButton: {
//         position: 'absolute',
//         left: wp('4%'),
//     },


//     // Content
//     content: {
//         alignItems: 'center',
//         padding: 20
//     },

//     // Question Text
//     question: {
//         fontSize: wp('5'),
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 15,
//         color: '#000'
//     },

//     // Answer Options
//     option: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         width: '90%',
//         padding: wp('3'),
//         borderWidth: 1,
//         borderRadius: 10,
//         backgroundColor: '#fff',
//         marginBottom: 10,
//         elevation: 6,
//         borderColor: '#aaa'
//     },
//     selectedOption: {
//         borderColor: "#aaa",
//         backgroundColor: '#EAEAEA'
//     },
//     optionText: {
//         fontSize: wp('4'),
//         color: "#000"
//     },

//     // Next Button
//     nextButton: {
//         backgroundColor: "#000",
//         padding: 15,
//         borderRadius: 8,
//         alignItems: "center",
//         marginBottom: 20,
//         width: "90%",
//         alignSelf: "center"
//     },
//     nextButtonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold"
//     },
//     userInfo: {
//         marginLeft: wp('5%'),
//     },

//     name: {
//         color: '#fff',
//         fontSize: wp('5%'),
//         fontWeight: 'bold',
//     },
//     phone: {
//         color: '#fff',
//         fontSize: wp('4%'),
//     },
//     email: {
//         color: '#ccc',
//         fontSize: wp('3.5%'),
//     },
//     avatar: {
//         width: wp('20'),
//         height: wp('20'),
//         borderRadius: wp('15'),
//         borderWidth: 3,
//         borderColor: '#fff',
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
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const surveyData = {
    "types": {
        "category": [
            "common",
            "professional",
            "student"
        ]
    },
    "questions": [
        {
            "id": "8b1b1aa0-d755-443e-a93b-e5514c3c8ce2",
            "question_text": "Tell us about yourself?",
            "category": [
                "common"
            ],
            "answers": [
                {
                    "id": "160dda3c-e6c0-4a3a-a5d1-c689870db610",
                    "answer_text": "professional",
                    "next_question_id": "4c8672a2-fe04-4860-aa52-b78b57a950d1"
                },
                {
                    "id": "7d55f2a1-023a-4fba-8c65-edc2fe01ed28",
                    "answer_text": "student",
                    "next_question_id": "bbf0016b-41ee-47bb-b667-d55aa47c9ada"
                }
            ]
        },
        {
            "id": "4c8672a2-fe04-4860-aa52-b78b57a950d1",
            "question_text": "Tell us about your  experience ?",
            "category": [
                "professional"
            ],
            "answers": [
                {
                    "id": "6d935309-51f7-4c7b-ad72-87c13d8adebc",
                    "answer_text": "5+ years",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                },
                {
                    "id": "79ec79ae-bdde-4154-bfaf-9d6b2fdb7602",
                    "answer_text": "4+ years",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                },
                {
                    "id": "a7cf9751-cc1d-4464-8962-ea2e9fb88479",
                    "answer_text": "2+ years",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                },
                {
                    "id": "2b7f9755-92c0-421d-bb0d-6cad4284a28b",
                    "answer_text": "1+ years",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                }
            ]
        },
        {
            "id": "d94f8b98-2e35-4677-9a22-7cc09a918899",
            "question_text": "Tell us  about your gender",
            "category": [
                "common"
            ],
            "answers": [
                {
                    "id": "108eb509-6d89-48e1-929b-993dac0a7a0e",
                    "answer_text": "Male",
                    "next_question_id": null
                },
                {
                    "id": "04b8544b-e51e-4792-b516-1041ab851798",
                    "answer_text": "Other",
                    "next_question_id": null
                },
                {
                    "id": "165e0bf6-83c0-4075-9edd-e2360ec01ce6",
                    "answer_text": "Female",
                    "next_question_id": null
                }
            ]
        },
        {
            "id": "bbf0016b-41ee-47bb-b667-d55aa47c9ada",
            "question_text": "Tell us about your education",
            "category": [
                "student"
            ],
            "answers": [
                {
                    "id": "ffa3797d-5cf4-41e2-8822-c0ad9d95234f",
                    "answer_text": "under graduate",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                },
                {
                    "id": "5572b03d-91e6-4a12-9154-3e3dfc2a11e7",
                    "answer_text": "post-graduate",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                },
                {
                    "id": "46debac8-7083-4370-a751-e07e3436b843",
                    "answer_text": "graduate",
                    "next_question_id": "d94f8b98-2e35-4677-9a22-7cc09a918899"
                }
            ]
        },
        {
            "id": "ffc27f8d-336c-4dcb-be1f-139a6e06fcdd",
            "question_text": "What is your gender??",
            "category": [
                "common"
            ],
            "answers": []
        }
    ]
};

const UserSurvey = ({ navigation, route }) => {
    const { profileData } = route.params || {};
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [responses, setResponses] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionHistory, setQuestionHistory] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const isFocused = useIsFocused();
console.log('responsesresponses',responses);

    useEffect(() => {
        const backAction = () => {
            handleBack();
            return true;
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [currentQuestion]);

    useEffect(() => {
        if (isFocused) {
            fetchQuestions();
        }
    }, [isFocused]);

    const fetchQuestions = async () => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = await AsyncStorage.getItem("accessToken");
            if (!accessToken) throw new Error("Authentication token not found");

            const response = await api.get("survey/getAllQuestionsWithAnswers");
            if (response.data.result) {
                setQuestions(response.data.data.questions);
                setCurrentQuestion(response.data.data.questions[0]);
            } else {
                throw new Error(response.data.message || "Failed to fetch questions");
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // const handleSelectAnswer = (question_id, item) => {
    //     console.log('raviansersss',question_id,item);
        
    //     setSelectedAnswer(item);
    // };
    const handleSelectAnswer = (question_id, item) => {
        console.log('Selected Answer:', item);
        setSelectedAnswer(item);
        const answer_id=item.id
        setResponses(prevResponses => {
            // Check if the question already has a selected answer
            const existingIndex = prevResponses.findIndex(resp => resp.question_id === question_id);
            
            if (existingIndex !== -1) {
                // Update the existing answer
                const updatedResponses = [...prevResponses];
                updatedResponses[existingIndex].answer_id = answer_id;
                return updatedResponses;
            } else {
                // Add a new answer selection
                return [...prevResponses, { question_id, answer_id }];
            }
        });
    };
    const handleNext = () => {
        if (!selectedAnswer) return;
        setQuestionHistory([...questionHistory, currentQuestion]);
        const nextQuestion = questions.find(q => q.id === selectedAnswer.next_question_id);
        if (nextQuestion) {
            setCurrentQuestion(nextQuestion);
            setSelectedAnswer(null);
        } else {
            console.log("Survey Completed", "Thank you for completing the survey.");
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
            <View style={styles.header}>
                <Image source={{ uri: profileData?.avatar || "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg" }} style={styles.avatar} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{profileData?.name}</Text>
                    <Text style={styles.phone}>{profileData?.mobile}</Text>
                    <Text style={styles.email}>{profileData?.email}</Text>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {currentQuestion ? (
                    <>
                        <Text style={styles.question}>{currentQuestion.question_text}</Text>
                        {currentQuestion.answers.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[styles.option, selectedAnswer?.id === item.id ? styles.selectedOption : null]}
                                onPress={() => handleSelectAnswer(currentQuestion.id,item)}
                            >
                                <Text style={styles.optionText}>{item.answer_text}</Text>
                                <Ionicons
                                    name={selectedAnswer?.id === item.id ? "radio-button-on" : "radio-button-off"}
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        ))}
                    </>
                ) : (
                    <Text style={styles.errorText}>No questions available.</Text>
                )}
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
            <Loader visible={loading} />
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



