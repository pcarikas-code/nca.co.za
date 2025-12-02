import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Star, UserCheck } from "lucide-react";
import { useState, useMemo } from "react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";

// Mock Data for Counsellors with more specific locations
const counsellors = [
  {
    id: 1,
    name: "Thandiwe Nkosi",
    company: "Nkosi Debt Solutions",
    province: "Gauteng",
    city: "Johannesburg",
    rating: 4.9,
    reviews: 124,
    phone: "011 123 4567",
    verified: true
  },
  {
    id: 2,
    name: "Pieter Van Der Merwe",
    company: "Secure Future Debt Counsellors",
    province: "Gauteng",
    city: "Pretoria",
    rating: 4.8,
    reviews: 98,
    phone: "012 345 6789",
    verified: true
  },
  {
    id: 3,
    name: "Sarah James",
    company: "Cape Debt Relief",
    province: "Western Cape",
    city: "Cape Town",
    rating: 4.7,
    reviews: 85,
    phone: "021 987 6543",
    verified: true
  },
  {
    id: 4,
    name: "Sipho Mthembu",
    company: "Durban Debt Rescue",
    province: "KwaZulu-Natal",
    city: "Durban",
    rating: 4.9,
    reviews: 156,
    phone: "031 555 1234",
    verified: true
  },
  {
    id: 5,
    name: "Michelle Naidoo",
    company: "Freedom Debt Counsellors",
    province: "Gauteng",
    city: "Sandton",
    rating: 4.6,
    reviews: 42,
    phone: "011 888 9999",
    verified: true
  },
  {
    id: 6,
    name: "John Smith",
    company: "National Debt Advisors",
    province: "Eastern Cape",
    city: "Port Elizabeth",
    rating: 4.5,
    reviews: 30,
    phone: "041 222 3333",
    verified: true
  },
  {
    id: 7,
    name: "Lerato Molefe",
    company: "Soweto Debt Help",
    province: "Gauteng",
    city: "Soweto",
    rating: 4.7,
    reviews: 65,
    phone: "011 987 6543",
    verified: true
  },
  {
    id: 8,
    name: "David Botha",
    company: "Stellenbosch Financial Aid",
    province: "Western Cape",
    city: "Stellenbosch",
    rating: 4.8,
    reviews: 22,
    phone: "021 888 7777",
    verified: true
  }
];

// Extract unique provinces and cities
const provinces = Array.from(new Set(counsellors.map(c => c.province))).sort();

export default function DebtCounsellors() {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

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
    return counsellors.filter(c => {
      if (selectedProvince && c.province !== selectedProvince) return false;
      if (selectedCity && c.city !== selectedCity) return false;
      return true;
    });
  }, [selectedProvince, selectedCity]);

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
        <GoogleAd slot="4455667788" className="mb-12" />
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-sans text-primary">
            {filteredCounsellors.length} Registered Counsellors Found
          </h2>
          <div className="text-sm text-muted-foreground">
            {selectedProvince ? `${selectedProvince}${selectedCity ? ` > ${selectedCity}` : ''}` : 'All Locations'}
          </div>
        </div>

        {filteredCounsellors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCounsellors.map((counsellor) => (
              <Card key={counsellor.id} className="border border-border hover:border-chart-1/50 transition-all hover:shadow-lg group bg-white">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                      {counsellor.name.charAt(0)}
                    </div>
                    {counsellor.verified && (
                      <div className="flex items-center gap-1 text-xs font-bold text-chart-3 bg-chart-3/10 px-2 py-1 rounded-full">
                        <UserCheck className="h-3 w-3" /> Verified
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-sans font-bold text-xl text-primary mb-1 group-hover:text-chart-1 transition-colors">
                    {counsellor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium mb-4">{counsellor.company}</p>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-chart-1" />
                      {counsellor.city}, {counsellor.province}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-chart-1" />
                      {counsellor.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-primary">{counsellor.rating}</span>
                      <span className="text-muted-foreground/60">({counsellor.reviews} reviews)</span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-sans">
                    Contact Counsellor
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
