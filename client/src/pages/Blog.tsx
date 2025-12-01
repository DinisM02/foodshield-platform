import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const blogPosts = [
  {
    id: 1,
    title: "Agricultura Regenerativa: O Futuro da Sustentabilidade",
    excerpt: "Descubra como práticas regenerativas podem transformar sua fazenda e aumentar a produtividade.",
    content: "A agricultura regenerativa é um conjunto de práticas que buscam restaurar a saúde do solo e dos ecossistemas. Diferente da agricultura convencional, ela foca em melhorar a qualidade do solo, aumentar a biodiversidade e sequestrar carbono.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    author: "Dr. João Silva",
    date: "15 de Novembro, 2025",
    category: "Sustentabilidade",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Gestão Eficiente de Recursos Hídricos na Agricultura",
    excerpt: "Aprenda técnicas para economizar água e melhorar a eficiência da irrigação em sua propriedade.",
    content: "A água é um recurso cada vez mais escasso. Neste artigo, exploraremos técnicas de irrigação eficiente, coleta de água da chuva e manejo do solo para reduzir a evaporação.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=800",
    author: "Eng. Maria Santos",
    date: "10 de Novembro, 2025",
    category: "Recursos Hídricos",
    readTime: "6 min"
  },
  {
    id: 3,
    title: "Certificação Orgânica: Passo a Passo para Produtores",
    excerpt: "Guia completo sobre como obter certificação orgânica e acessar mercados premium.",
    content: "A certificação orgânica abre portas para novos mercados e permite preços mais altos. Conheça os requisitos, processo de certificação e benefícios para seu negócio.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800",
    author: "Consultora Ana Costa",
    date: "5 de Novembro, 2025",
    category: "Certificação",
    readTime: "7 min"
  },
  {
    id: 4,
    title: "Tecnologia Agrícola: IoT e Sensores no Campo",
    excerpt: "Como usar tecnologia para monitorar sua lavoura em tempo real e tomar decisões mais inteligentes.",
    content: "A Internet das Coisas (IoT) está revolucionando a agricultura. Sensores de solo, câmeras de monitoramento e análise de dados permitem otimizar recursos e aumentar rendimento.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    author: "Especialista Tech Carlos Oliveira",
    date: "1 de Novembro, 2025",
    category: "Tecnologia",
    readTime: "8 min"
  },
  {
    id: 5,
    title: "Diversificação de Culturas: Estratégia para Maior Lucro",
    excerpt: "Explore como diversificar sua produção para reduzir riscos e aumentar a rentabilidade.",
    content: "A monocultura é arriscada. Descubra como combinar diferentes culturas, criar sistemas agroflorestais e gerar múltiplas fontes de renda.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800",
    author: "Agrônomo Pedro Neves",
    date: "28 de Outubro, 2025",
    category: "Produção",
    readTime: "6 min"
  },
  {
    id: 6,
    title: "Mercados Sustentáveis: Conectando Produtores e Consumidores",
    excerpt: "Conheça as oportunidades de venda direta e comércio justo para seus produtos.",
    content: "Existem cada vez mais consumidores dispostos a pagar mais por produtos sustentáveis. Aprenda a se conectar com esses mercados e construir relacionamentos duradouros.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=800",
    author: "Especialista em Mercados Rosa Mendes",
    date: "25 de Outubro, 2025",
    category: "Mercado",
    readTime: "5 min"
  }
];

const categories = ["Todos", "Sustentabilidade", "Recursos Hídricos", "Certificação", "Tecnologia", "Produção", "Mercado"];

export default function Blog() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-xl opacity-90">{t('blog.subtitle')}</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <section className="py-12 bg-blue-50">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={t('blog.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-primary rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                }`}
              >
                {category === 'Todos' ? t('blog.all_categories') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover-lift hover-glow overflow-hidden group border-2 border-gray-200 hover:border-primary transition-all">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute bottom-4 left-4 bg-primary text-white">
                      {post.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 line-clamp-2">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read Time */}
                    <div className="text-sm font-semibold text-primary">
                      {t('blog.read_time')}: {post.readTime}
                    </div>

                    {/* Read More Button */}
                    <Link href={`/blog/${post.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white group/btn">
                        {t('blog.read_more')}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">{t('blog.no_results')}</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todos");
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                {t('common.cancel')}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-4">{t('newsletter.title')}</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t('newsletter.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t('newsletter.email')}
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-semibold">
              {t('newsletter.subscribe')}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
