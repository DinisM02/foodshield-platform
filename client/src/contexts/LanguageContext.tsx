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
    'hero.tagline': 'Segurança Alimentar e Desenvolvimento Sustentável',
    'hero.title': 'SustainHub',
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

    // Pages
    'page.access_denied': 'Acesso Restrito',
    'page.access_denied_msg': 'Você precisa estar autenticado para acessar esta página.',
    'page.not_found': 'Página Não Encontrada',
    'page.not_found_msg': 'A página que você procura não existe.',
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
    'hero.tagline': 'Food Security and Sustainable Development',
    'hero.title': 'SustainHub',
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

    // Pages
    'page.access_denied': 'Access Restricted',
    'page.access_denied_msg': 'You need to be authenticated to access this page.',
    'page.not_found': 'Page Not Found',
    'page.not_found_msg': 'The page you are looking for does not exist.',
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
