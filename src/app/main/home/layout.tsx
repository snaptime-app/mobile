import { createStackNavigator } from "@react-navigation/stack";
import { GroupDetail } from "@/app/main/home/GroupDetail";
import { GroupList } from "./GroupList";
import { HeaderBar } from "@/components/HeaderBar";
import { AddFriend } from "@/app/main/home/AddFriend";
import { GroupMembersList } from "@/app/main/home/GroupMembers";
import { AttemptPage } from "@/app/main/home/AttemptPage";
import { GroupNew } from "./GroupNew";
import { Leaderboard } from "@/app/main/home/Leaderboard";
import { SubmitPage } from "@/app/main/home/SubmitPage";
import { SubmitCheck } from "@/app/main/home/SubmitCheck";
import { CameraProvider } from "@/components/Camera";

export type RootStackParamList = {
  GroupList: undefined;
  GroupNew: undefined;
  GroupDetail: { groupId: number };
  AddFriend: { groupId: number };
  Members: { groupId: number };
  AttemptPage: { challengeId: number, isAttemptable: boolean };
  Leaderboard: { groupId: number };
  SubmitPage: { challengeId: number };
  SubmitCheck: { challengeId: number };
  // Profile: { userId: string };
  // Feed: { sort: 'latest' | 'top' } | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const HomeNavigator = () => (
  <CameraProvider>
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
        name="GroupNew"
        component={GroupNew}
        options={{
          title: "New Group",
        }}
      />
      <Stack.Screen name="GroupDetail" component={GroupDetail} options={{title:""}}/>
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
      <Stack.Screen
        name="SubmitPage"
        component={SubmitPage}
        options={{
          title: "Submit Challenge",
        }}
      />
      <Stack.Screen
        name="SubmitCheck"
        component={SubmitCheck}
        options={{
          title: "Check Submission",
        }}
      />
    </Stack.Navigator>
  </CameraProvider>
);
