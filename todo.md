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


## Bilinguismo 100% - Completo (CONCLUÍDO)
- [x] Expandir LanguageContext com 80+ traduções para Admin Dashboard
- [x] Traduzir Admin Dashboard completamente (sidebar, modais, labels, placeholders)
- [x] Atualizar Admin.tsx para usar t() em 100% das strings
- [x] Corrigir erros de sintaxe e TypeScript
- [x] Validar com testes (80/80 passando)
- [x] Plataforma 100% bilíngue (PT/EN) em todas as páginas

## Marketplace - Bilinguismo Corrigido (CONCLUÍDO)
- [x] Corrigir strings hardcoded em português no Marketplace
- [x] Adicionar traduções para categorias em inglês
- [x] Traduzir carrinho e botões
- [x] Expandir LanguageContext com chaves de marketplace
- [x] Testar em PT e EN
- [x] Marketplace 100% bilíngue

## Branding Update - FOOD SHIELD (CONCLUÍDO)
- [x] Copiar logo para client/public/
- [x] Atualizar nome da plataforma em const.ts
- [x] Atualizar Header.tsx com novo logo
- [x] Atualizar Footer.tsx com novo branding
- [x] Atualizar Home.tsx com novo nome
- [x] Atualizar LanguageContext com novas traduções
- [x] Atualizar título da página HTML
- [x] Testar em PT e EN
- [x] Executar testes (92/92 passando)
- [x] Salvar checkpoint

## Branding Update - Remove Text from Header/Footer (CONCLUÍDO)
- [x] Remover texto "FOOD SHIELD" do Header
- [x] Remover texto "FOOD SHIELD" do Footer
- [x] Deixar apenas o logo em ambos
- [x] Testar em PT e EN
- [x] Executar testes (92/92 passando)
- [x] Salvar checkpoint

## Desenvolvimento Completo da Plataforma (EM PROGRESSO)

### 1. Marketplace - Sistema de Checkout e Pedidos (CONCLUÍDO)
- [x] Criar página de checkout com resumo do carrinho
- [x] Implementar formulário de endereço de entrega
- [x] Adicionar seleção de método de pagamento
- [x] Criar sistema de processamento de pedidos
- [x] Implementar histórico de pedidos do usuário
- [x] Adicionar rastreamento de status de pedidos
- [x] Criar painel admin para gerenciar pedidos

### 2. Centro de Conhecimento - Gestão de Conteúdo
- [ ] Criar sistema de categorias de conteúdo
- [ ] Implementar listagem de artigos com filtros
- [ ] Adicionar página de visualização de artigo completo
- [ ] Criar sistema de busca de conteúdo
- [ ] Implementar upload e gestão de vídeos
- [ ] Adicionar sistema de favoritos
- [ ] Criar painel admin para CRUD de conteúdo

### 3. Serviços - Sistema de Agendamento
- [ ] Criar listagem de serviços disponíveis
- [ ] Implementar sistema de agendamento de consultas
- [ ] Adicionar calendário de disponibilidade
- [ ] Criar sistema de confirmação de agendamentos
- [ ] Implementar histórico de consultas
- [ ] Adicionar avaliações e feedback
- [ ] Criar painel admin para gerenciar agendamentos

### 4. Ferramentas - Calculadoras e Dashboards
- [ ] Criar calculadora de sustentabilidade
- [ ] Implementar calculadora de custos
- [ ] Adicionar dashboard de métricas
- [ ] Criar ferramenta de análise de impacto
- [ ] Implementar exportação de relatórios
- [ ] Adicionar gráficos interativos

### 5. Painel Admin - CRUD Completo
- [ ] Implementar gestão completa de usuários
- [ ] Adicionar gestão de produtos do marketplace
- [ ] Criar gestão de conteúdo do Knowledge Center
- [ ] Implementar gestão de serviços
- [ ] Adicionar dashboard de estatísticas
- [ ] Criar sistema de relatórios

### 6. Perfil do Usuário - Gestão de Conta
- [ ] Criar página de perfil do usuário
- [ ] Implementar edição de dados pessoais
- [ ] Adicionar upload de foto de perfil
- [ ] Criar página de configurações
- [ ] Implementar alteração de senha
- [ ] Adicionar preferências de notificações

### 7. Notificações e Mensagens
- [ ] Implementar sistema de notificações em tempo real
- [ ] Criar centro de notificações
- [ ] Adicionar notificações por email
- [ ] Implementar sistema de mensagens entre usuários
- [ ] Criar chat de suporte

### 8. Testes e Correções
- [ ] Testar todos os fluxos de usuário
- [ ] Testar todos os fluxos de admin
- [ ] Corrigir bugs encontrados
- [ ] Validar responsividade mobile
- [ ] Testar bilinguismo em todas as páginas
- [ ] Executar suite completa de testes

## Correções - Tornar Plataforma Totalmente Funcional (CONCLUÍDO)
- [x] Tornar produtos do Marketplace dinâmicos (buscar do banco)
- [x] Tornar conteúdo do Knowledge Center dinâmico (buscar do banco)
- [x] Tornar serviços dinâmicos (buscar do banco)
- [x] Garantir acesso ao painel Admin (/@admin)
- [x] Adicionar dados de seed para popular banco
- [x] Testar todas as funcionalidades
- [x] Salvar checkpoint

## Bugs Encontrados Durante Testes (PARCIALMENTE RESOLVIDO)
- [x] Carrinho não está persistindo itens adicionados (RESOLVIDO - CartContext com localStorage)
- [x] Checkout mostra "Carrinho Vazio" mesmo após adicionar produtos (RESOLVIDO - useCart funcionando)
- [x] Verificar se cart está sendo armazenado corretamente no localStorage ou estado (RESOLVIDO)
- [x] Corrigir Checkout para ler dados do carrinho (RESOLVIDO)
- [ ] Botão "Confirmar Pedido" não responde (EM INVESTIGAÇÃO - handleSubmit não sendo chamado)
- [ ] Testar fluxo completo: adicionar ao carrinho → checkout → finalizar pedido
- [ ] Testar painel Admin
- [ ] Salvar checkpoint final

## Integração Completa de Todas as Funcionalidades (EM PROGRESSO)

### 1. Corrigir Checkout
- [ ] Investigar e corrigir botão Confirmar Pedido
- [ ] Testar fluxo completo de compra
- [ ] Validar criação de pedidos no banco

### 2. Centro de Conhecimento
- [ ] Tornar artigos dinâmicos do banco
- [ ] Implementar busca de artigos
- [ ] Adicionar filtros por categoria
- [ ] Criar página de visualização de artigo completo
- [ ] Implementar sistema de favoritos

### 3. Serviços
- [ ] Tornar serviços dinâmicos do banco
- [ ] Implementar sistema de agendamento
- [ ] Criar formulário de solicitação de consulta
- [ ] Adicionar confirmação de agendamento
- [ ] Implementar histórico de consultas

### 4. Ferramentas
- [ ] Criar calculadora de sustentabilidade
- [ ] Implementar calculadora de custos
- [ ] Adicionar dashboard de métricas
- [ ] Criar gráficos interativos

### 5. Testes Finais
- [ ] Testar todos os fluxos de usuário
- [ ] Testar painel Admin
- [ ] Validar bilinguismo
- [ ] Salvar checkpoint final

## Modal de Criação/Edição de Produtos (CONCLUÍDO - 12/12)
- [x] Criar componente ProductModal com formulário completo
- [x] Integrar modal com ProductsTab
- [x] Implementar criação de produtos
- [x] Implementar edição de produtos
- [x] Adicionar validação de formulários
- [x] Testar criação e edição

## Upload Direto de Imagens (CONCLUÍDO - 12/12)
- [x] Criar procedure tRPC para upload de imagens
- [x] Atualizar ProductModal com input file
- [x] Implementar preview de imagem local
- [x] Integrar com S3 storage
- [x] Testar upload e criação de produtos
- [x] Validar tamanho e tipo de arquivo

## Drag-and-Drop para Upload de Imagens (CONCLUÍDO - 12/12)
- [x] Criar área de drag-and-drop no ProductModal
- [x] Implementar handlers de drag events (dragover, dragleave, drop)
- [x] Adicionar estados visuais (hover, dragging)
- [x] Manter compatibilidade com botão Choose File
- [x] Testar drag-and-drop com diferentes tipos de arquivo
- [x] Validar UX em diferentes navegadores

## Compressão Automática de Imagens (CONCLUÍDO - 12/12)
- [x] Instalar biblioteca browser-image-compression
- [x] Implementar função de compressão no ProductModal
- [x] Adicionar indicador de progresso durante compressão
- [x] Configurar qualidade e tamanho máximo
- [x] Testar com imagens grandes (>5MB)
- [x] Validar qualidade visual após compressão

## Ferramenta de Crop de Imagens (CONCLUÍDO - 12/12)
- [x] Instalar biblioteca react-image-crop
- [x] Criar componente ImageCropModal
- [x] Implementar interface de seleção de área
- [x] Adicionar botões de ação (Recortar, Cancelar)
- [x] Integrar com fluxo de upload existente
- [x] Testar com diferentes proporções e tamanhos

## Área de Consumidor - Portal do Usuário (CONCLUÍDO - 12/12)
- [x] Criar layout da área de consumidor com sidebar
- [x] Implementar dashboard do usuário com estatísticas
- [x] Criar seção de Blog com artigos favoritos e leitura
- [x] Implementar seção de Marketplace com histórico de compras
- [x] Criar seção de Serviços com agendamentos
- [ ] Adicionar perfil do usuário editável
- [ ] Implementar sistema de notificações
- [x] Adicionar traduções PT/EN
- [x] Testar todas as funcionalidades

## Gestão de Serviços no Admin Panel (CONCLUÍDO)
- [x] Criar aba de Serviços no Admin Panel
- [x] Implementar listagem de serviços com busca e paginação
- [x] Criar modal de criação de serviços
- [x] Criar modal de edição de serviços
- [x] Implementar delete de serviços
- [x] Criar aba de Agendamentos/Consultas
- [x] Listar todas as consultas agendadas
- [x] Permitir alterar status de consultas
- [x] Testar todas as funcionalidades

## Centro de Conhecimento, Ferramentas e Blog na Área do Consumidor (CONCLUÍDO)
- [x] Atualizar sidebar do ConsumerLayout com novos itens de menu
- [x] Criar página Consumer Knowledge Center
- [x] Criar página Consumer Tools
- [x] Criar página Consumer Blog
- [x] Adicionar rotas no App.tsx
- [x] Adicionar traduções PT/EN
- [x] Testar navegação e funcionalidades

## Link da Área do Consumidor na Navbar (CONCLUÍDO)
- [x] Adicionar link "Área do Consumidor" no Header
- [x] Testar navegação
- [x] Salvar checkpoint

## Corrigir Erro 404 na Página de Perfil (NOVA)
- [ ] Verificar rota /consumer/profile no App.tsx
- [ ] Verificar se componente ConsumerProfile existe
- [ ] Testar navegação
- [ ] Salvar checkpoint
- [x] Integrar página de perfil do consumidor ao banco de dados (telefone, endereço, bio, foto, preferências)
- [x] Integrar página de perfil do consumidor ao banco de dados (telefone, endereço, bio, foto, preferências)
- [x] Corrigir todos os nested anchor tags na aplicação (Consumer.tsx e outros componentes)
- [x] Implementar gestão completa de blog no Admin Panel (CRUD, editor rico, upload de imagens)

## Integração Completa da Plataforma (NOVA - 17/12)
- [x] Integrar Blog público com dados do banco de dados
- [x] Integrar Centro de Conhecimento com conteúdo dinâmico
- [x] Implementar sistema de favoritos funcional (produtos e artigos)
- [x] Criar página Sobre Nós completa
- [x] Testar todas as integrações
- [x] Corrigir nested anchor tags no ConsumerBlog.tsx e erro de src vazio

## Melhorias Finais (19/12)
- [x] Popular banco de dados com seed inicial (produtos, artigos, serviços)
- [x] Implementar botões de favoritos funcionais nos cards de produtos e artigos
- [x] Implementar busca funcional no header

## Funcionalidades Avançadas (19/12)
- [x] Implementar sistema de avaliações de produtos (1-5 estrelas + comentários)
- [x] Implementar carrinho de compras persistente no banco de dados
- [x] Criar dashboard de analytics para admins (vendas, produtos populares, métricas)
- [x] Corrigir nested anchor tags no ConsumerServices.tsx (linha 79-80)
- [x] Auditoria completa e correção de todos os nested anchor tags (ConsumerMarketplace.tsx e outros)

## Teste Completo da Plataforma (06/01)
- [x] Testar autenticação e perfil de usuário (login, logout, edição de perfil, upload de foto)
- [x] Testar Marketplace público (listagem de produtos, busca, favoritos, avaliações)
- [x] Testar Blog e Centro de Conhecimento (listagem, filtros, busca)
- [x] Testar Serviços e Área do Consumidor (agendamentos, pedidos, favoritos)
- [x] Testar Admin Panel (CRUD de produtos, blog, serviços, usuários, pedidos)
- [x] Validar integração do banco de dados (verificar persistência de todos os dados)

## Página de Boas-Vindas (07/01)
- [x] Adicionar campo isFirstLogin ao schema de usuários
- [x] Criar página de boas-vindas com tour da plataforma
- [x] Implementar lógica de redirecionamento após primeiro login
- [x] Testar fluxo completo de novo usuário

## Melhorias Homepage (07/01)
- [x] Modificar botão "Explorar Plataforma" para exibir dropdown com 4 áreas principais (Centro de Conhecimento, Marketplace, Área do Consumidor, Ferramentas)

## Melhorias Homepage (07/01)
- [x] Modificar botão "Explorar Plataforma" para exibir dropdown com 4 áreas principais (Centro de Conhecimento, Marketplace, Área do Consumidor, Ferramentas)

## Renomeação (07/01)
- [x] Renomear "Área do Consumidor" para "Minha Área" em traduções PT/EN
- [x] Atualizar referências nos componentes (Header, Home, etc)

## Atualização Completa de Nomenclatura (07/01)
- [x] Buscar todas as referências a "Área do Consumidor" em arquivos PT/EN
- [x] Atualizar todas as referências encontradas para "Minha Área"

## Nova Área de Consumidor (07/01) - CONCLUÍDO (21/01)
- [x] Criar tabelas de eventos e notícias no schema
- [x] Criar procedures tRPC para eventos e notícias (CRUD)
- [x] Criar página ConsumerArea.tsx com 3 seções (Blog, Eventos, Notícias)
- [x] Adicionar gestão de eventos e notícias no Admin Panel
- [x] Popular banco com dados de exemplo (seed)
- [x] Adicionar traduções PT/EN completas
- [x] Testar funcionalidades completas

## Correção de Bilinguismo 100% (21/01) - EM PROGRESSO
- [ ] Varrer todas as páginas e identificar strings hardcoded em português
- [ ] Adicionar traduções faltantes ao LanguageContext
- [ ] Corrigir Home.tsx
- [ ] Corrigir ConsumerArea.tsx
- [ ] Corrigir Admin.tsx
- [ ] Corrigir Marketplace.tsx
- [ ] Corrigir Services.tsx
- [ ] Corrigir Tools.tsx
- [ ] Corrigir Knowledge.tsx
- [ ] Corrigir Dashboard.tsx
- [ ] Corrigir Checkout.tsx
- [ ] Testar todas as páginas em PT e EN
- [ ] Salvar checkpoint

## Correção de Bilinguismo 100% PT/EN (22/01) - EM PROGRESSO
- [x] Varrer todas as páginas e identificar strings hardcoded em português
- [x] Adicionar traduções faltantes ao LanguageContext (footer.*, press, rights, email, phone, location, back_to_top)
- [x] Atualizar Footer.tsx com chaves de tradução (100% bilíngue)
- [x] Testar bilinguismo na Home e Footer (OK)
- [ ] Investigar problema de reset de idioma no ConsumerArea
- [ ] Verificar e corrigir outras páginas (Admin, Marketplace, Services, Tools)

## Correção Final de Bilinguismo (26/01) - CONCLUÍDO
- [x] Adicionar localStorage para persistir idioma entre páginas
- [x] Corrigir FAQ.tsx com 18 perguntas/respostas traduzidas
- [x] Corrigir Footer.tsx (Email, Telefone, Localização, Parceiros, Imprensa, etc.)
- [x] Corrigir Header.tsx (resultado de busca)
- [x] Corrigir ConsumerBlog.tsx (placeholder de busca)
- [x] Corrigir ProductModal.tsx (categorias)
- [x] Corrigir ProductReviews.tsx (mensagens de erro)
- [x] Adicionar 60+ traduções ao LanguageContext (FAQ, reviews, categories, footer)
- [ ] Testar bilinguismo completo em todas as páginas
- [ ] Salvar checkpoint final

## Correção de Bilinguismo - Services, Marketplace, Tools (26/01) - CONCLUÍDO
- [x] Identificar strings hardcoded em Services.tsx (30+ strings)
- [x] Identificar strings hardcoded em Tools.tsx (40+ strings)
- [x] Marketplace.tsx já estava correto
- [x] Adicionar traduções faltantes ao LanguageContext (70+ novas chaves)
- [x] Reescrever Services.tsx com chaves de tradução (100% bilingue)
- [x] Reescrever Tools.tsx com chaves de tradução (100% bilingue)
- [x] Testar bilinguismo nas três páginas (Services ✅, Tools ✅, Marketplace ✅)
- [ ] Salvar checkpoint final

## Integração Firebase Authentication (30/01) - EM PROGRESSO
- [ ] Instalar Firebase SDK no projeto
- [ ] Configurar credenciais Firebase (firebaseConfig)
- [ ] Criar hook useFirebaseAuth
- [ ] Adicionar login com Google OAuth
- [ ] Adicionar login com Email/Password
- [ ] Integrar Firebase Auth com sistema tRPC existente
- [ ] Atualizar páginas de login/registro
- [ ] Testar autenticação completa
- [ ] Salvar checkpoint

## Integração Firebase Authentication (30/01) - CONCLUÍDO
- [x] Instalar Firebase SDK no projeto (firebase 11.1.0)
- [x] Criar configuração Firebase (client/src/lib/firebase.ts)
- [x] Criar hook useFirebaseAuth (client/src/hooks/useFirebaseAuth.ts)
- [x] Criar página de Login com Firebase Auth (client/src/pages/FirebaseLogin.tsx)
- [x] Adicionar traduções PT/EN para autenticação (20+ chaves)
- [x] Adicionar rota /firebase-login no App.tsx
- [x] Testar formulário de login e cadastro (UI funcionando)
- [x] Sistema híbrido: Firebase Auth + MySQL para dados

## Sincronização Firebase → MySQL (30/01) - CONCLUÍDO
- [x] Criar tRPC procedure auth.syncFirebaseUser
- [x] Atualizar useFirebaseAuth para chamar sync após login automaticamente
- [x] Salvar uid, email, displayName, photoURL do Firebase no MySQL
- [x] Implementar lógica de create/update (verifica se usuário existe pelo UID)
- [x] Testar interface de login (UI funcionando)
- [ ] Salvar checkpoint

## Página de Perfil Unificada Firebase (02/02) - CONCLUÍDO
- [x] Criar tRPC procedure user.getProfile para buscar dados do MySQL
- [x] Criar tRPC procedure user.updateProfile para atualizar dados
- [x] Criar página FirebaseProfile.tsx com formulário de edição
- [x] Adicionar campos: nome, email, telefone, endereço, bio, idioma
- [x] Adicionar preferências de notificações (email, pedidos, promoções)
- [x] Adicionar traduções PT/EN (22 chaves)
- [x] Adicionar rota /profile no App.tsx
- [x] Proteger rota (apenas usuários autenticados)
- [ ] Salvar checkpoint

## Deploy no Vercel (02/02) - CONCLUÍDO
- [x] Criar arquivo vercel.json com configurações de build e rewrites
- [x] Criar api/index.js como entry point para serverless function
- [x] Configurar rewrites para API routes (/api/* → backend)
- [x] Criar arquivo .vercelignore
- [x] Documentar variáveis de ambiente necessárias (DATABASE_URL, Firebase)
- [x] Criar guia completo de deploy (DEPLOY_VERCEL.md)
- [ ] Salvar checkpoint

## Correção Erro Deploy Vercel (04/02)
- [ ] Corrigir vercel.json (remover seção functions inválida)
- [ ] Fazer commit e push para GitHub
- [ ] Verificar novo deploy no Vercel

## Correção Erro Invalid URL em Produção (04/02)
- [ ] Identificar código que causa erro Invalid URL
- [ ] Corrigir configuração de URL base do tRPC client
- [ ] Fazer commit e push para GitHub
- [ ] Verificar novo deploy no Vercel

## Investigação Erro Invalid URL Persistente (04/02) - CONCLUÍDO
- [x] Verificar configuração Firebase (authDomain, etc.)
- [x] Identificar problema: getLoginUrl() usa VITE_OAUTH_PORTAL_URL undefined
- [x] Corrigir getLoginUrl() para redirecionar para /firebase-login
- [x] Criar documentação VERCEL_ENV_VARS.md
- [x] Fazer push para GitHub (commit 4ca35d7)
- [ ] Aguardar deploy no Vercel e testar

## Correção Erro 404 API no Vercel (04/02)
- [ ] Verificar api/index.js
- [ ] Corrigir rewrites no vercel.json
- [ ] Ajustar build do backend
- [ ] Fazer push e testar

## 🐛 Correções de Problemas em Produção (06/02/2026)
- [x] Investigar por que Marketplace mostra "Acesso Restrito" indevidamente
- [x] Investigar por que Centro de Conhecimento não carrega conteúdo
- [x] Corrigir proteção de rotas públicas (Marketplace, Services, Tools e Knowledge agora são públicos)
- [ ] Verificar conexão com banco de dados em produção
- [x] Testar todas as páginas após correções (94/94 testes passando)
- [ ] Fazer novo deploy para Vercel e GitHub

## 🗄️ Popular Banco de Dados em Produção (06/02/2026)
- [x] Criar script de seed para produtos
- [x] Criar script de seed para artigos de blog
- [x] Criar script de seed para serviços
- [x] Executar seed em produção (4 produtos, 3 blogs, 3 serviços)
- [ ] Configurar variáveis de ambiente no Vercel (DATABASE_URL, Firebase, Cloudinary, etc)
- [ ] Fazer redeploy após configurar env vars
- [ ] Validar dados no Marketplace, Knowledge e Services
