import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MiniCards from "../components/MiniCards";
import { useSelector, useDispatch } from "react-redux";
import { setVideos } from "../../redux-toolkit/reducers/videoSlice";
import { useTheme } from "@react-navigation/native";

const Search = ({ navigation }) => {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const miniCardData = useSelector((state) => state.video);

  const { colors } = useTheme();

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${userInput}&type=video&videoDuration=any&videoType=any&key=AIzaSyBtVLr5OZNKBH3xRmKM4I18x5sW_bs1dxo`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        dispatch(setVideos(data.items));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: colors.headerColor,
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 0.2,
          borderBottomColor: "gray",
          marginBottom: 20,
        }}
      >
        <Ionicons
          name="md-arrow-back"
          size={25}
          style={{ padding: 13, color: colors.text }}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => setUserInput(text)}
          placeholder="Search YouTube"
        />
        <Ionicons
          name="md-send"
          size={20}
          style={{ padding: 10, color: colors.text }}
          onPress={() => fetchData()}
        />
      </View>

      {loading && <ActivityIndicator size="large" color="red" />}

      <FlatList
        data={miniCardData.video}
        renderItem={({ item }) => {
          return (
            <MiniCards
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
        keyExtractor={(item) => item.id.videoId}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    height: 34,
    padding: 8,
    backgroundColor: "#e6e6e6",
  },
});
