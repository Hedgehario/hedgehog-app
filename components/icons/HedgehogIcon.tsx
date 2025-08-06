'use client';

import { cn } from '@/lib/utils';

interface HedgehogIconProps {
  className?: string;
}

export default function HedgehogIcon({ className }: HedgehogIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path d="M12 2C8.5 2 6 4.5 6 8c0 1.5.5 3 1.5 4L6 14c-.5.5-.5 1.5 0 2s1.5.5 2 0l1.5-1.5c1 .5 2.5.5 3.5.5s2.5 0 3.5-.5L18 16c.5.5 1.5.5 2 0s.5-1.5 0-2l-1.5-2c1-1 1.5-2.5 1.5-4 0-3.5-2.5-6-6-6z"/>
      <circle cx="10" cy="8" r="1" fill="currentColor"/>
      <circle cx="14" cy="8" r="1" fill="currentColor"/>
      <path d="M8 5c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2c.5.5 1.5.5 2 0s.5-1.5 0-2z"/>
      <path d="M18 5c.5-.5.5-1.5 0-2s-1.5-.5-2 0-.5 1.5 0 2 1.5.5 2 0z"/>
      <path d="M5 9c-.5-.5-1.5-.5-2 0s-.5 1.5 0 2c.5.5 1.5.5 2 0s.5-1.5 0-2z"/>
      <path d="M21 9c.5-.5.5-1.5 0-2s-1.5-.5-2 0-.5 1.5 0 2 1.5.5 2 0z"/>
    </svg>
  );
}