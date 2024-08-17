import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { List, Card, Avatar } from "react-native-paper";
// import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackNavigationProp } from '@react-navigation/stack';

import { GroupDetail } from "@/app/main/home/GroupDetail";
import { RootStackParamList } from "@/app/main/types";

type GroupData = {
  id: number;
  name: string;
};

const DATA: GroupData[] = [
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
  item: GroupData;
  onPress: () => void;
};

const GroupCard = ({ item, onPress }: GroupCardProps) => (
  <Card style={styles.card}>
    <List.Item
      title={item.name}
      left={(props) => <Avatar.Text {...props} label={item.name.charAt(0)} />}
      onPress={onPress}
    />
  </Card>
);

type GroupListProps = {
    navigation: StackNavigationProp<RootStackParamList, 'GroupList'>;
  };
  

export const GroupList = ({navigation} : GroupListProps) => {
  const [selectedId, setSelectedId] = useState<number>();

  const renderItem = ({ item }: { item: GroupData }) => {
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
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "white",
  },
});

const Stack = createStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="GroupList" component={GroupList} />
    <Stack.Screen name="GroupDetail" component={GroupDetail} />
  </Stack.Navigator>
);
