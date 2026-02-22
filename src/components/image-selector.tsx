import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database"; // Import the generated Database type
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ImageType = Database["public"]["Tables"]["images"]["Row"];

interface ImageSelectorProps {
  initialSelectedImageIds?: string[];
  onSelectionChange: (selectedIds: string[]) => void;
}

export function ImageSelector({
  initialSelectedImageIds = [],
  onSelectionChange,
}: ImageSelectorProps) {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    initialSelectedImageIds,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedIds(initialSelectedImageIds);
  }, [initialSelectedImageIds]);

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);
      const { data, error } = await supabase.from("images").select("*");

      if (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images.");
      } else {
        setImages(data || []);
      }
      setIsLoading(false);
    }
    fetchImages();
  }, []);

  const handleImageClick = (imageId: string) => {
    const newSelectedIds = selectedIds.includes(imageId)
      ? selectedIds.filter((id) => id !== imageId)
      : [...selectedIds, imageId];
    setSelectedIds(newSelectedIds);
    onSelectionChange(newSelectedIds);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (images.length === 0) {
    return <div className="text-muted-foreground">No images available.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-h-96 overflow-y-auto pr-2">
      {images.map((image) => {
        const isSelected = selectedIds.includes(image.id);
        return (
          <Card
            key={image.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200",
              isSelected
                ? "border-2 border-primary ring-2 ring-primary"
                : "hover:border-primary",
            )}
            onClick={() => handleImageClick(image.id)}
          >
            <CardContent className="flex aspect-square items-center justify-center p-1">
              <img
                src={image.url}
                alt={image.alt_text || `Image ${image.id}`}
                className="object-cover w-full h-full rounded-md"
              />
              {isSelected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center rounded-md">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
