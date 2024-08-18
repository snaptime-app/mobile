import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { ScrollView, StyleSheet, FlatList, View } from "react-native";
import { useCamera } from "@/components/Camera";
import { Button, List, Text, useTheme } from "react-native-paper";
import React, { useEffect } from "react";
import { useAuthenticatedUserGroups } from "@/lib/query/group";
import { useChallengeCreate } from "@/lib/query/challenges";

type TakeProps = StackScreenProps<StackParamList, "Send">;

export function Send({ navigation }: TakeProps) {
  const { isSuccess, data } = useAuthenticatedUserGroups();
  const { key } = useCamera();
  const theme = useTheme();
  const { mutate } = useChallengeCreate();

  if (!key) {
    navigation.navigate("Take");
    return null;
  }
  if (!isSuccess) {
    return null;
  }

  function send(groupid: number) {
    console.log("send", groupid, key);
    if (!key) {
      return;
    }

    mutate(
      { groupid, imagekey: key },
      {
        onSuccess: () => {
          console.log("success");
          // @ts-expect-error
          navigation.navigate("Home", {
            screen: "GroupDetail",
            params: { groupId: groupid },
          });
        },
        onError: (error) => {
          console.error(error);
        },
      },
    );
  }

  console.log(data);

  return (
    <View style={styles.container}>
      <List.Section
        style={[
          styles.listContainer,
          {
            backgroundColor: theme.colors.primaryContainer,
          },
        ]}
      >
        <List.Subheader>Choose a group to send to!</List.Subheader>
        <View style={styles.list}>
          <FlatList
            data={data}
            renderItem={(info) => (
              <List.Item
                style={[
                  styles.item,
                  { backgroundColor: theme.colors.tertiaryContainer },
                ]}
                title={info.item.name}
                onPress={() => send(info.item.id)}
                right={(props) => <List.Icon {...props} icon="send" />}
              />
            )}
          />
        </View>
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  listContainer: {
    borderRadius: 20,
    overflow: "hidden",
  },
  list: {
    // flex: 1,
    // margin: 10,
    // borderRadius: 20,
    // overflow: "hidden",
    // justifyContent: "flex-start",
    // gap: 30,
  },
  item: {},
});
