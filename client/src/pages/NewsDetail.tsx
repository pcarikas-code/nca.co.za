import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";

// Mock data - in a real app this would come from an API or CMS
// We need to duplicate the data here or move it to a shared data file
// For now, I'll use a simple lookup based on the ID from the URL
const newsArticles = [
  {
    id: 1,
    title: "Understanding the National Credit Amendment Act",
    category: "Legislation",
    date: "October 15, 2023",
    readTime: "5 min read",
    image: "/images/legal-act.png",
    source: "National Credit Regulator (NCR)",
    sourceUrl: "https://www.ncr.org.za",
    content: `
      <p class="mb-4">The National Credit Amendment Act represents a significant shift in how consumer debt is managed in South Africa. This legislation introduces new measures to assist over-indebted consumers, particularly those in lower income brackets.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Key Changes Introduced</h2>
      <p class="mb-4">One of the most discussed aspects of the Amendment Act is the debt intervention measure, often referred to as "debt relief." This provision allows the National Credit Tribunal to suspend or extinguish the debt of certain consumers who meet specific criteria.</p>
      
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Eligibility:</strong> Consumers earning less than R7,500 per month with unsecured debt of less than R50,000.</li>
        <li><strong>Process:</strong> The process is designed to be accessible without the need for legal representation.</li>
        <li><strong>Impact:</strong> While beneficial for consumers, it has raised questions about credit availability in the future.</li>
      </ul>

      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">What This Means for You</h2>
      <p class="mb-4">If you are struggling with debt, it is crucial to understand whether you qualify for debt review or the new debt intervention. Debt review remains the primary mechanism for most South Africans to restructure their debt obligations while protecting their assets.</p>
      
      <p class="mb-4">We recommend consulting with a registered debt counsellor to assess your financial situation accurately. They can guide you through the available options and help you choose the path that best secures your financial future.</p>
    `
  },
  {
    id: 2,
    title: "Interest Rates Hike: How to Manage Your Debt",
    category: "Finance",
    date: "November 2, 2023",
    readTime: "4 min read",
    image: "/images/debt-counselling.png",
    source: "South African Reserve Bank (SARB)",
    sourceUrl: "https://www.resbank.co.za",
    content: `
      <p class="mb-4">With the South African Reserve Bank recently announcing another hike in the repo rate, consumers with debt linked to prime lending rates will see an increase in their monthly repayments. This includes home loans, vehicle finance, and credit cards.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Strategies for Coping</h2>
      <p class="mb-4">When interest rates rise, your disposable income shrinks. Here are practical steps to manage the impact:</p>
      
      <ol class="list-decimal pl-6 mb-6 space-y-2">
        <li><strong>Review Your Budget:</strong> Immediately update your budget to account for higher repayment amounts.</li>
        <li><strong>Cut Discretionary Spending:</strong> Look for non-essential expenses that can be temporarily reduced or eliminated.</li>
        <li><strong>Contact Creditors:</strong> If you anticipate difficulty paying, contact your credit providers early to discuss options.</li>
      </ol>

      <p class="mb-4">Ignoring the problem will only lead to arrears and potential legal action. Proactive management is key during high-interest cycles.</p>
    `
  },
  {
    id: 3,
    title: "The Benefits of Debt Review Explained",
    category: "Education",
    date: "September 28, 2023",
    readTime: "6 min read",
    image: "/images/faq-illustration.png",
    source: "Debt Counsellors Association of South Africa (DCASA)",
    sourceUrl: "https://www.dcasa.co.za",
    content: `
      <p class="mb-4">Debt review is a legal process introduced by the National Credit Act to help over-indebted consumers. It offers a structured way to repay debts without the threat of legal action and asset repossession.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Immediate Protection</h2>
      <p class="mb-4">Once you apply for debt review, you are legally protected from creditors. They can no longer harass you for payment or take legal action against you, provided you stick to the restructured payment plan.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Lower Monthly Installments</h2>
      <p class="mb-4">A debt counsellor negotiates with your creditors to extend your repayment terms and often reduce interest rates. This results in a consolidated, lower monthly installment that you can actually afford.</p>
      
      <p class="mb-4">While under debt review, you cannot incur further debt, which helps break the cycle of borrowing to pay off existing loans.</p>
    `
  },
  {
    id: 4,
    title: "Avoiding Credit Card Fraud in the Digital Age",
    category: "Security",
    date: "December 5, 2023",
    readTime: "3 min read",
    image: "/images/news-bg.png",
    source: "South African Banking Risk Information Centre (SABRIC)",
    sourceUrl: "https://www.sabric.co.za",
    content: `
      <p class="mb-4">As online shopping continues to grow, so does the risk of credit card fraud. Protecting your financial information is more important than ever.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">Top Safety Tips</h2>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>Check Statements:</strong> Regularly review your bank statements for any unauthorized transactions.</li>
        <li><strong>Secure Sites Only:</strong> Only enter card details on websites starting with "https" and showing a padlock icon.</li>
        <li><strong>Two-Factor Authentication:</strong> Enable 2FA on all your banking and shopping accounts.</li>
      </ul>
      
      <p class="mb-4">If you suspect fraud, report it to your bank immediately to stop the card and prevent further losses.</p>
    `
  },
  {
    id: 5,
    title: "Your Rights When Dealing with Debt Collectors",
    category: "Legal Rights",
    date: "January 12, 2024",
    readTime: "5 min read",
    image: "/images/legal-act.png",
    source: "Council for Debt Collectors",
    sourceUrl: "https://www.cfdc.org.za",
    content: `
      <p class="mb-4">Debt collectors must adhere to the National Credit Act and the Debt Collectors Act. You have rights that protect you from harassment and unfair practices.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">What They Cannot Do</h2>
      <p class="mb-4">Debt collectors are prohibited from:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li>Using force or intimidation.</li>
        <li>Calling at unreasonable hours (e.g., late at night).</li>
        <li>Misrepresenting legal documents.</li>
        <li>Charging fees that exceed the regulated amounts.</li>
      </ul>
      
      <p class="mb-4">Know your rights and report any unethical behavior to the Council for Debt Collectors.</p>
    `
  },
  {
    id: 6,
    title: "Budgeting 101: Taking Control of Your Finances",
    category: "Finance",
    date: "February 20, 2024",
    readTime: "7 min read",
    image: "/images/debt-counselling.png",
    source: "Financial Sector Conduct Authority (FSCA)",
    sourceUrl: "https://www.fsca.co.za",
    content: `
      <p class="mb-4">A budget is the foundation of financial health. It gives you control over your money and helps you achieve your financial goals.</p>
      
      <h2 class="text-2xl font-bold mt-8 mb-4 text-primary">The 50/30/20 Rule</h2>
      <p class="mb-4">A popular budgeting method is the 50/30/20 rule:</p>
      <ul class="list-disc pl-6 mb-6 space-y-2">
        <li><strong>50% Needs:</strong> Housing, utilities, groceries, transport.</li>
        <li><strong>30% Wants:</strong> Entertainment, dining out, hobbies.</li>
        <li><strong>20% Savings/Debt:</strong> Savings, investments, and extra debt repayments.</li>
      </ul>
      
      <p class="mb-4">Start tracking your expenses today to see where your money is really going.</p>
    `
  }
];

export default function NewsDetail() {
  const params = useParams();
  const id = parseInt(params.id || "0");
  const article = newsArticles.find(a => a.id === id);

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
      />
      
      <div className="min-h-screen bg-background pb-20">
        {/* Hero Image */}
        <div className="w-full h-[40vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
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
                className="prose prose-lg max-w-none text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

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
                <div className="text-sm font-medium text-muted-foreground">
                  Share this article
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={() => {
                    navigator.share({
                      title: article.title,
                      text: `Check out this article: ${article.title}`,
                      url: window.location.href
                    }).catch(() => {});
                  }}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <GoogleAd slot="article-bottom" format="auto" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
