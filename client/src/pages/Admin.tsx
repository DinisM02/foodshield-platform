import { useState, useMemo } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { AdminModal } from '@/components/AdminModal';
import { ProductModal } from '@/components/ProductModal';
import { BlogEditor } from '@/components/BlogEditor';
import { toast } from 'sonner';
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
  Pencil,
  Eye,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
      label: t('admin.overview'),
      icon: <Home className="w-5 h-5" />,
      href: '#overview',
    },
    {
      id: 'users',
      label: t('admin.users'),
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
      id: 'products',
      label: t('admin.products'),
      icon: <ShoppingCart className="w-5 h-5" />,
      href: '#products',
    },
    {
      id: 'orders',
      label: t('admin.orders'),
      icon: <ShoppingCart className="w-5 h-5" />,
      href: '#orders',
    },
    {
      id: 'services',
      label: t('admin.services'),
      icon: <Briefcase className="w-5 h-5" />,
      href: '#services',
    },
    {
      id: 'analytics',
      label: t('admin.reports'),
      icon: <BarChart3 className="w-5 h-5" />,
      href: '#analytics',
    },
    {
      id: 'settings',
      label: t('admin.settings'),
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
          {activeTab === 'products' && <ProductsTab t={t} language={language} />}
          {activeTab === 'orders' && <OrdersTab t={t} language={language} />}
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
    if (confirm(t('admin.confirm_delete'))) {
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
        <UserForm language={language} t={t} onSuccess={() => setIsCreateModalOpen(false)} />
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
            t={t}
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
                        {user.role === 'admin' ? t('admin.admin') : t('admin.user')}
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

function UserForm({ language, t, onSuccess }: { language: string; t: (key: string) => string; onSuccess: () => void }) {
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
          placeholder={t('admin.full_name')}
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

function UserEditForm({ language, t, user, onSuccess }: { language: string; t: (key: string) => string; user: any; onSuccess: () => void }) {
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
  const [editingPostId, setEditingPostId] = useState<number | undefined>(undefined);
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
    if (confirm(t('admin.confirm_delete'))) {
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPostId 
                ? (language === 'pt' ? 'Editar Artigo' : 'Edit Article')
                : (language === 'pt' ? 'Novo Artigo' : 'New Article')
              }
            </DialogTitle>
          </DialogHeader>
          <BlogEditor
            postId={editingPostId}
            onSuccess={() => {
              setIsModalOpen(false);
              setEditingPostId(undefined);
              blogQuery.refetch();
            }}
            t={t}
            language={language}
          />
        </DialogContent>
      </Dialog>

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
                        {post.published ? (t('admin.published_status')) : (t('admin.draft'))}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingPostId(post.id);
                          setIsModalOpen(true);
                        }}
                      >
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

function BlogForm({ language, t, onSuccess }: { language: string; t: (key: string) => string; onSuccess: () => void }) {
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
            {t('admin.title_pt')}
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
            {t('admin.title_en')}
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
            {t('admin.excerpt_pt')}
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
            {t('admin.excerpt_en')}
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
            {t('admin.content_pt')}
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
            {t('admin.content_en')}
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
            {t('admin.image_url')}
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
            {t('admin.read_time')}
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

function ProductsTab({ t, language }: { t: (key: string) => string; language: string }) {
  const { data: products, isLoading, refetch } = trpc.admin.products.list.useQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const deleteProductMutation = trpc.admin.products.delete.useMutation({
    onSuccess: () => {
      refetch();
      toast.success(language === 'pt' ? 'Produto deletado!' : 'Product deleted!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = (id: number) => {
    if (confirm(language === 'pt' ? 'Tem certeza que deseja deletar este produto?' : 'Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate({ id });
    }
  };

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const paginatedProducts = filteredProducts.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  const totalPages = Math.ceil(filteredProducts.length / pagination.pageSize);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Produtos' : 'Manage Products'}
        </h3>
        <Button onClick={handleCreate} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          {language === 'pt' ? 'Novo Produto' : 'New Product'}
        </Button>
      </div>

      <div className="mb-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === 'pt' ? 'Buscar por nome ou categoria...' : 'Search by name or category...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={pagination.pageSize}
          onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value), page: 1 })}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="10">{language === 'pt' ? '10 por página' : '10 per page'}</option>
          <option value="25">{language === 'pt' ? '25 por página' : '25 per page'}</option>
          <option value="50">{language === 'pt' ? '50 por página' : '50 per page'}</option>
        </select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Nome' : 'Name'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Categoria' : 'Category'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Preço' : 'Price'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Estoque' : 'Stock'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Ações' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  {language === 'pt' ? 'Nenhum produto encontrado' : 'No products found'}
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {product.price} MZN
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={deleteProductMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            {language === 'pt' ? 'Mostrando' : 'Showing'} {(pagination.page - 1) * pagination.pageSize + 1} {language === 'pt' ? 'a' : 'to'} {Math.min(pagination.page * pagination.pageSize, filteredProducts.length)} {language === 'pt' ? 'de' : 'of'} {filteredProducts.length} {language === 'pt' ? 'produtos' : 'products'}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="px-4 py-2 text-sm">
              {language === 'pt' ? 'Página' : 'Page'} {pagination.page} {language === 'pt' ? 'de' : 'of'} {totalPages}
            </span>
            <Button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === totalPages}
              variant="outline"
              size="sm"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        product={selectedProduct}
        onSuccess={() => {
          refetch();
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        language={language}
      />
    </div>
  );
}

function OrdersTab({ t, language }: { t: (key: string) => string; language: string }) {
  const { data: orders, isLoading, refetch } = trpc.orders.all.useQuery();
  const { data: products } = trpc.admin.products.list.useQuery();
  const updateStatusMutation = trpc.orders.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success(language === 'pt' ? 'Status atualizado!' : 'Status updated!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = orders?.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  ) || [];

  const handleStatusChange = (orderId: number, newStatus: string) => {
    updateStatusMutation.mutate({ id: orderId, status: newStatus as any });
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {language === 'pt' ? t(`orders.status.${status}`) : t(`orders.status.${status}`)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Pedidos' : 'Manage Orders'}
        </h3>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            <option value="all">{language === 'pt' ? 'Todos' : 'All'}</option>
            <option value="pending">{t('orders.status.pending')}</option>
            <option value="processing">{t('orders.status.processing')}</option>
            <option value="shipped">{t('orders.status.shipped')}</option>
            <option value="delivered">{t('orders.status.delivered')}</option>
            <option value="cancelled">{t('orders.status.cancelled')}</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'ID' : 'ID'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Cliente' : 'Customer'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Total' : 'Total'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Status' : 'Status'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Data' : 'Date'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'pt' ? 'Ações' : 'Actions'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  {language === 'pt' ? 'Nenhum pedido encontrado' : 'No orders found'}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.deliveryPhone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {order.totalAmount.toLocaleString('pt-MZ')} MZN
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString(language === 'pt' ? 'pt-MZ' : 'en-US')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-2 py-1 border rounded text-xs"
                      disabled={updateStatusMutation.isPending}
                    >
                      <option value="pending">{t('orders.status.pending')}</option>
                      <option value="processing">{t('orders.status.processing')}</option>
                      <option value="shipped">{t('orders.status.shipped')}</option>
                      <option value="delivered">{t('orders.status.delivered')}</option>
                      <option value="cancelled">{t('orders.status.cancelled')}</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-bold mb-4">
          {language === 'pt' ? 'Estatísticas de Pedidos' : 'Order Statistics'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">{t('orders.status.pending')}</p>
            <p className="text-2xl font-bold text-yellow-700">
              {orders?.filter(o => o.status === 'pending').length || 0}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-600">{t('orders.status.processing')}</p>
            <p className="text-2xl font-bold text-blue-700">
              {orders?.filter(o => o.status === 'processing').length || 0}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-600">{t('orders.status.shipped')}</p>
            <p className="text-2xl font-bold text-purple-700">
              {orders?.filter(o => o.status === 'shipped').length || 0}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-600">{t('orders.status.delivered')}</p>
            <p className="text-2xl font-bold text-green-700">
              {orders?.filter(o => o.status === 'delivered').length || 0}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-red-600">{t('orders.status.cancelled')}</p>
            <p className="text-2xl font-bold text-red-700">
              {orders?.filter(o => o.status === 'cancelled').length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesTab({ t, language }: { t: (key: string) => string; language: string }) {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'appointments'>('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    titlePt: '',
    titleEn: '',
    descriptionPt: '',
    descriptionEn: '',
    specialist: '',
    price: 0,
    priceType: 'hourly' as 'hourly' | 'daily' | 'project',
    features: '',
    available: true
  });

  const servicesQuery = trpc.admin.services.list.useQuery();
  const consultationsQuery = trpc.consultations.list.useQuery();
  const createMutation = trpc.admin.services.create.useMutation({
    onSuccess: () => {
      servicesQuery.refetch();
      setIsModalOpen(false);
      resetForm();
      toast.success(language === 'pt' ? 'Serviço criado!' : 'Service created!');
    }
  });
  const updateMutation = trpc.admin.services.update.useMutation({
    onSuccess: () => {
      servicesQuery.refetch();
      setIsModalOpen(false);
      resetForm();
      toast.success(language === 'pt' ? 'Serviço atualizado!' : 'Service updated!');
    }
  });
  const deleteMutation = trpc.admin.services.delete.useMutation({
    onSuccess: () => {
      servicesQuery.refetch();
      toast.success(language === 'pt' ? 'Serviço excluído!' : 'Service deleted!');
    }
  });
  const updateConsultationMutation = trpc.consultations.updateStatus.useMutation({
    onSuccess: () => {
      consultationsQuery.refetch();
      toast.success(language === 'pt' ? 'Status atualizado!' : 'Status updated!');
    }
  });

  const resetForm = () => {
    setFormData({
      titlePt: '', titleEn: '', descriptionPt: '', descriptionEn: '',
      specialist: '', price: 0, priceType: 'hourly', features: '', available: true
    });
    setEditingService(null);
  };

  const handleEdit = (service: any) => {
    setEditingService(service);
    setFormData({
      titlePt: service.titlePt,
      titleEn: service.titleEn,
      descriptionPt: service.descriptionPt,
      descriptionEn: service.descriptionEn,
      specialist: service.specialist,
      price: service.price,
      priceType: service.priceType,
      features: service.features || '',
      available: service.available
    });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (editingService) {
      updateMutation.mutate({ id: editingService.id, ...formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredServices = servicesQuery.data?.filter(s => 
    s.titlePt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.specialist.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const priceTypeLabel = (type: string) => {
    const labels: Record<string, { pt: string; en: string }> = {
      hourly: { pt: '/hora', en: '/hour' },
      daily: { pt: '/dia', en: '/day' },
      project: { pt: '/projeto', en: '/project' }
    };
    return labels[type]?.[language as 'pt' | 'en'] || type;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">
          {language === 'pt' ? 'Gerenciar Serviços' : 'Manage Services'}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={activeSubTab === 'services' ? 'default' : 'outline'}
            onClick={() => setActiveSubTab('services')}
          >
            {language === 'pt' ? 'Serviços' : 'Services'}
          </Button>
          <Button
            variant={activeSubTab === 'appointments' ? 'default' : 'outline'}
            onClick={() => setActiveSubTab('appointments')}
          >
            {language === 'pt' ? 'Agendamentos' : 'Appointments'}
          </Button>
        </div>
      </div>

      {activeSubTab === 'services' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder={language === 'pt' ? 'Buscar serviços...' : 'Search services...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              {language === 'pt' ? 'Novo Serviço' : 'New Service'}
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === 'pt' ? 'Serviço' : 'Service'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === 'pt' ? 'Especialista' : 'Specialist'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    {language === 'pt' ? 'Preço' : 'Price'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    {language === 'pt' ? 'Ações' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {language === 'pt' ? service.titlePt : service.titleEn}
                      </div>
                      <div className="text-sm text-gray-500 truncate max-w-xs">
                        {language === 'pt' ? service.descriptionPt : service.descriptionEn}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {service.specialist}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {service.price} MZN{priceTypeLabel(service.priceType)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${service.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {service.available ? (language === 'pt' ? 'Disponível' : 'Available') : (language === 'pt' ? 'Indisponível' : 'Unavailable')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(service)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate({ id: service.id })}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeSubTab === 'appointments' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'pt' ? 'Título' : 'Title'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {language === 'pt' ? 'Data Agendada' : 'Scheduled Date'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  {language === 'pt' ? 'Ações' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {consultationsQuery.data?.map((consultation) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">#{consultation.id}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{consultation.title}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{consultation.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {consultation.scheduledDate ? new Date(consultation.scheduledDate).toLocaleString(language === 'pt' ? 'pt-MZ' : 'en-US') : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={consultation.status}
                      onChange={(e) => updateConsultationMutation.mutate({ id: consultation.id, status: e.target.value as any })}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="pending">{language === 'pt' ? 'Pendente' : 'Pending'}</option>
                      <option value="approved">{language === 'pt' ? 'Aprovado' : 'Approved'}</option>
                      <option value="completed">{language === 'pt' ? 'Concluído' : 'Completed'}</option>
                      <option value="cancelled">{language === 'pt' ? 'Cancelado' : 'Cancelled'}</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
              {(!consultationsQuery.data || consultationsQuery.data.length === 0) && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {language === 'pt' ? 'Nenhum agendamento encontrado' : 'No appointments found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Criação/Edição */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService 
                ? (language === 'pt' ? 'Editar Serviço' : 'Edit Service')
                : (language === 'pt' ? 'Novo Serviço' : 'New Service')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'pt' ? 'Título (PT)' : 'Title (PT)'}</Label>
                <Input
                  value={formData.titlePt}
                  onChange={(e) => setFormData({ ...formData, titlePt: e.target.value })}
                  placeholder="Consultoria em Agricultura"
                />
              </div>
              <div>
                <Label>{language === 'pt' ? 'Título (EN)' : 'Title (EN)'}</Label>
                <Input
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                  placeholder="Agriculture Consulting"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{language === 'pt' ? 'Descrição (PT)' : 'Description (PT)'}</Label>
                <Textarea
                  value={formData.descriptionPt}
                  onChange={(e) => setFormData({ ...formData, descriptionPt: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>{language === 'pt' ? 'Descrição (EN)' : 'Description (EN)'}</Label>
                <Textarea
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>{language === 'pt' ? 'Especialista' : 'Specialist'}</Label>
                <Input
                  value={formData.specialist}
                  onChange={(e) => setFormData({ ...formData, specialist: e.target.value })}
                  placeholder="Dr. Silva"
                />
              </div>
              <div>
                <Label>{language === 'pt' ? 'Preço (MZN)' : 'Price (MZN)'}</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>{language === 'pt' ? 'Tipo de Preço' : 'Price Type'}</Label>
                <select
                  value={formData.priceType}
                  onChange={(e) => setFormData({ ...formData, priceType: e.target.value as any })}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="hourly">{language === 'pt' ? 'Por Hora' : 'Hourly'}</option>
                  <option value="daily">{language === 'pt' ? 'Por Dia' : 'Daily'}</option>
                  <option value="project">{language === 'pt' ? 'Por Projeto' : 'Per Project'}</option>
                </select>
              </div>
            </div>
            <div>
              <Label>{language === 'pt' ? 'Features (separadas por vírgula)' : 'Features (comma separated)'}</Label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="Análise, Planejamento, Relatório"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.available}
                onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                className="w-4 h-4"
              />
              <Label>{language === 'pt' ? 'Disponível' : 'Available'}</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              {language === 'pt' ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {editingService ? (language === 'pt' ? 'Atualizar' : 'Update') : (language === 'pt' ? 'Criar' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AnalyticsTab({ t, language }: { t: (key: string) => string; language: string }) {
  const { data: orders } = trpc.orders.all.useQuery();
  const { data: products } = trpc.admin.products.list.useQuery();
  const { data: users } = trpc.admin.users.list.useQuery();

  const totalRevenue = orders?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;
  const totalOrders = orders?.length || 0;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  const ordersByStatus = {
    pending: orders?.filter(o => o.status === 'pending').length || 0,
    processing: orders?.filter(o => o.status === 'processing').length || 0,
    shipped: orders?.filter(o => o.status === 'shipped').length || 0,
    delivered: orders?.filter(o => o.status === 'delivered').length || 0,
    cancelled: orders?.filter(o => o.status === 'cancelled').length || 0,
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {language === 'pt' ? 'Relatórios e Analytics' : 'Reports and Analytics'}
      </h3>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">
            {language === 'pt' ? 'Receita Total' : 'Total Revenue'}
          </p>
          <p className="text-3xl font-bold text-emerald-600">
            {totalRevenue.toLocaleString('pt-MZ')} MZN
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">
            {language === 'pt' ? 'Total de Pedidos' : 'Total Orders'}
          </p>
          <p className="text-3xl font-bold text-blue-600">
            {totalOrders}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">
            {language === 'pt' ? 'Ticket Médio' : 'Average Order Value'}
          </p>
          <p className="text-3xl font-bold text-purple-600">
            {averageOrderValue.toLocaleString('pt-MZ', { maximumFractionDigits: 0 })} MZN
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm text-gray-600 mb-1">
            {language === 'pt' ? 'Produtos Ativos' : 'Active Products'}
          </p>
          <p className="text-3xl font-bold text-orange-600">
            {products?.length || 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Pedidos por Status' : 'Orders by Status'}
          </h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{t('orders.status.pending')}</span>
                <span className="text-sm font-semibold">{ordersByStatus.pending}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${totalOrders > 0 ? (ordersByStatus.pending / totalOrders) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{t('orders.status.processing')}</span>
                <span className="text-sm font-semibold">{ordersByStatus.processing}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${totalOrders > 0 ? (ordersByStatus.processing / totalOrders) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{t('orders.status.shipped')}</span>
                <span className="text-sm font-semibold">{ordersByStatus.shipped}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${totalOrders > 0 ? (ordersByStatus.shipped / totalOrders) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{t('orders.status.delivered')}</span>
                <span className="text-sm font-semibold">{ordersByStatus.delivered}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${totalOrders > 0 ? (ordersByStatus.delivered / totalOrders) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{t('orders.status.cancelled')}</span>
                <span className="text-sm font-semibold">{ordersByStatus.cancelled}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-500 h-2 rounded-full" 
                  style={{ width: `${totalOrders > 0 ? (ordersByStatus.cancelled / totalOrders) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {language === 'pt' ? 'Top 5 Produtos' : 'Top 5 Products'}
          </h4>
          <div className="space-y-3">
            {products?.slice(0, 5).map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="text-sm font-bold text-emerald-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{product.price} MZN</p>
                  <p className="text-xs text-gray-500">{language === 'pt' ? 'Estoque' : 'Stock'}: {product.stock}</p>
                </div>
              </div>
            )) || (
              <p className="text-center text-gray-500 py-8">
                {language === 'pt' ? 'Nenhum produto encontrado' : 'No products found'}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab({ t, language }: { t: (key: string) => string; language: string }) {
  const seedMutation = trpc.seed.all.useMutation({
    onSuccess: () => {
      toast.success(language === 'pt' ? 'Banco de dados populado com sucesso!' : 'Database seeded successfully!');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {t('admin.settings')}
      </h3>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mb-6">
        <h4 className="text-lg font-bold mb-4">
          {language === 'pt' ? 'Dados Iniciais' : 'Initial Data'}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          {language === 'pt' 
            ? 'Popule o banco de dados com produtos, artigos e serviços de exemplo. Use apenas se o banco estiver vazio.'
            : 'Populate database with sample products, articles and services. Use only if database is empty.'}
        </p>
        <Button 
          onClick={() => seedMutation.mutate()}
          disabled={seedMutation.isPending}
          className="bg-green-600 hover:bg-green-700"
        >
          {seedMutation.isPending 
            ? (language === 'pt' ? 'Populando...' : 'Seeding...') 
            : (language === 'pt' ? 'Popular Banco de Dados' : 'Seed Database')}
        </Button>
      </div>
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
