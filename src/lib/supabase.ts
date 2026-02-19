import { createClient } from "@supabase/supabase-js";
// Intentionally not typing the Supabase client with the local `Database` type here.
// Using the generic can cause strict PostgREST typing mismatches across the app
// depending on the exact shape expected by `@supabase/supabase-js` and TS
// configuration. Keeping the client un-typed avoids a cascade of `never` type
// errors during development. We still import `Database` types elsewhere for
// local model typing.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadImage(
  file: File,
  bucketName: string = "timeline-images",
): Promise<string | null> {
  const filePath = `${bucketName}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  return publicUrlData?.publicUrl || null;
}
