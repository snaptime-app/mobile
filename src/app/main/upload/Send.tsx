import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { View } from "react-native";
import { useCamera } from "@/components/Camera";
import { Text } from "react-native-paper";

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
    </View>
  );
}
