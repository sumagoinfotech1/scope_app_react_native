import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text, Image, Dimensions, ImageBackground, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../utils/axiosInstance';
import Loader from '../../../ReusableComponents/Loader';
import { showToast } from '../../../utils/toastService';
const { width } = Dimensions.get('window');

const transactions = [
  { id: '1', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
  { id: '2', title: 'Referral Bonus For Code Used By Others', time: '1 mon ago', points: '+20 COINS' },
];

const RewardsScreen = () => {

  const [rewardHistory, setRewardHistory] = useState([]);
  const [rewardCoins, setRewardCoins] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  // const getRewardHistory = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     // Get user ID from AsyncStorage
  //     const userId = await AsyncStorage.getItem('User_id');
  //     console.log('Retrieved User ID:', userId);

  //     if (!userId) {
  //       throw new Error('User ID not found in AsyncStorage');
  //     }

  //     // Make API request
  //     const response = await api.get(`reward-history/user?id=${userId}`);
  //     console.log('API Response:', response.data);

  //     if (response.status === 200) {
  //       if (response.data?.result) {
  //         setRewardHistory(response.data.data); // Store data in state
  //       }
  //     } else if (response.status === 400) {
  //       showToast("error", response.data?.message || "Bad Request: Reward history not found.");
  //       setError(response.data?.message || "Bad Request: Reward history not found.");
  //     }
  //   } catch (error) {
  //     console.error('Error fetching reward history:', error);

  //     if (error.response) {
  //       const { status, data } = error.response;
  //       if (status === 400) {
  //         showToast("error", data?.message || "Bad Request: Reward history not found.");
  //         setError(data?.message || "Bad Request: Reward history not found.");
  //       } else {
  //         showToast("error", data?.message || "An error occurred");
  //         setError(data?.message || "An error occurred");
  //       }
  //     } else {
  //       showToast("error", "Network error. Please check your internet connection.");
  //       setError("Network error. Please check your internet connection.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const getRewardHistory = async (page = 1) => {
    try {
      if (page === 1) setLoading(true);
      setError(null);

      // Get user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('User_id');
      console.log('Retrieved User ID:', userId);

      if (!userId) {
        throw new Error('User ID not found in AsyncStorage');
      }

      // Make API request with pagination
      const response = await api.get(`reward-history/user?id=${userId}&pageSize=20&currentPage=${page}`);
      console.log('API Response:', response.data);

      if (response.status === 200) {
        if (response.data?.result) {
          const newData = response.data.data;
          setRewardHistory(page === 1 ? newData : [...rewardHistory, ...newData]); // Append new data
          setTotalPages(response.data.pagination.totalPages);
        }
      } else {
        showToast("error", response.data?.message || "Bad Request: Reward history not found.");
        setError(response.data?.message || "Bad Request: Reward history not found.");
      }
    } catch (error) {
      console.error('Error fetching reward history:', error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          showToast("error", data?.message || "Bad Request: Reward history not found.");
          setError(data?.message || "Bad Request: Reward history not found.");
        } else {
          showToast("error", data?.message || "An error occurred");
          setError(data?.message || "An error occurred");
        }
      } else {
        showToast("error", "Network error. Please check your internet connection.");
        setError("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  // Load more data when user scrolls to the end
  const loadMoreRewards = () => {
    if (currentPage < totalPages && !isFetchingMore) {
      setIsFetchingMore(true);
      setCurrentPage(prev => prev + 1);
      getRewardHistory(currentPage + 1);
    }
  };
  const getRewardCoins = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user ID from AsyncStorage
      const userId = await AsyncStorage.getItem('User_id');
      console.log('Retrieved User ID:', userId);

      if (!userId) {
        throw new Error('User ID not found in AsyncStorage');
      }

      // Make API request
      const response = await api.get(`coins/count?id=${userId}`);
      console.log('Coins Response:', response.data.data);

      if (response.status === 200) {
        if (response.data?.result) {
          setRewardCoins(response.data.data); // Store data in state
        }
      } else if (response.status === 400) {
        showToast("error", response.data?.message || "Bad Request: Reward history not found.");
        setError(response.data?.message || "Bad Request: Reward history not found.");
      }
    } catch (error) {
      console.error('Error fetching reward history:', error);

      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          showToast("error", data?.message || "Bad Request: Reward history not found.");
          setError(data?.message || "Bad Request: Reward history not found.");
        } else {
          showToast("error", data?.message || "An error occurred");
          setError(data?.message || "An error occurred");
        }
      } else {
        showToast("error", "Network error. Please check your internet connection.");
        setError("Network error. Please check your internet connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewardHistory();
    getRewardCoins();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const options = {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // 12-hour format
    };

    return date.toLocaleString("en-US", options);
  };
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <ImageBackground source={require('../../../assets/icons/Ellipse2.png')} style={styles.headerContainer}>
        <View source={require('../../../assets/icons/Ellipse2.png')} style={styles.header}>
          <Image source={require('../../../assets/icons/RefereEarnCoin.png')} style={styles.coinIcon} />
          <Text style={styles.points}>
            {rewardCoins.count} <Text style={styles.pointsText}>Points</Text>
          </Text>
          <Text style={styles.rewardText}>
            Keep Earning Reward Something{"\n"}Exciting Awaiting For You
          </Text>
        </View>
      </ImageBackground>

      {/* Transactions List */}
      <FlatList
        data={rewardHistory}
        keyExtractor={(item) => item.id.toString()} // Ensure ID is a string
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <View style={styles.transactionContent}>
              <Text style={styles.transactionTitle}>{item.description}</Text>
              <Text style={styles.transactionTime}>{formatTimestamp(item.createdAt)}</Text>
            </View>
            <Text style={styles.transactionPoints}>+{item.amount}</Text>
          </View>
        )}
        contentContainerStyle={[
          styles.listContainer,
          { flexGrow: 1, paddingBottom: 20 },
        ]}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreRewards} // Load more when reaching bottom
        onEndReachedThreshold={0.5} // Trigger when 50% close to end
        ListFooterComponent={
          isFetchingMore ? <ActivityIndicator size="small" color="#000" /> : null
        }
        ListEmptyComponent={
          !loading && !error && (
            <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }}>
              <Text style={{ fontSize: wp("5"), fontWeight: "bold", color: "gray" }}>
              No reward history available
              </Text>
            </View>
          )
        }
      />

      {/* Error Message */}
      {error && (
        <View style={{ alignItems: "center", justifyContent: "center", marginVertical: 10 }}>
          <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>
        </View>
      )}

      {/* Loader */}
      <Loader visible={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    // backgroundColor: '#373737',
    // borderBottomLeftRadius: 90,
    // borderBottomRightRadius: 90,
    paddingBottom: wp('1%'),
    width: wp("100%"),
    height: wp("100%"),
    justifyContent: "center",
    resizeMode: 'contain'

  },
  header: {
    alignItems: 'center',
    paddingTop: wp('10%'),
  },
  coinIcon: {
    width: wp('32%'),
    height: wp('32%'),
    marginBottom: wp('2%'),
  },
  points: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: 'white',
  },
  pointsText: {
    fontSize: wp('4.5%'),
    color: 'white',
  },
  rewardText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    fontSize: wp('4%'),
  },
  listContainer: {
    paddingHorizontal: wp('5%'),
    paddingTop: wp('5%'),
  },
  transactionCard: {
    backgroundColor: 'white',
    padding: wp('4%'),
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: wp('3%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1
  },
  transactionContent: {
    flex: 1,

  },
  transactionTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
    width: wp('70')
  },
  transactionTime: {
    fontSize: wp('3.5%'),
    color: 'gray',
    marginTop: 3,
  },
  transactionPoints: {
    color: '#FFA500',
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
  },
});

export default RewardsScreen;
