"use client";

import { ContentImage } from "@/components/shared/content-image";
import { cn } from "@/lib/utils";

interface TaskImageGalleryProps {
  images: string[];
  title?: string;
}

export function TaskImageGallery({ images, title }: TaskImageGalleryProps) {
  if (!images.length) return null;

  // Calculate grid columns based on image count
  const getGridClass = (count: number) => {
    if (count === 1) return "grid-cols-1";
    if (count === 2) return "grid-cols-2";
    if (count === 3) return "grid-cols-3";
    if (count === 4) return "grid-cols-2 md:grid-cols-2";
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  return (
    <div className="w-full">
      <div className={cn("grid gap-4", getGridClass(images.length))}>
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="group relative aspect-square overflow-hidden rounded-full border-2 border-border bg-muted shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md"
          >
            <ContentImage
              src={src}
              alt={title ? `${title} - image ${index + 1}` : `Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              quality={85}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              intrinsicWidth={400}
              intrinsicHeight={400}
              priority={index < 4}
            />
            <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}
