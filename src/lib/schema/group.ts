import { z } from "zod";
import { Challenge } from "./challenges";
import { Submission } from "./submission";
import { User } from "./user";

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

export const GroupChallenge = z.object({
  author: z.string(),
  completed: z.boolean(),
  correctImage: z.string(),
  createdAt: z.coerce.date(),
  id: z.number(),
  isowner: z.boolean(),
})
export type GroupChallenge = z.infer<typeof GroupChallenge>;

export const GroupChallengesResponse = z.array(GroupChallenge);
export type GroupChallengesResponse = z.infer<typeof GroupChallengesResponse>;

export const ChallengeDetailResponse = z.object({
  author: User,
  correctImage: z.string(),
  createdAt: z.coerce.date(),
  groupId: z.number(),
  id: z.number(),
  submissions: z.array(Submission),
  updatedAt: z.coerce.date(),
})
export type ChallengeDetailResponse = z.infer<typeof ChallengeDetailResponse>;