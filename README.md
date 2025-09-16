```md
# React + Vite

[![Tests](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/tests.yml/badge.svg)](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/tests.yml)
[![SonarQube](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/sonar.yml/badge.svg)](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/sonar.yml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Oksana-QA-auto_qa-auto-engineer-javascript-project-89&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Oksana-QA-auto_qa-auto-engineer-javascript-project-89)
[![hexlet-check](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Oksana-QA-auto/qa-auto-engineer-javascript-project-89/actions/workflows/hexlet-check.yml)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Chat Widget (тесты + демо)

Проект с виджетом чата и автотестами (Vitest + Testing Library).  
Цель — показать структуру тестов, Page Object-подход и работу с фикстурами.

## Что внутри

- **Стек:** Vite, React, Vitest, @testing-library/*, ESLint.
- **Page Object:** `__tests__/pages/ChatWidgetPage.js` — сценарные операции с чатом.
- **Утилиты для тестов:** `__tests__/helpers/test-utils.js` (deepClone, assertArray, `toRegex()`).
- **Фикстуры шагов:** `__tests__/__fixtures__/basic-steps.js`.
- **Переключение демо/фикстур:** в `src/steps.js` через переменную `VITE_USE_FIXTURE`.

### Требования
- Node.js 20+
- npm 9+

### Установка
```bash
npm ci

Локальная разработка:

npm run dev

Сборка и предпросмотр:

npm run build

npm run preview

Тесты:

npm test

npm test -- --run

npm test -- --coverage

Линтер:

npm run lint

---
