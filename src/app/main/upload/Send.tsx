import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { View } from "react-native";
import { useCamera } from "@/components/Camera";
import { Button, Text } from "react-native-paper";
import { useEffect } from "react";

type TakeProps = StackScreenProps<StackParamList, "Send">;

export function Send({ navigation }: TakeProps) {
  const { captured } = useCamera();
  if (!captured) {
    navigation.navigate("Take");
    return null;
  }


  return (
    <View>
      <Text>{captured.uri}</Text>
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
