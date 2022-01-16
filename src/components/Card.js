import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from '@react-navigation/native';

function Card(props) {
  const screenWidth = Dimensions.get("screen").width - 100;
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("videoplayer",{videoId:props.videoId, videoTitle: props.title, channel: props.channel})}>
      <View >
        <Image
          style={styles.thumbnail}
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
        />

        <View style={styles.iconAndTitle_Container}>
          <MaterialIcons
            name="account-circle"
            size={40}
            color= {colors.text}
            style={{ padding: 15 }}
          />
          <View>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", width: screenWidth, color: colors.text }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {props.title}
            </Text>
            <Text
              style={{ fontSize: 13, width: "85%", color: colors.text }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {props.channel}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: 200,
  },
  iconAndTitle_Container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
});
