import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetail } from "@/app/main/home/GroupDetail";
import { GroupList } from "./GroupList";
import { HeaderBar } from "@/components/HeaderBar";
import { AddFriend } from "@/app/main/home/AddFriend";
import { GroupMembersList } from "@/app/main/home/GroupMembers";
import { AttemptPage } from "@/app/main/home/AttemptPage";
import { Leaderboard } from "@/app/main/home/Leaderboard";

export type RootStackParamList = {
  GroupList: undefined;
  GroupDetail: { groupId: number };
  AddFriend: { groupId: number };
  Members: { groupId: number };
  AttemptPage: { challengeId: number };
  Leaderboard: { groupId: number };
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
    <Stack.Screen
      name="AttemptPage"
      component={AttemptPage}
      options={{
        title: "Attempt Challenge",
      }}
    />
    <Stack.Screen
      name="Leaderboard"
      component={Leaderboard}
      options={{
        title: "Leaderboard",
      }}
    />
  </Stack.Navigator>
);
