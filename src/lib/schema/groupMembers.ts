import { z } from "zod";

export const GroupMember = z.object({
  user_id: z.number(),
  username: z.string(),
  points: z.number(),
});
export type GroupMember = z.infer<typeof GroupMember>;

export const GroupMembersResponse = z.array(GroupMember);
export type GroupMembersResponse = z.infer<typeof GroupMembersResponse>;