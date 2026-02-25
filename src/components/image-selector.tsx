import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { ImageType } from "@/types/database"; // Import the generated Database type
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Image } from "@lonik/oh-image/react";

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
          <Skeleton key={i} className="w-full h-32" />
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
    <div className="grid grid-cols-2 gap-4 pr-2 overflow-y-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-h-96">
      {images.map((image) => {
        const isSelected = selectedIds.includes(image.id);
        return (
          <Card
            key={image.id}
            className={cn(
              "relative p-0 cursor-pointer transition-all duration-200",
              isSelected
                ? "border-2 border-primary ring-2 ring-primary"
                : "hover:border-primary",
            )}
            onClick={() => handleImageClick(image.id)}
          >
            <CardContent className="flex items-center justify-center p-1 aspect-square">
              <Image
                fill={true}
                src={image.url}
                alt={image.alt_text || `Image ${image.id}`}
                className="object-cover rounded-md size-28 xs:size-32 md:size-40 lg:size-56"
              />
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-primary/20">
                  <CheckCircle className="w-8 h-8 text-primary-foreground" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
