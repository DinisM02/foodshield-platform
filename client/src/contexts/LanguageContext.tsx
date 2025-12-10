import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.knowledge': 'Centro de Conhecimento',
    'nav.marketplace': 'Marketplace',
    'nav.services': 'Serviços',
    'nav.tools': 'Ferramentas',
    'nav.dashboard': 'Minha Área',
    'header.search': 'Buscar...',
    'header.start': 'Começar',
    'header.login': 'Login',
    'header.signup': 'Cadastro',
    'header.logout': 'Sair',
    'header.profile': 'Perfil',
    'header.language': 'Idioma',

    // Hero Section
    'hero.tagline': 'Melhorando a Segurança Alimentar e Segurança Alimentar',
    'hero.title': 'FOOD SHIELD',
    'hero.description': 'A plataforma completa para transformar sistemas alimentares e promover práticas sustentáveis em Moçambique e além',
    'hero.explore': 'Explorar Plataforma',
    'hero.learn_more': 'Saiba Mais',

    // Features Section
    'features.title': 'Tudo Que Você Precisa',
    'features.subtitle': 'Uma plataforma integrada com ferramentas, conhecimento e recursos para impulsionar a sustentabilidade',
    'features.knowledge': 'Centro de Conhecimento',
    'features.knowledge_desc': 'Biblioteca digital com artigos, vídeos, guias e pesquisas sobre agricultura sustentável',
    'features.marketplace': 'Marketplace',
    'features.marketplace_desc': 'Produtos locais com indicadores de sustentabilidade e impacto ambiental',
    'features.consulting': 'Consultoria',
    'features.consulting_desc': 'Especialistas disponíveis para orientar projetos sustentáveis',
    'features.tools': 'Ferramentas Digitais',
    'features.tools_desc': 'Calculadoras e dashboards para análise de sustentabilidade e custos',

    // Stats Section
    'stats.resources': 'Recursos Disponíveis',
    'stats.users': 'Usuários Ativos',
    'stats.specialists': 'Especialistas',
    'stats.satisfaction': 'Satisfação',

    // CTA Section
    'cta.title': 'Pronto Para Começar?',
    'cta.subtitle': 'Junte-se à nossa comunidade e faça parte da transformação sustentável',
    'cta.button': 'Começar Agora',

    // Newsletter Section
    'newsletter.title': 'Fique Atualizado',
    'newsletter.subtitle': 'Receba dicas, notícias e ofertas exclusivas sobre agricultura sustentável',
    'newsletter.email': 'Seu email...',
    'newsletter.subscribe': 'Inscrever',

    // Footer
    'footer.platform': 'Plataforma',
    'footer.resources': 'Recursos',
    'footer.contact': 'Contato',
    'footer.company': 'Empresa',
    'footer.about': 'Sobre Nós',
    'footer.team': 'Equipe',
    'footer.careers': 'Carreiras',
    'footer.partners': 'Parceiros',
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Serviço',
    'footer.cookies': 'Cookies',
    'footer.accessibility': 'Acessibilidade',

    // Auth
    'auth.login_required': 'Faça login para acessar este recurso',
    'auth.restricted': 'Acesso Restrito',
    'auth.login': 'Fazer Login',

    // Pages
    'page.access_denied': 'Acesso Restrito',
    'page.access_denied_msg': 'Você precisa estar autenticado para acessar esta página.',
    'page.not_found': 'Página Não Encontrada',
    'page.not_found_msg': 'A página que você procura não existe.',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Artigos e notícias sobre agricultura sustentável',
    'blog.search_placeholder': 'Buscar artigos...',
    'blog.all_categories': 'Todos',
    'blog.no_results': 'Nenhum artigo encontrado',
    'blog.read_more': 'Ler Mais',
    'blog.by_author': 'Por',
    'blog.read_time': 'min de leitura',

    // Knowledge Center
    'knowledge.title': 'Centro de Conhecimento',
    'knowledge.subtitle': 'Biblioteca digital com recursos sobre agricultura sustentável',
    'knowledge.search_placeholder': 'Buscar recursos...',
    'knowledge.all': 'Todos',
    'knowledge.no_results': 'Nenhum resultado encontrado',

    // Marketplace
    'marketplace.title': 'Marketplace',
    'marketplace.subtitle': 'Produtos locais com indicadores de sustentabilidade',
    'marketplace.filter': 'Filtrar por categoria',
    'marketplace.add_to_cart': 'Adicionar ao Carrinho',
    'marketplace.price': 'Preço',
    'marketplace.stock': 'Em Estoque',
    'marketplace.sustainability': 'Sustentabilidade',
    'marketplace.checkout': 'Finalizar Compra',
    'marketplace.cart_empty': 'Seu carrinho está vazio',
    'marketplace.cart_items': 'itens no carrinho',
    'marketplace.category_all': 'Todos',
    'marketplace.category_seeds': 'Sementes',
    'marketplace.category_inputs': 'Insumos',
    'marketplace.category_equipment': 'Equipamentos',
    'marketplace.category_fresh': 'Produtos Frescos',

    // Services
    'services.title': 'Consultoria',
    'services.subtitle': 'Especialistas disponíveis para orientar seus projetos',
    'services.request': 'Solicitar Consultoria',
    'services.price': 'Preço',
    'services.features': 'Características',
    'services.schedule': 'Agendar Reunião',

    // Tools
    'tools.title': 'Ferramentas Digitais',
    'tools.subtitle': 'Calculadoras e dashboards para análise de sustentabilidade',
    'tools.carbon_calculator': 'Calculadora de Carbono',
    'tools.cost_calculator': 'Calculadora de Custos',
    'tools.calculate': 'Calcular',
    'tools.result': 'Resultado',
    'tools.area_hectares': 'Área (hectares)',
    'tools.fuel_liters': 'Combustível (litros/mês)',
    'tools.fertilizer_kg': 'Fertilizante (kg/mês)',
    'tools.carbon_equivalent': 'Equivalente a:',
    'tools.cost_per_hectare': 'Custo por hectare:',
    'tools.suggested_margin': 'Margem sugerida:',

    // Dashboard
    'dashboard.welcome': 'Bem-vindo',
    'dashboard.activity_summary': 'Aqui está um resumo da sua atividade na plataforma',
    'dashboard.overview': 'Visão Geral',
    'dashboard.purchases': 'Compras',
    'dashboard.consultations': 'Consultorías',
    'dashboard.articles_read': 'Artigos Lidos',
    'dashboard.tools_used': 'Ferramentas Usadas',
    'dashboard.total_spent': 'Total Gasto',
    'dashboard.sustainability_score': 'Pontuação de Sustentabilidade',
    'dashboard.recent_purchases': 'Compras Recentes',
    'dashboard.status_delivered': 'Entregue',
    'dashboard.status_pending': 'Pendente',
    'dashboard.status_scheduled': 'Agendada',
    'dashboard.logout': 'Sair',

    // FAQ
    'faq.title': 'Perguntas Frequentes',
    'faq.subtitle': 'Encontre respostas para as dúvidas mais comuns sobre o SustainHub',
    'faq.no_answer': 'Não encontrou sua resposta?',
    'faq.contact_us': 'Entre em contato conosco',

    // Admin Dashboard
    'admin.title': 'Painel de Administração',
    'admin.overview': 'Visão Geral',
    'admin.users': 'Usuários',
    'admin.blog': 'Blog',
    'admin.marketplace': 'Marketplace',
    'admin.services': 'Serviços',
    'admin.reports': 'Relatórios',
    'admin.settings': 'Configurações',
    'admin.access_denied': 'Acesso Restrito',
    'admin.access_denied_msg': 'Apenas administradores podem acessar este painel.',
    'admin.logged_in_as': 'Conectado como',
    'admin.total_users': 'Total de Usuários',
    'admin.registered': 'Registrados',
    'admin.blog_articles': 'Artigos de Blog',
    'admin.published': 'Publicados',
    'admin.products': 'Produtos',
    'admin.in_marketplace': 'No Marketplace',
    'admin.services_available': 'Serviços',
    'admin.available': 'Disponíveis',
    'admin.manage_users': 'Gerenciar Usuários',
    'admin.new_user': 'Novo Usuário',
    'admin.manage_blog': 'Gerenciar Blog',
    'admin.new_article': 'Novo Artigo',
    'admin.manage_marketplace': 'Gerenciar Marketplace',
    'admin.manage_services': 'Gerenciar Serviços',
    'admin.reports_analytics': 'Relatórios e Analytics',
    'admin.search_by_name': 'Buscar por nome ou email...',
    'admin.search_articles': 'Buscar artigos...',
    'admin.per_page': 'por página',
    'admin.showing': 'Mostrando',
    'admin.of': 'de',
    'admin.name': 'Nome',
    'admin.email': 'Email',
    'admin.role': 'Função',
    'admin.actions': 'Ações',
    'admin.title_col': 'Título',
    'admin.author': 'Autor',
    'admin.status': 'Status',
    'admin.user': 'Usuário',
    'admin.admin': 'Admin',
    'admin.draft': 'Rascunho',
    'admin.published_status': 'Publicado',
    'admin.confirm_delete': 'Tem certeza?',
    'admin.new_user_modal': 'Novo Usuário',
    'admin.edit_user_modal': 'Editar Usuário',
    'admin.full_name': 'Nome completo',
    'admin.user_role': 'Função',
    'admin.new_article_modal': 'Novo Artigo',
    'admin.title_pt': 'Título (PT)',
    'admin.title_en': 'Título (EN)',
    'admin.excerpt_pt': 'Resumo (PT)',
    'admin.excerpt_en': 'Resumo (EN)',
    'admin.content_pt': 'Conteúdo (PT)',
    'admin.content_en': 'Conteúdo (EN)',
    'admin.category': 'Categoria',
    'admin.image_url': 'URL da Imagem',
    'admin.read_time': 'Tempo de Leitura (min)',
    'admin.article_status': 'Status',
    'admin.visitors_per_month': 'Visitantes por Mês',
    'admin.visitor_chart': 'Gráfico de visitantes',
    'admin.sales_by_product': 'Vendas por Produto',
    'admin.sales_chart': 'Gráfico de vendas',
    'admin.platform_name': 'Nome da Plataforma',
    'admin.contact_email': 'Email de Contato',
    'admin.save_changes': 'Salvar Alterações',
    'admin.coming_soon': 'Em desenvolvimento...',

    // Common
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.view_all': 'Ver Todas',
    'common.learn_more': 'Saiba Mais',
    'common.get_started': 'Começar',
    'common.subscribe': 'Inscrever',
    'common.cancel': 'Cancelar',
    'common.save': 'Salvar',
    'common.delete': 'Deletar',
    'common.edit': 'Editar',
    'common.back': 'Voltar',
    'common.next': 'Próximo',
    'common.previous': 'Anterior',
    'common.loading': 'Carregando...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.warning': 'Aviso',
    'common.info': 'Informação',
  },
  en: {
    // Header & Navigation
    'nav.home': 'Home',
    'nav.knowledge': 'Knowledge Center',
    'nav.marketplace': 'Marketplace',
    'nav.services': 'Services',
    'nav.tools': 'Tools',
    'nav.dashboard': 'My Area',
    'header.search': 'Search...',
    'header.start': 'Get Started',
    'header.login': 'Login',
    'header.signup': 'Sign Up',
    'header.logout': 'Logout',
    'header.profile': 'Profile',
    'header.language': 'Language',

    // Hero Section
    'hero.tagline': 'Improving Food Safety & Food Security',
    'hero.title': 'FOOD SHIELD',
    'hero.description': 'The complete platform to transform food systems and promote sustainable practices in Mozambique and beyond',
    'hero.explore': 'Explore Platform',
    'hero.learn_more': 'Learn More',

    // Features Section
    'features.title': 'Everything You Need',
    'features.subtitle': 'An integrated platform with tools, knowledge and resources to drive sustainability',
    'features.knowledge': 'Knowledge Center',
    'features.knowledge_desc': 'Digital library with articles, videos, guides and research on sustainable agriculture',
    'features.marketplace': 'Marketplace',
    'features.marketplace_desc': 'Local products with sustainability indicators and environmental impact',
    'features.consulting': 'Consulting',
    'features.consulting_desc': 'Experts available to guide sustainable projects',
    'features.tools': 'Digital Tools',
    'features.tools_desc': 'Calculators and dashboards for sustainability and cost analysis',

    // Stats Section
    'stats.resources': 'Available Resources',
    'stats.users': 'Active Users',
    'stats.specialists': 'Specialists',
    'stats.satisfaction': 'Satisfaction',

    // CTA Section
    'cta.title': 'Ready to Get Started?',
    'cta.subtitle': 'Join our community and be part of the sustainable transformation',
    'cta.button': 'Get Started Now',

    // Newsletter Section
    'newsletter.title': 'Stay Updated',
    'newsletter.subtitle': 'Get tips, news and exclusive offers about sustainable agriculture',
    'newsletter.email': 'Your email...',
    'newsletter.subscribe': 'Subscribe',

    // Footer
    'footer.platform': 'Platform',
    'footer.resources': 'Resources',
    'footer.contact': 'Contact',
    'footer.company': 'Company',
    'footer.about': 'About Us',
    'footer.team': 'Team',
    'footer.careers': 'Careers',
    'footer.partners': 'Partners',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookies',
    'footer.accessibility': 'Accessibility',

    // Auth
    'auth.login_required': 'Login to access this resource',
    'auth.restricted': 'Access Restricted',
    'auth.login': 'Login',

    // Pages
    'page.access_denied': 'Access Restricted',
    'page.access_denied_msg': 'You need to be authenticated to access this page.',
    'page.not_found': 'Page Not Found',
    'page.not_found_msg': 'The page you are looking for does not exist.',

    // Blog
    'blog.title': 'Blog',
    'blog.subtitle': 'Articles and news about sustainable agriculture',
    'blog.search_placeholder': 'Search articles...',
    'blog.all_categories': 'All',
    'blog.no_results': 'No articles found',
    'blog.read_more': 'Read More',
    'blog.by_author': 'By',
    'blog.read_time': 'min read',

    // Knowledge Center
    'knowledge.title': 'Knowledge Center',
    'knowledge.subtitle': 'Digital library with resources on sustainable agriculture',
    'knowledge.search_placeholder': 'Search resources...',
    'knowledge.all': 'All',
    'knowledge.no_results': 'No results found',

    // Marketplace
    'marketplace.title': 'Marketplace',
    'marketplace.subtitle': 'Local products with sustainability indicators',
    'marketplace.filter': 'Filter by category',
    'marketplace.add_to_cart': 'Add to Cart',
    'marketplace.price': 'Price',
    'marketplace.stock': 'In Stock',
    'marketplace.sustainability': 'Sustainability',
    'marketplace.checkout': 'Checkout',
    'marketplace.cart_empty': 'Your cart is empty',
    'marketplace.cart_items': 'items in cart',
    'marketplace.category_all': 'All',
    'marketplace.category_seeds': 'Seeds',
    'marketplace.category_inputs': 'Inputs',
    'marketplace.category_equipment': 'Equipment',
    'marketplace.category_fresh': 'Fresh Products',

    // Services
    'services.title': 'Consulting',
    'services.subtitle': 'Experts available to guide your projects',
    'services.request': 'Request Consulting',
    'services.price': 'Price',
    'services.features': 'Features',
    'services.schedule': 'Schedule Meeting',

    // Tools
    'tools.title': 'Digital Tools',
    'tools.subtitle': 'Calculators and dashboards for sustainability analysis',
    'tools.carbon_calculator': 'Carbon Calculator',
    'tools.cost_calculator': 'Cost Calculator',
    'tools.calculate': 'Calculate',
    'tools.result': 'Result',
    'tools.area_hectares': 'Area (hectares)',
    'tools.fuel_liters': 'Fuel (liters/month)',
    'tools.fertilizer_kg': 'Fertilizer (kg/month)',
    'tools.carbon_equivalent': 'Equivalent to:',
    'tools.cost_per_hectare': 'Cost per hectare:',
    'tools.suggested_margin': 'Suggested margin:',

    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.activity_summary': 'Here is a summary of your activity on the platform',
    'dashboard.overview': 'Overview',
    'dashboard.purchases': 'Purchases',
    'dashboard.consultations': 'Consultations',
    'dashboard.articles_read': 'Articles Read',
    'dashboard.tools_used': 'Tools Used',
    'dashboard.total_spent': 'Total Spent',
    'dashboard.sustainability_score': 'Sustainability Score',
    'dashboard.recent_purchases': 'Recent Purchases',
    'dashboard.status_delivered': 'Delivered',
    'dashboard.status_pending': 'Pending',
    'dashboard.status_scheduled': 'Scheduled',
    'dashboard.logout': 'Logout',

    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find answers to common questions about SustainHub',
    'faq.no_answer': 'Did not find your answer?',
    'faq.contact_us': 'Contact us',

    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.overview': 'Overview',
    'admin.users': 'Users',
    'admin.blog': 'Blog',
    'admin.marketplace': 'Marketplace',
    'admin.services': 'Services',
    'admin.reports': 'Reports',
    'admin.settings': 'Settings',
    'admin.access_denied': 'Access Restricted',
    'admin.access_denied_msg': 'Only administrators can access this panel.',
    'admin.logged_in_as': 'Logged in as',
    'admin.total_users': 'Total Users',
    'admin.registered': 'Registered',
    'admin.blog_articles': 'Blog Articles',
    'admin.published': 'Published',
    'admin.products': 'Products',
    'admin.in_marketplace': 'In Marketplace',
    'admin.services_available': 'Services',
    'admin.available': 'Available',
    'admin.manage_users': 'Manage Users',
    'admin.new_user': 'New User',
    'admin.manage_blog': 'Manage Blog',
    'admin.new_article': 'New Article',
    'admin.manage_marketplace': 'Manage Marketplace',
    'admin.manage_services': 'Manage Services',
    'admin.reports_analytics': 'Reports and Analytics',
    'admin.search_by_name': 'Search by name or email...',
    'admin.search_articles': 'Search articles...',
    'admin.per_page': 'per page',
    'admin.showing': 'Showing',
    'admin.of': 'of',
    'admin.name': 'Name',
    'admin.email': 'Email',
    'admin.role': 'Role',
    'admin.actions': 'Actions',
    'admin.title_col': 'Title',
    'admin.author': 'Author',
    'admin.status': 'Status',
    'admin.user': 'User',
    'admin.admin': 'Admin',
    'admin.draft': 'Draft',
    'admin.published_status': 'Published',
    'admin.confirm_delete': 'Are you sure?',
    'admin.new_user_modal': 'New User',
    'admin.edit_user_modal': 'Edit User',
    'admin.full_name': 'Full name',
    'admin.user_role': 'Role',
    'admin.new_article_modal': 'New Article',
    'admin.title_pt': 'Title (PT)',
    'admin.title_en': 'Title (EN)',
    'admin.excerpt_pt': 'Excerpt (PT)',
    'admin.excerpt_en': 'Excerpt (EN)',
    'admin.content_pt': 'Content (PT)',
    'admin.content_en': 'Content (EN)',
    'admin.category': 'Category',
    'admin.image_url': 'Image URL',
    'admin.read_time': 'Read Time (min)',
    'admin.article_status': 'Status',
    'admin.visitors_per_month': 'Visitors per Month',
    'admin.visitor_chart': 'Visitor chart',
    'admin.sales_by_product': 'Sales by Product',
    'admin.sales_chart': 'Sales chart',
    'admin.platform_name': 'Platform Name',
    'admin.contact_email': 'Contact Email',
    'admin.save_changes': 'Save Changes',
    'admin.coming_soon': 'Coming soon...',

    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.view_all': 'View All',
    'common.learn_more': 'Learn More',
    'common.get_started': 'Get Started',
    'common.subscribe': 'Subscribe',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.warning': 'Warning',
    'common.info': 'Information',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
