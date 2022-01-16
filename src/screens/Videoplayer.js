import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import Card from "../components/Card";

const Videoplayer = ({ route }) => {
  const { videoId, videoTitle, channel } = route.params;

  const [recommendData, setRecommendData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=relevance&relatedToVideoId=wr6O9itXmJA&type=video&videoDefinition=any&videoDuration=any&videoSyndicated=true&videoType=any&key=AIzaSyBtVLr5OZNKBH3xRmKM4I18x5sW_bs1dxo`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setRecommendData(data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [videoId]);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"darkgray"} />
      <View style={{ width: "100%", height: 200 }}>
        <WebView
          source={{ uri:`https://www.youtube.com/embed/${videoId}` }}
          allowsInlineMediaPlayback={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>
      <View style={{ borderBottomWidth: 3, borderBottomColor: "red" }}>
        <Text
          style={{
            fontSize: 18,
            width: Dimensions.get("screen").width - 50,
            margin: 9,
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {videoTitle}
        </Text>
        <Text
          style={{
            fontSize: 17,
            width: Dimensions.get("screen").width - 50,
            margin: 9,
            fontWeight: "bold",
          }}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {channel}
        </Text>
      </View>

      <ScrollView>
        {loading && (
          <ActivityIndicator
            size="large"
            color="red"
            style={{ marginTop: 15 }}
          />
        )}

        <FlatList
          data={recommendData}
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
        />
      </ScrollView>
    </View>
  );
};

export default Videoplayer;
