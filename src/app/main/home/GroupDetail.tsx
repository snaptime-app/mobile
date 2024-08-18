import React, { useState, useEffect } from "react";
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
import { useAuthenticatedUser } from "@/lib/query/user";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

const { width: screenWidth } = Dimensions.get("window");

export const GroupDetail = ({ route, navigation }: GroupDetailProps) => {
  const { groupId } = route.params;
  const { colors } = useTheme();
  const { isSuccess: isDetailGetSuccessful, data: group } =
    useGroupDetail(groupId);
  const { isSuccess: isChallengesGetSuccessful, data: challenges } =
    useGroupChallenges(groupId);
  const { isSuccess: isMembersGetSuccessful, data: members } =
    useGroupMembers(groupId);
  const [titleRendered, setTitleRendered] = useState(false);
  const { isSuccess: isUserSuccess, data: userData } = useAuthenticatedUser();

  useEffect(() => {
    if (isDetailGetSuccessful) {
      console.log("GroupDetail", group);
      console.log(group.name);
      navigation.setOptions({
        headerTitle: group.name,
      });
      setTitleRendered(true);
    }
  }, [isDetailGetSuccessful, group, navigation]);

  if (!titleRendered) {
    return null;
  }

  console.log("GroupDetail", groupId);
  if (
    !isDetailGetSuccessful ||
    !isChallengesGetSuccessful ||
    !isMembersGetSuccessful ||
    !isUserSuccess
  ) {
    return null;
  }
  console.log("success");

  const renderItem = ({ item }: { item: GroupChallenge }) => {
    const isCompleted = userData.username === item.author || item.completed;
    const onPress = () => {
      navigation.push("AttemptPage", {
        challengeId: item.id,
        isAttemptable: !isCompleted,
      });
    };

    return (
      <PhotoCard
        username={item.author}
        postedTime={item.createdAt}
        imageUrl={imageKeytoUrl(item.correctImage)}
        onPress={onPress}
        isComplete={isCompleted}
      />
    );
  };

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const topScorer = members.sort((a, b) => b.points - a.points)[0];

  return (
    <View style={styles.container}>
      {titleRendered ? (
        <View style={styles.innerContainer}>
          <>
            <View style={[styles.header, { backgroundColor: colors.primary }]}>
              <Text style={[styles.headerText, { color: colors.onPrimary }]}>
                {topScorer.points > 0
                  ? `Top Scorer: ${topScorer.username} - ${topScorer.points} Points`
                  : "No Top Scorer Yet"}
              </Text>
            </View>

            <View style={styles.separatorLine} />
          </>

          <FlatList
            data={challenges}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={true}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "95%",
    borderRadius: 10,
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
    justifyContent: "center",
    gap: 16,
    paddingBottom: 16,
  },
  separator: {
    height: 10, // Space between cards
    backgroundColor: "transparent", // Adjust if you want a background color
  },
});
