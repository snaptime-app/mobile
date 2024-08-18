import React, { useState, useEffect} from "react";
import { FlatList, StyleSheet, Dimensions, View } from "react-native";
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
  const [ sortedData, setSortedData ] = useState<User[]>([]);
  // const data = [
  //     {
  //       "user_id": 1,
  //       "username": "user1",
  //       "points": 100
  //     },
  //     {
  //       "user_id": 2,
  //       "username": "user2",
  //       "points": 200
  //     },
  //     {
  //       "user_id": 3,
  //       "username": "user3",
  //       "points": 300
  //     }
  // ];

  // const isSuccess = true;
  // const isError = false;
  
  useEffect(() => {
    if (isSuccess && data) {
      // Sort the data by points in descending order
      const sorted = data.slice().sort((a, b) => b.points - a.points);
      setSortedData(sorted);
    }
  }, [isSuccess, data]);

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
    <View style={styles.container}>
      {isSuccess ? (
        <>
          <Text style={[styles.weekText, { color: colors.primary }]}>
            {currentWeek}
          </Text>
          <FlatList
            data={sortedData}
            renderItem={renderItem}
            style={{ width: screenWidth * 0.9 }}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  weekText: {
    marginTop: 16,
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
