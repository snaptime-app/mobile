import { useMutation } from "@tanstack/react-query";
import { post } from "../utils/request";
import { ImageUploadResponse } from "@/lib/schema/image";

export function useImageUpload() {
  return useMutation({
    mutationFn: async (uri: string) => {
      const blob = await (await fetch(uri)).blob();
      let formData = new FormData();
      formData.append("imageUpload", {
        name: "image.jpg",
        type: "image/jpeg",
        uri,
      });

      // const response = await post("/image/upload", { form: formData });
      const response = await (
        await fetch("http://192.168.1.134:5000/api/image/upload", {
          method: "POST",
          body: formData,
        })
      );
      console.log(response);
      return ImageUploadResponse.parse(response).key;
    },
    onError: (error) => {
      console.error(error);
    },
    retry: false,
  });
}
