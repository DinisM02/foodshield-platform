import { useState } from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function Knowledge() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const { data: articles, isLoading } = trpc.blog.list.useQuery();

  const categories = ["Todos", ...Array.from(new Set(articles?.map(a => a.category) || []))];

  const filteredArticles = articles?.filter(article => {
    const title = language === "pt" ? article.titlePt : article.titleEn;
    const excerpt = language === "pt" ? article.excerptPt : article.excerptEn;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-10 h-10" />
            <h1 className="text-5xl font-bold">{t('knowledge.title')}</h1>
          </div>
          <p className="text-xl opacity-90">{t('knowledge.subtitle')}</p>
        </div>
      </div>

      <div className="container py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('header.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Content Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => {
              const title = language === "pt" ? article.titlePt : article.titleEn;
              const excerpt = language === "pt" ? article.excerptPt : article.excerptEn;
              
              return (
                <Card key={article.id} className="hover-lift hover-glow overflow-hidden group cursor-pointer">
                  <Link href={`/knowledge/${article.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <Badge variant="secondary" className="bg-white/90">
                          {article.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                        {t('blog.read_more')}
                      </Button>
                    </CardFooter>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">{t('knowledge.no_results')}</h3>
            <p className="text-muted-foreground">{t('common.search')}</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
