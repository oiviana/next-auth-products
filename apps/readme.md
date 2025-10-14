# 🧠 Database Schema – Next auth Products

Este documento descreve o modelo de dados utilizado pelo backend, implementado com **Prisma ORM** e **PostgreSQL**.  
O sistema foi projetado para suportar múltiplos vendedores, cada um com sua própria loja, produtos, pedidos e clientes.

---

## 📘 Visão Geral

O banco de dados modela um **ecossistema de e-commerce multi-seller**, onde:
- Usuários podem ser **clientes**, **vendedores** ou **administradores**.
- Cada vendedor possui uma **loja (`Store`)**.
- Produtos pertencem a uma loja e podem aparecer em **pedidos**, **carrinhos** e **favoritos**.
- Há suporte para **importação de produtos via CSV**.

---

## 👤 User

Representa qualquer usuário da plataforma.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | `String` | Identificador único (UUID) |
| `email` | `String` | Email único |
| `passwordHash` | `String` | Senha criptografada |
| `role` | `Role` | Pode ser `CLIENT`, `SELLER` ou `ADMIN` |
| `isActive` | `Boolean` | Indica se o usuário está ativo |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **1:1** com `Store` (se for `SELLER`)
- **1:N** com `Product` (produtos vendidos)
- **1:N** com `Order` (pedidos realizados)
- **1:N** com `Favorite` (produtos favoritados)
- **1:1** com `Cart` (carrinho ativo)
- **1:N** com `CSVImportJob` (importações de produtos)

### Regras de Negócio
- Apenas `SELLER` pode ter uma `Store`.
- Apenas `CLIENT` pode ter `Cart` e `Favorites`.

---

## 🏪 Store

Representa a loja de um vendedor.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | `String` | Identificador único |
| `ownerId` | `String` | ID do dono (`User`) |
| `name` | `String` | Nome da loja |
| `isActive` | `Boolean` | Se `false`, a loja fica invisível |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **1:1** com `User` (dono)
- **1:N** com `Product` (produtos da loja)

### Regras de Negócio
- Se `isActive = false`, os produtos da loja ficam ocultos.
- Quando o vendedor é removido, a loja é excluída (cascade).

---

## 🛍️ Product

Produto disponível em uma loja.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | `String` | Identificador único |
| `storeId` | `String` | Loja proprietária |
| `sellerId` | `String?` | Vendedor (redundância para performance) |
| `name` | `String` | Nome do produto |
| `description` | `String?` | Descrição opcional |
| `price` | `Float` | Preço |
| `imageUrl` | `String?` | Imagem principal |
| `isVisible` | `Boolean` | Se está público |
| `stock` | `Int` | Quantidade disponível |
| `soldCount` | `Int` | Quantidade vendida |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **N:1** com `Store`
- **N:1** com `User` (vendedor)
- **1:N** com `OrderItem` (pedidos)
- **1:N** com `Favorite` (favoritos)
- **1:N** com `CartItem` (carrinho)

### Regras de Negócio
- Um produto pertence a apenas **uma loja**.
- Se a loja for desativada, todos os produtos ficam invisíveis.
- `stock` nunca pode ser negativo.
- `soldCount` é incrementado após pedidos confirmados.

---

## 🧾 Order

Representa um pedido feito por um cliente.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | `String` | Identificador único |
| `userId` | `String` | Cliente que fez o pedido |
| `total` | `Float` | Valor total do pedido |
| `status` | `OrderStatus` | `PENDING`, `COMPLETED`, `CANCELLED` |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **N:1** com `User` (cliente)
- **1:N** com `OrderItem` (itens do pedido)

### Regras de Negócio
- Apenas `CLIENT` pode criar pedidos.
- O total é calculado a partir dos `OrderItem`s.
- Se cancelado, o estoque dos produtos deve ser restaurado.

---

## 📦 OrderItem

Item de um pedido.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `id` | `String` | Identificador único |
| `orderId` | `String` | Pedido |
| `productId` | `String` | Produto comprado |
| `quantity` | `Int` | Quantidade |
| `unitPrice` | `Float` | Preço do item na data da compra |

### Relações
- **N:1** com `Order`
- **N:1** com `Product`

### Regras de Negócio
- `unitPrice` armazena o preço histórico.
- Soma (`quantity * unitPrice`) = valor total do pedido.

---

## ❤️ Favorite

Produto favoritado por um cliente.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `userId` | `String` | Cliente |
| `productId` | `String` | Produto favoritado |
| `createdAt` | `DateTime` | Data do favoritamento |

### Relações
- **N:1** com `User`
- **N:1** com `Product`

### Regras de Negócio
- Um mesmo produto só pode ser favoritado uma vez por usuário (`@@unique`).
- Se o produto for excluído, o favorito também é removido.

---

## 🛒 Cart

Carrinho de compras do cliente.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `userId` | `String` | Usuário dono do carrinho |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **1:1** com `User`
- **1:N** com `CartItem`

### Regras de Negócio
- Cada cliente possui apenas **um carrinho ativo**.
- O carrinho é limpo após o checkout.

---

## 🧱 CartItem

Produto adicionado ao carrinho.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `cartId` | `String` | Carrinho |
| `productId` | `String` | Produto |
| `quantity` | `Int` | Quantidade adicionada |
| `addedAt` | `DateTime` | Data de inclusão |

### Relações
- **N:1** com `Cart`
- **N:1** com `Product`

### Regras de Negócio
- Se `quantity = 0`, o item é removido.
- É necessário verificar estoque antes de finalizar o pedido.

---

## 📥 CSVImportJob

Controle de importação de produtos via planilha CSV.

| Campo | Tipo | Descrição |
|-------|------|------------|
| `userId` | `String` | Vendedor que iniciou a importação |
| `storeId` | `String?` | Loja alvo |
| `fileUrl` | `String` | Local do arquivo (S3, Supabase etc.) |
| `status` | `ImportStatus` | `PENDING`, `PROCESSING`, `DONE`, `FAILED` |
| `progress` | `Int` | Progresso (0–100%) |
| `totalRows`, `processedRows` | `Int?` | Contagem de linhas |
| `errorFileUrl` | `String?` | URL de log de erros |
| `createdAt`, `updatedAt` | `DateTime` | Auditoria |

### Relações
- **N:1** com `User` (vendedor)

### Regras de Negócio
- Apenas `SELLER` pode criar uma importação.
- Quando `status = DONE`, os produtos são adicionados à loja.

---

## ⚙️ Mapa de Relações

| Entidade | Tipo | Com | Tipo de relação |
|-----------|------|-----|----------------|
| User | 1:1 | Store | Loja do vendedor |
| User | 1:N | Product | Produtos vendidos |
| User | 1:N | Order | Pedidos realizados |
| User | 1:N | Favorite | Favoritos |
| User | 1:1 | Cart | Carrinho |
| Store | 1:N | Product | Produtos da loja |
| Product | N:1 | Store | Loja proprietária |
| Product | N:1 | User | Vendedor |
| Product | 1:N | OrderItem | Itens de pedidos |
| Product | 1:N | Favorite | Favoritados |
| Product | 1:N | CartItem | Itens em carrinhos |
| Order | 1:N | OrderItem | Itens do pedido |
| Cart | 1:N | CartItem | Produtos no carrinho |

---

## 🧭 Diagrama ERD (Mermaid)

```mermaid
erDiagram
  User ||--o{ Store : "own"
  User ||--o{ Product : "sells"
  User ||--o{ Order : "places"
  User ||--o{ Favorite : "has"
  User ||--|| Cart : "owns"
  User ||--o{ CSVImportJob : "imports"

  Store ||--o{ Product : "contains"

  Product ||--o{ OrderItem : "in"
  Product ||--o{ Favorite : "liked"
  Product ||--o{ CartItem : "added"

  Order ||--o{ OrderItem : "contains"
  Cart ||--o{ CartItem : "contains"
