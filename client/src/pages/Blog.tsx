import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import blogData from "@/data/blog.json";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(blogData.map(item => item.category));
    return Array.from(cats).sort();
  }, []);

  // Filter and sort blog posts
  const filteredBlog = useMemo(() => {
    let blog = [...blogData];
    
    if (selectedCategory) {
      blog = blog.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      blog = blog.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.excerpt.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );
    }

    return blog.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory, searchQuery]);

  const featuredPost = filteredBlog[0];
  const remainingPosts = filteredBlog.slice(1);

  return (
    <div className="min-h-screen bg-secondary/30 pb-20">
      <SEOHead 
        title="Blog - National Credit Adviser" 
        description="Read our latest blog posts on debt management, credit scores, and financial wellness."
      />
      
      <div className="bg-primary text-primary-foreground py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-sans mb-4">Blog</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Practical advice, tips, and guides to help you master your finances.
          </p>
        </div>
      </div>

      <div className="container mt-12">
        {/* Search and Filter */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search blog..." 
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
            All Posts
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

        {/* Featured Post */}
        {featuredPost && (
        <div className="mb-12">
          <Card className="overflow-hidden border-none shadow-xl bg-white grid md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src={featuredPost.image || "/images/news-bg.png"} 
                alt={featuredPost.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 hover:bg-chart-1/20">{featuredPost.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {featuredPost.date}
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold font-sans text-primary mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
                {featuredPost.excerpt}
              </p>
              <Link href={`/blog/${featuredPost.id}`}>
                <button className="flex items-center gap-2 text-chart-1 font-bold hover:gap-3 transition-all">
                  Read Full Post <ArrowRight className="h-4 w-4" />
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
          {remainingPosts.map((item) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
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
