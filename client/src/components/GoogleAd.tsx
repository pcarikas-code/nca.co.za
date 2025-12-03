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
  
  // Use a unique key to force React to destroy and recreate the component on navigation
  // This is the "nuclear option" for SPA ad issues - it guarantees a fresh start.
  const componentKey = `${slot}-${location}`;

  useEffect(() => {
    // Safety delay: Wait for the DOM to be fully painted before requesting an ad.
    // This helps prevent "width=0" issues and race conditions.
    const timer = setTimeout(() => {
      try {
        // Double-check: Is the element actually there?
        if (adRef.current) {
          // Triple-check: Is it empty? (Don't push if AdSense already filled it)
          // We check for 'data-ad-status' which AdSense adds when it processes a tag.
          const isFilled = adRef.current.getAttribute('data-ad-status') === 'filled';
          const hasChildren = adRef.current.innerHTML.trim().length > 0;

          if (!isFilled && !hasChildren) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }, 500); // 500ms delay is imperceptible to users but huge for browser rendering stability

    return () => clearTimeout(timer);
  }, [componentKey]); // Only run when the key changes (which happens on nav)

  return (
    <div className={cn("w-full flex flex-col items-center justify-center my-8", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 self-start w-full text-center border-b border-border/50 pb-1">
        {label}
      </div>
      <div className="w-full min-h-[280px] md:min-h-[100px] flex items-center justify-center overflow-hidden bg-secondary/5 rounded-lg">
        <ins 
          key={componentKey} // Force remount on navigation
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
