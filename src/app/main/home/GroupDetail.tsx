import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { PhotoCard } from "@/components/PhotoCard";

type GroupDetailRouteProp = RouteProp<RootStackParamList, "GroupDetail">;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
};

// NOTE: might have to change definition
type ChallengeData = {
    id: number,
    author: string,
    createdAt: string,
    updatedAt: string,
    url: string,
}

// eventually get from server
const sampleChallengeData: ChallengeData[] = [
    {
      id: 1,
      author: "NotJeffery",
      createdAt: "2 hours ago",
      updatedAt: "2 hours ago",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
    {
        id: 2,
        author: "NotJeffery",
        createdAt: "4 hours ago",
        updatedAt: "4 hours ago",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
    {
        id: 3,
        author: "NotJeffery",
        createdAt: "17 hours ago",
        updatedAt: "17 hours ago",
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfTMZsQV_vbCQ-_QewiFkvRFYTEYpcgLVDjA&s",
    },
];


export const GroupDetail = ({ route }: GroupDetailProps) => {
  const { groupId } = route.params;

  const renderItem = ({ item }: { item: ChallengeData }) => (
    <PhotoCard
      username={item.author}
      postedTime={item.updatedAt}
      imageUrl={item.url}
    />
  );

  const ItemSeparatorComponent = () => (
    <View style={styles.separator} />
  );

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
    backgroundColor: 'transparent', // Adjust if you want a background color
  },
});
