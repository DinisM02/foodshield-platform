import { ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Home, 
  BookOpen, 
  ShoppingCart, 
  Briefcase, 
  User, 
  Bell,
  LogOut,
  Menu,
  X,
  Library,
  Calculator,
  FileText
} from 'lucide-react';
import { useState } from 'react';
import { APP_LOGO, APP_TITLE } from '@/const';

interface ConsumerLayoutProps {
  children: ReactNode;
}

export default function ConsumerLayout({ children }: ConsumerLayoutProps) {
  const { user, logout } = useAuth();
  const { language, t } = useLanguage();
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/consumer', icon: Home, label: t('consumer.dashboard') },
    { path: '/consumer/knowledge', icon: Library, label: t('consumer.knowledge') },
    { path: '/consumer/tools', icon: Calculator, label: t('consumer.tools') },
    { path: '/consumer/blog', icon: FileText, label: t('consumer.blog') },
    { path: '/consumer/marketplace', icon: ShoppingCart, label: t('consumer.marketplace') },
    { path: '/consumer/services', icon: Briefcase, label: t('consumer.services') },
    { path: '/consumer/profile', icon: User, label: t('consumer.profile') },
    { path: '/consumer/notifications', icon: Bell, label: t('consumer.notifications') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-8" />
          <span className="font-semibold text-gray-900">{t('consumer.title')}</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-white border-r border-gray-200
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Logo - Desktop only */}
          <div className="hidden lg:flex items-center gap-3 p-6 border-b border-gray-200">
            <img src={APP_LOGO} alt={APP_TITLE} className="h-10" />
            <span className="font-bold text-xl text-gray-900">{t('consumer.title')}</span>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-emerald-700 font-semibold text-lg">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive 
                        ? 'bg-emerald-50 text-emerald-700 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
            >
              <LogOut size={20} />
              <span>{t('consumer.logout')}</span>
            </button>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
