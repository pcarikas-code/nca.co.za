import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export default function GoogleAd({ slot, format = "auto", className, label = "Advertisement" }: GoogleAdProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={cn("w-full my-8 text-center", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-1 inline-block w-full">
        {label}
      </div>
      {/* 
        CRITICAL FIX: 
        1. Removed flexbox (flex, items-center, justify-center)
        2. Removed overflow-hidden
        3. Kept min-height to prevent layout shift
        4. Used simple block display
      */}
      <div className="w-full min-h-[280px] md:min-h-[100px] bg-secondary/5 rounded-lg mx-auto">
        <ins 
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-client="ca-pub-0236593486807878"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
