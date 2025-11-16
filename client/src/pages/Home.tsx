import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ShoppingCart, Users, Wrench, Leaf, TrendingUp, Globe, ChevronDown, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const testimonials = [
  {
    id: 1,
    name: "João Machado",
    role: "Agricultor em Nampula",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    text: "A plataforma transformou minha produção. Com as ferramentas de cálculo de carbono, consegui reduzir custos em 30% e aumentar a sustentabilidade da minha fazenda.",
    rating: 5
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Cooperativa em Maputo",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    text: "O marketplace conectou nossa cooperativa diretamente aos consumidores. Nossas vendas triplicaram e conseguimos preços mais justos para nossos produtos orgânicos.",
    rating: 5
  },
  {
    id: 3,
    name: "Carlos Alves",
    role: "Consultor Agrícola",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    text: "O centro de conhecimento é uma fonte incrível de informações atualizadas. Uso diariamente para me manter informado sobre as melhores práticas sustentáveis.",
    rating: 5
  },
  {
    id: 4,
    name: "Ana Silva",
    role: "Produtora de Hortaliças",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    text: "As ferramentas de cálculo de custos me ajudaram a entender melhor minha margem de lucro. Agora consigo precificar meus produtos de forma mais inteligente.",
    rating: 5
  },
  {
    id: 5,
    name: "Pedro Neves",
    role: "Técnico Agrícola",
    image: "https://images.unsplash.com/photo-1500595046891-79fde38eba5a?q=80&w=150",
    text: "A consultoria especializada me ajudou a implementar práticas regenerativas. Os resultados foram visíveis em apenas 3 meses de aplicação.",
    rating: 5
  },
  {
    id: 6,
    name: "Rosa Mendes",
    role: "Empreendedora Rural",
    image: "https://images.unsplash.com/photo-1507876466326-da4f10d7a81d?q=80&w=150",
    text: "Graças ao SustainHub, consegui expandir meu negócio de forma sustentável. A plataforma oferece todas as ferramentas que um pequeno produtor precisa.",
    rating: 5
  }
];

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
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { user, loading, isAuthenticated } = useAuth();

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const scrollToContent = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  const testimonial = testimonials[currentTestimonial];

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

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">O Que Nossos Clientes Dizem</h2>

          {/* Carousel */}
          <div className="bg-white border-2 border-primary rounded-xl p-8 md:p-12">
            <div className="flex items-start gap-6 mb-6">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-primary"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-lg text-gray-700 italic mb-8">
              "{testimonial.text}"
            </p>

            {/* Counter and Button */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                {currentTestimonial + 1} de {testimonials.length} histórias de sucesso
              </p>
              <Link href="/testimonials">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white hover:border-primary transition-colors font-semibold">
                  Ver Todas as Histórias
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>
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
