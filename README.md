# 🎬 LedgerStream

> Plataforma web para gerenciamento de séries de TV, temporadas, episódios e watchlists - GoLedger Challenge

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.2-06B6D4?style=flat-square&logo=tailwind-css)
![Motion](https://img.shields.io/badge/Motion-12.38.0-000000?style=flat-square)

## 📋 Descrição

**LedgerStream** é uma aplicação front-end moderna para gerenciamento de conteúdo de séries de TV. Permite organizar séries em temporadas e episódios, além de criar watchlists personalizadas para acompanhar o que assistir.

Desenvolvido como parte do desafio GoLedger, o projeto demonstra boas práticas de arquitetura, tipagem rigorosa com TypeScript, e uma experiência de usuário fluida com animações suaves.

### 🤖 Desenvolvimento Assistido por IA

Este projeto foi desenvolvido com assistência da IA **OpenCode** (anomaly.co), uma ferramenta de IA supervisionada que auxilia no desenvolvimento de software. A IA colaborou na implementação de funcionalidades, resolução de bugs, refatoração de código, criação de testes unitários e documentação.

## ✨ Funcionalidades

### Séries (TV Shows)

- Listagem de todas as séries cadastradas
- Criação de novas séries com título, descrição e faixa etária recomendada
- Edição de informações existentes
- Exclusão de séries (com confirmação)
- Navegação para detalhes da série

### Temporadas

- Listagem de temporadas por série
- Criação de temporadas com número e ano
- Navegação para listagem de episódios

### Episódios

- Listagem de episódios por temporada
- Criação de episódios com número, título, descrição, nota e data de lançamento
- Formatação automática de datas (RFC3339)
- Exibição de nota com estrelas

### Watchlists

- Criação de listas personalizadas
- Adição/remoção de séries às watchlists
- Busca por séries para adicionar
- Visualização detalhada com séries vinculadas
- Edição da lista de séries vinculadas

### Experiência do Usuário

- Design responsivo (mobile-first)
- Animações suaves com Motion
- Feedback visual com toasts
- Estados de loading com skeletons
- Modais de confirmação para ações destrutivas

## 🛠️ Tecnologias & Stack

| Tecnologia          | Versão  | Descrição                                |
| ------------------- | ------- | ---------------------------------------- |
| **Next.js**         | 16.2.1  | Framework React com App Router           |
| **React**           | 19.2.4  | Biblioteca para construção de interfaces |
| **TypeScript**      | 6.0.2   | Superset tipado de JavaScript            |
| **Tailwind CSS**    | 4.2.2   | Framework CSS utilitário                 |
| **Motion**          | 12.38.0 | Biblioteca de animações                  |
| **React Hook Form** | 7.72.1  | Gerenciamento de formulários             |
| **Zod**             | 4.3.6   | Validação de esquemas                    |
| **Axios**           | 1.14.0  | Cliente HTTP                             |
| **Lucide React**    | 1.7.0   | Ícones                                   |
| **ESLint**          | 9.39.4  | Linting de código                        |
| **Prettier**        | 3.8.1   | Formatação de código                     |
| **Vitest**          | 4.1.2   | Framework de testes unitários            |
| **Testing Library** | 16.3.2  | Testes de componentes React              |

## 📁 Estrutura do Projeto

```
src/
├── app/           # Pages e rotas (Next.js App Router)
├── components/    # Componentes React
│   ├── ui/       # Componentes base (Button, Input, Modal, etc.)
│   ├── forms/    # Formulários de criação/edição
│   └── layout/  # Layouts (Header)
├── hooks/        # Custom hooks
├── schemas/      # Schemas de validação Zod
├── services/     # Comunicação com API
├── types/        # Definições TypeScript
└── utils/       # Funções utilitárias
```

## 🚀 Como Executar

```bash
# Clonar o repositório
git clone <repository-url>
cd goledger-challenge-web

# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Iniciar produção
pnpm start
```

## 📦 Scripts Disponíveis

| Script              | Descrição                                             |
| ------------------- | ----------------------------------------------------- |
| `pnpm dev`          | Inicia o servidor de desenvolvimento                  |
| `pnpm build`        | Gera build de produção                                |
| `pnpm start`        | Inicia o servidor de produção                         |
| `pnpm lint`         | Executa verificação de código (0 warnings permitidos) |
| `pnpm format`       | Formata todo o código com Prettier                    |
| `pnpm format:check` | Verifica formatação do código                         |
| `pnpm test`         | Executa todos os testes                               |
| `pnpm test:watch`   | Executa testes em modo watch                          |

## 🔌 API Integration

A aplicação se comunica com o backend GoLedger via REST API. A configuração de URL base e autenticação está definida em `src/services/assetService.ts`.

### Estrutura de Dados

Todos os recursos seguem o padrão de assets com metadados:

```typescript
interface BaseAsset {
  '@assetType': string;
  '@key': string;
}
```

### Endpoints Genéricos

O serviço `assetService` fornece métodos genéricos para CRUD:

| Método                                 | Descrição             |
| -------------------------------------- | --------------------- |
| `search<T>(params)`                    | Lista/Filtra assets   |
| `getByKey<T>(assetType, key)`          | Busca asset por chave |
| `createAsset<T>(assetType, data)`      | Cria novo asset       |
| `updateAsset<T>(assetType, key, data)` | Atualiza asset        |
| `deleteAsset(assetType, key)`          | Remove asset          |

### Serviços de Domínio

Cada domínio possui seu próprio serviço:

```typescript
// TV Shows
getTVShows() → TVShow[]
getTVShowByKey(key) → TVShow | null
createTVShow(data) → TVShow
updateTVShow(key, data) → TVShow
deleteTVShow(key) → void

// Seasons
getSeasonsByTVShow(tvShowKey) → Season[]
getSeasonByKey(key) → Season | null
createSeason(data) → Season
updateSeason(key, data) → Season
deleteSeason(key) → void

// Episodes
getEpisodesBySeason(seasonKey) → Episode[]
getEpisodeByKey(key) → Episode | null
createEpisode(data) → Episode
updateEpisode(key, data) → Episode
deleteEpisode(key) → void

// Watchlists
getWatchlists() → Watchlist[]
getWatchlistByKey(key) → Watchlist | null
createWatchlist(data) → Watchlist
updateWatchlist(key, data) → Watchlist
deleteWatchlist(key) → void
```

### Estrutura dos Tipos

```typescript
interface TVShow extends BaseAsset {
  title: string;
  description: string;
  recommendedAge: number;
}

interface Season extends BaseAsset {
  number: number;
  year?: number;
  tvShow: { '@key': string };
}

interface Episode extends BaseAsset {
  episodeNumber: number;
  title: string;
  description: string;
  rating: number;
  releaseDate: string; // RFC3339 format
  season: { '@key': string };
}

interface Watchlist extends BaseAsset {
  title: string;
  description: string;
  tvShows: Array<{ '@assetType': string; '@key': string }>;
}
```

## 🏗️ Arquitetura & Padrões

### Client-Server Separation

- **Server Components**: Páginas que fetchan dados iniciais
- **Client Components**: Componentes interativos com estado

```typescript
// Server Component
export default async function SeriesPage({ params }: PageProps) {
  const show = await getTVShowByKey(id);
  return <SeriesDetailClient show={show} />;
}

// Client Component
'use client';
export function SeriesDetailClient({ show }: Props) {
  const [seasons, setSeasons] = useState([]);
  // lógica interativa...
}
```

### Repository Pattern

Serviços encapsulam a lógica de acesso à API:

```typescript
export async function getTVShows(): Promise<TVShow[]> {
  return assetService.search<TVShow>({ assetType: 'tvShows' });
}
```

### Form Validation

Validação com Zod + React Hook Form:

```typescript
export const tvShowSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().optional(),
  recommendedAge: z.coerce.number().min(0).max(18),
});
```

### Custom Hooks

Lógica reutilizável extraída para hooks:

```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  // implementação...
}
```

## 🎨 Design System

### Cores

```css
--brand-bg: #03171d; /* Fundo principal */
--brand-primary: #00fff9; /* Cor primária (ciano) */
```

### Componentes UI

- **Button**: Variants (primary, secondary, icon)
- **Input**: Com label e tratamento de erros
- **Modal**: Modais genéricos com overlay
- **AssetModal**: Modal específico para CRUD de assets
- **DeleteConfirmationModal**: Confirmação de exclusão
- **Badge**: Ratings etários
- **ActionButtons**: Botões de edit/delete
- **SearchBar**: Campo de busca com ícone
- **Toast**: Notificações

### Animações

Utilizando **Motion** para micro-interações:

| Elemento                | Animação                  |
| ----------------------- | ------------------------- |
| Cards (TVShow, Episode) | Zoom 1.02x no hover       |
| WatchlistCard           | Float -4px no hover       |
| Button                  | Float -2px no hover       |
| SeasonCard              | Slide +4px no hover       |
| Back buttons            | Slide -4px no hover       |
| Search icon             | Transição de cor no focus |

## 🧪 Testes

```bash
# Executar todos os testes
pnpm test

# Modo watch
pnpm test:watch
```

### Cobertura de Testes

- Componentes: TVShowCard, SeasonCard, EpisodeCard, WatchlistCard
- Páginas: Home, Watchlist
- Schemas de validação

## 📝 Convenções

### Commits

Seguimos Conventional Commits:

```
feat: add new feature
fix: fix bug
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: adding tests
chore: maintenance tasks
```

### Estrutura de Commits

```bash
feat: add watchlist feature with full CRUD
fix: resolve modal scroll issue
style: adjust button animations
```

---

Desenvolvido com 💜 para o Desafio GoLedger
