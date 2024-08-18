import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import {
  GroupChallengesResponse,
  GroupCreateResponse,
  GroupDetailResponse,
  GroupListResponse,
  type GroupCreatePayload,
  type GroupUpdatePayload,
} from "@/lib/schema/group";

export function useGroupCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: GroupCreatePayload) => {
      const group = await post("/group/create", { json: payload });
      return GroupCreateResponse.parse(group);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    retry: false,
  });
}

export function useGroupAddUser() {
  return useMutation({
    mutationFn: async ({ id, username }: GroupUpdatePayload) => {
      await post(`/group/${id}/adduser`, {
        json: { username },
      });
    },
    retry: false,
  });
}

export function useAuthenticatedUserGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const groupList = await get(`/group/list`);
      return GroupListResponse.parse(groupList);
    },
    retry: false,
  });
}

export function useGroupDetail(groupId: number) {
  return useQuery({
    queryKey: ["groupDetail", groupId],
    queryFn: async () => {
      const group = await get(`/group/groupdetails/${groupId}`);
      return GroupDetailResponse.parse(group);
    },
    retry: false,
  });
}

export function useGroupChallenges(groupId: number) {
  return useQuery({
    queryKey: ["groupChallenges", groupId],
    queryFn: async () => {
      const group = await get(`/group/getchallenges/${groupId}`);
      const challenges = GroupChallengesResponse.parse(group);
      challenges.reverse();
      return challenges;
    },
    retry: false,
  });
}
