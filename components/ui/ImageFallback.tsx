"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageFallbackProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  quality?: number;
  className?: string;
}

export default function ImageFallback({
  src,
  fallbackSrc = "https://via.placeholder.com/400x400?text=Product+Image",
  alt,
  fill = true,
  sizes,
  priority = false,
  quality = 75,
  className,
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}