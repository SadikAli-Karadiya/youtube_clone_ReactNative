import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import {TouchableOpacity} from 'react-native-gesture-handler'
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constant from "expo-constants";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../redux-toolkit/reducers/themeSlice";

export default function App() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const currentTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        // position: "relative",
        // top: 0,
        // left: 0,
        // right: 0,
        backgroundColor: colors.headerColor,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.leftSide}>
        <Entypo name="youtube" size={28} color="red" />
        <Text
          style={{
            marginLeft: 5,
            fontSize: 18,
            letterSpacing: -1,
            fontWeight: "bold",
            color: `${colors.iconColor}`,
          }}
        >
          YouTube
        </Text>
      </View>
      <View style={styles.rightSide}>
        <TouchableOpacity>
          <Ionicons name="md-videocam" size={25} color={colors.iconColor} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="md-search"
            size={25}
            color={colors.iconColor}
            onPress={() => navigation.navigate("search")}
            style={{elevation:4, zIndex: 200}}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="account-circle"
            size={25}
            color={colors.iconColor}
            onPress={() => {
              dispatch(changeTheme(!currentTheme));
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  leftSide: {
    marginLeft: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  rightSide: {
    marginRight: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: 130,
  },
});
