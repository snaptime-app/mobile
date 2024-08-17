import * as SecureStore from "expo-secure-store";
import { randomBytes } from "crypto";
import { useEffect, useState } from "react";
import type { UserCreatePayload } from "@/lib/schema/user";
import { choose, randomString } from "./random";
import words from "@/lib/consts/words.json";

type Session = string | null;
let session: Session = null;

// export function useSession(): [Session, (newSession: Session) => void] {
//   const [session, setSession] = useState<Session>(null);

//   useEffect(() => {
//     SecureStore.getItemAsync("session").then(s => setSession(s));
//   }, [])

//   return [session, (newSession: Session) => { 
//     setSession(newSession);
//     if (newSession) {
//       SecureStore.setItemAsync("session", newSession);
//     } else {
//       SecureStore.deleteItemAsync("session");
//     }
//    }];
// }

export async function getSession(): Promise<Session> {
  if (session) {
    return session;
  }

  session = await SecureStore.getItemAsync("session");
  return session;
}

export async function setSession(s: Session) {
  if (s) {
    await SecureStore.setItemAsync("session", s);
  } else {
    await SecureStore.deleteItemAsync("session");
  }

  session = s;
}

export function generateUser(): UserCreatePayload {
  return {
    username: `${choose(words.adjectives)}-${choose(words.nouns)}`,
    session: randomString(40),
  };
}
