import { z } from "zod";

export const ImageUploadResponse = z.object({
  key: z.string(),
});
export type ImageUploadResponse = z.infer<typeof ImageUploadResponse>;