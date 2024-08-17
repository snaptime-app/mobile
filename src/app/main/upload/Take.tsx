import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { Camera, CameraEventHandler } from "@/components/Camera";

type TakeProps = StackScreenProps<StackParamList, "Take">;

export function Take({ navigation }: TakeProps) {
  return <Camera onCapture={() => {
    navigation.navigate("Send");
  }} />
}