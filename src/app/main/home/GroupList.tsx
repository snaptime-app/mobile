import { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Card, Avatar, FAB } from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/main/home/layout";
import type { Group } from "@/lib/schema/group";
import { useAuthenticatedUserGroups } from "@/lib/query/group";
import { Text } from "react-native-paper";

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
  const { isSuccess, isError, data, error } = useAuthenticatedUserGroups();

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

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
      {!isSuccess ? (
        null
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          contentContainerStyle={styles.flatList}
        />
      )}
      <FAB
        style={styles.fab}
        icon="message-outline"
        label="Create Group"
        mode="flat"
        onPress={() => {
          navigation.push("GroupNew");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  flatList: {},
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
