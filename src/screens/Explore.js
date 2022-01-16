import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Stylesheet,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
  TouchableOpacity
} from "react-native";
import Header from "../components/Header";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import { useTheme } from "@react-navigation/native";

const DifferentSection = ({ name, background }) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          width: 165,
          height: 45,
          backgroundColor: `${background}`,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white" }}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Explore = () => {
  const cardData = useSelector((state) => state.video);
  const [homeCardData, setHomeCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { colors } = useTheme();

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&order=rating&type=video&videoDefinition=any&videoDuration=any&videoSyndicated=any&videoType=any&key=AIzaSyBtVLr5OZNKBH3xRmKM4I18x5sW_bs1dxo`
    )
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
      <Header />
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            paddingBottom: 10,
            borderBottomColor: "lightgray",
            borderBottomWidth: 1,
          }}
        >
          <DifferentSection name="Trending" background="rgb(209, 40, 68)" />
          <DifferentSection name="Gaming" background="rgb(52, 217, 178)" />
          <DifferentSection name="Learning" background="rgb(222, 189, 84)" />
          <DifferentSection name="News" background="gray" />
          <DifferentSection name="Movies" background="rgb(52, 132, 217)" />
          <DifferentSection name="Sport" background="rgb(232, 132, 65)" />
        </View>

        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <Text
            style={{
              marginLeft: 15,
              fontSize: 16,
              fontWeight: "bold",
              color: colors.text,
            }}
          >
            Trending videos
          </Text>
        </View>

        {loading && (
          <ActivityIndicator
            size="large"
            color="red"
            style={{ marginTop: 15 }}
          />
        )}

        {/* <FlatList
          data={cardData.video == "" ? homeCardData : cardData.video}
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
        /> */}
        {cardData.video == null
          ? homeCardData &&
            homeCardData.map((item, index) => {
              return (
                <Card
                  key={index}
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channel={item.snippet.channelTitle}
                />
              );
            })
          : cardData.video &&
            cardData.video.map((item, index) => {
              return (
                <Card
                  key={index}
                  videoId={item.id.videoId}
                  title={item.snippet.title}
                  channel={item.snippet.channelTitle}
                />
              );
            })}
      </ScrollView>
    </View>
  );
};

export default Explore;
