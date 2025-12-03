import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle } from "lucide-react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import { useState, useEffect } from "react";
import { trackSearch } from "@/lib/analytics";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search tracking
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length > 2) {
        trackSearch(searchQuery);
      }
    }, 1000); // Wait 1s after typing stops

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const faqs = [
    {
      question: "What is the National Credit Act?",
      answer: "The National Credit Act (NCA) is a law passed in South Africa to promote a fair and non-discriminatory marketplace for access to consumer credit and for that purpose to provide for the general regulation of consumer credit and improved standards of consumer information."
    },
    {
      question: "What is Debt Counselling?",
      answer: "Debt Counselling is a formal legal process that provides for a consumer to be declared over-indebted and for the Debt Counsellor to negotiate a restructured payment plan and obtain a court order confirming the new repayment plan."
    },
    {
      question: "Who can apply for Debt Counselling?",
      answer: "Any consumer who is struggling to meet their monthly debt obligations can apply for debt counselling. You must have a distributable income to offer to your credit providers."
    },
    {
      question: "Does the NCA apply to all credit agreements?",
      answer: "The Act applies to most credit agreements between parties dealing at arm's length and made within, or having an effect within, South Africa. There are some exceptions, such as large agreements with juristic persons."
    },
    {
      question: "What is reckless lending?",
      answer: "Reckless lending occurs when a credit provider fails to conduct a proper affordability assessment, or enters into an agreement with a consumer who does not understand the risks, or if the agreement causes the consumer to become over-indebted."
    },
    {
      question: "Can I apply for more credit while under debt review?",
      answer: "No. While you are under debt review, you are protected from legal action by credit providers, but you are restricted from entering into any new credit agreements until you have received a Clearance Certificate."
    },
    {
      question: "How long does the debt review process take?",
      answer: "The duration depends on the amount of debt and the repayment plan negotiated. It typically lasts between 3 to 5 years. Once all debts are paid, a Clearance Certificate is issued."
    },
    {
      question: "What happens if a credit provider refuses the repayment plan?",
      answer: "If a credit provider rejects the proposed repayment plan, the Debt Counsellor can refer the matter to a Magistrate's Court to have the plan made an order of court, which binds the credit provider."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead 
        title="Frequently Asked Questions" 
        description="Get answers to common questions about the National Credit Act, debt review process, and consumer rights in South Africa."
        schema={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }}
      />
      
      {/* Header */}
      <div className="bg-secondary py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[url('/images/faq-illustration.png')] bg-contain bg-no-repeat bg-right-bottom opacity-20 mix-blend-multiply hidden md:block"></div>
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-1/10 text-chart-1 text-sm font-bold font-sans mb-6">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-sans text-primary mb-6">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers to common questions about the National Credit Act, debt counselling, and your consumer rights.
            </p>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for answers..." 
                className="pl-12 h-14 text-lg bg-white border-none shadow-lg rounded-xl"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-16 grid lg:grid-cols-12 gap-12">
        {/* Main FAQ List */}
        <div className="lg:col-span-8 space-y-6">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed">
              <p className="text-muted-foreground">No answers found matching "{searchQuery}"</p>
              <Button variant="link" onClick={() => setSearchQuery("")} className="text-chart-1">Clear Search</Button>
            </div>
          ) : (
            filteredFaqs.map((faq, i) => (
              <Accordion type="single" collapsible key={i} className="bg-white border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow">
                <AccordionItem value={`item-${i}`} className="border-none">
                  <AccordionTrigger className="font-sans font-bold text-lg text-primary hover:text-chart-1 hover:no-underline py-6 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </div>

        {/* Sidebar with Ad */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-primary">Sponsored</h3>
              <GoogleAd slot="2722368811" className="w-full" label="Advertisement" />
            </div>
            
            <div className="mt-8 bg-secondary/50 p-6 rounded-xl border border-border/50">
              <h3 className="font-bold text-lg mb-2 text-primary">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">Our registered debt counsellors are ready to assist you with personalized advice.</p>
              <Button className="w-full bg-chart-1 hover:bg-chart-1/90 text-white" asChild>
                <a href="/#/debt-counsellors">Find a Counsellor</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
