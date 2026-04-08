import { cn } from "@/lib/utils";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function GlassPanel({ children, className, ...props }: GlassPanelProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl backdrop-blur-xl theme-glass",
        "p-8 transition-all duration-500",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
