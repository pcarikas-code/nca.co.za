import { Link, useLocation } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import newsData from "../data/news.json";
import blogData from "../data/blog.json";

interface BreadcrumbsProps {
  className?: string;
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const [location] = useLocation();
  const pathnames = location.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const getLabel = (value: string, index: number, pathnames: string[]) => {
    // Check if this is a dynamic ID segment
    if (index > 0) {
      const parent = pathnames[index - 1];
      const id = parseInt(value);
      
      if (!isNaN(id)) {
        if (parent === "news") {
          const item = newsData.find(n => n.id === id);
          if (item) return item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title;
        }
        if (parent === "blog") {
          const item = blogData.find(b => b.id === id);
          if (item) return item.title.length > 40 ? item.title.substring(0, 40) + "..." : item.title;
        }
      }
    }

    // Default formatting
    return value
      .replace(/-/g, " ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-muted-foreground mb-6", className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        <li>
          <Link href="/" className="flex items-center hover:text-chart-1 transition-colors" aria-label="Home">
            <Home className="h-4 w-4" />
          </Link>
        </li>
        
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const label = getLabel(value, index, pathnames);

          return (
            <li key={to} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
              {isLast ? (
                <span className="font-medium text-foreground truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={to} className="hover:text-chart-1 transition-colors whitespace-nowrap">
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
