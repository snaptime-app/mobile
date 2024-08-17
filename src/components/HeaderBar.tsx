import { Appbar, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { type StackHeaderProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import React from "react";

export function HeaderBar({
  navigation,
  route,
  options,
  back,
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const theme = useTheme();

  const groupId = route.params?.groupId as { groupId: number };

  return (
    <Appbar.Header style={[styles.header, {
      backgroundColor: theme.colors.secondaryContainer,
    }]}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} titleStyle={styles.title} />
      {route.name === 'GroupDetail' ? (
        <>
          <Appbar.Action
            onPress={() => {
              navigation.push('Members', { groupId });
            }}
            icon="account-multiple"
          />
          <Appbar.Action
            onPress={() => {
              navigation.push('AddFriend');
            }}
            icon="account-plus"
          />
          <Appbar.Action
            onPress={() => {
              console.log('Leaderboard was pressed');
            }}
            icon="trophy"
          />
        </>
      ) : null}
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    // borderBottomLeftRadius: 20,
    // borderBottomRightRadius: 20,
  },
  title: {
    fontWeight: "bold",
  },
});