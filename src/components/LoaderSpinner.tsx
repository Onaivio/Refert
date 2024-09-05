import { Loader2 } from "lucide-react";

export default function LoaderSpinner({
  size = "default",
  className = "",
}: {
  size?: "small" | "default" | "large";
  className?: string;
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-6 h-6",
    large: "w-8 h-8",
  };

  return (
    <div
      className={`flex items-center gap-2 justify-center ${className}`}
      role="status"
    >
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      <span className="text-xl">Loading...</span>
    </div>
  );
}
