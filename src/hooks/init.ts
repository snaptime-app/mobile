import { useUserCreateMutation } from "@/lib/query/user";
import { generateUser, getSession, setSession } from "@/lib/utils/session";
import { useEffect } from "react";

export function useInitSession() {
  const { mutate, isSuccess: isInitialized } = useUserCreateMutation();

  useEffect(() => {
    getSession().then((s) => {
      if (s) return;
      const newUser = generateUser();
      console.log("payload", newUser);
      mutate(newUser, {
        onSettled(data, error) {
          if (error) {
            console.log("Error creating user", error);
            console.error(error);
          } else {
            console.log("User created", data);
          }
        },
        onSuccess: async () => await setSession(newUser.session),
      });
    });
  }, []);

  return isInitialized;
}
