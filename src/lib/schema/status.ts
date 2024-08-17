import { z } from "zod";

export const StatusResponse = z.object({
  message: z.string(),
});
export type StatusResponse = z.infer<typeof StatusResponse>;
