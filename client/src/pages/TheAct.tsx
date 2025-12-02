import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, FileText, Scale, Shield } from "lucide-react";

export default function TheAct() {
  return (
    <div className="min-h-screen bg-background pb-20">
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
                    {[
                      "Purpose of the Act",
                      "Consumer Rights",
                      "Credit Provider Obligations",
                      "Reckless Credit",
                      "Over-indebtedness",
                      "Debt Counselling",
                      "Dispute Resolution",
                      "National Credit Regulator",
                      "National Consumer Tribunal"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground hover:text-chart-1 cursor-pointer transition-colors">
                        <span className="text-xs font-bold text-chart-1/50">0{i + 1}</span>
                        {item}
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
              <button className="w-full bg-white text-chart-1 font-bold py-2 rounded hover:bg-white/90 transition-colors text-sm">
                Find a Counsellor
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Section 1: Purpose */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-1/10 flex items-center justify-center text-chart-1">
                <Scale className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold font-sans text-primary">Purpose of the Act</h2>
            </div>
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <p>
                The National Credit Act (NCA) was signed into law to address the imbalances in the credit market. It aims to protect consumers from unfair credit practices and to promote a sustainable credit market in South Africa.
              </p>
              <p>
                <strong>Key Objectives:</strong>
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Promote and advance the social and economic welfare of South Africans.</li>
                <li>Promote a fair, transparent, competitive, sustainable, responsible, efficient, effective and accessible credit market.</li>
                <li>Protect consumers from reckless credit granting and over-indebtedness.</li>
                <li>Provide for debt re-organisation in cases of over-indebtedness.</li>
              </ul>
            </div>
          </section>

          {/* Section 2: Consumer Rights */}
          <section>
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

          {/* Section 3: Reckless Lending */}
          <section>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-chart-5/10 flex items-center justify-center text-chart-5">
                <FileText className="h-6 w-6" />
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
                    The credit provider failed to conduct an affordability assessment.
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

        </div>
      </div>
    </div>
  );
}
