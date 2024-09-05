import { useMutation } from "@tanstack/react-query";
import { post } from "../utils/request";
import { ImageUploadResponse } from "@/lib/schema/image";
import { Platform } from "react-native";

interface ImageUploadProps {
  uri: string;
  mime: string;
  filename?: string;
}

export function useImageUpload() {
  return useMutation({
    mutationFn: async ({ uri, mime, filename }: ImageUploadProps) => {
      let formData = new FormData();
      if (Platform.OS == "web") {
        formData.append("imageUpload", await (await fetch(uri)).blob());
      } else {
        // @ts-expect-error: React Native's fetch differs from web's fetch
        formData.append("imageUpload", {
          uri: uri,
          type: mime,
          name: filename ?? "blob",
        });
      }

      const response = await post("/image/upload", { form: formData });
      console.log("image key", ImageUploadResponse.parse(response).key);
      return ImageUploadResponse.parse(response).key;
    },
    onError: (error) => {
      console.error(error);
    },
    retry: false,
  });
}
