import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, ShoppingCart, Wrench, Users, Leaf, TrendingUp, Globe, ChevronDown, Star, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-blue-900/80" />
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 text-center text-white animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-scale-in">
            <Leaf className="w-5 h-5" />
            <span className="text-sm font-medium">Segurança Alimentar & Desenvolvimento Sustentável</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            SustainHub
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Plataforma completa para transformar sistemas alimentares e promover práticas sustentáveis em Moçambique e além
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {isAuthenticated ? (
              <Link href="/knowledge">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto group">
                  Explorar Plataforma
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto group">
                  Começar Agora
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            )}
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToContent}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Tudo Que Você Precisa
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma plataforma integrada com ferramentas, conhecimento e recursos para impulsionar a sustentabilidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Knowledge Center Card */}
            <Link href="/knowledge">
              <Card className="hover-lift hover-glow cursor-pointer h-full group border-2 hover:border-primary transition-all">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800" 
                    alt="Centro de Conhecimento"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <BookOpen className="absolute bottom-4 left-4 w-10 h-10 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    Centro de Conhecimento
                  </CardTitle>
                  <CardDescription className="text-base">
                    Biblioteca digital com artigos, vídeos, guias e pesquisas sobre agricultura sustentável
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Marketplace Card */}
            <Link href="/marketplace">
              <Card className="hover-lift hover-glow cursor-pointer h-full group border-2 hover:border-primary transition-all">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800" 
                    alt="Marketplace"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <ShoppingCart className="absolute bottom-4 left-4 w-10 h-10 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    Marketplace
                  </CardTitle>
                  <CardDescription className="text-base">
                    Produtos locais e sustentáveis com indicadores de impacto ambiental
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Services Card */}
            <Link href="/services">
              <Card className="hover-lift hover-glow cursor-pointer h-full group border-2 hover:border-primary transition-all">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800" 
                    alt="Serviços"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Users className="absolute bottom-4 left-4 w-10 h-10 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    Consultoria
                  </CardTitle>
                  <CardDescription className="text-base">
                    Suporte técnico especializado e consultoria para projetos sustentáveis
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            {/* Tools Card */}
            <Link href="/tools">
              <Card className="hover-lift hover-glow cursor-pointer h-full group border-2 hover:border-primary transition-all">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800" 
                    alt="Ferramentas"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Wrench className="absolute bottom-4 left-4 w-10 h-10 text-white" />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    Ferramentas Digitais
                  </CardTitle>
                  <CardDescription className="text-base">
                    Calculadoras e dashboards para análise de sustentabilidade e custos
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-scale-in">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">500+</div>
              <div className="text-xl opacity-90">Recursos Disponíveis</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <Users className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">1000+</div>
              <div className="text-xl opacity-90">Usuários Ativos</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <Globe className="w-12 h-12 mx-auto mb-4" />
              <div className="text-5xl font-bold mb-2">50+</div>
              <div className="text-xl opacity-90">Projetos Apoiados</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              O Que Nossos Clientes Dizem
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de transformação e sucesso sustentável
            </p>
          </div>

          {/* Carousel */}
          <div className="max-w-4xl mx-auto">
            <Card className="hover-glow border-2 border-primary/20">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Avatar and Info */}
                  <div className="flex flex-col items-center md:items-start gap-4 flex-shrink-0">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                    />
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-bold">{testimonial.name}</h3>
                      <p className="text-muted-foreground">{testimonial.role}</p>
                      <div className="flex gap-1 mt-2 justify-center md:justify-start">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="flex-1">
                    <p className="text-lg text-muted-foreground italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mt-8">
              <Button 
                variant="outline" 
                size="lg"
                onClick={prevTestimonial}
                className="rounded-full w-12 h-12 p-0 hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`h-3 rounded-full transition-all ${
                      index === currentTestimonial 
                        ? 'bg-primary w-8' 
                        : 'bg-gray-300 w-3 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button 
                variant="outline" 
                size="lg"
                onClick={nextTestimonial}
                className="rounded-full w-12 h-12 p-0 hover:bg-primary hover:text-white transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Counter and Button */}
            <div className="text-center mt-8 space-y-4">
              <p className="text-sm text-muted-foreground">
                {currentTestimonial + 1} de {testimonials.length} histórias de sucesso
              </p>
              <Link href="/testimonials">
                <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white hover:border-primary transition-colors font-semibold">
                  Ver Todas as Histórias
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary animate-fade-in">
            Pronto Para Começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Junte-se à nossa comunidade e faça parte da transformação sustentável
          </p>
          {!isAuthenticated && (
            <a href={getLoginUrl()}>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 h-auto group animate-scale-in">
                Criar Conta Gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-muted-foreground" style={{ backgroundColor: '#0084B6' }}>
        <div className="container">
          <p className="text-white">&copy; 2025 SustainHub. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
