
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingCart, Users, Wrench, Leaf, TrendingUp, Globe, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLanguage } from "@/contexts/LanguageContext";



const getFeatures = (t: (key: string) => string) => [
  {
    icon: BookOpen,
    title: t('features.knowledge'),
    description: t('features.knowledge_desc'),
    href: "/knowledge"
  },
  {
    icon: ShoppingCart,
    title: t('features.marketplace'),
    description: t('features.marketplace_desc'),
    href: "/marketplace"
  },
  {
    icon: Users,
    title: t('features.consulting'),
    description: t('features.consulting_desc'),
    href: "/services"
  },
  {
    icon: Wrench,
    title: t('features.tools'),
    description: t('features.tools_desc'),
    href: "/tools"
  }
];

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const features = getFeatures(t);

  const scrollToContent = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };



  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200')",
            backgroundAttachment: "fixed"
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center text-white">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Leaf className="w-8 h-8" />
            <span className="text-lg font-semibold">{t('hero.tagline')}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 mb-8 max-w-3xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/knowledge">
              <Button size="lg" className="bg-emerald-600 text-white hover:bg-emerald-700 text-lg px-8 py-6 h-auto font-semibold">
                {t('hero.explore')}
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 h-auto font-semibold"
              onClick={scrollToContent}
            >
              {t('hero.learn_more')}
              <ChevronDown className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-4">{t('features.title')}</h2>
            <p className="text-xl text-slate-700">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={index} href={feature.href}>
                  <Card className="hover-lift hover-glow border-2 border-slate-200 hover:border-emerald-600 hover:shadow-lg transition-all bg-white cursor-pointer h-full">
                    <CardHeader>
                      <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-emerald-700" />
                      </div>
                      <CardTitle className="text-xl text-slate-900">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-slate-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg opacity-90">{t('stats.resources')}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg opacity-90">{t('stats.users')}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">{t('stats.specialists')}</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-lg opacity-90">{t('stats.satisfaction')}</p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link href="/knowledge">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 text-lg px-8 py-6 h-auto font-semibold">
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
