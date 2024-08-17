import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
};

export const GroupDetail = ({ route }: GroupDetailProps) => {
  const { groupId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Group Detail</Text>
      <Text style={styles.details}>Selected Group ID: {groupId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  details: {
    fontSize: 18,
  },
});
