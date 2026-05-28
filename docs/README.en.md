<h1 align="center">React Seed</h1>

<div align="center">
    <img src='./images/home.png' style='width: 75%'/>
</div>

<p align="center">
    An out-of-the-box React frontend template
</p>
<div align="center">
    <a href="https://github.com/guokaigdg/react-seed"><img src="https://img.shields.io/github/stars/guokaigdg/react-seed?style=flat-square" alt="Stars"></a>
    <a href="../LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License"></a>
    <a href="https://www.npmjs.com/package/react-seed"><img src="https://img.shields.io/npm/dm/react-seed.svg?style=flat-square" alt="npm downloads"></a>
    <a href="https://github.com/guokaigdg/react-seed/releases"><img src="https://img.shields.io/github/v/tag/guokaigdg/react-seed?label=version&style=flat-square" alt="Version"></a>
    <a href="https://atomgit.com/guokaigdg/react-seed"><img src="https://atomgit.com/guokaigdg/react-seed/star/badge.svg" alt="AtomGit Stars"/></a>
</div>
<br/>
<p align="center">
    <a href="../README.md">简体中文</a> | English
</p>

## 🔗 Demo

- PC: [react-seed](https://guokaigdg.github.io/react-seed/)
- Mobile: [react-template-mobile](https://github.com/guokaigdg/react-template-mobile)

## 🪅 Related Versions

- ⚡️ Vite version: [react-template-vite](https://github.com/guokaigdg/react-template-vite)
- 📱 Mobile version: [react-template-mobile](https://github.com/guokaigdg/react-template-mobile)

## ✨ Features

- 📦 Out of the box, no extra configuration required
- 📝 Key modules are well-commented for low learning cost
- 🚀 Fast startup and compilation
- 🌱 Easy to customize and extend
- 🛡️ Strict code conventions

## 🚀 Tech Stack

| Category   | Stack                                                                            | Version   |
| ---------- | -------------------------------------------------------------------------------- | --------- |
| Framework  | React + ReactDOM                                                                 | 19.x      |
| Language   | TypeScript                                                                       | 5.x       |
| Build      | Webpack (custom config)                                                          | 5.x       |
| Routing    | `react-router`                                                                   | 7.x       |
| State      | MobX + `mobx-react-lite`                                                         | 6.x / 4.x |
| Request    | axios + axios-retry                                                              | 1.x       |
| Style      | Less + CSS Modules + PostCSS                                                     | —         |
| Icon       | `@phosphor-icons/react` + custom SvgIcon                                         | —         |
| Convention | ESLint 9 (flat config) + Prettier + Stylelint + husky + lint-staged + commitlint | —         |

## ⌛️ Requirements

- Node ≥ 18.0.0 (CI pinned to 22.22.3 via volta)
- npm ≥ 7.0.0 / yarn ≥ 1.22.4 / pnpm — pick one

## 🏃 Quick Start

```bash
# 1. Install dependencies (pick one)
npm install
# or
yarn install

# 2. Start dev server
npm run start
```

## 📦 Build

```bash
npm run build:qa     # build for testing environment
npm run build:prod   # build for production
npm run deploy       # build and publish via gh-pages
npm run clean        # clean node_modules
```

## 📂 Project Structure

```
react-seed/
├── webpack/                 # Custom build configuration
│   ├── config/              # webpack common/dev/prod configs
│   └── server/              # dev server entry
├── public/
│   ├── favicon.ico
│   └── index.html           # HTML entry template
├── src/
│   ├── index.tsx            # App mount entry
│   ├── App.tsx              # Root component + useRoutes
│   ├── router/              # Centralized routes (React.lazy + SuspenseLazy)
│   ├── api/                 # API layer (axios wrapper, grouped by page)
│   ├── store/               # MobX stores
│   ├── components/          # Common components (barrel exports)
│   ├── view/                # Page-level components
│   ├── constants/           # Constants / enums
│   ├── interface/           # Business type definitions
│   ├── types/               # Global .d.ts
│   ├── utils/               # Utilities + custom hooks
│   ├── assets/              # Static assets (incl. svg sprite)
│   └── styles/index.less    # Global styles
├── docs/                    # Design materials, UI references, English README
├── eslint.config.mjs        # ESLint 9 flat config
├── tsconfig.json            # TS config (with path alias)
├── AGENTS.md                # Project guide for AI coding assistants
└── package.json
```

## 🛠 Development Guide

### Path Alias

Defined in both `tsconfig.json` and Webpack config — **prefer alias over relative paths**:

```ts
import {Button} from '@/components';
import {useStores} from '@/store';
```

### Add a Page

1. Create `index.tsx` + `index.less` under `src/view/XxxPage/`
2. Register a lazy-loaded route via `SuspenseLazy` in `src/router/index.tsx`
3. Edit `src/view/Tab/index.tsx` if a top-nav entry is needed

### Add an API

1. Create `index.ts` and `types/<page-name>.ts` under `src/api/<page-name>/`
2. Import the wrapped `request` from `../request`, call `request<ResponseT>({url, method, data})`
3. Keep request/response types co-located in the same `types/`

### State Management (MobX)

- Call `makeAutoObservable(this)` in store constructors; wrap async assignments with `runInAction(...)`
- Register new stores in `stores` of `src/store/index.ts`
- Components reading observables **must** be wrapped with `observer`

> For more conventions and AI collaboration notes, see [AGENTS.md](../AGENTS.md).

## 📝 Commit Convention

Commit messages follow commitlint:

```bash
git commit -m "<type>: <emoji> <subject>"
# example
git commit -m "feat: ✨ Add order query page"
```

Common types:

| type     | emoji | description                           |
| -------- | ----- | ------------------------------------- |
| feat     | ✨    | New feature                           |
| fix      | 🐛    | Bug fix                               |
| docs     | 📝    | Documentation changes                 |
| style    | 💄    | Style adjustments (no logic impact)   |
| refactor | 🔨    | Refactor (no new feature, no bug fix) |
| perf     | ⚡    | Performance optimization              |
| build    | 📦    | Build system or dependency changes    |
| config   | 🔧    | Configuration changes                 |
| chore    | 🔥    | Miscellaneous                         |
| release  | 🔖    | Release a version                     |

## 🏷 Branches

| Branch | Description        |
| ------ | ------------------ |
| main   | Main branch        |
| dev    | Development branch |
| deploy | Demo deploy branch |

## 📚 References

- Project tutorial: [Building a React Project Development Template from 0 to 1](https://juejin.cn/post/7223267430231326778)
- Development reference: [docs/data.md](./data.md)

## 🤝 Contributing

- 📬 Feel free to open Issues
- 🧙‍♀️ Pull Requests are welcome — [see how to contribute](https://n7j2qc9z43.feishu.cn/docx/HAu9d1PCuo12Cvxrlelc0eEWnNc?from=from_copylink)

## 💡 License

The code and documentation of this project are released under the [MIT License](../LICENSE).
