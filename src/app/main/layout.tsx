import { HomeNavigator } from "./home/layout";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

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
    </Tab.Navigator>
  );
}
