import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { PhotoCard } from "@/components/PhotoCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChallengeData, sampleChallengeData } from "@/app/main/tempconstants";
import { useTheme } from "react-native-paper";
import { useGroupChallenges, useGroupDetail } from "@/lib/query/group";
import type { GroupChallenge } from "@/lib/schema/group";
import { imageKeytoUrl } from "@/lib/utils/image";
import { useGroupMembers } from "@/lib/query/groupMembers";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

const { width: screenWidth } = Dimensions.get("window");

export const GroupDetail = ({ route, navigation }: GroupDetailProps) => {
  const { groupId } = route.params;
  const { colors } = useTheme();
  const { isSuccess: isDetailGetSuccessful, data: group } = useGroupDetail(groupId);
  const { isSuccess: isChallengesGetSuccessful, data: challenges } = useGroupChallenges(groupId);
  const { isSuccess: isMembersGetSuccessful, data: members } = useGroupMembers(groupId);

  useEffect(() => {
    console.log("GroupDetail", isDetailGetSuccessful, group);
    if (isDetailGetSuccessful) {
      console.log("GroupDetail", group);
      console.log(group.name)
      navigation.setOptions({
        title: group.name,
      });
    }
  }, [isDetailGetSuccessful, group, navigation]);

  console.log("GroupDetail", groupId);
  if (!isDetailGetSuccessful || !isChallengesGetSuccessful || !isMembersGetSuccessful) {
    return null;
  }
  console.log("success")

  const renderItem = ({ item }: { item: GroupChallenge }) => {
    const onPress = () => {
      navigation.push("AttemptPage", { challengeId: item.id });
    };

    return (
      <PhotoCard
        username={item.author}
        postedTime={item.createdAt}
        imageUrl={imageKeytoUrl(item.correctImage)}
        onPress={onPress}
        isComplete={item.completed}
      />
    );
  };

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const topScorer = members.sort((a, b) => b.points - a.points)[0];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerText, { color: colors.onPrimary }]}>
          Top Scorer: {topScorer.username} - {topScorer.points} Points
        </Text>
      </View>

      {/* Separator */}
      <View style={styles.separatorLine} />

      <FlatList
        data={challenges}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={ItemSeparatorComponent}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "95%",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separatorLine: {
    height: 1,
    width: "100%",
  },
  list: {
    flexGrow: 1,
    justifyContent: "center",
  },
  separator: {
    height: 10, // Space between cards
    backgroundColor: "transparent", // Adjust if you want a background color
  },
});
