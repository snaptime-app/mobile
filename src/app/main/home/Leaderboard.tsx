import React from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { Card, Text, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGroupMembers } from "@/lib/query/groupMembers";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";

type User = {
  user_id: number;
  username: string;
  points: number;
};

const { width: screenWidth } = Dimensions.get("window");
type LeaderboardRouteProp = RouteProp<RootStackParamList, "Leaderboard">;

type LeaderboardProps = {
  route: LeaderboardRouteProp;
};
export const Leaderboard = ({ route }: LeaderboardProps) => {
  const { groupId } = route.params;
  const { colors } = useTheme();
  const { isSuccess, isError, data, error } = useGroupMembers(groupId);
  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const currentWeek = "Week 1";

  const renderItem = ({ item }: { item: User }) => (
    <Card style={[styles.card, { backgroundColor: colors.primary }]}>
      <Card.Content style={styles.cardContent}>
        <Title style={{ color: colors.onPrimary }}>{item.username}</Title>
        <Text style={[styles.pointsText, { color: colors.onPrimary }]}>
          {item.points} Points
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isSuccess ? (
        <>
          <Text style={[styles.weekText, { color: colors.primary }]}>
            {currentWeek}
          </Text>
          <FlatList
            data={data}
            renderItem={renderItem}
            style={{ width: screenWidth * 0.9 }}
          />
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  weekText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 12,
    borderRadius: 8,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pointsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
