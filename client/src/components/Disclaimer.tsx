import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="bg-secondary/50 border-t border-border py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-shrink-0 text-chart-3">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div className="space-y-4 text-sm text-muted-foreground">
            <h2 className="font-bold text-primary text-base">Legal Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only and does not constitute legal, financial, or professional advice. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
            <p>
              Any reliance you place on such information is therefore strictly at your own risk. In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
            <p className="font-medium text-primary">
              For official information regarding the National Credit Act, please visit the National Credit Regulator (NCR) website at <a href="https://www.ncr.org.za" target="_blank" rel="noopener noreferrer" className="underline hover:text-chart-1">www.ncr.org.za</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
