import "server-only";
import { adminBucket } from "@/lib/firebase/admin";

export async function uploadDocument(
  path: string,
  data: Buffer,
  contentType: string
) {
  const file = adminBucket().file(path);
  await file.save(data, { contentType, resumable: false });
}

export async function signedUrl(path: string, minutes = 60): Promise<string> {
  const [url] = await adminBucket()
    .file(path)
    .getSignedUrl({
      action: "read",
      expires: Date.now() + minutes * 60 * 1000,
    });
  return url;
}

export async function deleteStorage(path: string) {
  try {
    await adminBucket().file(path).delete();
  } catch {
    /* fichier deja absent */
  }
}
