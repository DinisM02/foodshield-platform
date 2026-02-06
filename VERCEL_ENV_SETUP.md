# 🔧 Configuração de Variáveis de Ambiente no Vercel

## ⚠️ PROBLEMA ATUAL
O Marketplace e outras páginas estão retornando **erro 500** porque as variáveis de ambiente não estão configuradas no Vercel.

## 📋 VARIÁVEIS OBRIGATÓRIAS

Acesse: **https://vercel.com/dashboard** → Seu Projeto → **Settings** → **Environment Variables**

### 1. Banco de Dados (DATABASE_URL)
```
DATABASE_URL=mysql://usuario:senha@host:porta/database?ssl={"rejectUnauthorized":true}
```
- Obtenha essa URL do seu provedor de banco MySQL/TiDB
- **CRÍTICO**: Sem isso, nenhuma página que busca dados do banco funcionará

### 2. Firebase Authentication
```
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```
- Obtenha no Firebase Console → Project Settings → General → Your apps

### 3. Cloudinary (Upload de Imagens)
```
CLOUDINARY_CLOUD_NAME=dmffchxaz
CLOUDINARY_API_KEY=793939789319797
CLOUDINARY_API_SECRET=Bw4Nwi_hj75SXyHaYqW9QRRpY7I
```
- Já configurado localmente, copie os mesmos valores para o Vercel

### 4. JWT Secret
```
JWT_SECRET=qualquer_string_aleatoria_segura_aqui
```
- Gere uma string aleatória longa (ex: `openssl rand -base64 32`)

### 5. App Config
```
VITE_APP_TITLE=FOOD SHIELD
VITE_APP_LOGO=https://seu-logo-url.com/logo.png
```

## 🚀 PASSO A PASSO

1. **Acesse Vercel Dashboard**
   - https://vercel.com/dashboard
   - Selecione o projeto `foodshield-platformv2`

2. **Vá para Settings → Environment Variables**
   - Clique em "Add New"
   - Cole o nome da variável (ex: `DATABASE_URL`)
   - Cole o valor
   - Selecione: **Production**, **Preview**, **Development** (todas)
   - Clique em "Save"

3. **Repita para TODAS as variáveis acima**

4. **Faça REDEPLOY**
   - Vá para "Deployments"
   - Clique nos 3 pontos do último deploy
   - Clique em "Redeploy"
   - ✅ Aguarde o deploy completar

## ✅ VERIFICAÇÃO

Após configurar e fazer redeploy, teste:
- https://foodshield-platformv2.vercel.app/marketplace (deve mostrar produtos)
- https://foodshield-platformv2.vercel.app/knowledge (deve mostrar artigos)
- https://foodshield-platformv2.vercel.app/services (deve mostrar serviços)

## 📞 SUPORTE

Se ainda houver erros após configurar tudo:
1. Verifique os logs no Vercel Dashboard → Deployments → View Function Logs
2. Confirme que DATABASE_URL está correta testando conexão localmente
3. Verifique se o banco de dados permite conexões externas
