import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Heart, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function ConsumerKnowledge() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: articles, isLoading } = trpc.admin.blog.list.useQuery();

  const publishedArticles = articles?.filter((a: any) => a.published) || [];
  
  const categories: string[] = ['all', ...Array.from(new Set(publishedArticles.map((a: any) => a.category)))];

  const filteredArticles = publishedArticles.filter((article: any) => {
    const title = language === 'pt' ? article.titlePt : article.titleEn;
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ConsumerLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('consumer.knowledge')}</h1>
          <p className="text-gray-600">{t('knowledge.subtitle')}</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder={t('knowledge.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat: string) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat as string)}
                className="whitespace-nowrap"
              >
                {cat === 'all' ? t('knowledge.allCategories') : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('knowledge.noArticles')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article: any) => {
              const title = language === 'pt' ? article.titlePt : article.titleEn;
              const excerpt = language === 'pt' ? article.excerptPt : article.excerptEn;
              
              return (
                <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img 
                    src={article.imageUrl} 
                    alt={title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User size={16} />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={16} />
                          {article.readTime} min
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart size={20} />
                      </button>
                    </div>

                    <Link href={`/knowledge/${article.id}`}>
                      <Button variant="outline" className="w-full">
                        {t('knowledge.readMore')}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
