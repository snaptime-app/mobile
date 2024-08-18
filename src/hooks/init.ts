import { useUserCreate } from "@/lib/query/user";
import { getSession, setSession } from "@/lib/utils/session";
import { randomUser } from "@/lib/utils/random";
import { useEffect, useState } from "react";

export function useInitSession() {
  const [isInitialized, setIsInitialized] = useState(false);
  const { mutate, isSuccess } = useUserCreate();

  useEffect(() => {
    getSession().then((s) => {
      if (s) {
        setIsInitialized(true);
        return;
      }
      const newUser = randomUser();
      mutate(newUser, {
        onSettled(data, error) {
          if (error) {
            console.error(error);
          } else {
          }
        },
        onSuccess: async () => {
          await setSession(newUser.session);
          setIsInitialized(true);
        },
      });
    });
  }, []);

  return isInitialized;
}
