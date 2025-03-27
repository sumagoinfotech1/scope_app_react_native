


import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import Toast from 'react-native-toast-message';
import { createNavigationContainerRef } from "@react-navigation/native";
import { showToast } from "./toastService";
import { Alert } from "react-native";

// Navigation Ref for handling navigation outside components
export const navigationRef = createNavigationContainerRef();

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the token
const refreshAccessToken = async () => {
  console.log("🔄 Attempting to refresh access token...");
 

  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    
    if (!refreshToken) {
      console.warn("❌ No refresh token found. Redirecting to login.");
      throw new Error("No refresh token available");
    }

    // Call API to get new tokens
    const response = await axios.post(`${API_URL}auth/refresh-token`, { refreshToken });

    if (!response.data.result) {
      console.warn("❌ Refresh token is invalid or expired."); 
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;

    // Store new tokens
    await AsyncStorage.setItem("accessToken", newAccessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    console.log("✅ Token refresh successful. New access token stored.");
    return newAccessToken;
  } catch (error) {
    console.error("❌ Token refresh failed:", error);

    // Clear tokens and log the user out
    await AsyncStorage.setItem("isLogin", "false");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");

    showToast("error", "Session Expired", "Session Expired");

    if (navigationRef.isReady()) {
      navigationRef.navigate("Mobile");
    }

    return null;
  }
};

// Request Interceptor: Attach token to every request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 errors
api.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.log("🔄 Access token expired. Trying to refresh...");
      originalRequest._retry = true; // Prevent infinite loop

      const newToken = await refreshAccessToken();

      if (newToken) {
        console.log("✅ Retrying request with new access token...");
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest); // Retry request with new token
      } else {
        console.warn("❌ Refresh token expired. Logging out user.");
        await AsyncStorage.setItem("isLogin", "false");
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
    
        showToast("error", "Session Expired", "Session Expired");
    
        if (navigationRef.isReady()) {
          navigationRef.navigate("Mobile");
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
