import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamList } from "./layout";
import { Camera, CameraCaptureEventHandler } from "@/components/Camera";
import { CommonActions } from "@react-navigation/native";

type TakeProps = StackScreenProps<RootStackParamList, "SubmitPage">;

export function SubmitPage({ route, navigation }: TakeProps) {
  const { challengeId } = route.params;

  return (
    <Camera
      onCapture={() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "SubmitCheck", params: { challengeId } }],
          }),
        );
      }}
    />
  );
}
