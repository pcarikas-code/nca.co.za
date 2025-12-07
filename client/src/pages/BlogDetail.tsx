import { useParams, Link } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowLeft, Share2, ExternalLink, ArrowRight, Linkedin, Facebook, Twitter, List } from "lucide-react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import blogData from "@/data/blog.json";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function BlogDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const post = blogData.find(a => a.id === id);
  const [shareCount, setShareCount] = useState<number>(0);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  
  // Construct production URL for sharing
  const shareUrl = `https://nca.co.za/blog/${id}`;

  useEffect(() => {
    if (post?.content) {
      // Extract headings for TOC
      const lines = post.content.split('\n');
      const extractedHeadings: { id: string; text: string; level: number }[] = [];
      
      lines.forEach(line => {
        const match = line.match(/^(#{1,3})\s+(.+)$/);
        if (match) {
          const level = match[1].length;
          const text = match[2];
          const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
          extractedHeadings.push({ id, text, level });
        }
      });
      
      setHeadings(extractedHeadings);
    }
  }, [post]);

  useEffect(() => {
    const fetchShareCount = async () => {
      const apiKey = import.meta.env.VITE_SHAREDCOUNT_API_KEY;
      if (!apiKey) return;

      // Check cache first
      const cacheKey = `shareCount_${shareUrl}`;
      const cachedData = localStorage.getItem(cacheKey);
      if (cachedData) {
        const { count, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        // Cache for 2 hours (7200000 ms)
        if (now - timestamp < 7200000) {
          setShareCount(count);
          return;
        }
      }

      try {
        const response = await fetch(`https://api.sharedcount.com/v1.0/?url=${encodeURIComponent(shareUrl)}&apikey=${apiKey}`);
        
        if (response.status === 403) {
          // Rate limit exceeded or invalid key, fail gracefully by doing nothing (count remains 0)
          console.warn("SharedCount API rate limit exceeded or invalid key.");
          return;
        }

        if (response.ok) {
          const data = await response.json();
          let total = 0;
          if (data.Facebook) {
             total += typeof data.Facebook === 'object' ? (data.Facebook.total_count || 0) : data.Facebook;
          }
          if (data.Pinterest) {
            total += data.Pinterest;
          }
          
          setShareCount(total);

          // Update cache
          localStorage.setItem(cacheKey, JSON.stringify({
            count: total,
            timestamp: Date.now()
          }));
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
        content_type: 'blog_post',
        item_id: id.toString(),
        item_name: post?.title
      });
    }
  };

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEOHead 
        title={`${post.title} - National Credit Adviser`}
        description={`Read about ${post.title}. ${post.category} insights from the National Credit Adviser.`}
        ogImage={post.image ? `https://nca.co.za${post.image}` : undefined}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.image ? [`https://nca.co.za${post.image}`] : [],
          "datePublished": new Date(post.date).toISOString(),
          "dateModified": new Date(post.date).toISOString(),
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
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="container relative z-20 -mt-20">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              className="mb-6 bg-background/80 backdrop-blur hover:bg-background"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-8">
              {/* Main Content */}
              <div className="bg-card rounded-xl shadow-xl p-6 md:p-10 border border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-8 leading-tight">
                  {post.title}
                </h1>

                {/* Mobile Table of Contents */}
                {headings.length > 0 && (
                  <div className="lg:hidden mb-8 p-4 bg-secondary/30 rounded-lg border border-border">
                    <div className="font-bold text-lg mb-2 flex items-center gap-2">
                      <List className="h-4 w-4" /> Table of Contents
                    </div>
                    <ul className="space-y-2 text-sm">
                      {headings.map((heading, index) => (
                        <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}>
                          <a 
                            href={`#${heading.id}`} 
                            className="text-muted-foreground hover:text-primary transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({node, ...props}) => {
                        const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                        return <h1 id={id} className="text-3xl font-bold text-primary mt-8 mb-4" {...props} />
                      },
                      h2: ({node, ...props}) => {
                        const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                        return <h2 id={id} className="text-2xl font-bold text-primary mt-8 mb-4" {...props} />
                      },
                      h3: ({node, ...props}) => {
                        const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                        return <h3 id={id} className="text-xl font-bold text-primary mt-6 mb-3" {...props} />
                      },
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                      li: ({node, ...props}) => <li className="pl-1" {...props} />,
                      blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/30 pl-4 italic my-6 text-lg" {...props} />,
                      a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />,
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>

                <div className="mt-10 pt-6 border-t border-border flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-muted-foreground">
                      Share this post
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
                      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, '_blank');
                    }}>
                      <Twitter className="h-4 w-4 text-[#1DA1F2]" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => {
                      trackShare('native_or_copy');
                      if (navigator.share) {
                        navigator.share({
                          title: post.title,
                          text: `Check out this post: ${post.title}`,
                          url: shareUrl
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                      }
                    }}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar (Desktop Table of Contents) */}
              <div className="hidden lg:block space-y-8">
                {headings.length > 0 && (
                  <div className="sticky top-24 bg-card rounded-xl shadow-md p-6 border border-border">
                    <div className="font-bold text-lg mb-4 flex items-center gap-2 text-primary">
                      <List className="h-4 w-4" /> Table of Contents
                    </div>
                    <ul className="space-y-3 text-sm">
                      {headings.map((heading, index) => (
                        <li key={index} style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                          <a 
                            href={`#${heading.id}`} 
                            className="text-muted-foreground hover:text-primary transition-colors block border-l-2 border-transparent hover:border-primary pl-2 -ml-2"
                            onClick={(e) => {
                              e.preventDefault();
                              document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            }}
                          >
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <GoogleAd slot="7370515675" format="rectangle" label="Sponsored" />
              </div>
            </div>

            <div className="mt-12 lg:hidden">
              <GoogleAd slot="7370515675" format="auto" label="Sponsored" />
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold font-sans text-primary mb-6">Related Posts</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {blogData
                  .filter(item => item.category === post.category && item.id !== post.id)
                  .slice(0, 2)
                  .map(related => (
                    <Link key={related.id} href={`/blog/${related.id}`}>
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
                            Read Post <ArrowRight className="ml-1 h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
              {blogData.filter(item => item.category === post.category && item.id !== post.id).length === 0 && (
                 <p className="text-muted-foreground italic">No related posts found at this time.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
