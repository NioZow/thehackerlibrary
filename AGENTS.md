# AGENTS.md: Guidelines for AI Agents

This document provides guidelines for AI agents working in this repository.

## Build, Lint, and Test Commands

-   **Dev Server:** `pnpm dev`
-   **Build:** `pnpm build`
-   **Lint:** `pnpm lint`
-   **Test:** There are currently no test commands or frameworks configured in this project. When adding new features, please include tests.

## Code Style Guidelines

-   **Formatting:** This project uses the Next.js default ESLint configuration, which includes Prettier. Run `pnpm lint` to check for formatting issues.
-   **Types:** The project uses TypeScript with `strict: true`. All new code should be strongly typed.
-   **Imports:** Use absolute imports with the `@/*` alias for modules in `src/`. For example: `import { prisma } from '@/instances/prisma';`.
-   **Naming Conventions:**
    -   Components: `PascalCase` (e.g., `MyComponent.tsx`)
    -   Files/directories: `kebab-case` or `snake_case` for general files, `PascalCase` for component files. Follow existing conventions.
    -   Variables/functions: `camelCase`
    -   Types/interfaces: `PascalCase` (e.g., `type MyType = { ... }`)
-   **Error Handling:** Use `try...catch` blocks for asynchronous operations that may fail.
-   **UI Components:** This project uses `shadcn/ui` for UI components. Please use these components when possible.
-   **Database:** The project uses Prisma for database access. All database queries should go through the Prisma client.
