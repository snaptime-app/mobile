import React from "react";
import { FlatList, StyleSheet, Dimensions } from "react-native";
import { Card, Text, Title, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type User = {
  id: number;
  name: string;
  points: number;
};

const sampleUsers: User[] = [
  { id: 1, name: "NotJeffery", points: 7 },
  { id: 2, name: "Bob", points: 2 },
  { id: 3, name: "Penguin", points: 1 },
  { id: 4, name: "Bun", points: 0 },
];

const { width: screenWidth } = Dimensions.get("window");

export const Leaderboard = () => {
  const { colors } = useTheme();

  const currentWeek = "Week 1";

  const renderItem = ({ item }: { item: User }) => (
    <Card style={[styles.card, {backgroundColor: colors.primary}]}>
      <Card.Content style={styles.cardContent}>
        <Title style={{color: colors.onPrimary}}>{item.name}</Title>
        <Text style={[styles.pointsText, {color: colors.onPrimary}]}>{item.points} Points</Text>
      </Card.Content>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.weekText, { color: colors.primary }]}>
        {currentWeek}
      </Text>
      <FlatList data={sampleUsers} renderItem={renderItem} style={{width: screenWidth * 0.9}} />
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
