

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack/HomeStack";
import ProfileStack from "./ProfileStack/ProfileStack";
import NotificationStack from "./NotificationStack/NotificationStack";
import UpcomingStack from "./UpcomingStack/UpcomingStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/Feather";

const Tab = createBottomTabNavigator();

// Reusable function for setting tab icons
const getTabIcon = (routeName, focused) => {
  const icons = {
    Event: focused ? "calendar-star" : "calendar-star",
    UpcomingEvent: focused ? "calendar-clock" : "calendar-clock-outline",
    Notifications: focused ? "bell" : "bell-outline",
    Profile: focused ? "account-circle" : "account-circle-outline",
  };
  return icons[routeName] || "help-circle-outline";
};

const MainApp = () => {
  return (
    <Tab.Navigator
    initialRouteName="Event"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ focused }) => (
          <MaterialCommunityIcons
            name={getTabIcon(route.name, focused)}
            size={30}
            color={focused ? "#000" : "#B0B0B0"}
          />
        ),
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#B0B0B0",
      })}
    >
      <Tab.Screen name="Event" component={HomeStack}     options={{ unmountOnBlur: true }}  />
      <Tab.Screen name="UpcomingEvent" component={UpcomingStack} />
      <Tab.Screen name="Notifications" component={NotificationStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default MainApp;
