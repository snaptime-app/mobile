import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetail } from "@/app/main/home/GroupDetail";
import { GroupList } from "./GroupList";
import { HeaderBar } from "@/components/HeaderBar";
import { AddFriend } from "@/app/main/home/AddFriend";
import { GroupMembersList } from "@/app/main/home/GroupMembers";

export type RootStackParamList = {
  GroupList: undefined;
  GroupDetail: { groupId: number };
  AddFriend: { groupId: number };
  Members: { groupId: number };
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
    <Stack.Screen
      name="GroupDetail"
      component={GroupDetail}
      options={{
        title: "Group {groupId}",
      }}
    />
    <Stack.Screen
      name="AddFriend"
      component={AddFriend}
      options={{
        title: "Add Friend",
      }}
    />
    <Stack.Screen
      name="Members"
      component={GroupMembersList}
      options={{
        title: "Members",
    }}
    />
  </Stack.Navigator>
);
