import { z } from "zod";
import { Challenge } from "./challenges";

export const Group = z.object({
  id: z.number(),
  name: z.string(),
});
export type Group = z.infer<typeof Group>;

export const GroupCreatePayload = z.object({
  groupname: z.string(),
});
export type GroupCreatePayload = z.infer<typeof GroupCreatePayload>;

export const GroupCreateResponse = Group;
export type GroupCreateResponse = z.infer<typeof GroupCreateResponse>;

export const GroupUpdatePayload = z.object({
  id: z.number(),
  username: z.string(),
});
export type GroupUpdatePayload = z.infer<typeof GroupUpdatePayload>;

export const GroupListResponse = z.array(Group);
export type GroupListResponse = z.infer<typeof GroupListResponse>;

export const GroupDetailResponse = Group;
export type GroupDetailResponse = z.infer<typeof GroupDetailResponse>;

export const GroupChallengesResponse = z.array(Challenge);
export type GroupChallengesResponse = z.infer<typeof GroupChallengesResponse>;