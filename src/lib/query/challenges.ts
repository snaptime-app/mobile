import { get, post } from "@/lib/utils/request";
import {
  Challenge,
  ChallengeAttemptPayload,
  ChallengeAttemptResponse,
  ChallengeCreatePayload,
  ChallengeCreateResponse,
} from "@/lib/schema/challenges";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChallengeDetailResponse } from "@/lib/schema/group";

export function useChallengeCreate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (body: ChallengeCreatePayload) => {
      const challenge = await post("/challenge/create", { json: body });
      console.log(challenge);
      return ChallengeCreateResponse.parse(challenge);
    },
    onSuccess: ({ groupId }) => {
      queryClient.invalidateQueries({ queryKey: ["groupChallenges", groupId] });
    },
    retry: false,
  });
}

export function useChallenge(challengeId: number) {
  return useQuery({
    queryKey: ["challenge", challengeId],
    queryFn: async () => {
      const response = await get(`/challenge/${challengeId}`);
      console.log("yeet", response);
      return ChallengeDetailResponse.parse(response);
    },
    retry: false,
  });
}

export function useAttemptChallenge() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ChallengeAttemptPayload) => {
      const response = await post(`/submission/create`);
      console.log("attempt", response);
      return ChallengeAttemptResponse.parse(response);
    },
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["challenge", id] });
    },
    retry: false,
  });
}
