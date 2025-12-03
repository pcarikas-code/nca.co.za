import { useEffect, useRef, memo } from "react";
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

function GoogleAdComponent({ slot, format = "auto", className, label = "Advertisement" }: GoogleAdProps) {
  const [location] = useLocation();
  // We use the path as a key to force a fresh mount on navigation
  // This is handled by the parent or the key prop on the element itself if needed,
  // but here we just want to ensure the effect runs correctly.
  
  useEffect(() => {
    try {
      // Push the ad request
      // We don't check for innerHTML here because if React re-rendered and wiped it,
      // we WANT to push again. AdSense script is smart enough to handle multiple pushes
      // as long as the slot is valid and empty.
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [slot, location]); // Re-run on slot change or navigation

  return (
    <div className={cn("w-full flex flex-col items-center justify-center my-8", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 self-start w-full text-center border-b border-border/50 pb-1">
        {label}
      </div>
      <div className="w-full min-h-[280px] md:min-h-[100px] flex items-center justify-center overflow-hidden bg-secondary/5 rounded-lg">
        {/* 
          We use a key based on the slot and location to force React to treat this 
          as a brand new element when the page changes. This prevents React from 
          trying to "diff" the previous ad iframe against the new empty ins tag.
        */}
        <ins 
          key={`${slot}-${location}`}
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

// React.memo prevents the component from re-rendering when the parent state changes
// (like typing in the FAQ search box), protecting the AdSense iframe from being wiped.
export default memo(GoogleAdComponent);
