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
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { ChallengeData, sampleChallengeData } from "@/app/main/tempconstants";
import { useTheme } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChallenge } from "@/lib/query/challenges";
import { imageKeytoUrl } from "@/lib/utils/image";

type User = {
  id: number;
  username: string;
};

type Challenge = {
  id: number;
  description: string;
};

type Submission = {
  id: number;
  isCorrect: boolean;
  challenge: Challenge;
  createdAt: string;
  creator: User;
};

const submissionData: Submission[] = [
  {
    id: 1,
    isCorrect: true,
    challenge: { id: 101, description: "Challenge 1" },
    createdAt: "4 hours ago",
    creator: { id: 1, username: "NotJeffery (You)" },
  },
  {
    id: 2,
    isCorrect: false,
    challenge: { id: 102, description: "Challenge 2" },
    createdAt: "2 hours ago",
    creator: { id: 2, username: "Bun" },
  },
  {
    id: 3,
    isCorrect: true,
    challenge: { id: 103, description: "Challenge 3" },
    createdAt: "1 hour ago",
    creator: { id: 3, username: "Goose2" },
  },
];

type AttemptPageProp = RouteProp<RootStackParamList, "AttemptPage">;

type AttemptPageProps = {
  route: AttemptPageProp;
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

export const AttemptPage = ({ route, navigation }: AttemptPageProps) => {
  const { colors } = useTheme();
  const { challengeId } = route.params;
  const { isSuccess, data } = useChallenge(challengeId)

  if (!isSuccess) {
    return null
  }

  let cardData = undefined;

  const renderItem = ({ item }: { item: Submission }) => (
    <Card>
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
    </Card>
  );
  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <SafeAreaView style={styles.container}>
      <Card
        style={[styles.card, { backgroundColor: colors.primaryContainer }]}
        mode="contained"
      >
        <Card.Content>
          <Title>{data.author.username}</Title>
          <Caption>{data.createdAt.toString()}</Caption>
        </Card.Content>
        <Card.Cover
          source={{ uri: imageKeytoUrl(data.correctImage) }}
          style={{ borderRadius: 0 }}
        />
      </Card>
      <FlatList
        data={submissionData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="play"
        label="Attempt"
        onPress={() => navigation.push("SubmitPage", { challengeId })}
      />
    </SafeAreaView>
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
