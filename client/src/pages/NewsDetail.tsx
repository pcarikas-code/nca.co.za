import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, ExternalLink, ArrowRight, Linkedin, Facebook, Twitter } from "lucide-react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import newsData from "@/data/news.json";

export default function NewsDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const article = newsData.find(a => a.id === id);
  const [shareCount, setShareCount] = useState<number>(0);
  
  // Construct production URL for sharing
  const shareUrl = `https://nca.co.za/news/${id}`;

  useEffect(() => {
    const fetchShareCount = async () => {
      const apiKey = import.meta.env.VITE_SHAREDCOUNT_API_KEY;
      if (!apiKey) return;

      try {
        const response = await fetch(`https://api.sharedcount.com/v1.0/?url=${encodeURIComponent(shareUrl)}&apikey=${apiKey}`);
        if (response.ok) {
          const data = await response.json();
          // Sum up shares from different platforms if available, or just use total
          // SharedCount v1.0 returns object with Facebook, Pinterest, etc.
          // We'll focus on Facebook total_count + Pinterest + LinkedIn (if available in plan)
          // For free tier, it's mostly Facebook and Pinterest.
          
          let total = 0;
          if (data.Facebook) {
             total += typeof data.Facebook === 'object' ? (data.Facebook.total_count || 0) : data.Facebook;
          }
          if (data.Pinterest) {
            total += data.Pinterest;
          }
          // Add other platforms if returned by API
          
          setShareCount(total);
        }
      } catch (error) {
        console.error("Failed to fetch share count:", error);
      }
    };

    fetchShareCount();
  }, [shareUrl]);

  const trackShare = (platform: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'share', {
        method: platform,
        content_type: 'news_article',
        item_id: id.toString(),
        item_name: article?.title
      });
    }
  };

  if (!article) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <Link href="/news">
          <Button>Back to News</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${article.title} - National Credit Adviser`}
        description={`Read about ${article.title}. ${article.category} news and updates from the National Credit Adviser.`}
        ogImage={article.ogImage ? `https://nca.co.za${article.ogImage}` : undefined}
        schema={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": article.title,
          "image": article.ogImage ? [`https://nca.co.za${article.ogImage}`] : (article.image ? [`https://nca.co.za${article.image}`] : []),
          "datePublished": new Date(article.date).toISOString(),
          "dateModified": new Date(article.date).toISOString(),
          "author": [{
            "@type": "Organization",
            "name": "National Credit Adviser",
            "url": "https://nca.co.za"
          }]
        }}
      />
      
      <div className="min-h-screen bg-background pb-20">
        {/* Hero Image */}
        <div className="w-full h-[40vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="container relative z-20 -mt-20">
          <div className="max-w-3xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6 bg-background/80 backdrop-blur hover:bg-background"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
            </Button>

            <div className="bg-card rounded-xl shadow-xl p-6 md:p-10 border border-border">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {article.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {article.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">
                {article.title}
              </h1>

              <div 
                className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-line"
              >
                {article.content}
              </div>

              {article.source && (
                <div className="mt-8 p-4 bg-secondary/30 rounded-lg border border-border text-sm text-muted-foreground">
                  <span className="font-semibold mr-2">Source:</span>
                  {article.sourceUrl ? (
                    <a 
                      href={article.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {article.source} <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span>{article.source}</span>
                  )}
                </div>
              )}

                  <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium text-muted-foreground">
                        Share this article
                      </div>
                      {shareCount > 10 && (
                        <div className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {shareCount} Shares
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => {
                    trackShare('linkedin');
                    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
                  }}>
                    <Linkedin className="h-4 w-4 text-[#0077b5]" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => {
                    trackShare('facebook');
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
                  }}>
                    <Facebook className="h-4 w-4 text-[#1877F2]" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => {
                    trackShare('twitter');
                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
                  }}>
                    <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => {
                    trackShare('native_or_copy');
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: `Check out this article: ${article.title}`,
                        url: shareUrl
                      }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(shareUrl);
                      // Ideally show a toast here, but keeping it simple for now
                    }
                  }}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <GoogleAd slot="7370515675" format="auto" label="Sponsored" />
            </div>

            {/* Related Articles */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold font-sans text-primary mb-6">Related Articles</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {newsData
                  .filter(item => item.category === article.category && item.id !== article.id)
                  .slice(0, 2)
                  .map(related => (
                    <Link key={related.id} href={`/news/${related.id}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-none shadow-md">
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-chart-1 uppercase">{related.category}</span>
                            <span className="text-xs text-muted-foreground">{related.date}</span>
                          </div>
                          <CardTitle className="text-lg font-sans line-clamp-2 group-hover:text-chart-1">
                            {related.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {related.excerpt}
                          </p>
                          <div className="flex items-center text-sm font-bold text-primary">
                            Read Article <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
              {newsData.filter(item => item.category === article.category && item.id !== article.id).length === 0 && (
                 <p className="text-muted-foreground italic">No related articles found at this time.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
