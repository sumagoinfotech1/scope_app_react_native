import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MainAppScreenHeader from '../../../ReusableComponents/MainAppScreenHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { showToast } from '../../../utils/toastService';
import api from '../../../utils/axiosInstance';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../../ReusableComponents/Loader';

const FAQScreen = () => {
    const [expandedId, setExpandedId] = useState(null);
  const isFocused = useIsFocused();
   const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  console.log('events',events);
  
    const faqs = [
        { id: '1', question: "How To Add Event ?", answer: "New Event Added 🚀\nA New Workshop On [Topic] Is Now Live! Register Before Seats Fill Up!" },
        { id: '2', question: "How To Add Event ?", answer: "" },
        { id: '3', question: "How To Add Event ?", answer: "" },
        { id: '4', question: "How To Add Event ?", answer: "" },
        { id: '5', question: "How To Add Event ?", answer: "" },
    ];

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const getFaq = async () => {
        try {
          setLoading(true);
          // console.log('Fetching Events...');
    
          // Make API Request
          const response = await api.get('faq/all');
    
          if (response.status === 200 && response.data?.result) {
            setEvents(response.data.data); // Store data in state
            console.log('dataRavi', response.data.data.map((item) => item.name));
    
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
        if (isFocused) {
            getFaq();
        }
      }, [isFocused]);

    const renderItem = ({ item }) => (
        <View>
            <TouchableOpacity style={styles.card} onPress={() => toggleExpand(item.id)}>
                <View style={styles.cardHeader}>
                    <Text style={styles.question}>{item.name}</Text>
                    <FontAwesome5 name={expandedId === item.id ? "chevron-down" : "chevron-up"} size={wp('3%')} color="#fff" />
                </View>
            </TouchableOpacity>

            {expandedId === item.id && item.answer !== "" && (
                <View style={styles.answerContainer}>
                    <Text style={styles.answerTitle}>{item.name}</Text>
                    <Text style={styles.answer}>{item.description}</Text>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MainAppScreenHeader headername="FAQ" color="#fff" />
            </View>

            {/* FAQ List */}
            <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
             <Loader visible={loading} />
        </View>
    );
};

export default FAQScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F7F7',
    },
    header: {
        width: wp('100%'),
        height: hp('10%'),
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2%'),
    },
    card: {
        backgroundColor: '#4E4E4E',
        borderRadius: wp('3%'),
        marginTop: hp('1.5%'),
        padding: wp('4%'),
        elevation:10

    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    question: {
        color: '#fff',
        fontSize: wp('3.5%'),
        fontWeight: 'bold',
    },
    answerContainer: {
        backgroundColor: '#fff',
        padding: wp('4%'),
        marginTop: -hp('1%'),
        borderRadius: wp('3%'),
        zIndex:-100,
        elevation:10
    },
    answerTitle: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        marginBottom: hp('0.5%'),
        color: 'black',
    },
    answer: {
        fontSize: wp('3.5%'),
        color: '#444',
    },
});
