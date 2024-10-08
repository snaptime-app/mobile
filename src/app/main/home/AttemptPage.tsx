import React from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import {
  Text,
  List,
  Icon,
  Card,
  Title,
  Caption,
  FAB,
} from "react-native-paper";
import { RootStackParamList } from "@/app/main/home/layout";
import { useTheme } from "react-native-paper";
import type { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChallenge } from "@/lib/query/challenges";
import { imageKeytoUrl } from "@/lib/utils/image";
import type { Submission } from "@/lib/schema/submission";
import { PhotoCard } from "@/components/PhotoCard";

type AttemptPageProps = StackScreenProps<RootStackParamList, "AttemptPage">;

export const AttemptPage = ({ route, navigation }: AttemptPageProps) => {
  const { colors } = useTheme();
  const { challengeId, isAttemptable } = route.params;
  const { isSuccess, data } = useChallenge(challengeId);

  if (!isSuccess) {
    return null;
  }

  const renderItem = ({ item }: { item: Submission }) => (
    <View>
      <List.Item
        title={item.creator.username}
        right={() => (
          <View style={styles.statusContainer}>
            <Icon
              source={item.isCorrect ? "check" : "close"}
              color={item.isCorrect ? "#4caf50" : "#f44336"}
              size={24}
            />
            <Text
              style={[
                styles.status,
                { color: item.isCorrect ? "#4caf50" : "#f44336" },
              ]}
            >
              {item.isCorrect ? "Success" : "Failed"}
            </Text>
          </View>
        )}
        style={{ width: screenWidth * 0.8 }}
      />
    </View>
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <PhotoCard
        username={data.author.username}
        postedTime={data.createdAt}
        imageUrl={imageKeytoUrl(data.correctImage)}
        isComplete={!isAttemptable}
      />
      <FlatList
        data={data.submissions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={styles.list}
      />
      {isAttemptable ? (
        <FAB
          style={styles.fab}
          icon="play"
          label="Attempt"
          mode="flat"
          onPress={() => navigation.push("SubmitPage", { challengeId })}
        />
      ) : null}
    </View>
  );
};

const { width: screenWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  list: {
    marginTop: 20,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  status: {
    fontWeight: "bold",
    marginLeft: 8,
  },
  card: {
    borderRadius: 8,
    width: screenWidth * 0.8,
  },
  separator: {
    height: 10, // Space between cards
    backgroundColor: "transparent", // Adjust if you want a background color
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
