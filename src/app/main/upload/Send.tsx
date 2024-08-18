import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { View } from "react-native";
import { useCamera } from "@/components/Camera";
import { Button, Text } from "react-native-paper";
import { useEffect } from "react";

type TakeProps = StackScreenProps<StackParamList, "Send">;

export function Send({ navigation }: TakeProps) {
  const { key } = useCamera();
  if (!key) {
    navigation.navigate("Take");
    return null;
  }

  return (
    <View>
      <Text>{key}</Text>
      <Button
        onPress={() => {
          navigation.navigate("Take");
        }}
      >
        Take Another
      </Button>
    </View>
  );
}
