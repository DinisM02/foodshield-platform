import ConsumerLayout from '@/components/ConsumerLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { trpc } from '@/lib/trpc';
import { ShoppingBag, BookOpen, Briefcase, TrendingUp } from 'lucide-react';
import { Link } from 'wouter';

export default function Consumer() {
  const { t } = useLanguage();
  const { data: orders } = trpc.orders.getUserOrders.useQuery();
  
  const stats = [
    {
      icon: ShoppingBag,
      label: t('consumer.stats.orders'),
      value: orders?.length || 0,
      color: 'bg-blue-100 text-blue-700',
      link: '/consumer/marketplace'
    },
    {
      icon: BookOpen,
      label: t('consumer.stats.articlesRead'),
      value: 0,
      color: 'bg-purple-100 text-purple-700',
      link: '/consumer/blog'
    },
    {
      icon: Briefcase,
      label: t('consumer.stats.services'),
      value: 0,
      color: 'bg-emerald-100 text-emerald-700',
      link: '/consumer/services'
    },
    {
      icon: TrendingUp,
      label: t('consumer.stats.sustainability'),
      value: '85%',
      color: 'bg-amber-100 text-amber-700',
      link: '/consumer/profile'
    },
  ];

  const recentOrders = orders?.slice(0, 3) || [];

  return (
    <ConsumerLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('consumer.welcome')}</h1>
          <p className="text-gray-600 mt-2">{t('consumer.welcomeMessage')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} href={stat.link}>
                <a className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <Icon size={24} />
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{t('consumer.recentOrders')}</h2>
            <Link href="/consumer/marketplace">
              <a className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                {t('consumer.viewAll')}
              </a>
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">{t('consumer.noOrders')}</p>
              <Link href="/marketplace">
                <a className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
                  {t('consumer.startShopping')}
                </a>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      {t('consumer.order')} #{order.id}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.totalAmount} MZN</p>
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'}
                    `}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/marketplace">
            <a className="block bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all">
              <ShoppingBag size={32} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('consumer.exploreMarketplace')}</h3>
              <p className="text-emerald-100 text-sm">{t('consumer.exploreMarketplaceDesc')}</p>
            </a>
          </Link>

          <Link href="/knowledge">
            <a className="block bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:from-purple-600 hover:to-purple-700 transition-all">
              <BookOpen size={32} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('consumer.readArticles')}</h3>
              <p className="text-purple-100 text-sm">{t('consumer.readArticlesDesc')}</p>
            </a>
          </Link>

          <Link href="/services">
            <a className="block bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:from-blue-600 hover:to-blue-700 transition-all">
              <Briefcase size={32} className="mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t('consumer.bookService')}</h3>
              <p className="text-blue-100 text-sm">{t('consumer.bookServiceDesc')}</p>
            </a>
          </Link>
        </div>
      </div>
    </ConsumerLayout>
  );
}
