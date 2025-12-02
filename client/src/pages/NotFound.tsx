import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="h-24 w-24 bg-destructive/10 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      <h1 className="text-4xl md:text-6xl font-bold font-sans text-primary mb-4">404</h1>
      <h2 className="text-2xl font-bold font-sans text-primary mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8 font-serif">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button size="lg" className="bg-chart-1 hover:bg-chart-1/90 text-white font-sans shadow-lg">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
