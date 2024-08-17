import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Card, Avatar } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/main/home/layout";
import type { Group } from "@/lib/schema/group";

// eventually get from server
const data: Group[] = [
  {
    id: 1,
    name: "Friends",
  },
  {
    id: 2,
    name: "Better Friends",
  },
  {
    id: 3,
    name: "Goose",
  },
];

type GroupCardProps = {
  item: Group;
  onPress: () => void;
};

const GroupCard = ({ item, onPress }: GroupCardProps) => (
  <Card>
    <List.Item
      title={item.name}
      left={(props) => <Avatar.Text {...props} label={item.name.charAt(0)} />}
      onPress={onPress}
    />
  </Card>
);

type GroupListProps = {
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

export const GroupList = ({ navigation }: GroupListProps) => {
  const [selectedId, setSelectedId] = useState<number>();

  const renderItem = ({ item }: { item: Group }) => {
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? "white" : "black";

    return (
      <GroupCard
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.push("GroupDetail", { groupId: item.id });
        }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
        contentContainerStyle={styles.flatList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {
  }
});
