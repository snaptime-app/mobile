import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "./layout";
import { View } from "react-native";
import { useCamera } from "@/components/Camera";
import { Text } from "react-native-paper";

type TakeProps = StackScreenProps<RootStackParamList, "SubmitSend">;

export function SubmitSend({ navigation }: TakeProps) {
  const { captured } = useCamera();
  if (!captured) {
    navigation.navigate("SubmitPage");
    return null;
  }

  return (
    <View>
      <Text>{captured.uri}</Text>
    </View>
  );
}
