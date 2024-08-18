import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  List,
  Card,
  Avatar,
  FAB,
  useTheme,
  Divider,
  Portal,
  Dialog,
  TextInput,
  Button,
} from "react-native-paper";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/main/home/layout";
import type { Group } from "@/lib/schema/group";
import { useAuthenticatedUserGroups, useGroupCreate } from "@/lib/query/group";
import { Text } from "react-native-paper";

type GroupCardProps = {
  item: Group;
  onPress: () => void;
};

const GroupCard = ({ item, onPress }: GroupCardProps) => {
  const theme = useTheme();

  return (
    <View>
      <List.Item
        title={item.name}
        left={(props) => (
          <Avatar.Text
            {...props}
            color={theme.colors.onSecondary}
            label={item.name.charAt(0)}
          />
        )}
        onPress={onPress}
      />
    </View>
  );
};

type GroupListProps = {
  navigation: StackNavigationProp<RootStackParamList, "GroupList">;
};

export const GroupList = ({ navigation }: GroupListProps) => {
  const [selectedId, setSelectedId] = useState<number>();
  const { isSuccess, isError, data, error } = useAuthenticatedUserGroups();
  const [modalVisible, setModalVisible] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const { mutate } = useGroupCreate();

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

  function handleNewGroup() {
    setModalVisible(false);
    mutate(
      { groupname: newGroupName },
      {
        onSuccess(group) {
          navigation.replace("GroupDetail", { groupId: group.id });
        },
      },
    );
  }

  return (
    <View style={styles.container}>
      {!isSuccess ? null : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          extraData={selectedId}
          contentContainerStyle={styles.flatList}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}
      <FAB
        style={styles.fab}
        icon="message-outline"
        label="Create Group"
        mode="flat"
        onPress={() => setModalVisible(true)}
      />

      <Portal>
        <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
          <Dialog.Title>New Group</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="New Group Name"
              value={newGroupName}
              onChangeText={setNewGroupName}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setModalVisible(false)}>Cancel</Button>
            <Button onPress={handleNewGroup}>Submit</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
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
