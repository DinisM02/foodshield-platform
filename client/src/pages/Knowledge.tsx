import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Search, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Content {
  id: number;
  title: string;
  description: string;
  type: "article" | "video" | "guide" | "research";
  category: string;
  imageUrl: string;
  author: string;
  readTime: string;
  accessLevel: "free" | "login" | "premium";
}

const mockContents: Content[] = [
  {
    id: 1,
    title: "Agricultura Regenerativa: O Futuro da Produção Alimentar",
    description: "Descubra como práticas regenerativas podem restaurar o solo e aumentar a produtividade",
    type: "article",
    category: "Agricultura",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    author: "Dr. João Silva",
    readTime: "8 min",
    accessLevel: "free"
  },
  {
    id: 2,
    title: "Gestão Sustentável de Recursos Hídricos",
    description: "Técnicas modernas para otimizar o uso da água na agricultura",
    type: "video",
    category: "Recursos Hídricos",
    imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800",
    author: "Maria Santos",
    readTime: "15 min",
    accessLevel: "login"
  },
  {
    id: 3,
    title: "Guia Completo de Compostagem Orgânica",
    description: "Passo a passo para criar seu próprio sistema de compostagem",
    type: "guide",
    category: "Compostagem",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800",
    author: "Carlos Mendes",
    readTime: "12 min",
    accessLevel: "free"
  },
  {
    id: 4,
    title: "Biodiversidade e Sistemas Agroflorestais",
    description: "Pesquisa sobre o impacto da diversificação na produtividade",
    type: "research",
    category: "Biodiversidade",
    imageUrl: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?q=80&w=800",
    author: "Instituto de Pesquisa",
    readTime: "20 min",
    accessLevel: "premium"
  },
  {
    id: 5,
    title: "Controle Biológico de Pragas",
    description: "Alternativas naturais aos pesticidas químicos",
    type: "article",
    category: "Controle de Pragas",
    imageUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800",
    author: "Ana Costa",
    readTime: "10 min",
    accessLevel: "login"
  },
  {
    id: 6,
    title: "Segurança Alimentar em Moçambique",
    description: "Análise dos desafios e oportunidades no contexto local",
    type: "research",
    category: "Segurança Alimentar",
    imageUrl: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800",
    author: "Dr. Pedro Alves",
    readTime: "25 min",
    accessLevel: "free"
  }
];

const typeIcons = {
  article: BookOpen,
  video: Video,
  guide: FileText,
  research: Search
};

const typeLabels = {
  article: "Artigo",
  video: "Vídeo",
  guide: "Guia",
  research: "Pesquisa"
};

const accessLevelColors = {
  free: "bg-green-500",
  login: "bg-blue-500",
  premium: "bg-purple-500"
};

const accessLevelLabels = {
  free: "Gratuito",
  login: "Membros",
  premium: "Premium"
};

export default function Knowledge() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Todos");

  const types = ["Todos", "Artigo", "Vídeo", "Guia", "Pesquisa"];

  const filteredContents = mockContents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "Todos" || typeLabels[content.type] === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-5xl font-bold">Centro de Conhecimento</h1>
          </div>
          <p className="text-xl opacity-90">Biblioteca digital com recursos sobre agricultura sustentável</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar artigos, vídeos, guias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {types.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                onClick={() => setSelectedType(type)}
                className="rounded-full"
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContents.map(content => {
            const Icon = typeIcons[content.type];
            return (
              <Card key={content.id} className="hover-lift hover-glow overflow-hidden group cursor-pointer">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={content.imageUrl} 
                    alt={content.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge className={`${accessLevelColors[content.accessLevel]} text-white`}>
                      {accessLevelLabels[content.accessLevel]}
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <Badge variant="secondary" className="bg-white/90">
                      <Icon className="w-3 h-3 mr-1" />
                      {typeLabels[content.type]}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {content.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {content.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{content.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{content.readTime}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                    Ler Mais
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredContents.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">Tente buscar com outros termos</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
