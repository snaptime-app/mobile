import { HomeNavigator } from "./home/layout";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { UploadNavigator } from "./upload/layout";

const Tab = createMaterialBottomTabNavigator();

export function MainLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: "home",
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadNavigator}
        options={{
          tabBarIcon: "upload",
          tabBarLabel: "Upload",
        }}
      />
    </Tab.Navigator>
  );
}
