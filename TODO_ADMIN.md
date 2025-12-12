# TODO - Completar Painel de Administração

## Estado Atual (Verificado)
✅ Visão Geral - Mostrando estatísticas (37 usuários, 3 artigos, 6 produtos, 3 serviços)
✅ Usuários - Gestão completa (listar, criar, editar, deletar, busca, paginação)
✅ Blog - Gestão completa (listar, criar, editar, deletar artigos bilíngues)
✅ Marketplace - Mostrando gestão de PEDIDOS (não produtos)
✅ Serviços - Gestão completa (listar, criar, editar, deletar serviços bilíngues)
❌ Relatórios - Placeholder "Em desenvolvimento..."
❌ Configurações - Placeholder "Em desenvolvimento..."

## Problemas Identificados

### 1. Marketplace Tab está mostrando PEDIDOS ao invés de PRODUTOS
**Problema:** A aba "Marketplace" no admin está mostrando gestão de pedidos, não gestão de produtos
**Solução:** 
- Renomear aba atual "Marketplace" para "Pedidos" (Orders)
- Criar nova aba "Produtos" (Products) com gestão de produtos do marketplace
- Mover gestão de pedidos para aba dedicada

### 2. Falta aba de Gestão de Produtos
**Necessário:**
- Listar todos os produtos
- Criar novos produtos
- Editar produtos existentes
- Deletar produtos
- Busca e filtros
- Paginação
- Campos: nome, descrição, preço, categoria, imagem, estoque, sustainabilityScore

### 3. Falta aba de Gestão de Pedidos (separada)
**Necessário:**
- Mover conteúdo atual de MarketplaceTab para OrdersTab
- Adicionar filtros por status
- Adicionar busca por ID ou cliente
- Mostrar detalhes completos do pedido
- Atualizar status dos pedidos

### 4. Relatórios Tab não implementada
**Necessário:**
- Gráficos de vendas por período
- Produtos mais vendidos
- Receita total
- Pedidos por status
- Usuários novos por mês

### 5. Configurações Tab não implementada
**Necessário:**
- Configurações gerais da plataforma
- Botão "Seed Database" (popular banco com dados de teste)
- Gerenciar categorias de produtos
- Gerenciar categorias de blog

## Tarefas Prioritárias

### FASE 1: Reorganizar estrutura de abas
- [ ] Renomear aba "Marketplace" para "Pedidos"
- [ ] Criar nova aba "Produtos" 
- [ ] Atualizar navItems no Admin.tsx
- [ ] Atualizar traduções no LanguageContext

### FASE 2: Implementar gestão de Produtos
- [ ] Criar ProductsTab component
- [ ] Listar produtos com paginação
- [ ] Modal para criar produto
- [ ] Modal para editar produto
- [ ] Função deletar produto
- [ ] Busca e filtros

### FASE 3: Melhorar gestão de Pedidos
- [ ] Renomear MarketplaceTab para OrdersTab
- [ ] Adicionar busca por ID/cliente
- [ ] Melhorar visualização de detalhes
- [ ] Adicionar filtro por data
- [ ] Estatísticas de pedidos

### FASE 4: Implementar Relatórios
- [ ] Criar AnalyticsTab/ReportsTab
- [ ] Gráfico de vendas (Chart.js ou Recharts)
- [ ] Produtos mais vendidos
- [ ] Receita total e por período
- [ ] KPIs principais

### FASE 5: Implementar Configurações
- [ ] Criar SettingsTab
- [ ] Botão Seed Database
- [ ] Gerenciar categorias
- [ ] Configurações gerais

## Prioridade Imediata
1. Reorganizar abas (Marketplace → Pedidos, criar Produtos)
2. Implementar gestão completa de Produtos
3. Implementar Relatórios básicos
4. Implementar Configurações com Seed Database
