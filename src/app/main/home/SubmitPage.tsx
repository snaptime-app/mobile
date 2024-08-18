import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "./layout";
import { Camera, CameraCaptureEventHandler } from "@/components/Camera";

type TakeProps = StackScreenProps<RootStackParamList, "SubmitPage">;

export function SubmitPage({ route, navigation }: TakeProps) {
  const { challengeId } = route.params;

  return (
    <Camera
      onCapture={() => {
        navigation.replace("SubmitCheck", { challengeId });
      }}
    />
  );
}
