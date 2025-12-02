import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { glossaryTerms } from "@/data/glossary";
import { Info } from "lucide-react";

interface GlossaryTermProps {
  term: keyof typeof glossaryTerms;
  children?: React.ReactNode;
}

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const definition = glossaryTerms[term];

  if (!definition) {
    return <>{children || term}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span 
          className="cursor-help border-b border-dotted border-chart-1 text-primary font-medium inline-flex items-center gap-0.5 hover:text-chart-1 transition-colors touch-manipulation"
          onClick={(e) => e.preventDefault()} // Prevent default behavior on touch to ensure tooltip opens
        >
          {children || term}
          <Info className="h-3 w-3 opacity-50" />
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs p-3 text-sm bg-popover text-popover-foreground border shadow-lg">
        <p className="font-bold mb-1 text-chart-1">{term}</p>
        <p>{definition}</p>
      </TooltipContent>
    </Tooltip>
  );
}
