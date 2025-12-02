import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "The Act", path: "/the-act" },
    { label: "News", path: "/news" },
    { label: "Debt Counsellors", path: "/debt-counsellors" },
    { label: "FAQ", path: "/faq" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-serif">
      {/* Top Bar Removed */}

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/images/logo.png" alt="NCA Logo" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-lg leading-none text-primary">National Credit</span>
                <span className="font-sans text-sm text-muted-foreground leading-none">Adviser</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <span
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-chart-1 cursor-pointer font-sans uppercase tracking-wide",
                    location === item.path ? "text-chart-1 font-bold" : "text-foreground/80"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/debt-counsellors">
              <Button variant="default" className="bg-chart-1 hover:bg-chart-1/90 text-white font-sans shadow-md">
                Find a Counsellor
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 space-y-4 shadow-lg">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className={cn(
                    "block py-2 text-base font-medium transition-colors hover:text-chart-1 cursor-pointer font-sans",
                    location === item.path ? "text-chart-1" : "text-foreground/80"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <Link href="/debt-counsellors">
              <Button className="w-full bg-chart-1 hover:bg-chart-1/90 text-white font-sans mt-4">
                Find a Counsellor
              </Button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 border-t border-white/10">
        <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="NCA Logo" className="h-10 w-auto object-contain bg-white/90 rounded-sm p-0.5" />
              <span className="font-sans font-bold text-lg">National Credit Adviser</span>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Promoting a fair and non-discriminatory marketplace for access to consumer credit and regulating consumer credit information.
            </p>
          </div>

          <div>
            <h3 className="font-sans font-bold text-lg mb-4 text-chart-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/the-act"><span className="hover:text-chart-2 cursor-pointer transition-colors">The National Credit Act</span></Link></li>
              <li><Link href="/debt-counsellors"><span className="hover:text-chart-2 cursor-pointer transition-colors">Find a Debt Counsellor</span></Link></li>
              <li><Link href="/news"><span className="hover:text-chart-2 cursor-pointer transition-colors">Latest News</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-chart-2 cursor-pointer transition-colors">Frequently Asked Questions</span></Link></li>
            </ul>
          </div>

          {/* Contact and Newsletter Removed */}
        </div>
        <div className="container mt-12 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} National Credit Adviser. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
