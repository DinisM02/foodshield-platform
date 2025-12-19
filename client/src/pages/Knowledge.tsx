import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Video, FileText, Search, Clock, User, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

const typeIcons = {
  article: BookOpen,
  video: Video,
  guide: FileText,
  research: Search
};

export default function Knowledge() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Fetch blog posts as knowledge content
  const { data: blogPosts, isLoading } = trpc.admin.blog.list.useQuery();

  // Filter only published posts
  const publishedPosts = useMemo(() => {
    return (blogPosts || []).filter(post => post.published);
  }, [blogPosts]);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(publishedPosts.map(post => post.category).filter(Boolean));
    return ["Todos", ...Array.from(cats)];
  }, [publishedPosts]);

  // Filter posts
  const filteredContents = useMemo(() => {
    return publishedPosts.filter(post => {
      const title = language === 'pt' ? post.titlePt : post.titleEn;
      const excerpt = language === 'pt' ? post.excerptPt : post.excerptEn;
      
      const matchesSearch = 
        title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [publishedPosts, searchTerm, selectedCategory, language]);

  const TypeIcon = typeIcons.article; // Default to article icon

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">{t('knowledge.title')}</h1>
          <p className="text-xl opacity-90 max-w-2xl">{t('knowledge.subtitle')}</p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-blue-50">
        <div className="container">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t('knowledge.search_placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 border-2 border-primary focus:border-primary"
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
                {category === 'Todos' ? t('knowledge.all_categories') : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredContents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContents.map((content) => {
                const title = language === 'pt' ? content.titlePt : content.titleEn;
                const excerpt = language === 'pt' ? content.excerptPt : content.excerptEn;
                
                return (
                  <Card key={content.id} className="hover-lift hover-glow overflow-hidden group border-2 border-gray-200 hover:border-primary transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={content.imageUrl || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800"}
                        alt={title || ''}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary text-white flex items-center gap-1">
                          <TypeIcon className="w-3 h-3" />
                          {t('knowledge.article')}
                        </Badge>
                      </div>
                      {content.category && (
                        <Badge className="absolute bottom-4 left-4 bg-white text-primary">
                          {content.category}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {content.author}
                        </div>
                        {content.readTime && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {content.readTime} min
                          </div>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter>
                      <Link href={`/blog/${content.id}`} className="w-full">
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                          {t('knowledge.access_content')}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">{t('knowledge.no_results')}</p>
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

      <Footer />
    </div>
  );
}
