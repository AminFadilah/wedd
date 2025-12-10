"use client";

import Image from "next/image";
import { useState } from "react";

export default function TrackImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  const [srcState, setSrcState] = useState(src);
  return (
    <Image
      src={srcState}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      className={className}
      onError={() => setSrcState("/frame1.png")}
      priority={false}
    />
  );
}
