import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import {
  GroupCreateResponse,
  GroupListResponse,
  type GroupCreatePayload,
  type GroupUpdatePayload,
} from "@/lib/schema/group";

export function useGroupCreate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: GroupCreatePayload) => {
      const group = await post("/group/create", body);
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
        username,
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
