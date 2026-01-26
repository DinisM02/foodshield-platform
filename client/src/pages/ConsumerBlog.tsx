import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { BookOpen, Clock, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';

export default function ConsumerBlog() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: blogPosts, isLoading } = trpc.admin.blog.list.useQuery();

  const filteredPosts = blogPosts?.filter(post =>
    post.titlePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerptPt.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <ConsumerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('consumer.blog')}</h1>
          <p className="text-gray-600 mt-2">Artigos sobre segurança alimentar e agricultura sustentável</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder={t('blog.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Carregando artigos...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Nenhum artigo encontrado</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt={post.titlePt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-4 right-4">
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-emerald-50 transition-colors">
                      <Heart size={20} className="text-gray-600 hover:text-emerald-600" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <Clock size={16} />
                    <span>{post.readTime} min de leitura</span>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {post.titlePt}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerptPt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                      {post.category}
                    </span>
                    <Link href={`/knowledge`}>
                      <span className="text-emerald-600 hover:text-emerald-700 font-medium text-sm cursor-pointer">
                        Ler mais →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ConsumerLayout>
  );
}
