import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Calendar, CheckCircle, ArrowRight } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

const services = [
  {
    id: 1,
    title: "Consultoria Técnica Agrícola",
    description: "Especialistas em agricultura sustentável para otimizar sua produção",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    features: ["Análise de solo", "Planejamento de cultivo", "Gestão de recursos"],
    price: "A partir de 2.500 MZN/hora"
  },
  {
    id: 2,
    title: "Assessoria em Sustentabilidade",
    description: "Desenvolva práticas sustentáveis e certificações ambientais",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    features: ["Certificação orgânica", "Gestão de resíduos", "Pegada de carbono"],
    price: "A partir de 3.000 MZN/hora"
  },
  {
    id: 3,
    title: "Treinamento e Capacitação",
    description: "Workshops e cursos práticos para sua equipe",
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800",
    features: ["Workshops presenciais", "Cursos online", "Material didático"],
    price: "A partir de 5.000 MZN/dia"
  },
  {
    id: 4,
    title: "Análise de Mercado",
    description: "Estudos de viabilidade e estratégias de comercialização",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    features: ["Pesquisa de mercado", "Análise de concorrência", "Plano de negócios"],
    price: "A partir de 4.000 MZN/projeto"
  }
];

export default function Services() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
            <CardDescription>Faça login para acessar nossos serviços</CardDescription>
          </CardHeader>
          <CardFooter>
            <a href={getLoginUrl()} className="w-full">
              <Button className="w-full">Fazer Login</Button>
            </a>
          </CardFooter>
        </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Serviços de Consultoria</h1>
          </div>
          <p className="text-xl opacity-90">Suporte especializado para seu projeto sustentável</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map(service => (
            <Card key={service.id} className="hover-lift hover-glow overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.imageUrl} 
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <Badge className="bg-white text-primary">
                    {service.price}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Consulta
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="bg-gradient-to-br from-primary to-blue-600 text-white border-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Precisa de Ajuda Personalizada?</CardTitle>
            <CardDescription className="text-white/90 text-lg">
              Nossa equipe está pronta para entender suas necessidades específicas
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">Chat Online</h4>
                <p className="text-sm opacity-90">Resposta em minutos</p>
              </div>
              <div className="text-center">
                <Calendar className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">Agendar Reunião</h4>
                <p className="text-sm opacity-90">Escolha melhor horário</p>
              </div>
              <div className="text-center">
                <Users className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-semibold mb-1">Visita Presencial</h4>
                <p className="text-sm opacity-90">Atendimento no local</p>
              </div>
            </div>
            <Button size="lg" variant="secondary" className="text-primary">
              Entrar em Contato
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
