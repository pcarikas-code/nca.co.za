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
    // Reset initialization flag on route change
    initialized.current = false;
  }, [location]);

  useEffect(() => {
    // Prevent double initialization in React Strict Mode or rapid re-renders
    if (initialized.current) return;

    // Check if the ad element exists and hasn't been populated yet
    if (adRef.current && adRef.current.innerHTML === "") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        initialized.current = true;
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [location, slot]); // Re-run when location or slot changes

  return (
    <div className={cn("w-full my-8 text-center", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 border-b border-border/50 pb-1 inline-block w-full">
        {label}
      </div>
      <div className="w-full min-h-[280px] md:min-h-[100px] bg-secondary/5 rounded-lg mx-auto overflow-hidden">
        <ins 
          ref={adRef}
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center', width: '100%' }}
          data-ad-client="ca-pub-0236593486807878"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
