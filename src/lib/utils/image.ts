export function imageKeytoUrl(key: string) {
  return process.env.EXPO_PUBLIC_IMAGE_SERVER_URL + key;
}