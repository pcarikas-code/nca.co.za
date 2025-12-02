import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ProtectedContactProps {
  value: string;
  type: "email" | "phone";
  className?: string;
}

export default function ProtectedContact({ value, type, className }: ProtectedContactProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleReveal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(!isVisible);
  };

  // Simple obfuscation for display when hidden
  const getHiddenValue = () => {
    if (type === "email") {
      const [user, domain] = value.split("@");
      return `${user.substring(0, 2)}***@${domain}`;
    } else {
      return `${value.substring(0, 3)} **** ${value.substring(value.length - 3)}`;
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={isVisible ? "" : "text-muted-foreground"}>
        {isVisible ? value : getHiddenValue()}
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-muted-foreground hover:text-primary"
        onClick={handleReveal}
        title={isVisible ? "Hide" : "Show"}
      >
        {isVisible ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
      </Button>
    </div>
  );
}
