import { useAuthenticatedUser } from "@/lib/query/user";
import { setSession } from "@/lib/utils/session";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export function Profile() {
  const { isSuccess, data } = useAuthenticatedUser();
  let username = "Loading...";

  if (isSuccess) {
    username = data.username;
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title={`Hey, ${username}!`}
        />
        <Card.Actions>
          <Button>Settings</Button>
          <Button onPress={() => setSession(null)}>Sign Out</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
})