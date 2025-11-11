import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Marketplace from "./pages/Marketplace";
import Services from "./pages/Services";
import Tools from "./pages/Tools";
import Testimonials from "./pages/Testimonials";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/marketplace"} component={Marketplace} />
      <Route path={"/services"} component={Services} />
      <Route path={"/tools"} component={Tools} />
      <Route path={"/testimonials"} component={Testimonials} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
