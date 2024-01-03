import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/home";
import Calendar from "../screens/Calendar/calendar";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../util/color";
import Profile from "../screens/Profile/profile";


const Tab = createBottomTabNavigator();

const IconObject = {
  Home: "home",
  Calendar: "calendar",
  Profile: "person",
};

const BottomTapBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.black,
        tabBarStyle: {
          backgroundColor: colors.white,
          height: 60,
        },
        tabBarIcon: ({ focused, color }) => {
          const iconName = focused
            ? IconObject[route.name]
            : IconObject[route.name] + "-outline";
          const iconSize = 26;
          const iconStyle = focused
            ? {
                backgroundColor: colors.white,
                position: "absolute",
                bottom: 8,
                padding: 12,
                marginBottom: 10,
                borderRadius: 50,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }
            : {};

          return (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={iconName} size={iconSize} color={color} style={iconStyle} />
              {focused && (
                <Text
                  style={{
                    color: color,
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: 10,
                    marginTop: 30,
                  }}
                >
                  {route.name}
                </Text>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default BottomTapBar;