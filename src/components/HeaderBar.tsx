import { Appbar, useTheme } from "react-native-paper";
import { getHeaderTitle } from "@react-navigation/elements";
import { type StackHeaderProps } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

export function HeaderBar({
  navigation,
  route,
  options,
  back,
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const theme = useTheme();

  return (
    <Appbar.Header style={[styles.header, {
      backgroundColor: theme.colors.secondaryContainer,
    }]}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} titleStyle={styles.title} />
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