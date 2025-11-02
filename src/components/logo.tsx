'use client';

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image src="/favicon.ico" alt="CODEEX AI Logo" width={24} height={24} className="h-6 w-6" />
      <span className="font-headline text-lg font-bold">CODEEX AI</span>
    </div>
  );
}
