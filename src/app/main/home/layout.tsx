import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetail } from "@/app/main/home/GroupDetail";
import { GroupList } from "./GroupList";
import { HeaderBar } from "@/components/HeaderBar";

export type RootStackParamList = {
  GroupList: undefined;
  GroupDetail: { groupId: number };
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="GroupList"
    screenOptions={{
      header: (props) => <HeaderBar {...props} />,
    }}
  >
    <Stack.Screen
      name="GroupList"
      component={GroupList}
      options={{
        title: "Groups",
      }}
    />
    <Stack.Screen name="GroupDetail" component={GroupDetail} />
  </Stack.Navigator>
);
