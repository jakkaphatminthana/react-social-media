import { supabase } from "../../supabase-client";
import type { ImageUploadProps } from "./imagesRepository.types";

async function uploadImage({
  imageFile,
  fileName,
  group,
}: ImageUploadProps): Promise<string> {
  try {
    const filePath = `${fileName}-${Date.now()}-${imageFile.name}`;
    const { error: uploadError } = await supabase.storage
      .from(group)
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error(uploadError.message);
    }

    const { data: publicURLData } = supabase.storage
      .from(group)
      .getPublicUrl(filePath);

    return publicURLData.publicUrl;
  } catch (error) {
    console.error("Error uploadImage(): ", error);
    throw error;
  }
}

export { uploadImage };
