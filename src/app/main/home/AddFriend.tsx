import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, List, Card, IconButton } from "react-native-paper";
import { FlatList } from "react-native";

type User = {
  id: number;
  name: string;
};

// eventually get from server
const allFriends: User[] = [
  { id: 1, name: "NotJeffery" },
  { id: 2, name: "Fan" },
  { id: 3, name: "Panda" },
  { id: 4, name: "Bun" },
];

type Member = {
  id: number;
  name: string;
};

//eventually get from server
const members: Member[] = [{ id: 1, name: "NotJeffery" }];

export const AddFriend = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const friends = allFriends.filter(
    (friend) => !members.some((member) => member.id === friend.id),
  );

  const [filteredUsers, setFilteredUsers] = useState<User[]>(friends);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setFilteredUsers(
        friends.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    } else {
      setFilteredUsers(friends);
    }
  };

  const renderItem = ({ item }: { item: User }) => {
    const onPress = () => {
      // SERVER CALL TO ADD USER TO GROUP
      console.log("Added to group:", item.name);
    };

    return (
      <Card style={styles.card}>
        <List.Item
          title={item.name}
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
