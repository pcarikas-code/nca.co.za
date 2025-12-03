import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

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
  const adRef = useRef<HTMLModElement>(null);
  const [location] = useLocation();
  const initialized = useRef(false);

  useEffect(() => {
    // Reset initialization flag when location changes (for SPA navigation)
    initialized.current = false;
  }, [location]);

  useEffect(() => {
    // 1. Check if already initialized to prevent double-push (React Strict Mode / Fast Refresh)
    if (initialized.current) return;

    // 2. Check if the ref exists
    if (!adRef.current) return;

    // 3. Check if the ad slot is already populated (AdSense modifies the DOM)
    // If AdSense has already filled this slot, it will have children or attributes.
    // We only want to push if it's "fresh".
    if (adRef.current.innerHTML.trim() !== "") return;

    try {
      // 4. Push the ad request
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot, location]); // Re-run if slot or location changes

  return (
    <div className={cn("w-full flex flex-col items-center justify-center my-8", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 self-start w-full text-center border-b border-border/50 pb-1">
        {label}
      </div>
      {/* 
         Keep the container robust. 
         min-height prevents layout shift (CLS).
         overflow-hidden ensures no spillover.
      */}
      <div className="w-full min-h-[280px] md:min-h-[100px] flex items-center justify-center overflow-hidden bg-secondary/5 rounded-lg">
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-0236593486807878"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
