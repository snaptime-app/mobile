import { HomeNavigator } from "./home/layout";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { UploadNavigator } from "./upload/layout";
import { useInitSession } from "@/hooks/init";
import { ProfileNavigator } from "./profile/layout";

const Tab = createMaterialBottomTabNavigator();

export function MainLayout() {
  const isInitialized = useInitSession();

  // if (!isInitialized) return null;

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
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: "account-circle",
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
