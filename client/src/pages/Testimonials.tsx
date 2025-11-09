import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Heart, TrendingUp } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "João Machado",
    role: "Agricultor em Nampula",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    text: "A plataforma transformou minha produção. Com as ferramentas de cálculo de carbono, consegui reduzir custos em 30% e aumentar a sustentabilidade da minha fazenda.",
    rating: 5,
    impact: "Redução de 30% em custos"
  },
  {
    id: 2,
    name: "Maria Santos",
    role: "Cooperativa em Maputo",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    text: "O marketplace conectou nossa cooperativa diretamente aos consumidores. Nossas vendas triplicaram e conseguimos preços mais justos para nossos produtos orgânicos.",
    rating: 5,
    impact: "Aumento de 300% em vendas"
  },
  {
    id: 3,
    name: "Carlos Alves",
    role: "Consultor Agrícola",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    text: "O centro de conhecimento é uma fonte incrível de informações atualizadas. Uso diariamente para me manter informado sobre as melhores práticas sustentáveis.",
    rating: 5,
    impact: "Acesso a 500+ recursos"
  },
  {
    id: 4,
    name: "Ana Silva",
    role: "Produtora de Hortaliças",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    text: "As ferramentas de cálculo de custos me ajudaram a entender melhor minha margem de lucro. Agora consigo precificar meus produtos de forma mais inteligente.",
    rating: 5,
    impact: "Melhor gestão de preços"
  },
  {
    id: 5,
    name: "Pedro Neves",
    role: "Técnico Agrícola",
    image: "https://images.unsplash.com/photo-1500595046891-79fde38eba5a?q=80&w=150",
    text: "A consultoria especializada me ajudou a implementar práticas regenerativas. Os resultados foram visíveis em apenas 3 meses de aplicação.",
    rating: 5,
    impact: "Resultados em 3 meses"
  },
  {
    id: 6,
    name: "Rosa Mendes",
    role: "Empreendedora Rural",
    image: "https://images.unsplash.com/photo-1507876466326-da4f10d7a81d?q=80&w=150",
    text: "Graças ao SustainHub, consegui expandir meu negócio de forma sustentável. A plataforma oferece todas as ferramentas que um pequeno produtor precisa.",
    rating: 5,
    impact: "Expansão sustentável"
  },
  {
    id: 7,
    name: "Filipe Costa",
    role: "Produtor de Milho",
    image: "https://images.unsplash.com/photo-1500595046891-79fde38eba5a?q=80&w=150",
    text: "Implementei as recomendações do SustainHub e minha produção aumentou 40%. O retorno sobre investimento foi muito rápido.",
    rating: 5,
    impact: "Aumento de 40% na produção"
  },
  {
    id: 8,
    name: "Beatriz Ferreira",
    role: "Gestora de Cooperativa",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    text: "O sistema de gestão de recursos hídricos nos ajudou a economizar 50% de água. Além disso, reduzimos significativamente nossos custos operacionais.",
    rating: 5,
    impact: "Economia de 50% em água"
  },
  {
    id: 9,
    name: "Mário Dias",
    role: "Agricultor Familiar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150",
    text: "Nunca pensei que conseguiria certificação orgânica, mas o SustainHub guiou-me em cada passo. Agora vendo meus produtos com prêmio de 25%.",
    rating: 5,
    impact: "Certificação orgânica conquistada"
  },
  {
    id: 10,
    name: "Joana Teixeira",
    role: "Consultora Ambiental",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
    text: "Recomendo o SustainHub para todos os meus clientes. É uma solução completa que realmente funciona e gera impacto positivo.",
    rating: 5,
    impact: "Impacto ambiental positivo"
  },
  {
    id: 11,
    name: "Rui Oliveira",
    role: "Produtor de Frutas",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150",
    text: "As análises de mercado fornecidas me ajudaram a identificar novas oportunidades. Agora exporto 30% da minha produção.",
    rating: 5,
    impact: "Exportação de 30%"
  },
  {
    id: 12,
    name: "Carla Mendes",
    role: "Empreendedora Social",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150",
    text: "O SustainHub não é apenas uma plataforma, é um movimento. Ajudou-me a criar um negócio que gera lucro E impacto social.",
    rating: 5,
    impact: "Impacto social + lucro"
  }
];

export default function Testimonials() {
  const stats = [
    { label: "Histórias de Sucesso", value: testimonials.length, icon: Users },
    { label: "Taxa de Satisfação", value: "100%", icon: Star },
    { label: "Impacto Positivo", value: "12+", icon: Heart },
    { label: "Crescimento Médio", value: "+40%", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Histórias de Sucesso</h1>
          </div>
          <p className="text-xl opacity-90">Conheça as transformações reais de nossos clientes</p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="text-center hover-glow">
                  <CardContent className="pt-6">
                    <Icon className="w-10 h-10 mx-auto mb-3 text-primary" />
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover-lift hover-glow overflow-hidden group border-2 hover:border-primary transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 flex-1">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                      />
                      <div className="min-w-0">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors truncate">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-sm truncate">
                          {testimonial.role}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground italic text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {testimonial.impact}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pronto Para Sua Própria História de Sucesso?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de produtores e empreendedores que já transformaram seus negócios
          </p>
          <a href="/knowledge">
            <button className="bg-white text-primary hover:bg-white/90 font-semibold py-3 px-8 rounded-lg transition-colors">
              Começar Agora
            </button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-white" style={{ backgroundColor: '#0084B6' }}>
        <div className="container">
          <p>&copy; 2025 SustainHub. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
