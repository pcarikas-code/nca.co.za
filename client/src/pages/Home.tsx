import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck, Users } from "lucide-react";
import { Link } from "wouter";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <SEOHead 
        title="Home" 
        description="The National Credit Adviser (NCA) promotes a fair and non-discriminatory marketplace for access to consumer credit in South Africa. Find debt counsellors and learn about your rights."
      />
      
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-banner.png')] bg-cover bg-center opacity-20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
        
        <div className="container relative z-10 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-chart-1/10 text-chart-1 text-sm font-bold font-sans tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-chart-1"></span>
              Protecting Your Financial Future
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-sans text-primary leading-tight">
              Understanding Your Rights Under the <span className="text-chart-1">National Credit Act</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              We promote a fair and non-discriminatory marketplace for access to consumer credit. Empowering South Africans with knowledge and protection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/debt-counsellors">
                <Button size="lg" className="bg-chart-1 hover:bg-chart-1/90 text-white font-sans text-lg px-8 shadow-lg shadow-chart-1/20">
                  Find a Debt Counsellor
                </Button>
              </Link>
              <Link href="/the-act">
                <Button size="lg" variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 font-sans text-lg px-8">
                  Read the Act
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Hero Image / Graphic */}
          <div className="relative hidden md:block animate-in slide-in-from-right duration-1000 delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
               <img 
                src="/images/hero-banner.png" 
                alt="South African Professionals" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4 animate-bounce-slow">
              <div className="h-12 w-12 bg-chart-2/20 rounded-full flex items-center justify-center text-chart-2">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="font-bold font-sans text-primary">Consumer Protection</p>
                <p className="text-xs text-muted-foreground">Guaranteed by Law</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features / Value Prop */}
      <section className="py-20 bg-background">
        <div className="container">
          <GoogleAd slot="1234567890" className="max-w-4xl mx-auto mb-12" />
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-4">How the NCA Protects You</h2>
            <p className="text-muted-foreground text-lg">The National Credit Act (NCA) was introduced to promote a fair and non-discriminatory marketplace for access to consumer credit.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: "Fair Market Practices",
                desc: "Ensuring all credit providers treat consumers fairly and without discrimination.",
                color: "text-chart-1",
                bg: "bg-chart-1/10"
              },
              {
                icon: ShieldCheck,
                title: "Reckless Lending",
                desc: "Preventing credit providers from lending money to consumers who cannot afford to repay it.",
                color: "text-chart-3",
                bg: "bg-chart-3/10"
              },
              {
                icon: Users,
                title: "Debt Counselling",
                desc: "Providing a mechanism for over-indebted consumers to restructure their debts.",
                color: "text-chart-5",
                bg: "bg-chart-5/10"
              }
            ].map((feature, idx) => (
              <Card key={idx} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-secondary/50">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${feature.bg} ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <CardTitle className="font-sans text-xl text-primary">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Split Section: Debt Counselling */}
      <section className="py-0 bg-primary text-primary-foreground overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[600px]">
          <div className="relative h-full min-h-[400px]">
            <img 
              src="/images/debt-counselling.png" 
              alt="Debt Counselling Session" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
          </div>
          <div className="flex flex-col justify-center p-12 md:p-20 space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white">
              Overwhelmed by Debt?
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed">
              Debt counselling is a formal legal process that provides for a consumer to be declared over-indebted and for the Debt Counsellor to negotiate a restructured payment plan and obtain a court order confirming the new repayment plan.
            </p>
            <ul className="space-y-4">
              {[
                "Immediate protection from legal action",
                "Negotiated lower monthly installments",
                "Fixed repayment term",
                "Clear path to becoming debt-free"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="h-6 w-6 text-chart-2" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/debt-counsellors">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-sans w-fit mt-4">
                Find a Registered Counsellor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-24 bg-background relative">
        <div className="absolute inset-0 bg-[url('/images/news-bg.png')] bg-cover bg-center opacity-5"></div>
        <div className="container relative z-10">
          <GoogleAd slot="0987654321" className="max-w-4xl mx-auto mb-12" />
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-sans text-primary mb-2">Latest News & Updates</h2>
              <p className="text-muted-foreground">Stay informed about changes to the Credit Act.</p>
            </div>
            <Link href="/news">
              <Button variant="ghost" className="text-chart-1 hover:text-chart-1/80 font-sans group">
                View All News <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Minister Withdraws NCA Amendment Regulations",
                date: "Sep 12, 2025",
                excerpt: "The Minister of Trade, Industry and Competition has withdrawn the draft regulations which listed educational institutions as credit providers."
              },
              {
                title: "Draft Amendments to Affordability Assessment",
                date: "Aug 19, 2025",
                excerpt: "New draft amendments aim to strengthen consumer protection by revising how affordability assessments are conducted by credit providers."
              },
              {
                title: "Debt Counselling: A Lifeline for Millennials",
                date: "Oct 07, 2025",
                excerpt: "Recent indices reveal a stark financial reality for South African millennials, with debt counselling becoming a critical tool for financial recovery."
              }
            ].map((news, idx) => (
              <Card key={idx} className="group hover:border-chart-1/50 transition-colors cursor-pointer bg-white">
                <CardHeader>
                  <p className="text-sm font-bold text-chart-1 mb-2 font-sans uppercase tracking-wider">{news.date}</p>
                  <CardTitle className="font-sans text-xl group-hover:text-chart-1 transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {news.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-bold text-primary group-hover:translate-x-2 transition-transform">
                    Read More <ArrowRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-chart-1 text-white text-center">
        <div className="container max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold font-sans mb-6">Know Your Rights. Protect Your Future.</h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            The National Credit Act is designed to protect you. Whether you are applying for credit or struggling to repay it, we are here to provide the information you need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/faq">
              <Button size="lg" variant="secondary" className="bg-white text-chart-1 hover:bg-white/90 font-sans text-lg px-10">
                Read FAQs
              </Button>
            </Link>
            {/* Contact Button Removed */}
          </div>
        </div>
      </section>
    </div>
  );
}
