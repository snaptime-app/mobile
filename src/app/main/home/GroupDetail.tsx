import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { PhotoCard } from "@/components/PhotoCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { ChallengeData, sampleChallengeData } from "@/app/main/tempconstants";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

export const GroupDetail = ({ route, navigation }: GroupDetailProps) => {
  const { groupId } = route.params;

  const renderItem = ({ item }: { item: ChallengeData }) => {
    const onPress = () => {
        navigation.push("AttemptPage", { challengeId: item.id });
    }

    return (
        <PhotoCard
            username={item.author}
            postedTime={item.updatedAt}
            imageUrl={item.url}
            onPress={onPress}
        />
    )
    
  };

  const ItemSeparatorComponent = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
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
  inside: {
    flex: 1,
    alignItems: "center",
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
