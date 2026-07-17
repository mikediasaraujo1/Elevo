interface CloudinaryUploadResponse {
  secure_url: string;
  error?: { message: string };
}

export async function uploadToCloudinary(file: File): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Cloudinary não configurado. Verifique as variáveis de ambiente.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = (await response.json()) as CloudinaryUploadResponse;

  if (!response.ok || data.error) {
    throw new Error(data.error?.message ?? "Falha ao enviar imagem.");
  }

  return data.secure_url;
}
