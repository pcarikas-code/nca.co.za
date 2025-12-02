import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
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
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> 0860 627 627</span>
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> info@nca.co.za</span>
          </div>
          <div className="flex gap-3">
            <Facebook className="h-3 w-3 cursor-pointer hover:text-chart-2 transition-colors" />
            <Twitter className="h-3 w-3 cursor-pointer hover:text-chart-2 transition-colors" />
            <Linkedin className="h-3 w-3 cursor-pointer hover:text-chart-2 transition-colors" />
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="h-10 w-10 bg-chart-1 rounded-lg flex items-center justify-center text-white font-bold font-sans text-xl shadow-lg">
                NCA
              </div>
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
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-chart-1 rounded flex items-center justify-center text-white font-bold font-sans">
                NCA
              </div>
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

          <div>
            <h3 className="font-sans font-bold text-lg mb-4 text-chart-2">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-chart-1" /> 0860 627 627</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-chart-1" /> info@nca.co.za</li>
              <li className="mt-4 text-primary-foreground/60">
                1234 Francis Baard Street,<br />
                Pretoria, South Africa
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-bold text-lg mb-4 text-chart-2">Newsletter</h3>
            <p className="text-sm mb-4 text-primary-foreground/80">Stay updated with the latest amendments and consumer rights news.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded px-3 py-2 text-sm w-full focus:outline-none focus:ring-1 focus:ring-chart-2"
              />
              <Button size="sm" className="bg-chart-1 hover:bg-chart-1/90 text-white">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="container mt-12 pt-8 border-t border-white/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} National Credit Adviser. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
