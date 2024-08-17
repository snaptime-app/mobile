import { createStackNavigator } from "@react-navigation/stack";
import { HeaderBar } from "@/components/HeaderBar";
import { Profile } from "./Profile";

const Stack = createStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator
    initialRouteName="Profile"
    screenOptions={{
      header: HeaderBar,
    }}
  >
    <Stack.Screen
      name="Camera"
      component={Profile}
      options={{
        title: "Profile",
      }}
    />
  </Stack.Navigator>
);
