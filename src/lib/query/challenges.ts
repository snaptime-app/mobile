import { post } from "@/lib/utils/request";
import {
  Challenge,
  ChallengeCreatePayload,
  ChallengeCreateResponse,
} from "@/lib/schema/challenges";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useChallengeCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ChallengeCreatePayload) => {
      const challenge = await post("/challenge/create", body);
      return ChallengeCreateResponse.parse(challenge);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challenges"] });
    },
    retry: false,
  });
}
