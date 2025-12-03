import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";
import { initGA } from "@/lib/analytics";

// Pages
import Home from "./pages/Home";
import TheAct from "./pages/TheAct";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import DebtCounsellors from "./pages/DebtCounsellors";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <WouterRouter hook={useHashLocation}>
      <Layout>
        <Switch>
          <Route path="/" component={Home} />
            <Route path="/the-act" component={TheAct} />
            <Route path="/news" component={News} />
            <Route path="/news/:id" component={NewsDetail} />
            <Route path="/debt-counsellors" component={DebtCounsellors} />
          <Route path="/faq" component={FAQ} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </WouterRouter>
  );
}

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
