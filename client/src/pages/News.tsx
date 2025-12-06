import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Filter, Search } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import newsData from "@/data/news.json";

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(newsData.map(item => item.category));
    return Array.from(cats).sort();
  }, []);

  // Filter and sort news
  const filteredNews = useMemo(() => {
    let news = [...newsData];
    
    if (selectedCategory) {
      news = news.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      news = news.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.excerpt.toLowerCase().includes(query)
      );
    }

    return news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const featuredNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <SEOHead 
        title="News & Insights" 
        description="Latest news, updates, and insights regarding the National Credit Act, debt counselling trends, and consumer finance in South Africa."
      />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">News & Insights</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Stay updated with the latest developments in the credit industry, legislative changes, and consumer advice.
          </p>
        </div>
      </div>

      <div className="container mt-12">
        {/* Search and Filter */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search news..." 
            className="pl-10 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-12 justify-center">
          <Button 
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className="rounded-full"
          >
            All News
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Article */}
        {featuredNews && (
        <div className="mb-12">
          <Card className="overflow-hidden border-none shadow-xl bg-white grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src={featuredNews.image || "/images/news-bg.png"} 
                alt={featuredNews.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 hover:bg-chart-1/20">{featuredNews.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {featuredNews.date}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-primary mb-4">
                {featuredNews.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                {featuredNews.excerpt}
              </p>
              <Link href={`/news/${featuredNews.id}`}>
                <button className="flex items-center gap-2 text-chart-1 font-bold hover:gap-3 transition-all">
                  Read Full Article <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
            </div>
          </Card>
        </div>
        )}

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          <div className="break-inside-avoid mb-8">
            <GoogleAd slot="2722368811" format="rectangle" className="my-0 mx-auto flex justify-center" label="Advertisement" />
          </div>
          {remainingNews.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Card className="break-inside-avoid border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white group cursor-pointer mb-8">
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
