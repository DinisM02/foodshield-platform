import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Knowledge from "./pages/Knowledge";
import Marketplace from "./pages/Marketplace";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import MyArea from "./pages/MyArea";
import Services from "./pages/Services";
import Tools from "./pages/Tools";

import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Consumer from '@/pages/Consumer';
import ConsumerKnowledge from '@/pages/ConsumerKnowledge';
import ConsumerTools from '@/pages/ConsumerTools';
import ConsumerBlog from "./pages/ConsumerBlog";
import ConsumerMarketplace from "./pages/ConsumerMarketplace";
import ConsumerServices from "./pages/ConsumerServices";
import ConsumerProfile from "./pages/ConsumerProfile";
import ConsumerFavorites from "./pages/ConsumerFavorites";
import About from "./pages/About";
import Welcome from "./pages/Welcome";
import ConsumerArea from "./pages/ConsumerArea";
import FirebaseLogin from "./pages/FirebaseLogin";
import FirebaseProfile from "./pages/FirebaseProfile";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/knowledge"} component={Knowledge} />
      <Route path={"/marketplace"} component={Marketplace} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path="/my-orders" component={MyOrders} />
      <Route path="/my-area" component={MyArea} />
      <Route path={"/services"} component={Services} />
      <Route path={"/tools"} component={Tools} />

      <Route path={"/blog"} component={Blog} />
      <Route path={"/about"} component={About} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/firebase-login"} component={FirebaseLogin} />
      <Route path={"/profile"} component={FirebaseProfile} />
      <Route path={"/admin"} component={Admin} />
      <Route path={"/@admin"} component={Admin} />
      <Route path={"/@dashboard"} component={Dashboard} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/consumer-area" component={ConsumerArea} />
       <Route path="/consumer" component={Consumer} />
       <Route path="/consumer/knowledge" component={ConsumerKnowledge} />
      <Route path="/consumer/tools" component={ConsumerTools} />
      <Route path={"/consumer/blog"} component={ConsumerBlog} />
      <Route path={"/consumer/marketplace"} component={ConsumerMarketplace} />
      <Route path={"/consumer/services"} component={ConsumerServices} />
      <Route path={"/consumer/profile"} component={ConsumerProfile} />
      <Route path={"/consumer/favorites"} component={ConsumerFavorites} />
      <Route path={"/"} component={Home} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
