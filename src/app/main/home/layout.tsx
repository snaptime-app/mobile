import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetail } from "@/app/main/home/GroupDetail";
import { GroupList } from "./GroupLIst";

const Stack = createStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="GroupList" component={GroupList} options={{
      title: "Groups",
    }} />
    <Stack.Screen name="GroupDetail" component={GroupDetail} />
  </Stack.Navigator>
);
