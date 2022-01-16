import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useTheme } from '@react-navigation/native';

const MiniCards = (props) => {
  const navigation = useNavigation();

  const {colors} = useTheme();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("videoplayer", {
          videoId: props.videoId,
          videoTitle: props.title,
          channel: props.channel
        })
      }
    >
      <View style={styles.cardContainer}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
        />
        <View style={styles.textContainer}>
          <Text
            style={{ fontSize: 15, fontWeight: "bold", marginBottom: 5, color: colors.text }}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {props.title}
          </Text>
          <Text style={{ fontSize: 14, color: colors.text }} ellipsizeMode="tail" numberOfLines={1}>
            {props.channel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MiniCards;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  thumbnail: {
    width: "50%",
    height: 120,
  },
  textContainer: {
    marginLeft: 10,
    marginTop: 7,
    width: "48%",
  },
});
