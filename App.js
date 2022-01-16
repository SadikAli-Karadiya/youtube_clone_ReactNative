import React from "react";
import { StyleSheet, StatusBar, Text, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Videoplayer from "./src/screens/Videoplayer";
import Subscribe from "./src/screens/Subscribe";
import Explore from "./src/screens/Explore";
import { MaterialIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux-toolkit/store";
import { useSelector } from "react-redux";

export default () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};
export function Navigation() {
  const currentTheme = useSelector((state) => state.theme);

  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();

  const customDarkTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      headerColor: "#303030",
      iconColor: "white",
      tabIcon: "white",
      text: "white",
      statusBarColor: "black",
      border: "gray",
    },
  };
  const customDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      headerColor: "white",
      iconColor: "black",
      tabIcon: "red",
      text: "black",
      statusBarColor: "lightgray"
    },
  };

  const RootHome = () => {
    const { colors } = useTheme();

    return (
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Explore") {
              iconName = "explore";
            } else if (route.name === "Subscribe") {
              iconName = "subscriptions";
            }

            return <MaterialIcons name={iconName} size={25} color={color} />;
          },
        })}

        tabBarOptions={{
          activeTintColor: colors.tabIcon,
          inactiveTintColor: "gray",
        }}

        style={{borderTopWidth:1, borderTopColor: "white"}}
      >
        <Tabs.Screen name="Home" component={Home} />
        <Tabs.Screen name="Subscribe" component={Subscribe} />
        <Tabs.Screen name="Explore" component={Explore} />
      </Tabs.Navigator>
    );
  };

  return (
    <>
      <NavigationContainer
        theme={currentTheme ? customDarkTheme : customDefaultTheme}
      >
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="rootHome" component={RootHome} />
          <Stack.Screen name="search" component={Search} />
          <Stack.Screen name="videoplayer" component={Videoplayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
