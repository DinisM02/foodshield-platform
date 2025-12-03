import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
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
          <div className="text-3xl font-bold text-gray-900">1,234</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? '+12% este mês' : '+12% this month'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Pedidos' : 'Orders'}
          </div>
          <div className="text-3xl font-bold text-gray-900">567</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? '+8% este mês' : '+8% this month'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Receita' : 'Revenue'}
          </div>
          <div className="text-3xl font-bold text-gray-900">$45,231</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? '+23% este mês' : '+23% this month'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm font-medium mb-2">
            {language === 'pt' ? 'Consultorías' : 'Consultations'}
          </div>
          <div className="text-3xl font-bold text-gray-900">89</div>
          <div className="text-green-600 text-sm mt-2">
            {language === 'pt' ? '+5% este mês' : '+5% this month'}
          </div>
        </div>
      </div>
    </div>
  );
}

function UsersTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Usuários' : 'Manage Users'}
        </h3>
        <Button className="bg-primary hover:bg-primary/90">
          {language === 'pt' ? 'Novo Usuário' : 'New User'}
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">João Silva</td>
              <td className="px-6 py-4 text-sm text-gray-600">joao@example.com</td>
              <td className="px-6 py-4 text-sm">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {language === 'pt' ? 'Usuário' : 'User'}
                </span>
              </td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Button variant="outline" size="sm">
                  {language === 'pt' ? 'Editar' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  {language === 'pt' ? 'Deletar' : 'Delete'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Blog' : 'Manage Blog'}
        </h3>
        <Button className="bg-primary hover:bg-primary/90">
          {language === 'pt' ? 'Novo Artigo' : 'New Article'}
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                {language === 'pt' ? 'Data' : 'Date'}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                {language === 'pt' ? 'Ações' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {language === 'pt'
                  ? 'Agricultura Regenerativa'
                  : 'Regenerative Agriculture'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">Dr. João Silva</td>
              <td className="px-6 py-4 text-sm text-gray-600">15/11/2025</td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Button variant="outline" size="sm">
                  {language === 'pt' ? 'Editar' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  {language === 'pt' ? 'Deletar' : 'Delete'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MarketplaceTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Produtos' : 'Manage Products'}
        </h3>
        <Button className="bg-primary hover:bg-primary/90">
          {language === 'pt' ? 'Novo Produto' : 'New Product'}
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {language === 'pt' ? 'Tomate Orgânico' : 'Organic Tomato'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">$5.99</td>
              <td className="px-6 py-4 text-sm text-gray-600">45</td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Button variant="outline" size="sm">
                  {language === 'pt' ? 'Editar' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  {language === 'pt' ? 'Deletar' : 'Delete'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ServicesTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Serviços' : 'Manage Services'}
        </h3>
        <Button className="bg-primary hover:bg-primary/90">
          {language === 'pt' ? 'Novo Serviço' : 'New Service'}
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {language === 'pt' ? 'Consultoria Agrícola' : 'Agricultural Consulting'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">Dr. João Silva</td>
              <td className="px-6 py-4 text-sm text-gray-600">$100/hora</td>
              <td className="px-6 py-4 text-sm space-x-2">
                <Button variant="outline" size="sm">
                  {language === 'pt' ? 'Editar' : 'Edit'}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  {language === 'pt' ? 'Deletar' : 'Delete'}
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
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
