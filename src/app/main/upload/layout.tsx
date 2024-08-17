import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBar } from "@/components/HeaderBar";
import { Camera } from "./Camera";

const Stack = createStackNavigator();

export const UploadNavigator = () => (
  <Stack.Navigator
    initialRouteName="Camera"
    screenOptions={{
      header: HeaderBar,
    }}
  >
    <Stack.Screen
      name="Camera"
      component={Camera}
      options={{
        title: "Take a Photo",
      }}
    />
  </Stack.Navigator>
);
