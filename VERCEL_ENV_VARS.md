# Variáveis de Ambiente Necessárias no Vercel

Para o projeto funcionar corretamente em produção, você precisa configurar as seguintes variáveis de ambiente no painel do Vercel:

## Como Configurar

1. Acesse https://vercel.com/dinism02/foodshield-platform
2. Vá em **Settings** → **Environment Variables**
3. Adicione cada variável abaixo

## Variáveis Obrigatórias

### Backend (Server-side)

```
DATABASE_URL=mysql://user:password@host:port/database
```
- Sua connection string do MySQL/TiDB
- **IMPORTANTE:** Deve ser configurada como variável de ambiente no Vercel

### Frontend (Client-side - prefixo VITE_)

```
VITE_APP_TITLE=FOOD SHIELD
VITE_APP_LOGO=/logo.png
VITE_APP_ID=seu-app-id-manus
VITE_OAUTH_PORTAL_URL=https://api.manus.im
```

### Firebase (já no código, mas pode sobrescrever via env)

```
VITE_FIREBASE_API_KEY=AIzaSyCIXuvrxnaXhgeP-GYCMrQfG3HX0oo4emw
VITE_FIREBASE_AUTH_DOMAIN=safetyfood-6a1d3.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=safetyfood-6a1d3
VITE_FIREBASE_STORAGE_BUCKET=safetyfood-6a1d3.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=545674879718
VITE_FIREBASE_APP_ID=1:545674879718:web:498ebe0e378f342f425127
```

## Solução Temporária

Como o sistema de autenticação Manus OAuth não será usado em produção (você está usando Firebase), vou modificar o código para não depender dessas variáveis.

## Após Configurar

1. Salve as variáveis no Vercel
2. Faça um novo deploy (Deployments → Redeploy)
3. Teste o site novamente
