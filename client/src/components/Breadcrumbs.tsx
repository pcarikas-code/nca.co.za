import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const [location] = useLocation();
  const pathnames = location.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-muted-foreground mb-6", className)}>
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="flex items-center hover:text-chart-1 transition-colors" aria-label="Home">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          
          // Format the label: replace hyphens with spaces and capitalize
          const label = value
            .replace(/-/g, " ")
            .replace(/^\w/, (c) => c.toUpperCase());

          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={to} className="hover:text-chart-1 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
