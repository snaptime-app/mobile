import type { UserCreatePayload } from "@/lib/schema/user";
import words from "@/lib/consts/words.json";

export function choose<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export function randomUser(): UserCreatePayload {
  return {
    username: `${choose(words.adjectives)}-${choose(words.nouns)}`,
    session: randomString(40),
  };
}