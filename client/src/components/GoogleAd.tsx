import { cn } from "@/lib/utils";

interface GoogleAdProps {
  slot: string;
  format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  className?: string;
  label?: string;
}

export default function GoogleAd({ slot, format = "auto", className, label = "Advertisement" }: GoogleAdProps) {
  return (
    <div className={cn("w-full flex flex-col items-center justify-center my-8", className)}>
      <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 self-start w-full text-center border-b border-border/50 pb-1">
        {label}
      </div>
      <div className="w-full bg-secondary/30 min-h-[100px] flex items-center justify-center border border-dashed border-border rounded-md p-4">
        {/* This is a placeholder for the actual Google AdSense code */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-mono">Google Ad Space</p>
          <p className="text-[10px] text-muted-foreground/60 font-mono mt-1">Slot: {slot} | Format: {format}</p>
        </div>
        
        {/* 
          Actual Implementation Note:
          In production, you would replace the above placeholder with:
          
          <ins className="adsbygoogle"
               style={{ display: 'block' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot={slot}
               data-ad-format={format}
               data-full-width-responsive="true"></ins>
          <script>
               (adsbygoogle = window.adsbygoogle || []).push({});
          </script>
        */}
      </div>
    </div>
  );
}
