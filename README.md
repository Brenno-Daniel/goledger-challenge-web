# 🚀 GoLedger Challenge Web

> Front-end do desafio GoLedger - Uma aplicação moderna e escalável

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.2.2-06B6D4?style=flat-square&logo=tailwind-css)
![ESLint](https://img.shields.io/badge/ESLint-9.39.4-4B32C3?style=flat-square&logo=eslint)
![Prettier](https://img.shields.io/badge/Prettier-3.8.1-F7B93E?style=flat-square&logo=prettier)

## 📋 Descrição

Este projeto é a interface web do desafio GoLedger, desenvolvido com as tecnologias mais modernas do ecossistema JavaScript/TypeScript. O objetivo é criar uma aplicação front-end robusta, performática e de fácil manutenção.

## 🛠️ Tecnologias & Stack

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Next.js** | 16.2.1 | Framework React com SSR/SSG |
| **React** | 19.2.4 | Biblioteca para construção de interfaces |
| **TypeScript** | 6.0.2 | Superset tipado de JavaScript |
| **Tailwind CSS** | 4.2.2 | Framework CSS utilitário |
| **ESLint** | 9.39.4 | Linter para código JavaScript/TypeScript |
| **Prettier** | 3.8.1 | Formatador de código |
| **Axios** | 1.14.0 | Cliente HTTP para requisições |

## 📁 Estrutura do Projeto

```
src/
├── app/              # Pages e rotas do Next.js App Router
├── components/       # Componentes React reutilizáveis
├── lib/              # Utilitários e configurações
├── services/         # Chamadas de API
└── types/            # Definições de tipos TypeScript
```

## 🚀 Como Executar

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Build de produção
pnpm build

# Verificar lint
pnpm lint

# Formatar código
pnpm format
```

## 📦 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera build de produção |
| `pnpm start` | Inicia o servidor de produção |
| `pnpm lint` | Executa verificação de código |
| `pnpm format` | Formata todo o código com Prettier |
| `pnpm format:check` | Verifica se o código está formatado |

## 🔧 Configurações de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_USER=admin
NEXT_PUBLIC_API_PASS=admin123
```

## 📄 Licença

Este projeto é privado e faz parte do desafio GoLedger.

---

Desenvolvido com 💜 e muito ☕
