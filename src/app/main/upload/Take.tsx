import { StackScreenProps } from "@react-navigation/stack";
import type { StackParamList } from "./layout";
import { Camera, CameraCaptureEventHandler } from "@/components/Camera";

type TakeProps = StackScreenProps<StackParamList, "Take">;

export function Take({ navigation }: TakeProps) {
  return (
    <Camera
      onUpload={() => {
        navigation.navigate("Send");
      }}
    />
  );
}
