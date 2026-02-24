import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import type { ImageType } from "@/types/database";
import { cn } from "@/lib/utils";
import { Image } from "@lonik/oh-image/react";

const BUCKET_NAME = "timeline-images";

export const Route = createFileRoute("/admin/_admin/images")({
  loader: async () => {
    // Only fetch images from the database table.
    // If a file exists in storage but not in the DB, it's an orphaned file and not managed by this component.
    const { data: dbImages, error: dbError } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: true });

    if (dbError) {
      console.error("Error fetching db images:", dbError);
      return { dbImages: [] };
    }

    return { dbImages: dbImages || [] };
  },
  component: ImagesComponent,
});

function ImagesComponent() {
  const { dbImages } = useLoaderData({ from: "/admin/_admin/images" }) as {
    dbImages: ImageType[];
  };

  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError("Please select a file to upload.");
      return;
    }
    setIsUploading(true);
    setUploadError(null);

    const fileName = `${Date.now()}-${file.name}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      setUploadError(`Upload failed: ${uploadError.message}`);
      setIsUploading(false);
      return;
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName);

    // Insert into database
    // Ensure that the inserted object conforms to the Insert type for images
    const { error: dbInsertError } = await supabase.from("images").insert({
      url: publicUrl,
      alt_text: altText || null, // Ensure alt_text is null if empty string
    });

    if (dbInsertError) {
      setUploadError(`Database insert failed: ${dbInsertError.message}`);
      setIsUploading(false);
      return;
    }

    // Reload the page to show new image
    window.location.reload();
  };

  const handleDelete = async (imageId: string, imageUrl: string) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    const fileName = imageUrl.split("/").pop();
    if (!fileName) {
      console.error("Could not extract file name from URL:", imageUrl);
      return;
    }

    // Delete from Supabase Storage
    const { error: storageDeleteError } = await supabase.storage
      .from("images")
      .remove([fileName]);
    if (storageDeleteError) {
      console.error("Error deleting from storage:", storageDeleteError);
      alert("Failed to delete image from storage.");
      return;
    }

    // Delete from task_images junction table first
    const { error: deleteJunctionError } = await supabase
      .from("task_images")
      .delete()
      .eq("image_id", imageId);
    if (deleteJunctionError) {
      console.error("Error deleting from task_images:", deleteJunctionError);
      alert("Failed to delete image associations.");
      return;
    }

    // Delete from images table
    const { error: dbDeleteError } = await supabase
      .from("images")
      .delete()
      .eq("id", imageId);
    if (dbDeleteError) {
      console.error("Error deleting from database:", dbDeleteError);
      alert("Failed to delete image from database.");
      return;
    }

    // Reload the page
    window.location.reload();
  };

  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Image Management</h1>

      {/* Image Upload Section */}
      <Card className="p-6 mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Upload New Image</h2>
        <div className="grid items-center w-full gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="picture">Image File</Label>
            <Input
              id="picture"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="alt-text">Alt Text (Optional)</Label>
            <Input
              id="alt-text"
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="e.g., 'BMW R65 front view'"
            />
          </div>
          {uploadError && <p className="text-sm text-red-500">{uploadError}</p>}
          <Button
            className={cn(
              "bg-positive",
              isUploading || (!file && "bg-destructive"),
            )}
            onClick={handleUpload}
            disabled={isUploading || !file}
          >
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>
        </div>
      </Card>

      {/* Image Gallery */}
      <h2 className="mb-4 text-2xl font-semibold">
        Existing Images ({dbImages.length})
      </h2>
      {dbImages.length === 0 ? (
        <p>No images found. Upload some to get started!</p>
      ) : (
        // <div className="grid order-last grid-cols-2 gap-4 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <div className="flex flex-row-reverse flex-wrap justify-end gap-4">
          {dbImages.map((image) => (
            <Card key={image.id} className="gap-2 px-0 py-4 shadow-none">
              <CardContent className="flex flex-col items-center px-4">
                <Image
                  src={image.url}
                  alt={image.alt_text || `Image ${image.id}`}
                  className="object-cover text-center rounded-md size-24"
                />
                <p className="w-24 pt-2 text-sm capitalize truncate text-muted-foreground">
                  {image.alt_text || "tag missing!"}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col items-center py-0">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id, image.url)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
