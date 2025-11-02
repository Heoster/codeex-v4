import { CodeexIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <CodeexIcon className="h-6 w-6" />
      <span className="font-headline text-lg font-bold">CODEEX AI</span>
    </div>
  );
}
