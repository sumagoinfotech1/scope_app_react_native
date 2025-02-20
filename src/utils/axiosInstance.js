// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API_URL } from "@env";
// import { useNavigation } from "@react-navigation/native";


// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Function to refresh the token
// const refreshAccessToken = async () => {
//   const navigation = useNavigation();

//   try {
//     const refreshToken = await AsyncStorage.getItem("refreshToken");

//     if (!refreshToken) {
//       throw new Error("No refresh token found");
//     }

//     const response = await axios.post(`${API_URL}auth/refresh-token`, {
//       refreshToken,
//     });

//     if (!response.data.result) {
//       throw new Error("Invalid refresh token");
//     }

//     const newAccessToken = response.data.data.accessToken;
//     const newRefreshToken = response.data.data.refreshToken;

//     // Store new tokens
//     await AsyncStorage.setItem("accessToken", newAccessToken);
//     await AsyncStorage.setItem("refreshToken", newRefreshToken);

//     return newAccessToken;
//   } catch (error) {
//     console.error("Token refresh failed:", error);

//     // Clear AsyncStorage if refresh fails (both tokens expired)
//     await AsyncStorage.clear();

//     // Navigate user to login screen (Mobile)
//     navigation.replace("Mobile");

//     return null;
//   }
// };
// // Request Interceptor: Attach token to every request
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response Interceptor: Handle 401 errors
// api.interceptors.response.use(
//   (response) => response, // Return response if successful
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite loops

//       const newToken = await refreshAccessToken();
//       if (newToken) {
//         originalRequest.headers.Authorization = `Bearer ${newToken}`;
//         return axios(originalRequest);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh the token
const refreshAccessToken = async (navigateToLogin) => {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const response = await axios.post(`${API_URL}auth/refresh-token`, {
      refreshToken,
    });

    if (!response.data.result) {
      throw new Error("Invalid refresh token");
    }

    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;

    // Store new tokens
    await AsyncStorage.setItem("accessToken", newAccessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed:", error);

    // Clear AsyncStorage if refresh fails (both tokens expired)
    await AsyncStorage.clear();

    // Navigate user to login screen
    if (navigateToLogin) navigateToLogin();

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
      originalRequest._retry = true; // Prevent infinite loops

      const newToken = await refreshAccessToken(() => {
        // Pass navigation callback
        navigationRef.current?.replace("Mobile");
      });

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

// Navigation Ref for handling navigation outside components
import { createNavigationContainerRef } from "@react-navigation/native";
export const navigationRef = createNavigationContainerRef();

export default api;
