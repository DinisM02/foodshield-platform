import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { AdminModal } from '@/components/AdminModal';
import {
  Users,
  FileText,
  ShoppingCart,
  Briefcase,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Loader2,
  Trash2,
  Edit,
  Plus,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

export default function Admin() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Redirect non-admin users
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('page.access_denied')}
          </h1>
          <p className="text-gray-600 mb-6">
            {t('page.access_denied_msg')}
          </p>
          <Button
            onClick={() => setLocation('/')}
            className="bg-primary hover:bg-primary/90"
          >
            {t('common.back')}
          </Button>
        </div>
      </div>
    );
  }

  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: language === 'pt' ? 'Visão Geral' : 'Overview',
      icon: <Home className="w-5 h-5" />,
      href: '#overview',
    },
    {
      id: 'users',
      label: language === 'pt' ? 'Usuários' : 'Users',
      icon: <Users className="w-5 h-5" />,
      href: '#users',
    },
    {
      id: 'blog',
      label: language === 'pt' ? 'Blog' : 'Blog',
      icon: <FileText className="w-5 h-5" />,
      href: '#blog',
    },
    {
      id: 'marketplace',
      label: language === 'pt' ? 'Marketplace' : 'Marketplace',
      icon: <ShoppingCart className="w-5 h-5" />,
      href: '#marketplace',
    },
    {
      id: 'services',
      label: language === 'pt' ? 'Serviços' : 'Services',
      icon: <Briefcase className="w-5 h-5" />,
      href: '#services',
    },
    {
      id: 'analytics',
      label: language === 'pt' ? 'Relatórios' : 'Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '#analytics',
    },
    {
      id: 'settings',
      label: language === 'pt' ? 'Configurações' : 'Settings',
      icon: <Settings className="w-5 h-5" />,
      href: '#settings',
    },
  ];

  const handleLogout = async () => {
    await logout();
    setLocation('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-gray-900 text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <h1
              className={`font-bold text-xl transition-opacity ${
                sidebarOpen ? 'opacity-100' : 'opacity-0 w-0'
              }`}
            >
              Admin
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={!sidebarOpen ? item.label : ''}
            >
              {item.icon}
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-800 p-4 space-y-3">
          {sidebarOpen && (
            <div className="px-2">
              <p className="text-xs text-gray-400 mb-1">
                {language === 'pt' ? 'Conectado como' : 'Logged in as'}
              </p>
              <p className="text-sm font-medium truncate">{user.name}</p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-center gap-2 bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && (t('header.logout'))}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {language === 'pt' ? 'Painel de Administração' : 'Admin Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {activeTab === 'overview' && <OverviewTab t={t} language={language} />}
          {activeTab === 'users' && <UsersTab t={t} language={language} />}
          {activeTab === 'blog' && <BlogTab t={t} language={language} />}
          {activeTab === 'marketplace' && <MarketplaceTab t={t} language={language} />}
          {activeTab === 'services' && <ServicesTab t={t} language={language} />}
          {activeTab === 'analytics' && <AnalyticsTab t={t} language={language} />}
          {activeTab === 'settings' && <SettingsTab t={t} language={language} />}
        </div>
      </div>
    </div>
  );
}

// Tab Components
function OverviewTab({ t, language }: { t: (key: string) => string; language: string }) {
  const usersQuery = trpc.admin.users.list.useQuery();
  const blogQuery = trpc.admin.blog.list.useQuery();
  const productsQuery = trpc.admin.products.list.useQuery();
  const servicesQuery = trpc.admin.services.list.useQuery();

  const totalUsers = usersQuery.data?.length ?? 0;
  const totalBlogPosts = blogQuery.data?.length ?? 0;
  const totalProducts = productsQuery.data?.length ?? 0;
  const totalServices = servicesQuery.data?.length ?? 0;

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Visão Geral' : 'Overview'}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Total de Usuários' : 'Total Users'}
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalUsers}</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? 'Registrados' : 'Registered'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Artigos de Blog' : 'Blog Articles'}
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalBlogPosts}</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? 'Publicados' : 'Published'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Produtos' : 'Products'}
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalProducts}</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? 'No Marketplace' : 'In Marketplace'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Serviços' : 'Services'}
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalServices}</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? 'Disponíveis' : 'Available'}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersTab({ t, language }: { t: (key: string) => string; language: string }) {
  const usersQuery = trpc.admin.users.list.useQuery();
  const deleteUserMutation = trpc.admin.users.delete.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteUser = (id: number) => {
    if (confirm(language === 'pt' ? 'Tem certeza?' : 'Are you sure?')) {
      deleteUserMutation.mutate({ id }, {
        onSuccess: () => {
          usersQuery.refetch();
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Usuários' : 'Manage Users'}
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          {language === 'pt' ? 'Novo Usuário' : 'New User'}
        </Button>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        title={language === 'pt' ? 'Novo Usuário' : 'New User'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          usersQuery.refetch();
        }}
      >
        <UserForm language={language} onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {usersQuery.isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Nome' : 'Name'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Email' : 'Email'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Função' : 'Role'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersQuery.data?.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.role === 'admin' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role === 'admin' ? 'Admin' : language === 'pt' ? 'Usuário' : 'User'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={deleteUserMutation.isPending}
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-red-600"
                    >
                      {deleteUserMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function UserForm({ language, onSuccess }: { language: string; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Nome' : 'Name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={language === 'pt' ? 'Nome completo' : 'Full name'}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Email' : 'Email'}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="user@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Função' : 'Role'}
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">{language === 'pt' ? 'Usuário' : 'User'}</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}

function BlogTab({ t, language }: { t: (key: string) => string; language: string }) {
  const blogQuery = trpc.admin.blog.list.useQuery();
  const deleteBlogMutation = trpc.admin.blog.delete.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteBlog = (id: number) => {
    if (confirm(language === 'pt' ? 'Tem certeza?' : 'Are you sure?')) {
      deleteBlogMutation.mutate({ id }, {
        onSuccess: () => {
          blogQuery.refetch();
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Blog' : 'Manage Blog'}
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          {language === 'pt' ? 'Novo Artigo' : 'New Article'}
        </Button>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        title={language === 'pt' ? 'Novo Artigo' : 'New Article'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          blogQuery.refetch();
        }}
      >
        <BlogForm language={language} onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {blogQuery.isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Título' : 'Title'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Autor' : 'Author'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Status' : 'Status'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {blogQuery.data?.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{post.titlePt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? (language === 'pt' ? 'Publicado' : 'Published') : (language === 'pt' ? 'Rascunho' : 'Draft')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={deleteBlogMutation.isPending}
                      onClick={() => handleDeleteBlog(post.id)}
                      className="text-red-600"
                    >
                      {deleteBlogMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function BlogForm({ language, onSuccess }: { language: string; onSuccess: () => void }) {
  const [titlePt, setTitlePt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [excerptPt, setExcerptPt] = useState('');
  const [excerptEn, setExcerptEn] = useState('');
  const [contentPt, setContentPt] = useState('');
  const [contentEn, setContentEn] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [readTime, setReadTime] = useState('5');
  const [published, setPublished] = useState(false);
  const createBlogMutation = trpc.admin.blog.create.useMutation();

  const handleSubmit = () => {
    createBlogMutation.mutate({
      titlePt,
      titleEn,
      excerptPt,
      excerptEn,
      contentPt,
      contentEn,
      author,
      category,
      imageUrl,
      readTime: parseInt(readTime),
      published,
    }, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Título (PT)' : 'Title (PT)'}
          </label>
          <input
            type="text"
            value={titlePt}
            onChange={(e) => setTitlePt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Título (EN)' : 'Title (EN)'}
          </label>
          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Resumo (PT)' : 'Excerpt (PT)'}
          </label>
          <textarea
            value={excerptPt}
            onChange={(e) => setExcerptPt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Resumo (EN)' : 'Excerpt (EN)'}
          </label>
          <textarea
            value={excerptEn}
            onChange={(e) => setExcerptEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={2}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Conteúdo (PT)' : 'Content (PT)'}
          </label>
          <textarea
            value={contentPt}
            onChange={(e) => setContentPt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Conteúdo (EN)' : 'Content (EN)'}
          </label>
          <textarea
            value={contentEn}
            onChange={(e) => setContentEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Autor' : 'Author'}
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Categoria' : 'Category'}
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'URL da Imagem' : 'Image URL'}
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Tempo de Leitura (min)' : 'Read Time (min)'}
          </label>
          <input
            type="number"
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Status' : 'Status'}
          </label>
          <select
            value={published ? 'published' : 'draft'}
            onChange={(e) => setPublished(e.target.value === 'published')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="draft">{language === 'pt' ? 'Rascunho' : 'Draft'}</option>
            <option value="published">{language === 'pt' ? 'Publicado' : 'Published'}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function MarketplaceTab({ t, language }: { t: (key: string) => string; language: string }) {
  const productsQuery = trpc.admin.products.list.useQuery();
  const deleteProductMutation = trpc.admin.products.delete.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteProduct = (id: number) => {
    if (confirm(language === 'pt' ? 'Tem certeza?' : 'Are you sure?')) {
      deleteProductMutation.mutate({ id }, {
        onSuccess: () => {
          productsQuery.refetch();
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Produtos' : 'Manage Products'}
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          {language === 'pt' ? 'Novo Produto' : 'New Product'}
        </Button>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        title={language === 'pt' ? 'Novo Produto' : 'New Product'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          productsQuery.refetch();
        }}
      >
        <ProductForm language={language} onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {productsQuery.isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Produto' : 'Product'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Preço' : 'Price'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Estoque' : 'Stock'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {productsQuery.data?.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.price} MZN</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={deleteProductMutation.isPending}
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600"
                    >
                      {deleteProductMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ProductForm({ language, onSuccess }: { language: string; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('0');
  const [sustainabilityScore, setSustainabilityScore] = useState('85');
  const createProductMutation = trpc.admin.products.create.useMutation();

  const handleSubmit = () => {
    createProductMutation.mutate({
      name,
      description,
      price: parseFloat(price),
      category,
      imageUrl,
      stock: parseInt(stock),
      sustainabilityScore: parseInt(sustainabilityScore),
    }, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Nome do Produto' : 'Product Name'}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Descrição' : 'Description'}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Preço (MZN)' : 'Price (MZN)'}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            step="0.01"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Categoria' : 'Category'}
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'URL da Imagem' : 'Image URL'}
        </label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Estoque' : 'Stock'}
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Pontuação de Sustentabilidade' : 'Sustainability Score'}
          </label>
          <input
            type="number"
            value={sustainabilityScore}
            onChange={(e) => setSustainabilityScore(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            min="0"
            max="100"
          />
        </div>
      </div>
    </div>
  );
}

function ServicesTab({ t, language }: { t: (key: string) => string; language: string }) {
  const servicesQuery = trpc.admin.services.list.useQuery();
  const deleteServiceMutation = trpc.admin.services.delete.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteService = (id: number) => {
    if (confirm(language === 'pt' ? 'Tem certeza?' : 'Are you sure?')) {
      deleteServiceMutation.mutate({ id }, {
        onSuccess: () => {
          servicesQuery.refetch();
        },
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Serviços' : 'Manage Services'}
        </h3>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          {language === 'pt' ? 'Novo Serviço' : 'New Service'}
        </Button>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        title={language === 'pt' ? 'Novo Serviço' : 'New Service'}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {
          setIsModalOpen(false);
          servicesQuery.refetch();
        }}
      >
        <ServiceForm language={language} onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {servicesQuery.isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Serviço' : 'Service'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Especialista' : 'Specialist'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Preço' : 'Price'}
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {servicesQuery.data?.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{service.titlePt}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.specialist}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{service.price} MZN</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      disabled={deleteServiceMutation.isPending}
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-600"
                    >
                      {deleteServiceMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function ServiceForm({ language, onSuccess }: { language: string; onSuccess: () => void }) {
  const [titlePt, setTitlePt] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descriptionPt, setDescriptionPt] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [price, setPrice] = useState('');
  const [priceType, setPriceType] = useState<'hourly' | 'daily' | 'project'>('hourly');
  const [features, setFeatures] = useState('');
  const [available, setAvailable] = useState(true);
  const createServiceMutation = trpc.admin.services.create.useMutation();

  const handleSubmit = () => {
    createServiceMutation.mutate({
      titlePt,
      titleEn,
      descriptionPt,
      descriptionEn,
      specialist,
      price: parseFloat(price),
      priceType,
      features,
      available,
    }, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  return (
    <div className="space-y-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Título (PT)' : 'Title (PT)'}
          </label>
          <input
            type="text"
            value={titlePt}
            onChange={(e) => setTitlePt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Título (EN)' : 'Title (EN)'}
          </label>
          <input
            type="text"
            value={titleEn}
            onChange={(e) => setTitleEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Descrição (PT)' : 'Description (PT)'}
          </label>
          <textarea
            value={descriptionPt}
            onChange={(e) => setDescriptionPt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Descrição (EN)' : 'Description (EN)'}
          </label>
          <textarea
            value={descriptionEn}
            onChange={(e) => setDescriptionEn(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Especialista' : 'Specialist'}
          </label>
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Preço (MZN)' : 'Price (MZN)'}
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            step="0.01"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Tipo de Preço' : 'Price Type'}
          </label>
          <select
            value={priceType}
            onChange={(e) => setPriceType(e.target.value as 'hourly' | 'daily' | 'project')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="hourly">{language === 'pt' ? 'Por Hora' : 'Hourly'}</option>
            <option value="daily">{language === 'pt' ? 'Por Dia' : 'Daily'}</option>
            <option value="project">{language === 'pt' ? 'Por Projeto' : 'Project'}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            {language === 'pt' ? 'Disponível' : 'Available'}
          </label>
          <select
            value={available ? 'yes' : 'no'}
            onChange={(e) => setAvailable(e.target.value === 'yes')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="yes">{language === 'pt' ? 'Sim' : 'Yes'}</option>
            <option value="no">{language === 'pt' ? 'Não' : 'No'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {language === 'pt' ? 'Características (separadas por vírgula)' : 'Features (comma separated)'}
        </label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          rows={2}
          placeholder={language === 'pt' ? 'Análise de solo, Planejamento de cultivo' : 'Soil analysis, Crop planning'}
        />
      </div>
    </div>
  );
}

function AnalyticsTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Relatórios e Analytics' : 'Reports and Analytics'}
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Visitantes por Mês' : 'Visitors per Month'}
          </h4>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            {language === 'pt' ? 'Gráfico de visitantes' : 'Visitor chart'}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Vendas por Produto' : 'Sales by Product'}
          </h4>
          <div className="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            {language === 'pt' ? 'Gráfico de vendas' : 'Sales chart'}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Configurações' : 'Settings'}
      </h3>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {language === 'pt' ? 'Nome da Plataforma' : 'Platform Name'}
            </label>
            <input
              type="text"
              defaultValue="SustainHub"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {language === 'pt' ? 'Email de Contato' : 'Contact Email'}
            </label>
            <input
              type="email"
              defaultValue="contact@sustainhub.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            {language === 'pt' ? 'Salvar Alterações' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
