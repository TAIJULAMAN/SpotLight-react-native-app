import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft, Clock } from "lucide-react-native";
import { useRouter } from "expo-router";
import Head from "expo-router/head";
import { useVideoPlayer, VideoView } from "expo-video";

export const metadata = {
  title: "Watch Episode | Dark Grevil",
  description: "Watch the full episode and final showdown on Dark Grevil",
  author: "Khaled Alghanim",
};

const { width } = Dimensions.get("window");
const videoSource = require("../assets/video/shaiq.mp4");

export default function WatchEpisodePage() {
  const router = useRouter();
  const player = useVideoPlayer(videoSource, (p) => {
    p.loop = true;
    p.play();
    p.muted = false;
    p.volume = 1.0;
    p.audioMixingMode = "doNotMix";
  });

  return (
    <SafeAreaView style={styles.container}>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="author" content={metadata.author} />
      </Head>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/home")}
            activeOpacity={0.8}
          >
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Watch Episode</Text>
            <Text style={styles.headerSubtitle}>Watch the full episode</Text>
          </View>
        </View>

        {/* Video Player Area */}
        <View style={styles.videoContainer}>
          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          <Text style={styles.episodeTitle}>Great Episode of the Winners</Text>

          <View style={styles.badgeRow}>
            <View style={styles.seasonBadge}>
              <Text style={styles.seasonBadgeText}>SEASON FINALE</Text>
            </View>
            <View style={styles.metaInfo}>
              <Clock color="rgba(255,255,255,0.6)" size={16} />
              <Text style={styles.metaText}>20 min</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>Episode 12</Text>
            </View>
          </View>

          <Text style={styles.description}>
            Witness the ultimate showdown as the final votes are cast. The
            winners face their biggest challenge yet in this thrilling
            conclusion. Alliances will be tested, and only one will rise to
            claim the ultimate victory.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  backButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 14,
  },
  videoContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  video: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#111827",
  },
  contentSection: {
    paddingHorizontal: 24,
    marginTop: 28,
  },
  episodeTitle: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },
  seasonBadge: {
    backgroundColor: "#2E1B3D",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 16,
  },
  seasonBadgeText: {
    color: "#A855F7",
    fontSize: 12,
    fontWeight: "bold",
  },
  metaInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    marginLeft: 6,
  },
  metaDot: {
    color: "rgba(255, 255, 255, 0.4)",
    marginHorizontal: 8,
  },
  description: {
    color: "rgba(255, 255, 255, 0.65)",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
});
