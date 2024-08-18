import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, List, Card, IconButton, Text } from "react-native-paper";
import { FlatList } from "react-native";
import { useUserAll } from "@/lib/query/user";
import { UserWithMembership } from "@/lib/schema/user";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/main/home/layout";
import { useAuthenticatedUser } from "@/lib/query/user";
import { useGroupAddUser } from "@/lib/query/group";
import { useQueryClient } from "@tanstack/react-query";

type AddFriendRouteProp = RouteProp<RootStackParamList, "AddFriend">;

type AddFriendProps = {
  route: AddFriendRouteProp;
};

export const AddFriend = ({ route }: AddFriendProps) => {
  const { groupId } = route.params;
  console.log("Group ID:", groupId);

  const {
    isSuccess: userIsSuccess,
    data: userData,
    isError: isUserError,
    error: userError,
  } = useAuthenticatedUser();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isSuccess, isError, data, error } = useUserAll();
  const [allFriends, setAllFriends] = useState<string[]>([]);

  const { mutate } = useGroupAddUser();
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (isSuccess && userIsSuccess) {
      console.log("Data:", data);
      const filteredFriends = data
        .filter((user: UserWithMembership) => {
          const hasMatchingGroup = user.GroupMembership.some(
            (membership) => membership.groupId === groupId,
          );
          return user.username !== userData.username && !hasMatchingGroup;
        })
        .map((user) => user.username);
      setAllFriends(filteredFriends);
      setFilteredUsers(filteredFriends);
    }
  }, [isSuccess, userIsSuccess]);

  if (isError) {
    return <Text>Original Error: {error.message}</Text>;
  }
  if (isUserError) {
    return <Text>User Error: {userError.message}</Text>;
  }


  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredUsers(
        allFriends.filter((user) =>
          user.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredUsers(allFriends);
    }
  };

  const renderItem = ({ item }: { item: string }) => {
    const onPress = () => {
      mutate({ username: item, id: groupId });
      setFilteredUsers(filteredUsers.filter((user) => user !== item));
      setAllFriends(allFriends.filter((user) => user !== item));
      console.log("Added to group:", item);
      queryClient.invalidateQueries({ queryKey: ["users"] });
    };

    return (
      <Card style={styles.card}>
        <List.Item
          title={item}
          right={() => (
            <View style={styles.iconContainer}>
              <IconButton
                icon="plus"
                size={20}
                onPress={onPress}
                style={styles.icon}
              />
            </View>
          )}
        />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {isSuccess && userIsSuccess ? (
        <>
          <TextInput
            label="Search Users"
            value={searchQuery}
            onChangeText={onChangeSearch}
            style={styles.searchBar}
          />
          <FlatList
            data={filteredUsers}
            renderItem={renderItem}
            style={styles.list}
          />
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  list: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 8,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 8, // Adjust padding if needed
  },
  icon: {
    marginRight: 0, // Adjust if needed
  },
});
