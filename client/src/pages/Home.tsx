
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingCart, Users, Wrench, Leaf, TrendingUp, Globe, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";



const features = [
  {
    icon: BookOpen,
    title: "Centro de Conhecimento",
    description: "Biblioteca digital com artigos, vídeos, guias e pesquisas sobre agricultura sustentável"
  },
  {
    icon: ShoppingCart,
    title: "Marketplace",
    description: "Produtos locais com indicadores de sustentabilidade e impacto ambiental"
  },
  {
    icon: Users,
    title: "Consultoria",
    description: "Especialistas disponíveis para orientar projetos sustentáveis"
  },
  {
    icon: Wrench,
    title: "Ferramentas Digitais",
    description: "Calculadoras e dashboards para análise de sustentabilidade e custos"
  }
];

export default function Home() {
  const { user, loading, isAuthenticated } = useAuth();

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
            <span className="text-lg font-semibold">Segurança Alimentar e Desenvolvimento Sustentável</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            SustainHub
          </h1>
          <p className="text-2xl md:text-3xl opacity-90 mb-8 max-w-3xl mx-auto">
            A plataforma completa para transformar sistemas alimentares e promover práticas sustentáveis em Moçambique e além
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/knowledge">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto">
                Explorar Plataforma
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/20 text-lg px-8 py-6 h-auto"
              onClick={scrollToContent}
            >
              Saiba Mais
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
      <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Tudo Que Você Precisa</h2>
            <p className="text-xl text-gray-600">Uma plataforma integrada com ferramentas, conhecimento e recursos para impulsionar a sustentabilidade</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover-lift hover-glow border-2 border-gray-200 hover:border-primary transition-all">
                  <CardHeader>
                    <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">500+</div>
              <p className="text-lg opacity-90">Recursos Disponíveis</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1000+</div>
              <p className="text-lg opacity-90">Usuários Ativos</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Especialistas</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <p className="text-lg opacity-90">Satisfação</p>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container text-center">
          <h2 className="text-5xl font-bold mb-6">Pronto Para Começar?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Junte-se à nossa comunidade e faça parte da transformação sustentável
          </p>
          <Link href="/knowledge">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto">
              Começar Agora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
