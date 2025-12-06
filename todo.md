# SustainHub - Lista de Tarefas

## 🎨 Design e Interface Visual
- [x] Implementar hero section com imagem de fundo impactante
- [x] Adicionar paleta de cores vibrante (#0084B6 como principal)
- [x] Criar cards com imagens reais em todos os módulos
- [x] Implementar animações suaves e efeitos hover
- [x] Adicionar gradientes modernos
- [ ] Melhorar tipografia e espaçamento
- [x] Implementar scroll indicators (down/up)

## 📄 Páginas Principais
- [x] Home - Hero section com CTA e imagens
- [x] Centro de Conhecimento - Cards com fotos de artigos
- [x] Marketplace - Grid de produtos com imagens
- [x] Serviços - Cards visuais de consultorias
- [x] Ferramentas - Interface amigável para calculadoras
- [ ] Perfil do Usuário - Dashboard visual

## 🔧 Funcionalidades
- [ ] Sistema de autenticação simplificado
- [ ] Carrinho de compras funcional
- [ ] Solicitação de serviços com modal
- [ ] Painel administrativo
- [ ] Sistema bilíngue (PT/EN)
- [ ] Integração com imagens do Unsplash

## 🎯 Componentes
- [ ] Navbar com hover #B4E2F6
- [ ] Footer com cor #0084B6
- [ ] Cards de conteúdo com imagens
- [ ] Botões com animações
- [ ] Modais elegantes

## 📊 Banco de Dados
- [ ] Tabela de usuários
- [ ] Tabela de conteúdos com URLs de imagens
- [ ] Tabela de produtos com fotos
- [ ] Tabela de pedidos
- [ ] Tabela de consultorias

## 🚀 Deploy
- [ ] Build final
- [ ] Deploy permanente
- [ ] Testes de responsividade

## 📝 Melhorias Solicitadas
- [x] Adicionar seção de Depoimentos de Clientes na Home
- [x] Transformar depoimentos em carrossel dinâmico com navegação
- [x] Criar página dedicada com todos os depoimentos

## 🐛 Bugs Reportados
- [x] Corrigir visibilidade de botões e textos na página de depoimentos
- [x] Corrigir textos de botões que ainda estão invisíveis

## 🆕 Novas Funcionalidades
- [x] Implementar formulário de Newsletter (na página Blog)
- [x] Criar seção de Blog com artigos
- [x] Desenvolver Dashboard de Usuário
- [x] Adicionar página FAQ
- [x] Implementar sistema de busca global
- [ ] Criar página de Sobre Nós
- [x] Criar Header/Navbar com menu de navegação
- [x] Criar Área de Consumidor com Dashboard

## 🐛 Bugs Reportados - Fase 2
- [x] Adicionar Header e Footer em TODAS as páginas (Knowledge, Marketplace, Services, Tools)
- [x] Implementar busca global no Header
- [x] Melhorar Footer com links, contato e redes sociais

## 🌍 Bilinguismo & Autenticação (NOVA - 21/11)
- [x] Implementar sistema bilíngue (PT/EN)
- [x] Criar LanguageContext com traduções completas
- [x] Adicionar seletor de idioma no Header
- [x] Adicionar botões de Login/Signup no Header
- [x] Implementar logout functionality
- [x] Corrigir import do Header no Dashboard
- [x] Remover seção de depoimentos
- [x] Remover Blog e FAQ da navbar
- [x] Corrigir nested anchor tags
- [x] Melhorar contraste de cores
- [x] Corrigir contraste dos botões
- [x] Implementar testes de autenticação (7/7 passando)

## Admin Dashboard (NOVA - 21/11)
- [x] Criar estrutura base do Admin Dashboard com sidebar navegavel
- [x] Implementar protecao de rotas (apenas admin pode acessar)
- [x] Criar pagina de gerenciamento de usuarios (CRUD)
- [x] Criar pagina de gerenciamento de blog posts (CRUD)
- [x] Criar pagina de gerenciamento de produtos marketplace (CRUD)
- [x] Criar pagina de gerenciamento de servicos/consultoria (CRUD)
- [x] Criar pagina de gerenciamento de pedidos
- [x] Criar pagina de relatorios e analytics
- [ ] Implementar filtros e busca em todas as paginas
- [ ] Adicionar paginacao nas listas
- [x] Implementar testes para admin routes (6/6 passando)


## Admin Dashboard - Conexao ao Banco de Dados (NOVA - 21/11)
- [x] Expandir schema com tabelas blogPosts e services
- [x] Criar query helpers para CRUD (usuarios, blogs, produtos, servicos)
- [x] Criar tRPC procedures para admin (admin.users, admin.blog, admin.products, admin.services)
- [x] Conectar Admin Dashboard ao backend com trpc hooks
- [x] Implementar delete operations com confirmacao
- [x] Implementar loading states e error handling
- [x] Suporte bilingual completo (PT/EN) no Admin Dashboard
- [x] Testes de CRUD operations (16/16 passando)
- [ ] Implementar create/update operations no Admin Dashboard
- [ ] Adicionar paginacao nas tabelas
- [ ] Implementar filtros avancados


## Admin Dashboard - Create/Update Operations (NOVA - 21/11)
- [x] Criar componentes de modais reutilizaveis para formularios
- [x] Implementar create user com validacao de email
- [x] Implementar update user com edicao de nome e role
- [x] Implementar create blog post com editor bilingual (PT/EN)
- [x] Implementar update blog post com edicao de conteudo
- [x] Implementar create product com upload de imagem
- [x] Implementar update product com edicao de preco e estoque
- [x] Implementar create service com edicao de features
- [x] Implementar update service com edicao de preco e disponibilidade
- [x] Adicionar validacao de formularios em tempo real
- [x] Implementar testes para create/update operations (80/80 passando)
- [x] Implementar paginacao em todas as tabelas
- [x] Implementar filtros por categoria, status, data
- [x] Implementar busca global em todas as tabelas
- [x] Adicionar ordenacao por coluna (nome, data, preco)


## Admin Dashboard - Update Operations & Advanced Features (NOVA - Continuação)
- [ ] Implementar update user com edicao de nome e role
- [ ] Implementar update blog post com edicao de conteudo bilingual
- [ ] Implementar update product com edicao de preco e estoque
- [ ] Implementar update service com edicao de features e preco
- [ ] Adicionar paginacao em todas as tabelas (10, 25, 50 itens por pagina)
- [ ] Implementar filtros por categoria, status, data
- [ ] Implementar busca global em todas as tabelas
- [ ] Adicionar ordenacao por coluna (nome, data, preco, etc)
- [ ] Melhorar UI com ícones e cores
- [ ] Adicionar confirmacao de delecao com modal
- [ ] Implementar bulk actions (deletar multiplos itens)
- [ ] Adicionar export para CSV/Excel
- [ ] Implementar testes para update operations
- [ ] Implementar testes para paginacao e filtros
- [ ] Implementar testes para busca global
