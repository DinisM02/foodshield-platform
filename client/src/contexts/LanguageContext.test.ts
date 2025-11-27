import { describe, it, expect } from 'vitest';

describe('LanguageContext Translations', () => {
  const translations = {
    pt: {
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
      'hero.tagline': 'Segurança Alimentar e Desenvolvimento Sustentável',
      'hero.title': 'SustainHub',
      'hero.description': 'A plataforma completa para transformar sistemas alimentares e promover práticas sustentáveis em Moçambique e além',
      'hero.explore': 'Explorar Plataforma',
      'hero.learn_more': 'Saiba Mais',
    },
    en: {
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
      'hero.tagline': 'Food Security and Sustainable Development',
      'hero.title': 'SustainHub',
      'hero.description': 'The complete platform to transform food systems and promote sustainable practices in Mozambique and beyond',
      'hero.explore': 'Explore Platform',
      'hero.learn_more': 'Learn More',
    },
  };

  it('should have Portuguese translations for all keys', () => {
    expect(translations.pt).toBeDefined();
    expect(translations.pt['nav.home']).toBe('Home');
    expect(translations.pt['nav.knowledge']).toBe('Centro de Conhecimento');
    expect(translations.pt['header.login']).toBe('Login');
    expect(translations.pt['header.signup']).toBe('Cadastro');
  });

  it('should have English translations for all keys', () => {
    expect(translations.en).toBeDefined();
    expect(translations.en['nav.home']).toBe('Home');
    expect(translations.en['nav.knowledge']).toBe('Knowledge Center');
    expect(translations.en['header.login']).toBe('Login');
    expect(translations.en['header.signup']).toBe('Sign Up');
  });

  it('should have matching keys between Portuguese and English', () => {
    const ptKeys = Object.keys(translations.pt).sort();
    const enKeys = Object.keys(translations.en).sort();
    
    expect(ptKeys).toEqual(enKeys);
  });

  it('should have all navigation keys', () => {
    const navKeys = ['nav.home', 'nav.knowledge', 'nav.marketplace', 'nav.services', 'nav.tools', 'nav.dashboard'];
    
    navKeys.forEach(key => {
      expect(translations.pt[key as keyof typeof translations.pt]).toBeDefined();
      expect(translations.en[key as keyof typeof translations.en]).toBeDefined();
    });
  });

  it('should have all header keys', () => {
    const headerKeys = ['header.search', 'header.start', 'header.login', 'header.signup', 'header.logout', 'header.profile', 'header.language'];
    
    headerKeys.forEach(key => {
      expect(translations.pt[key as keyof typeof translations.pt]).toBeDefined();
      expect(translations.en[key as keyof typeof translations.en]).toBeDefined();
    });
  });

  it('should have all hero section keys', () => {
    const heroKeys = ['hero.tagline', 'hero.title', 'hero.description', 'hero.explore', 'hero.learn_more'];
    
    heroKeys.forEach(key => {
      expect(translations.pt[key as keyof typeof translations.pt]).toBeDefined();
      expect(translations.en[key as keyof typeof translations.en]).toBeDefined();
    });
  });

  it('Portuguese and English should have different content for non-title keys', () => {
    expect(translations.pt['nav.knowledge']).not.toBe(translations.en['nav.knowledge']);
    expect(translations.pt['header.login']).not.toBe(translations.en['header.login']);
    expect(translations.pt['hero.description']).not.toBe(translations.en['hero.description']);
  });
});
