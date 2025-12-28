import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 1. Removed 'bg-background' to allow index.css body patterns to show
          2. Added 'transition-colors' and 'duration-500' for the flowy theme swap
      */}
      <div className="min-h-screen text-foreground font-sans selection:bg-primary/20 selection:text-primary transition-colors duration-500">
        <Navigation />

        {/* 'relative z-10' ensures content sits cleanly above background glows */}
        <main className="relative z-10 min-h-[calc(100vh-80px)]">
          <Router />
        </main>

        <Footer />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
