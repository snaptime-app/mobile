import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Card, Avatar, FAB } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/main/home/layout";
import type { Group } from "@/lib/schema/group";

const DATA: Group[] = [
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
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        extraData={selectedId}
      />
      <FAB
        style={styles.fab}
        icon="message-outline"
        mode="flat"
        onPress={() => {
          console.log("FAB pressed");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
