import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Search, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";

export default function Blog() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Fetch blog posts from database
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

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
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

  // Format date
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return language === 'pt' 
      ? dateObj.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' })
      : dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  };

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
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const title = language === 'pt' ? post.titlePt : post.titleEn;
                const excerpt = language === 'pt' ? post.excerptPt : post.excerptEn;
                
                return (
                  <Card key={post.id} className="hover-lift hover-glow overflow-hidden group border-2 border-gray-200 hover:border-primary transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.imageUrl || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800"}
                        alt={title || ''}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {post.category && (
                        <Badge className="absolute bottom-4 left-4 bg-primary text-white">
                          {post.category}
                        </Badge>
                      )}
                    </div>

                    {/* Content */}
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 line-clamp-2">
                        {excerpt}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.createdAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                      </div>

                      {/* Read Time */}
                      {post.readTime && (
                        <div className="text-sm font-semibold text-primary">
                          {t('blog.read_time')}: {post.readTime} min
                        </div>
                      )}

                      {/* Read More Button */}
                      <Link href={`/blog/${post.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90 text-white group/btn">
                          {t('blog.read_more')}
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
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
