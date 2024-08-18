import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { List, Card, Text } from "react-native-paper";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { useGroupMembers } from "@/lib/query/groupMembers";

type Member = {
  user_id: number;
  username: string;
  points: number;
};

type GroupMembersListRouteProp = RouteProp<RootStackParamList, "Members">;

type GroupMembersListProps = {
  route: GroupMembersListRouteProp;
};

export const GroupMembersList = ({ route }: GroupMembersListProps) => {
  const { groupId } = route.params;
  const { isSuccess, isError, data, error } = useGroupMembers(groupId);

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const renderItem: ListRenderItem<Member> = ({ item }) => {
    return (
      <Card style={styles.card}>
        <List.Item title={item.username} />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {isSuccess ? (
        <>
          <FlatList data={data} renderItem={renderItem} />
        </>
      ) : null}
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
