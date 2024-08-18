import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "@/lib/utils/request";
import { GroupMembersResponse } from "@/lib/schema/groupMembers";

export function useGroupMembers(groupId: number) {
  return useQuery({
    queryKey: ["groupMembers", groupId],
    queryFn: async () => {
      const members = await get(`/group/get-members/${groupId}`);
      return GroupMembersResponse.parse(members);
    },
    retry: false,
  });
}
