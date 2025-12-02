import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileText, Scale, Shield, ExternalLink, AlertTriangle, Users, Gavel, Building } from "lucide-react";
import GoogleAd from "@/components/GoogleAd";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import GlossaryTerm from "@/components/GlossaryTerm";

export default function TheAct() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const tocItems = [
    { id: "purpose", label: "Purpose of the Act" },
    { id: "amendments", label: "Key Amendments" },
    { id: "rights", label: "Consumer Rights" },
    { id: "obligations", label: "Credit Provider Obligations" },
    { id: "reckless", label: "Reckless Lending" },
    { id: "over-indebtedness", label: "Over-indebtedness" },
    { id: "counselling", label: "Debt Counselling" },
    { id: "dispute", label: "Dispute Resolution" },
    { id: "ncr", label: "National Credit Regulator" },
    { id: "tribunal", label: "National Consumer Tribunal" }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <SEOHead 
        title="The National Credit Act" 
        description="Read the full National Credit Act No. 34 of 2005. Understand your consumer rights, credit provider obligations, and reckless lending regulations."
      />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/legal-act.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-sans mb-6">The National Credit Act</h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl leading-relaxed">
            Act No. 34 of 2005. Promoting a fair, transparent, competitive, sustainable, responsible, efficient, effective and accessible credit market and industry.
          </p>
        </div>
      </div>

      <div className="container mt-12 grid md:grid-cols-3 gap-12">
        {/* Sidebar Navigation (Sticky) */}
        <div className="md:col-span-1">
          <div className="sticky top-24 space-y-8">
            <Card className="bg-secondary/50 border-none">
              <CardHeader>
                <CardTitle className="font-sans text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-chart-1" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[400px] px-6 pb-6">
                  <ul className="space-y-4 text-sm">
                    {tocItems.map((item, i) => (
                      <li 
                        key={i} 
                        onClick={() => scrollToSection(item.id)}
                        className="flex items-center gap-3 text-muted-foreground hover:text-chart-1 cursor-pointer transition-colors"
                      >
                        <span className="text-xs font-bold text-chart-1/50">{String(i + 1).padStart(2, '0')}</span>
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>

            <div className="bg-chart-1 text-white p-6 rounded-xl shadow-lg">
              <h3 className="font-sans font-bold text-xl mb-2">Need Legal Advice?</h3>
              <p className="text-white/80 text-sm mb-4">
                The Act can be complex. If you are unsure about your rights, consult a registered debt counsellor or legal expert.
              </p>
              <Link href="/debt-counsellors">
                <button className="w-full bg-white text-chart-1 font-bold py-2 rounded hover:bg-white/90 transition-colors text-sm">
                  Find a Counsellor
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          <GoogleAd slot="1122334455" className="mb-8" />
          
          {/* Section 1: Purpose */}
          <section id="purpose" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center text-chart-1">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Purpose of the Act</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                The <GlossaryTerm term="National Credit Act" /> (NCA) was signed into law to address the imbalances in the credit market. It aims to protect consumers from unfair credit practices and to promote a sustainable credit market in South Africa.
              </p>
              
              <div className="bg-secondary/30 border-l-4 border-chart-1 p-4 my-6 not-prose">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This page provides a summary of the Act. For the official and most up-to-date version, including all amendments, please visit the <a href="https://www.ncr.org.za" target="_blank" rel="noopener noreferrer" className="text-chart-1 font-bold hover:underline inline-flex items-center gap-1">National Credit Regulator (NCR) website <ExternalLink className="h-3 w-3" /></a>.
                </p>
              </div>

              <p>
                <strong>Key Objectives:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Promote and advance the social and economic welfare of South Africans.</li>
                <li>Promote a fair, transparent, competitive, sustainable, responsible, efficient, effective and accessible credit market.</li>
                <li>Protect consumers from <GlossaryTerm term="Reckless Lending" /> and <GlossaryTerm term="Over-indebtedness" />.</li>
                <li>Provide for debt re-organisation in cases of over-indebtedness.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Key Amendments */}
          <section id="amendments" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center text-chart-2">
                <FileText className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Key Amendments</h2>
            </div>
            <div className="grid gap-6">
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-chart-2">National Credit Amendment Act, 2014</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Introduced "debt intervention" measures to assist low-income consumers, strengthened <GlossaryTerm term="Affordability Assessment" /> regulations, and clarified reckless lending definitions.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-chart-2">Consumer Protection Act, 2008</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Amended the NCA to align consumer rights across credit and general consumer markets, ensuring consistent protection standards.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-chart-2">Financial Sector Regulation Act, 2017</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Established the "Twin Peaks" model of financial regulation, impacting how <GlossaryTerm term="Credit Provider">credit providers</GlossaryTerm> are supervised for market conduct.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md bg-white">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-chart-2">POPI Act, 2013</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Amended the NCA to ensure the protection of personal information held by <GlossaryTerm term="Credit Bureau">credit bureaus</GlossaryTerm> and credit providers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Section 3: Consumer Rights */}
          <section id="rights" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-3/10 flex items-center justify-center text-chart-3">
                <Shield className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Your Rights as a Consumer</h2>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: "Right to apply for credit",
                  content: "Every adult person has the right to apply for credit. However, a credit provider has the right to refuse credit based on reasonable commercial grounds."
                },
                {
                  title: "Right to reasons for credit refusal",
                  content: "If your application for credit is refused, you have the right to be given reasons for the refusal in writing."
                },
                {
                  title: "Right to information in plain language",
                  content: "You have the right to receive documents and agreements in a language that you understand (plain language)."
                },
                {
                  title: "Right to receive documents",
                  content: "You have the right to receive a copy of your credit agreement and a replacement copy if you lose it."
                },
                {
                  title: "Right to confidentiality",
                  content: "Your personal and financial information must be treated as confidential and may only be used for the purpose for which it was given."
                }
              ].map((right, i) => (
                <Accordion type="single" collapsible key={i} className="bg-white border rounded-lg px-4">
                  <AccordionItem value={`item-${i}`} className="border-none">
                    <AccordionTrigger className="font-sans font-semibold text-primary hover:text-chart-1 hover:no-underline">
                      {right.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {right.content}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </div>
          </section>

          {/* Section 4: Credit Provider Obligations */}
          <section id="obligations" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-4/10 flex items-center justify-center text-chart-4">
                <Building className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Credit Provider Obligations</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p><GlossaryTerm term="Credit Provider">Credit providers</GlossaryTerm> must register with the <GlossaryTerm term="National Credit Regulator" /> and adhere to strict guidelines, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Conducting thorough <GlossaryTerm term="Affordability Assessment">affordability assessments</GlossaryTerm> before granting credit.</li>
                <li>Providing clear and understandable pre-agreement statements and quotations.</li>
                <li>Ensuring marketing practices are not misleading or deceptive.</li>
                <li>Reporting accurate consumer credit information to <GlossaryTerm term="Credit Bureau">credit bureaus</GlossaryTerm>.</li>
              </ul>
            </div>
          </section>

          {/* Section 5: Reckless Lending */}
          <section id="reckless" className="scroll-mt-24">
            <GoogleAd slot="5544332211" className="mb-8" />
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-5/10 flex items-center justify-center text-chart-5">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Reckless Lending</h2>
            </div>
            <Card className="bg-secondary/30 border-l-4 border-l-chart-5">
              <CardContent className="pt-6">
                <p className="text-lg text-primary mb-4 font-medium">
                  A credit agreement is considered reckless if, at the time the agreement was made:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-chart-5 font-bold">•</span>
                    The credit provider failed to conduct an <GlossaryTerm term="Affordability Assessment" />.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-chart-5 font-bold">•</span>
                    The consumer did not understand the risks, costs, or obligations of the agreement.
                  </li>
                  <li className="flex gap-3">
                    <span className="text-chart-5 font-bold">•</span>
                    Entering into the agreement caused the consumer to become over-indebted.
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-white rounded-lg border border-chart-5/20">
                  <p className="text-sm text-chart-5 font-bold">
                    If a court finds that a credit agreement is reckless, it may set aside all or part of the consumer's rights and obligations under that agreement.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 6: Over-indebtedness */}
          <section id="over-indebtedness" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center text-chart-1">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Over-indebtedness</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                A consumer is <GlossaryTerm term="Over-indebtedness">over-indebted</GlossaryTerm> if the preponderance of available information indicates that the consumer is or will be unable to satisfy in a timely manner all the obligations under all the credit agreements to which the consumer is a party.
              </p>
              <p>
                When determining over-indebtedness, a debt counsellor must consider the consumer's:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Financial means, prospects, and obligations.</li>
                <li>Probable propensity to satisfy obligations in a timely manner.</li>
              </ul>
            </div>
          </section>

          {/* Section 7: Debt Counselling */}
          <section id="counselling" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-2/10 flex items-center justify-center text-chart-2">
                <Users className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Debt Counselling</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                <GlossaryTerm term="Debt Counselling" /> is a formal debt restructuring process for over-indebted consumers. A registered debt counsellor assesses the consumer's financial situation and, if they are found to be over-indebted, proposes a restructuring plan to the Magistrate's Court.
              </p>
              <p>
                <strong>Benefits of Debt Counselling:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Legal protection against legal action from credit providers (for 60 days).</li>
                <li>Restructured monthly payments to make them affordable.</li>
                <li>Potential reduction in interest rates.</li>
                <li>Clear path to rehabilitation and a clearance certificate.</li>
              </ul>
            </div>
          </section>

          {/* Section 8: Dispute Resolution */}
          <section id="dispute" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-3/10 flex items-center justify-center text-chart-3">
                <Gavel className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Dispute Resolution</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                Consumers have the right to resolve disputes regarding credit agreements. The Act provides for several mechanisms:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Alternative Dispute Resolution (ADR):</strong> Mediation or conciliation through an ombud or ADR agent.</li>
                <li><strong><GlossaryTerm term="National Credit Regulator" /> (NCR):</strong> Filing a complaint with the NCR for investigation.</li>
                <li><strong><GlossaryTerm term="National Consumer Tribunal" /> (NCT):</strong> Adjudication of disputes and enforcement of the Act.</li>
              </ul>
            </div>
          </section>

          {/* Section 9: National Credit Regulator */}
          <section id="ncr" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-4/10 flex items-center justify-center text-chart-4">
                <Building className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">National Credit Regulator (NCR)</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                The <GlossaryTerm term="National Credit Regulator" /> is the primary regulator responsible for enforcing the National Credit Act. Its functions include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Registering credit providers, credit bureaus, and debt counsellors.</li>
                <li>Monitoring the credit market to ensure compliance.</li>
                <li>Investigating complaints and enforcing the Act.</li>
                <li>Promoting consumer education and awareness.</li>
              </ul>
            </div>
          </section>

          {/* Section 10: National Consumer Tribunal */}
          <section id="tribunal" className="scroll-mt-24">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-5/10 flex items-center justify-center text-chart-5">
                <Gavel className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">National Consumer Tribunal (NCT)</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                The <GlossaryTerm term="National Consumer Tribunal" /> is an independent adjudicative body with jurisdiction throughout South Africa. It hears cases regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Alleged prohibited conduct by credit providers.</li>
                <li>Applications for debt re-arrangement.</li>
                <li>Reviews of decisions made by the NCR.</li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
