import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function News() {
  const newsItems = [
    {
      id: 1,
      title: "Minister Withdraws NCA Amendment Regulations",
      date: "Sep 12, 2025",
      category: "Regulation",
      readTime: "4 min read",
      excerpt: "The Minister of Trade, Industry and Competition has withdrawn the draft regulations which listed educational institutions as credit providers. This decision follows extensive public consultation and concerns raised by the banking sector regarding the impact on student access to finance.",
      image: "/images/news-bg.png"
    },
    {
      id: 2,
      title: "Draft Amendments to Affordability Assessment",
      date: "Aug 19, 2025",
      category: "Policy",
      readTime: "6 min read",
      excerpt: "New draft amendments aim to strengthen consumer protection by revising how affordability assessments are conducted by credit providers. The proposed changes seek to ensure a more rigorous verification of consumer income and expenses.",
      image: null
    },
    {
      id: 3,
      title: "Debt Counselling: A Lifeline for Millennials",
      date: "Oct 07, 2025",
      category: "Trends",
      readTime: "5 min read",
      excerpt: "Recent indices reveal a stark financial reality for South African millennials, with debt counselling becoming a critical tool for financial recovery. Rising living costs and high interest rates are driving younger consumers to seek professional help.",
      image: "/images/debt-counselling.png"
    },
    {
      id: 4,
      title: "Banking Association Concerns Over Withdrawals",
      date: "Sep 15, 2025",
      category: "Industry",
      readTime: "3 min read",
      excerpt: "BASA warns that withdrawing NCA draft amendments delays MSME access to finance, undermines due process, and risks economic growth. The association calls for a more stable regulatory environment.",
      image: null
    },
    {
      id: 5,
      title: "ZeroDebt Launches New Calculator",
      date: "Nov 21, 2025",
      category: "Tools",
      readTime: "2 min read",
      excerpt: "A new free debt review calculator helps South Africans see potential monthly savings and understand how debt review can make a difference in their monthly budget.",
      image: null
    },
    {
      id: 6,
      title: "Understanding Your Rights: Section 60",
      date: "Dec 12, 2024",
      category: "Education",
      readTime: "8 min read",
      excerpt: "Under Section 60 of the NCA, every adult in South Africa has the right to apply for credit. Credit providers cannot discriminate against you based on race, gender, or marital status.",
      image: "/images/legal-act.png"
    }
  ];

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">News & Insights</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Stay updated with the latest developments in the credit industry, legislative changes, and consumer advice.
          </p>
        </div>
      </div>

      <div className="container mt-12">
        {/* Featured Article */}
        <div className="mb-12">
          <Card className="overflow-hidden border-none shadow-xl bg-white grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src="/images/news-bg.png" 
                alt="Featured News" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 hover:bg-chart-1/20">Regulation</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> Sep 12, 2025
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-primary mb-4">
                Minister Withdraws NCA Amendment Regulations
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The Minister of Trade, Industry and Competition has withdrawn the draft regulations which listed educational institutions as credit providers. This decision follows extensive public consultation...
              </p>
              <button className="flex items-center gap-2 text-chart-1 font-bold hover:gap-3 transition-all">
                Read Full Article <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {newsItems.slice(1).map((item) => (
            <Card key={item.id} className="break-inside-avoid border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group">
              {item.image && (
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="border-chart-2/30 text-chart-2">{item.category}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {item.readTime}
                  </span>
                </div>
                <CardTitle className="font-sans text-xl text-primary group-hover:text-chart-1 transition-colors">
                  {item.title}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.excerpt}
                </p>
                <div className="mt-4 pt-4 border-t border-border flex justify-end">
                  <ArrowRight className="h-4 w-4 text-chart-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
