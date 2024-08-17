import { StyleSheet, View } from "react-native";
import { RootStackParamList } from "@/app/main/home/layout";
import type { StackScreenProps } from "@react-navigation/stack";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { useGroupCreate } from "@/lib/query/group";

type GroupNewProps = StackScreenProps<RootStackParamList, "GroupNew">;

export const GroupNew = ({ route, navigation }: GroupNewProps) => {
  const [name, setName] = useState("");
  const { mutate } = useGroupCreate();

  function onSubmit() {
    mutate({ groupname: name }, {
      onSuccess(group) {
      navigation.replace("GroupDetail", { groupId: group.id });
    } });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.textInput}
          label="Group Name"
          value={name}
          onChangeText={(n) => setName(n)}
        />
        <Button style={styles.button} mode="contained" onPress={onSubmit}>
          Create
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  form: {
    margin: 30,
    gap: 15,
  },
  button: {},
  textInput: {},
});
