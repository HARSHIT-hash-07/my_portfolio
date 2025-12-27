import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import About from "@/pages/About";
import Insights from "@/pages/Insights";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";
import { ScrollToTop } from "@/components/ScrollToTop"; // Helper we'll make inline if needed, but let's assume standard behavior

// Simple scroll to top component since we don't have it in file list
function ScrollToTopWrapper() {
  // Logic usually handled by router or dedicated component
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/about" component={About} />
      <Route path="/insights" component={Insights} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-background min-h-screen text-foreground font-sans selection:bg-primary/20 selection:text-white">
        <Navigation />
        <Router />
        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
