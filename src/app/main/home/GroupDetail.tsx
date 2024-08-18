import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { PhotoCard } from "@/components/PhotoCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChallengeData, sampleChallengeData } from "@/app/main/tempconstants";
import { useTheme } from "react-native-paper";
import { useGroupDetail } from "@/lib/query/group";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

const { width: screenWidth } = Dimensions.get("window");

export const GroupDetail = ({ route, navigation }: GroupDetailProps) => {
  const { groupId } = route.params;
  const { colors } = useTheme();
  const { isSuccess, data } = useGroupDetail(groupId);

  if (!isSuccess) {
    return null;
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data.name)
      navigation.setOptions({
        title: data.name,
      });
    }
  }, [isSuccess, data, navigation]);

  const renderItem = ({ item }: { item: ChallengeData }) => {
    const onPress = () => {
      navigation.push("AttemptPage", { challengeId: item.id });
    };

    return (
      <PhotoCard
        username={item.author}
        postedTime={item.updatedAt}
        imageUrl={item.url}
        onPress={onPress}
      />
    );
  };

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  const topScorer = {
    name: "NotJeffery",
    points: 7,
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.primary }]}>
        <Text style={[styles.headerText, { color: colors.onPrimary }]}>
          Top Scorer: {topScorer.name} - {topScorer.points} Points
        </Text>
      </View>

      {/* Separator */}
      <View style={styles.separatorLine} />

      <FlatList
        data={sampleChallengeData}
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
