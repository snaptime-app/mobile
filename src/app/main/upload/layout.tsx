import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBar } from "@/components/HeaderBar";
import { CameraProvider } from "@/components/Camera";
import { Take } from "./Take";
import { Send } from "./Send";

export type StackParamList = {
  Take: undefined;
  Send: undefined;
};

const Stack = createStackNavigator<StackParamList>();

export function UploadNavigator() {
  return (
    <CameraProvider>
      <Stack.Navigator
        initialRouteName="Take"
        screenOptions={{
          header: HeaderBar,
        }}
      >
        <Stack.Screen
          name="Take"
          component={Take}
          options={{
            title: "Take a Photo",
          }}
        />
        <Stack.Screen
          name="Send"
          component={Send}
          options={{
            title: "Send Photo to Friends",
          }}
        />
      </Stack.Navigator>
    </CameraProvider>
  );
}
