"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HedgehogIconProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function HedgehogIcon({
  className,
  width = 24,
  height = 24,
}: HedgehogIconProps) {
  return (
    <Image
      src="/icons/jpg/かわいいハリネズミのキャラクター.jpg"
      alt="かわいいハリネズミのキャラクター"
      width={width}
      height={height}
      className={cn("rounded-full object-cover", className)}
    />
  );
}
