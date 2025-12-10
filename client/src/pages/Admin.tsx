import { useState, useMemo } from 'react';
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
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
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
      label: language === 'pt' ? t('admin.overview') : 'Overview',
      icon: <Home className="w-5 h-5" />,
      href: '#overview',
    },
    {
      id: 'users',
      label: language === 'pt' ? t('admin.users') : 'Users',
      icon: <Users className="w-5 h-5" />,
      href: '#users',
    },
    {
      id: 'blog',
      label: language === 'pt' ? t('admin.blog') : t('admin.blog'),
      icon: <FileText className="w-5 h-5" />,
      href: '#blog',
    },
    {
      id: 'marketplace',
      label: language === 'pt' ? t('admin.marketplace') : t('admin.marketplace'),
      icon: <ShoppingCart className="w-5 h-5" />,
      href: '#marketplace',
    },
    {
      id: 'services',
      label: language === 'pt' ? t('admin.services') : 'Services',
      icon: <Briefcase className="w-5 h-5" />,
      href: '#services',
    },
    {
      id: 'analytics',
      label: language === 'pt' ? t('admin.reports') : 'Reports',
      icon: <BarChart3 className="w-5 h-5" />,
      href: '#analytics',
    },
    {
      id: 'settings',
      label: language === 'pt' ? t('admin.settings') : 'Settings',
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
        {t('admin.overview')}
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
            {t('admin.services')}
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
  const updateUserMutation = trpc.admin.users.update.useMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const filteredUsers = useMemo(() => {
    let filtered = usersQuery.data || [];
    
    if (pagination.search) {
      filtered = filtered.filter(
        (user) =>
          user.name?.toLowerCase().includes(pagination.search.toLowerCase()) ||
          user.email?.toLowerCase().includes(pagination.search.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      const aVal = a[pagination.sortBy as keyof typeof a];
      const bVal = b[pagination.sortBy as keyof typeof b];
      
      if (aVal == null || bVal == null) return 0;
      if (aVal < bVal) return pagination.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return pagination.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [usersQuery.data, pagination]);

  const paginatedUsers = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredUsers.slice(start, start + pagination.pageSize);
  }, [filteredUsers, pagination.page, pagination.pageSize]);

  const totalPages = Math.ceil(filteredUsers.length / pagination.pageSize);

  const handleDeleteUser = (id: number) => {
    if (confirm(language === 'pt' ? t('admin.confirm_delete') : 'Are you sure?')) {
      deleteUserMutation.mutate({ id }, {
        onSuccess: () => {
          usersQuery.refetch();
        },
      });
    }
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Usuários' : 'Manage Users'}
        </h3>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-primary hover:bg-primary/90 gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('admin.new_user')}
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'pt' ? 'Buscar por nome ou email...' : 'Search by name or email...'}
            value={pagination.search}
            onChange={(e) => {
              setPagination({ ...pagination, search: e.target.value, page: 1 });
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <select
          value={pagination.pageSize}
          onChange={(e) => {
            setPagination({ ...pagination, pageSize: parseInt(e.target.value), page: 1 });
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value={10}>10 {language === 'pt' ? 'por página' : 'per page'}</option>
          <option value={25}>25 {language === 'pt' ? 'por página' : 'per page'}</option>
          <option value={50}>50 {language === 'pt' ? 'por página' : 'per page'}</option>
        </select>
      </div>

      <AdminModal
        isOpen={isCreateModalOpen}
        title={t('admin.new_user')}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={() => {
          setIsCreateModalOpen(false);
          usersQuery.refetch();
        }}
      >
        <UserForm language={language} onSuccess={() => setIsCreateModalOpen(false)} />
      </AdminModal>

      <AdminModal
        isOpen={isEditModalOpen}
        title={language === 'pt' ? 'Editar Usuário' : 'Edit User'}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={() => {
          setIsEditModalOpen(false);
          usersQuery.refetch();
        }}
      >
        {editingUser && (
          <UserEditForm 
            language={language} 
            user={editingUser}
            onSuccess={() => setIsEditModalOpen(false)} 
          />
        )}
      </AdminModal>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {usersQuery.isLoading ? (
          <div className="p-6 text-center">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setPagination({
                        ...pagination,
                        sortBy: 'name',
                        sortOrder: pagination.sortOrder === 'asc' ? 'desc' : 'asc',
                      });
                    }}
                  >
                    {t('admin.name')} {pagination.sortBy === 'name' && (pagination.sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setPagination({
                        ...pagination,
                        sortBy: 'email',
                        sortOrder: pagination.sortOrder === 'asc' ? 'desc' : 'asc',
                      });
                    }}
                  >
                    {t('admin.email')} {pagination.sortBy === 'email' && (pagination.sortOrder === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.role')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? t('admin.admin') : language === 'pt' ? t('admin.user') : 'User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
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

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {language === 'pt' 
                  ? `Mostrando ${paginatedUsers.length > 0 ? (pagination.page - 1) * pagination.pageSize + 1 : 0} a ${Math.min(pagination.page * pagination.pageSize, filteredUsers.length)} de ${filteredUsers.length}`
                  : `Showing ${paginatedUsers.length > 0 ? (pagination.page - 1) * pagination.pageSize + 1 : 0} to ${Math.min(pagination.page * pagination.pageSize, filteredUsers.length)} of ${filteredUsers.length}`
                }
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  {pagination.page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === totalPages}
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function UserForm({ language, onSuccess }: { language: string; onSuccess: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const createUserMutation = trpc.admin.users.create.useMutation();

  const handleSubmit = () => {
    if (!name || !email) {
      alert(language === 'pt' ? 'Preencha todos os campos' : 'Fill in all fields');
      return;
    }

    createUserMutation.mutate({
      name,
      email,
      role,
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
          {t('admin.name')}
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
          {t('admin.email')}
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
          {t('admin.role')}
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">{t('admin.user')}</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}

function UserEditForm({ language, user, onSuccess }: { language: string; user: any; onSuccess: () => void }) {
  const [name, setName] = useState(user.name || '');
  const [role, setRole] = useState(user.role || 'user');
  const updateUserMutation = trpc.admin.users.update.useMutation();

  const handleSubmit = () => {
    if (!name) {
      alert(language === 'pt' ? 'Preencha o nome' : 'Fill in the name');
      return;
    }

    updateUserMutation.mutate({
      id: user.id,
      name,
      role,
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
          {t('admin.name')}
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
          {t('admin.email')}
        </label>
        <input
          type="email"
          value={user.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-900 mb-2">
          {t('admin.role')}
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="user">{t('admin.user')}</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}

// Simplified Tab Components (keeping the rest from the previous version)
function BlogTab({ t, language }: { t: (key: string) => string; language: string }) {
  const blogQuery = trpc.admin.blog.list.useQuery();
  const deleteBlogMutation = trpc.admin.blog.delete.useMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, search: '' });

  const filteredBlog = useMemo(() => {
    let filtered = blogQuery.data || [];
    if (pagination.search) {
      filtered = filtered.filter((post) =>
        post.titlePt?.toLowerCase().includes(pagination.search.toLowerCase()) ||
        post.titleEn?.toLowerCase().includes(pagination.search.toLowerCase())
      );
    }
    return filtered;
  }, [blogQuery.data, pagination.search]);

  const paginatedBlog = useMemo(() => {
    const start = (pagination.page - 1) * pagination.pageSize;
    return filteredBlog.slice(start, start + pagination.pageSize);
  }, [filteredBlog, pagination.page, pagination.pageSize]);

  const handleDeleteBlog = (id: number) => {
    if (confirm(language === 'pt' ? t('admin.confirm_delete') : 'Are you sure?')) {
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
          {t('admin.new_article')}
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={language === 'pt' ? 'Buscar artigos...' : 'Search articles...'}
          value={pagination.search}
          onChange={(e) => setPagination({ ...pagination, search: e.target.value, page: 1 })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <AdminModal
        isOpen={isModalOpen}
        title={t('admin.new_article')}
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
          <>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.title_col')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.author')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    {t('admin.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedBlog.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{post.titlePt}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.published ? (language === 'pt' ? t('admin.published_status') : 'Published') : (language === 'pt' ? t('admin.draft') : 'Draft')}
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

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {language === 'pt' ? `${filteredBlog.length} artigos` : `${filteredBlog.length} articles`}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page === 1}
                  onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="px-4 py-2 text-sm text-gray-600">
                  {pagination.page}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={paginatedBlog.length < pagination.pageSize}
                  onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
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
            {t('admin.author')}
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
            {t('admin.category')}
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
            {t('admin.status')}
          </label>
          <select
            value={published ? 'published' : 'draft'}
            onChange={(e) => setPublished(e.target.value === 'published')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="draft">{t('admin.draft')}</option>
            <option value="published">{t('admin.published_status')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function MarketplaceTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Gerenciar Marketplace' : 'Manage Marketplace'}
      </h3>
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        {language === 'pt' ? 'Em desenvolvimento...' : 'Coming soon...'}
      </div>
    </div>
  );
}

function ServicesTab({ t, language }: { t: (key: string) => string; language: string }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Gerenciar Serviços' : 'Manage Services'}
      </h3>
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        {language === 'pt' ? 'Em desenvolvimento...' : 'Coming soon...'}
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
        {t('admin.settings')}
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
