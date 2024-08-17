import { z } from "zod";
import { User } from "./user";

export const Challenge = z.object({
  id: z.number(),
  author: User,
  groupId: z.number(),
  imageKey: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Challenge = z.infer<typeof Challenge>;

export const ChallengeCreatePayload = z.object({
  groupid: z.number(),
  imagekey: z.string(),
});

export type ChallengeCreatePayload = z.infer<typeof ChallengeCreatePayload>;

export const ChallengeCreateResponse = Challenge;
export type ChallengeCreateResponse = z.infer<typeof ChallengeCreateResponse>;
