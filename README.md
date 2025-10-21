# Next Auth Products

Sistema completo de e-commerce com autenticação, gerenciamento de produtos, carrinho de compras e funcionalidades para vendedores e clientes.

## 📋 Visão Geral

Este projeto é uma aplicação full-stack de e-commerce que permite:
- **Para Clientes**: Navegar por produtos, adicionar ao carrinho, favoritar produtos e fazer pedidos
- **Para Vendedores**: Gerenciar produtos, visualizar analytics de vendas e importar produtos via CSV
- **Para Administradores**: Gerenciar usuários e sistema

A aplicação utiliza Next.js no frontend e Fastify no backend, com autenticação JWT e banco de dados PostgreSQL.

## 🏗️ Estrutura do Projeto

```
next-auth-products/
├── apps/
│   ├── backend/                 # API Backend (Fastify + Prisma)
│   │   ├── src/
│   │   │   ├── controllers/     # Controladores das rotas
│   │   │   ├── routes/          # Definição das rotas
│   │   │   ├── middlewares/     # Middlewares de autenticação
│   │   │   ├── plugins/         # Plugins do Fastify
│   │   │   ├── schemas/         # Schemas de validação
│   │   │   ├── services/        # Serviços de negócio
│   │   │   ├── types/           # Definições de tipos
│   │   │   └── utils/           # Utilitários
│   │   ├── prisma/              # Schema e migrações do banco
│   │   └── docker-compose.yml   # Configuração do PostgreSQL
│   └── web/                     # Frontend (Next.js)
│       ├── src/
│       │   ├── app/             # Páginas da aplicação
│       │   ├── components/     # Componentes React
│       │   ├── contexts/        # Contextos React
│       │   ├── hooks/           # Custom hooks
│       │   ├── schemas/         # Schemas de validação
│       │   ├── services/        # Serviços de API
│       │   └── types/           # Definições de tipos
│       └── public/              # Arquivos estáticos
└── README.md
```

## 🛠️ Tecnologias Utilizadas

### Backend
- **Fastify** - Framework web rápido e eficiente
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **bcryptjs** - Hash de senhas
- **AWS S3** - Armazenamento de arquivos
- **Zod** - Validação de schemas
- **TypeScript** - Tipagem estática

### Frontend
- **Next.js 15** - Framework React com SSR/SSG
- **React 19** - Biblioteca de interface
- **NextAuth.js** - Autenticação
- **React Query** - Gerenciamento de estado do servidor
- **React Hook Form** - Formulários
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **TypeScript** - Tipagem estática

## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- PostgreSQL
- Docker (opcional)

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd next-auth-products
```

### 2. Configuração do Backend

```bash
cd apps/backend

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env
```

Configure as variáveis no arquivo `.env`:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/next_auth_products"
JWT_SECRET="seu-jwt-secret-aqui"
AWS_ACCESS_KEY_ID="sua-access-key"
AWS_SECRET_ACCESS_KEY="sua-secret-key"
AWS_BUCKET_NAME="seu-bucket"
AWS_REGION="us-east-1"
```

```bash
# Executar migrações do banco
yarn db:migrate

# Gerar cliente Prisma
yarn db:generate

# Iniciar em modo desenvolvimento
yarn dev
```

### 3. Configuração do Frontend

```bash
cd apps/web

# Instalar dependências
yarn install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

Configure as variáveis no arquivo `.env.local`:
```env
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-nextauth-secret"
NEXT_PUBLIC_API_URL="http://localhost:3333"
```

```bash
# Iniciar em modo desenvolvimento
yarn dev
```

### 4. Usando Docker (Opcional)

Para o banco PostgreSQL:

```bash
cd apps/backend
yarn docker:up
```

## 📚 Como Usar

### Para Desenvolvedores

1. **Iniciar o projeto completo**:
   ```bash
   # Terminal 1 - Backend
   cd apps/backend
   yarn dev
   
   # Terminal 2 - Frontend  
   cd apps/web
   yarn dev
   ```

2. **Acessar a aplicação**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3333

### Para Usuários

1. **Registrar-se** como cliente ou vendedor
2. **Fazer login** na aplicação
3. **Navegar** pelos produtos disponíveis
4. **Adicionar produtos** ao carrinho
5. **Fazer pedidos** e acompanhar status

### Para Vendedores

1. **Criar conta** como vendedor
2. **Adicionar produtos** manualmente ou via CSV
3. **Visualizar analytics** de vendas
4. **Gerenciar** produtos e estoque

## 🔌 API Endpoints

### Autenticação
- `POST /auth/login` - Login de usuário

### Usuários
- `POST /users` - Criar novo usuário

### Produtos
- `GET /products/all-products-by-seller` - Listar produtos do vendedor
- `GET /products/more-sold` - Produto mais vendido
- `GET /products/count-products-by-seller` - Contar produtos do vendedor
- `GET /products/all-products-sold-by-seller` - Total de produtos vendidos
- `GET /products/all-available-for-sale` - Produtos disponíveis para venda
- `GET /products/:id` - Detalhes de um produto
- `GET /products/total-revenue-by-seller` - Faturamento total
- `POST /products` - Criar novo produto

### Carrinho
- `GET /cart` - Obter carrinho do usuário
- `POST /cart/add-item` - Adicionar item ao carrinho
- `DELETE /cart/items/:itemId` - Remover item do carrinho

### Favoritos
- `GET /favorites` - Listar favoritos do usuário
- `POST /favorites/toggle` - Adicionar/remover favorito

### Pedidos
- `POST /orders/create` - Criar novo pedido
- `GET /orders/my-orders` - Listar pedidos do usuário

### Upload
- `POST /upload/csv` - Upload de arquivo CSV para importar produtos

## 🗄️ Modelo de Dados

### Principais Entidades

- **User**: Usuários do sistema (CLIENT, SELLER, ADMIN)
- **Store**: Lojas dos vendedores
- **Product**: Produtos com preço, estoque e vendas
- **Order**: Pedidos dos clientes
- **Cart**: Carrinho de compras
- **Favorite**: Produtos favoritos
- **CSVImportJob**: Jobs de importação de CSV

### Relacionamentos

- User → Store (1:1) - Vendedor possui uma loja
- Store → Product (1:N) - Loja possui vários produtos
- User → Order (1:N) - Usuário pode ter vários pedidos
- User → Cart (1:1) - Usuário possui um carrinho
- User → Favorite (1:N) - Usuário pode favoritar produtos

## 🔐 Autenticação e Autorização

- **JWT Tokens** para autenticação
- **Roles**: CLIENT, SELLER, ADMIN
- **Middleware** de verificação em todas as rotas protegidas
- **NextAuth.js** no frontend para gerenciamento de sessão

## 📊 Funcionalidades

### Para Clientes
- ✅ Navegação por produtos
- ✅ Carrinho de compras
- ✅ Lista de favoritos
- ✅ Histórico de pedidos
- ✅ Perfil de usuário

### Para Vendedores
- ✅ Dashboard com analytics
- ✅ Gerenciamento de produtos
- ✅ Importação via CSV
- ✅ Controle de estoque
- ✅ Relatórios de vendas

### Para Administradores
- ✅ Gerenciamento de usuários
- ✅ Controle do sistema

## 🚀 Deploy

### Backend
```bash
cd apps/backend
yarn build
yarn start
```

### Frontend
```bash
cd apps/web
yarn build
yarn start
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
