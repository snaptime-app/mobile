import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { ScrollView, StyleSheet, FlatList, View } from "react-native";
import { useCamera } from "@/components/Camera";
import {
  Button,
  Card,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";
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
    if (!key) {
      return;
    }

    mutate(
      { groupid, imagekey: key },
      {
        onSuccess: () => {
          navigation.popToTop();
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

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.listContainer,
          {
            backgroundColor: theme.colors.primaryContainer,
          },
        ]}
      >
        <Text style={styles.title} variant="headlineSmall">
          Choose a Group
        </Text>
        <View
          style={[
            styles.list,
            {
              backgroundColor: theme.colors.outline, 
              borderColor: theme.colors.outline,
             },
          ]}
        >
          <FlatList
            data={data}
            contentContainerStyle={styles.listContentContainer}
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
      </View>
    </ScrollView>
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
  title: {
    margin: 25,
    marginBottom: 0,
  },
  list: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
  },
  listContentContainer: {
    justifyContent: "space-between",
    gap: 1,
  },
  item: {},
});
