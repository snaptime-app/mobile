import { z } from "zod";
import { User } from "./user";
import { Challenge } from "./challenges";

export const Submission = z.object({
  attemptedImage: z.string(),
  createdAt: z.string(),
  challengeId: z.number(),
  challenge: Challenge,
  creatorId: z.number(),
  creator: User,
  id: z.number(),
  isCorrect: z.boolean(),
});
export type Submission = z.infer<typeof Submission>;

export const SubmissionCreatePayload = z.object({
  challengeid: z.number(),
  imagekey: z.string(),
});
export type SubmissionCreatePayload = z.infer<typeof SubmissionCreatePayload>;

// {"attemptedImage": "uploads/img-2cf8351d-1723958450760.png", "challengeId": 12, "createdAt": "2024-08-18T05:20:57.384Z", "creatorId": 5, "id": 3, "isCorrect": false}
export const SubmissionCreateResponse = z.object({
  attemptedImage: z.string(),
  createdAt: z.string(),
  challenge: Challenge,
  challengeId: z.number(),
  creator: User,
  creatorId: z.number(),
  id: z.number(),
  isCorrect: z.boolean(),
});
export type SubmissionCreateResponse = z.infer<typeof SubmissionCreateResponse>;