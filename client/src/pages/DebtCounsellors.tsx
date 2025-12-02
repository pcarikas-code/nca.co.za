import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Search, Star, UserCheck } from "lucide-react";
import { useState } from "react";

export default function DebtCounsellors() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock Data for Counsellors
  const counsellors = [
    {
      id: 1,
      name: "Thandiwe Nkosi",
      company: "Nkosi Debt Solutions",
      location: "Johannesburg, Gauteng",
      rating: 4.9,
      reviews: 124,
      phone: "011 123 4567",
      verified: true
    },
    {
      id: 2,
      name: "Pieter Van Der Merwe",
      company: "Secure Future Debt Counsellors",
      location: "Pretoria, Gauteng",
      rating: 4.8,
      reviews: 98,
      phone: "012 345 6789",
      verified: true
    },
    {
      id: 3,
      name: "Sarah James",
      company: "Cape Debt Relief",
      location: "Cape Town, Western Cape",
      rating: 4.7,
      reviews: 85,
      phone: "021 987 6543",
      verified: true
    },
    {
      id: 4,
      name: "Sipho Mthembu",
      company: "Durban Debt Rescue",
      location: "Durban, KZN",
      rating: 4.9,
      reviews: 156,
      phone: "031 555 1234",
      verified: true
    },
    {
      id: 5,
      name: "Michelle Naidoo",
      company: "Freedom Debt Counsellors",
      location: "Sandton, Gauteng",
      rating: 4.6,
      reviews: 42,
      phone: "011 888 9999",
      verified: true
    },
    {
      id: 6,
      name: "John Smith",
      company: "National Debt Advisors",
      location: "Port Elizabeth, Eastern Cape",
      rating: 4.5,
      reviews: 30,
      phone: "041 222 3333",
      verified: true
    }
  ];

  const filteredCounsellors = counsellors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/debt-counselling.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-6">Find a Registered Debt Counsellor</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Take the first step towards financial freedom. Connect with verified professionals who can help you restructure your debt.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto bg-white p-2 rounded-lg shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, city, or company..." 
                className="pl-10 border-none shadow-none text-primary h-12 text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-48">
              <Select>
                <SelectTrigger className="h-12 border-none bg-secondary/50 text-primary font-medium">
                  <SelectValue placeholder="Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gauteng">Gauteng</SelectItem>
                  <SelectItem value="western-cape">Western Cape</SelectItem>
                  <SelectItem value="kzn">KwaZulu-Natal</SelectItem>
                  <SelectItem value="eastern-cape">Eastern Cape</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button size="lg" className="h-12 px-8 bg-chart-1 hover:bg-chart-1/90 text-white font-sans font-bold">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold font-sans text-primary">
            {filteredCounsellors.length} Registered Counsellors Found
          </h2>
          <div className="text-sm text-muted-foreground">
            Showing results for South Africa
          </div>
        </div>

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
                    {counsellor.location}
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
      </div>
    </div>
  );
}
