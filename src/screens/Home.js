import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Animated,
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import {useTheme } from "@react-navigation/native";

export default function Home() {
  const {colors} = useTheme();

  const cardData = useSelector((state) => state.video);

  const [homeCardData, setHomeCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 45); //(currentValue, minValue, maxValue - header height)
  const translateY = diffClamp.interpolate({
    inputRange: [0, 45],
    outputRange: [0, -45],
  });

  useEffect(() => {
    setLoading(true);
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&type=video&videoDefinition=any&videoDuration=any&videoSyndicated=any&videoType=any&key=AIzaSyBtVLr5OZNKBH3xRmKM4I18x5sW_bs1dxo`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setHomeCardData(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={colors.statusBarColor} />
      {/* <Animated.View
        style={{
          transform: [{ translateY: translateY }],
          zIndex: 100,
        }}
      >
        <Header />
      </Animated.View> */}
      <Header />

      {loading && (
        <ActivityIndicator size="large" color="red" style={{ marginTop: 15 }} />
      )}

      <FlatList
        data={cardData.video == null ? homeCardData : cardData.video}
        renderItem={({ item }) => {
          return (
            <Card
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
        keyExtractor={(item) => item.id.videoId}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      />
    </View>
  );
}
