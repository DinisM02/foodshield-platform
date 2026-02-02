# Guia de Deploy no Vercel - FOOD SHIELD

Este guia explica como fazer deploy do projeto FOOD SHIELD (frontend + backend) no Vercel.

## Pré-requisitos

1. Conta no Vercel (https://vercel.com)
2. Conta no GitHub
3. Banco de dados MySQL/TiDB acessível via internet
4. Projeto Firebase configurado

## Passo 1: Preparar Repositório GitHub

1. Crie um novo repositório no GitHub
2. Faça push do código:

```bash
cd /home/ubuntu/sustainhub-beautiful
git init
git add .
git commit -m "Initial commit - FOOD SHIELD"
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

## Passo 2: Importar Projeto no Vercel

1. Acesse https://vercel.com/new
2. Clique em "Import Git Repository"
3. Selecione seu repositório GitHub
4. Configure o projeto:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `pnpm install`

## Passo 3: Configurar Variáveis de Ambiente

No painel do Vercel, vá em **Settings** → **Environment Variables** e adicione:

### Obrigatórias:

```
DATABASE_URL=mysql://user:password@host:port/database
```

### Firebase (já configuradas no código):
```
VITE_FIREBASE_API_KEY=AIzaSyCIXuvrxnaXhgeP-GYCMrQfG3HX0oo4emw
VITE_FIREBASE_AUTH_DOMAIN=safetyfood-6a1d3.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=safetyfood-6a1d3
VITE_FIREBASE_STORAGE_BUCKET=safetyfood-6a1d3.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=545674879718
VITE_FIREBASE_APP_ID=1:545674879718:web:498ebe0e378f342f425127
VITE_FIREBASE_MEASUREMENT_ID=G-299GZKB9MW
```

### Opcionais (Manus - pode remover se não usar):
```
JWT_SECRET=seu-jwt-secret
OAUTH_SERVER_URL=https://api.manus.im
OWNER_OPEN_ID=seu-openid
OWNER_NAME=Seu Nome
```

### Branding:
```
VITE_APP_TITLE=FOOD SHIELD
VITE_APP_LOGO=/logo.png
```

## Passo 4: Deploy

1. Clique em **Deploy**
2. Aguarde o build (2-5 minutos)
3. Acesse a URL gerada (ex: `https://seu-projeto.vercel.app`)

## Passo 5: Configurar Domínio Personalizado (Opcional)

1. Vá em **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções do Vercel

## Estrutura do Projeto

```
/
├── client/          # Frontend React
│   └── dist/        # Build output (gerado)
├── server/          # Backend Express + tRPC
├── api/             # Vercel serverless functions
│   └── index.js     # Entry point
├── vercel.json      # Configuração Vercel
└── package.json     # Scripts e dependências
```

## Como Funciona

- **Frontend**: Servido estaticamente de `client/dist`
- **Backend**: Roda como Vercel Serverless Function em `/api`
- **Rewrites**: Todas as requisições `/api/*` são redirecionadas para o backend

## Troubleshooting

### Erro: "Cannot find module"
- Verifique se todas as dependências estão em `dependencies` (não `devDependencies`)
- Execute `pnpm install` localmente para testar

### Erro: "Database connection failed"
- Verifique se `DATABASE_URL` está configurada corretamente
- Certifique-se de que o banco aceita conexões externas
- Adicione IP do Vercel à whitelist do banco (se necessário)

### Erro: "Build failed"
- Verifique logs no painel do Vercel
- Execute `pnpm build` localmente para reproduzir o erro
- Certifique-se de que todas as variáveis de ambiente estão configuradas

### API não responde
- Verifique se rewrites estão configurados em `vercel.json`
- Teste endpoint diretamente: `https://seu-projeto.vercel.app/api/health`
- Verifique logs da function no painel do Vercel

## Atualizações

Para atualizar o projeto:

1. Faça commit das mudanças no GitHub:
```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

2. Vercel fará deploy automático a cada push

## Monitoramento

- **Logs**: Acesse **Deployments** → Clique no deployment → **Function Logs**
- **Analytics**: Veja métricas em **Analytics**
- **Performance**: Monitore em **Speed Insights**

## Custos

- **Hobby Plan** (gratuito):
  - 100GB bandwidth/mês
  - Serverless function execution ilimitada
  - Suficiente para projetos pequenos/médios

- **Pro Plan** ($20/mês):
  - 1TB bandwidth/mês
  - Mais recursos e suporte

## Suporte

- Documentação: https://vercel.com/docs
- Comunidade: https://github.com/vercel/vercel/discussions
- Suporte: https://vercel.com/support

---

**Nota**: Este projeto usa Firebase Authentication para login. Certifique-se de que o domínio Vercel está autorizado no Firebase Console (Authentication → Settings → Authorized domains).
