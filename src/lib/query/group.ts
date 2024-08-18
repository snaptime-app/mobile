import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import {
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
      const group = await post("/group/create", {json: payload});
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
      await post(`/group/update/${id}`, {
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
    queryKey: ["group", groupId],
    queryFn: async () => {
      const group = await get(`/group/${groupId}`);
      return GroupDetailResponse.parse(group);
    },
    retry: false,
  });
}
