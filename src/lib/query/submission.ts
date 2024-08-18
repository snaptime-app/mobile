import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/lib/utils/request";
import { SubmissionCreateResponse, type SubmissionCreatePayload } from "../schema/submission";

export function useCreateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: SubmissionCreatePayload) => {
      const challenge = await post("/submission/create", { json: body });
      return SubmissionCreateResponse.parse(challenge);
    },
    onSuccess: ({ challengeId }) => {
      queryClient.invalidateQueries({ queryKey: ["challenge", challengeId] });
    },
    retry: false,
  });
}