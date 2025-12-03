import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Star, UserCheck, ChevronLeft, ChevronRight, Mail } from "lucide-react";
import { useState, useMemo, useEffect } from "react";

// Extend window interface for Google Analytics
declare global {
  interface Window {
    gtag: (command: string, action: string, params?: any) => void;
  }
}
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import ProtectedContact from "@/components/ProtectedContact";
import counsellorsData from "@/data/counsellors.json";

// Use real data
const counsellors = counsellorsData;

// Fisher-Yates shuffle algorithm
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Extract unique provinces and cities
const provinces = Array.from(new Set(counsellors.map(c => c.province).filter(p => p !== "Other"))).sort();

export default function DebtCounsellors() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [shuffledCounsellors, setShuffledCounsellors] = useState(counsellors);
  const itemsPerPage = 12;

  // Randomize on mount
  useEffect(() => {
    setShuffledCounsellors(shuffleArray(counsellors));
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProvince, selectedCity]);

  // Filter cities based on selected province
  const availableCities = useMemo(() => {
    if (!selectedProvince) return [];
    return Array.from(new Set(
      counsellors
        .filter(c => c.province === selectedProvince)
        .map(c => c.city)
    )).sort();
  }, [selectedProvince]);

  // Filter counsellors based on selection
  const filteredCounsellors = useMemo(() => {
    return shuffledCounsellors.filter(c => {
      if (selectedProvince && c.province !== selectedProvince) return false;
      if (selectedCity && c.city !== selectedCity) return false;
      return true;
    });
  }, [selectedProvince, selectedCity, shuffledCounsellors]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCounsellors.length / itemsPerPage);
  const currentCounsellors = filteredCounsellors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedCity(""); // Reset city when province changes
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead 
        title="Find a Debt Counsellor" 
        description="Search our directory of registered debt counsellors in South Africa. Find verified professionals to help you restructure your debt and achieve financial freedom."
      />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/debt-counselling.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-6">Find a Registered Debt Counsellor</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Take the first step towards financial freedom. Connect with verified professionals who can help you restructure your debt.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-2xl flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedProvince} onValueChange={handleProvinceChange}>
                <SelectTrigger className="h-12 border bg-secondary/10 text-primary font-medium">
                  <SelectValue placeholder="Select Province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map(province => (
                    <SelectItem key={province} value={province}>{province}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select 
                value={selectedCity} 
                onValueChange={setSelectedCity}
                disabled={!selectedProvince}
              >
                <SelectTrigger className="h-12 border bg-secondary/10 text-primary font-medium">
                  <SelectValue placeholder={selectedProvince ? "Select City" : "Select Province First"} />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              size="lg" 
              className="h-12 px-8 bg-chart-1 hover:bg-chart-1/90 text-white font-sans font-bold"
              onClick={() => {}} // Search is automatic via state, but button kept for UX
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mt-12">
        <div className="flex justify-center w-full mb-12">
          <GoogleAd slot="2722368811" className="max-w-[728px] mx-auto" label="Advertisement" />
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-sans text-primary">
            {filteredCounsellors.length} Registered Counsellors Found
          </h2>
          <div className="text-sm text-muted-foreground">
            {selectedProvince ? `${selectedProvince}${selectedCity ? ` > ${selectedCity}` : ''}` : 'All Locations'}
          </div>
        </div>

        {filteredCounsellors.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentCounsellors.map((counsellor) => (
                <Card key={counsellor.id} className="border border-border hover:border-chart-1/50 transition-all hover:shadow-lg group bg-white flex flex-col">
                  <CardContent className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-3 md:mb-4">
                      <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-base md:text-lg">
                        {counsellor.name.charAt(0)}
                      </div>
                      {counsellor.verified && (
                        <div className="flex items-center gap-1 text-[10px] md:text-xs font-bold text-chart-3 bg-chart-3/10 px-2 py-1 rounded-full">
                          <UserCheck className="h-3 w-3" /> Verified
                        </div>
                      )}
                    </div>
                    
                    <h3 className="font-sans font-bold text-lg md:text-xl text-primary mb-1 group-hover:text-chart-1 transition-colors">
                      {counsellor.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground font-medium mb-3 md:mb-4">{counsellor.company}</p>
                    
                    <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-muted-foreground mb-4 md:mb-6 flex-1">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 md:h-4 md:w-4 text-chart-1 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{counsellor.address || `${counsellor.city}, ${counsellor.province}`}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 md:h-4 md:w-4 text-chart-1 flex-shrink-0" />
                        <ProtectedContact value={counsellor.phone} type="phone" />
                      </div>
                      {counsellor.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 md:h-4 md:w-4 text-chart-1 flex-shrink-0" />
                          <ProtectedContact value={counsellor.email} type="email" />
                        </div>
                      )}
                      <div className="pt-2">
                        <div className="inline-block text-[10px] md:text-xs bg-secondary px-2 py-0.5 rounded text-primary/70">
                          NCR: {counsellor.ncr_number}
                        </div>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans mt-auto text-sm md:text-base py-2 md:py-2.5 h-auto"
                      onClick={() => {
                        // Track click event
                        if (typeof window.gtag === 'function') {
                          window.gtag('event', 'contact_counsellor', {
                            'event_category': 'engagement',
                            'event_label': counsellor.name,
                            'contact_method': counsellor.email ? 'email' : 'phone'
                          });
                        }

                        if (counsellor.email) {
                          window.location.href = `mailto:${counsellor.email}?subject=Enquiry via National Credit Adviser`;
                        } else if (counsellor.phone) {
                          window.location.href = `tel:${counsellor.phone}`;
                        }
                      }}
                    >
                      Contact Counsellor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1 mx-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Logic to show window of pages around current
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                      if (currentPage > 3) {
                        pageNum = currentPage - 2 + i;
                      }
                      if (pageNum > totalPages) {
                        pageNum = totalPages - 4 + i;
                      }
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "ghost"}
                        size="sm"
                        className={`w-8 h-8 p-0 ${currentPage === pageNum ? "bg-chart-1 hover:bg-chart-1/90" : ""}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-secondary/20 rounded-xl">
            <p className="text-xl text-muted-foreground">No counsellors found in this location.</p>
            <Button 
              variant="link" 
              onClick={() => { setSelectedProvince(""); setSelectedCity(""); }}
              className="text-chart-1 mt-2"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
