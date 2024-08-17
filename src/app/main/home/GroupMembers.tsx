import React from "react";
import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { List, Card, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";

type Member = {
  id: number;
  name: string;
};

type GroupMembersListRouteProp = RouteProp<RootStackParamList, "Members">;

type GroupMembersListProps = {
  route: GroupMembersListRouteProp;
};

// eventually get from server
const members: Member[] = [
  { id: 1, name: "NotJeffery" },
];

export const GroupMembersList = ({ route }: GroupMembersListProps) => {
  const { groupId } = route.params;

  const renderItem: ListRenderItem<Member> = ({ item }) => (
    <Card style={styles.card}>
        <List.Item
            title={item.name}
        />
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={members}
        renderItem={renderItem}
      />
      <Text >Selected Group ID: {groupId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginBottom: 8,
    borderRadius: 8,
  },
});
