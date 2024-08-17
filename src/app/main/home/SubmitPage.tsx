import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "./layout";
import { Camera, CameraEventHandler } from "@/components/Camera";

type TakeProps = StackScreenProps<RootStackParamList, "SubmitPage">;

export function SubmitPage({ navigation }: TakeProps) {
  return <Camera onCapture={() => {
    navigation.navigate("SubmitSend");
  }} />
}