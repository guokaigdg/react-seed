# AGENTS.md

> 本文档面向 AI 编码助手（Claude / Cursor / Comate / Copilot 等），用于在最短时间内建立对本仓库的准确认知，并在生成 / 修改代码时遵守一致的工程约定。人类读者请优先阅读 [`README.md`](./README.md) 与 [`docs/README.en.md`](./docs/README.en.md)。

---

## 目录

1. [项目概览](#1-项目概览)
2. [技术栈](#2-技术栈)
3. [目录结构](#3-目录结构)
4. [路径别名](#4-路径别名)
5. [脚本与环境变量](#5-脚本与环境变量)
6. [运行与构建](#6-运行与构建)
7. [开发约定（必读）](#7-开发约定必读)
8. [代码规范与提交规范](#8-代码规范与提交规范)
9. [AI 修改代码须知](#9-ai-修改代码须知)
10. [常见任务剧本（Cookbook）](#10-常见任务剧本cookbook)
11. [外部参考](#11-外部参考)

---

## 1. 项目概览

`react-seed` 是一套**企业级 React SPA 前端模板**，目标是为新业务直接复用其工程化基建（Webpack / TS / 路由 / 状态 / 请求 / 规范）。

- 类型：单页应用（SPA），构建产物为静态文件，可通过 `gh-pages` 一键发布
- 入口：`src/index.tsx` → `src/App.tsx` → `src/router/index.tsx`
- 在线 Demo：<https://guokaigdg.github.io/react-seed/>
- 姊妹分支：[Vite 版](https://github.com/guokaigdg/react-template-vite) ｜ [移动端版](https://github.com/guokaigdg/react-template-mobile)

> 本仓库**不是**业务项目；新增内容时优先思考是否对模板"通用"。

## 2. 技术栈

| 分类 | 选型 | 版本 / 备注 |
| --- | --- | --- |
| 框架 | React + ReactDOM | **19.x**（注意 React 19 行为差异，例如 ref 不再需要 `forwardRef` 包裹函数组件） |
| 语言 | TypeScript | **5.x**，`strict: true`，并启用 `noUnusedLocals` / `noUnusedParameters` |
| 构建 | Webpack 5（自定义，**非 CRA / 非 Vite**） | 配置位于 `webpack/config/{common,dev,prod}.js` |
| 开发服务 | `webpack-dev-server` + 自研启动脚本 | `webpack/server/index.js` |
| 路由 | `react-router` | **v7**，从 `react-router` 导入（**不是** `react-router-dom`） |
| 状态管理 | MobX + `mobx-react-lite` | mobx 6 / lite 4，`enforceActions: 'always'` |
| 网络请求 | axios + `axios-retry` | 全局封装见 `src/api/request.ts` |
| 样式 | Less + CSS Modules + PostCSS（autoprefixer / preset-env / normalize / flexbugs） | 全局样式：`src/styles/index.less` |
| 图标 | `@phosphor-icons/react` + 自研 `<SvgIcon>`（svg-sprite-loader） | svg 资源：`src/assets/icons/svg/` |
| 代码质量 | ESLint 9（flat config）+ Prettier + Stylelint + husky + lint-staged + commitlint | 配置：`eslint.config.mjs` |
| 环境变量 | `env-cmd` + `.env.json` | 三套环境：`development` / `qa` / `production` |
| Node | ≥ 18.0.0；npm ≥ 7；volta 固定 22.22.3 | 见 `package.json#engines` / `volta` |

## 3. 目录结构

```
react-seed/
├── webpack/                    # 自定义构建配置（与脚本入口）
│   ├── config/
│   │   ├── webpack.common.js   # 通用配置（loader / alias / plugin）
│   │   ├── webpack.dev.js      # 开发配置
│   │   └── webpack.prod.js     # 生产配置（含压缩、分包、bundle analyzer）
│   ├── server/index.js         # dev server 启动入口（端口探测、proxy）
│   ├── build.sh                # 构建脚本
│   ├── conf.js / env.js / paths.js / setProxy.js
├── public/
│   ├── index.html              # HTML 模板（%PUBLIC_URL% 占位）
│   └── favicon.ico
├── src/
│   ├── index.tsx               # ReactDOM.createRoot 挂载
│   ├── App.tsx                 # 根组件，BrowserRouter + useRoutes
│   ├── router/
│   │   ├── index.tsx           # 集中式路由表（React.lazy + SuspenseLazy）
│   │   └── README.md
│   ├── api/
│   │   ├── request.ts          # axios 实例 + 拦截器 + 重试封装
│   │   ├── home-two/           # 按页面拆分接口目录
│   │   │   ├── index.ts
│   │   │   └── types/home-two.ts
│   │   ├── home-order/
│   │   └── README.md
│   ├── store/                  # MobX
│   │   ├── index.ts            # configure + stores 聚合 + Context + useStores
│   │   ├── global/index.ts
│   │   └── about/index.ts
│   ├── components/             # 通用组件（每个组件一个目录 + barrel 导出）
│   │   ├── Button/             # 含 buttonHelpers.tsx
│   │   ├── Card/
│   │   ├── SuspenseLazy/       # 懒加载高阶
│   │   ├── SvgIcon/            # 含 README，约定 svg 用法
│   │   └── index.ts            # 统一 export
│   ├── view/                   # 页面级组件
│   │   ├── Home/               # 含 7 个子页面（One/Two/Three/Four/Mobx/Icon/Order）
│   │   ├── Dashboard/
│   │   ├── About/              # 演示 index.module.less（CSS Modules）
│   │   ├── Tab/                # 顶部导航
│   │   └── NotFound/
│   ├── constants/              # 常量与枚举（enum.ts）
│   ├── interface/              # 业务 TS 类型说明（含 index.md）
│   ├── types/                  # 全局 .d.ts：api / file / style
│   ├── utils/
│   │   ├── useHook/useRequest.ts   # 自研 hook：请求 + loading + 错误
│   │   ├── validate.ts
│   │   └── variable.ts
│   ├── assets/                 # 图片、svg 雪碧图（icons/svg/* + icons/index.ts）
│   └── styles/index.less       # 全局样式入口
├── docs/                       # 设计文档（含 ui.md / data.md / README.en.md）
├── .env.json                   # 三套环境变量（dev/qa/prod）
├── eslint.config.mjs           # ESLint 9 flat config
├── tsconfig.json               # path alias + 严格模式
├── package.json
└── README.md
```

## 4. 路径别名

`tsconfig.json` 与 webpack alias **必须保持同步**。优先使用别名，避免 `../../../` 长相对路径：

| 别名           | 实际路径           |
| -------------- | ------------------ |
| `@/*`          | `src/*`            |
| `Components/*` | `src/components/*` |
| `Utils/*`      | `src/utils/*`      |

```ts
import {Button, SvgIcon} from '@/components';
import {useStores} from '@/store';
import routes from '@/router';
import request from '@/api/request';
```

## 5. 脚本与环境变量

### 5.1 npm scripts（`package.json`）

| 命令                    | 行为                                                           |
| ----------------------- | -------------------------------------------------------------- |
| `npm run dev` / `start` | 启动 dev server（`env-cmd -e development` + `webpack/server`） |
| `npm run build:qa`      | QA 环境打包（`webpack.prod.js` + `-e qa`）                     |
| `npm run build:prod`    | 生产环境打包                                                   |
| `npm run deploy`        | `build:prod` + `gh-pages -d build`，发布到 GitHub Pages        |
| `npm run clean`         | 删除 `node_modules`                                            |

> 项目**没有**测试脚本（无 Jest / Vitest）。**不要**假定 `npm test` 存在。

### 5.2 环境变量（`.env.json`）

每个环境提供 4 个变量，由 `env-cmd` 注入到 `process.env`：

| 变量            | 含义                              | 默认           |
| --------------- | --------------------------------- | -------------- |
| `USER_BASE_URL` | 接口 baseURL（会注入到 axios）    | `/`            |
| `USER_BASENAME` | `react-router` basename           | `/react-seed`  |
| `PUBLIC_PATH`   | webpack `output.publicPath`       | `/react-seed/` |
| `ENV`           | 当前环境标识（`dev`/`qa`/`prod`） | —              |

新增字段需同时在 `development` / `qa` / `production` 三处补齐。

## 6. 运行与构建

```bash
npm install            # Node ≥ 18，建议使用 volta 锁定版本
npm run dev            # 启动开发服务（默认占用空闲端口）
npm run build:prod     # 产物输出至 build/
npm run deploy         # 一键发布到 gh-pages 分支
```

## 7. 开发约定（必读）

### 7.1 路由

- 集中式路由表：`src/router/index.tsx`，使用 `useRoutes(routes)` 渲染
- 懒加载统一通过 `SuspenseLazy(() => import(/* webpackChunkName:"xxx" */ '@/view/XxxPage'))`
- 嵌套路由通过 `children` 表达，参考 `home`（`/home/one` 是默认重定向目标）
- 导航 / 跳转：使用 `react-router` 的 `<Link>` / `useNavigate` / `<Navigate>`
- ⚠️ 不要从 `react-router-dom` 导入；v7 已合并到 `react-router`

### 7.2 状态管理（MobX）

```ts
// src/store/xxx/index.ts
import {makeAutoObservable, runInAction} from 'mobx';

class XxxStore {
    count = 0;
    constructor() {
        makeAutoObservable(this);
    }
    inc = () => {
        this.count += 1; // 同步赋值：自动 action
    };
    fetch = async () => {
        const data = await api();
        runInAction(() => {
            // 异步赋值：必须 runInAction
            this.count = data.count;
        });
    };
}
export const xxxStore = new XxxStore();
```

```ts
// src/store/index.ts 注册
export const stores = {globalStore, aboutStore, xxxStore};
```

```tsx
// 组件消费：必须 observer 包裹
import {observer} from 'mobx-react-lite';
import {useStores} from '@/store';

const Page = observer(() => {
    const {xxxStore} = useStores();
    return <div onClick={xxxStore.inc}>{xxxStore.count}</div>;
});
```

> 全局 `configure({enforceActions: 'always'})`：直接修改 observable（非 action 中）会抛错。

### 7.3 网络请求

`src/api/request.ts` 已封装：

- `validateStatus: () => true`：所有 HTTP 状态都进入 `then`，业务在拦截器或调用方判断 `response.status`
- `axios-retry`：超时 / `ECONNABORTED` 自动重试 2 次，间隔 `n*10s`
- 导出的是 `request<T>(config)` 函数，调用方需指定泛型

```ts
// src/api/<page>/index.ts
import request from '../request';
import {GetResponseFoo} from './types/foo';

export const getFoo = (params: {id: number}) => request<GetResponseFoo>({url: '/api/foo', method: 'GET', params});
```

约定：

- 命名：`GetRequestXxxType` / `GetResponseXxxType` 集中放在同目录 `types/`
- **业务代码不要直接 `import axios from 'axios'`**
- `home-order/index.ts` 使用 `cors-anywhere` 仅作 demo；新项目应替换为真实 baseURL

### 7.4 通用组件

- 每个组件一个目录：`src/components/<Name>/{index.tsx, index.less | index.module.less}`
- 在 `src/components/index.ts` 追加 `export {default as Name} from './Name';`
- 消费侧：`import {Name} from '@/components'`
- 带工具函数的组件可拆分如 `Button/buttonHelpers.tsx`

### 7.5 样式

- 全局：`src/styles/index.less`（已经引入 reset / normalize，**不要再次引入**）
- 局部全局：`index.less`（class 暴露到全局命名空间）
- 局部隔离：`index.module.less`（CSS Modules，按 `*.module.less` 自动开启）
- PostCSS：autoprefixer / preset-env / flexbugs / normalize 已链路配齐

### 7.6 SVG 图标

```
src/assets/icons/svg/foo.svg   # 放入此目录会被 svg-sprite-loader 自动注入
```

```tsx
import SvgIcon from '@/components/SvgIcon';
<SvgIcon name='foo' className='...' />;
```

详细文档：`src/components/SvgIcon/README.md`。

### 7.7 自定义 Hook

- 存放路径：`src/utils/useHook/`
- 现有：`useRequest.ts`（包装 loading / error / data）
- 新 Hook 需以 `use` 开头，并配置 ESLint react-hooks 规则不报错

### 7.8 类型与常量

| 位置               | 用途                                       |
| ------------------ | ------------------------------------------ |
| `src/types/*.d.ts` | 全局类型 / 资源声明（图片、less、style）   |
| `src/interface/`   | 业务实体接口（多页面共享的领域模型）       |
| `src/constants/`   | 枚举、常量；`enum.ts` 中集中维护可枚举对象 |

## 8. 代码规范与提交规范

### 8.1 Lint / Format

- ESLint 9 flat config：`eslint.config.mjs`（覆盖 ts/tsx/js）
- Stylelint：`*.{css,less,scss}`，使用 `stylelint-config-rational-order`
- Prettier：单引号、4 空格缩进（项目实际配置见 `.prettierrc*` 或 lint-staged 自动格式化）
- husky `pre-commit`：lint-staged 仅对暂存文件跑 ESLint / Stylelint / Prettier
- husky `commit-msg`：commitlint 校验

### 8.2 提交规范

格式：`<type>: <emoji> <subject>`，常用 type：

| type     | emoji | 含义               |
| -------- | ----- | ------------------ |
| feat     | ✨    | 新功能             |
| fix      | 🐛    | 修复               |
| docs     | 📝    | 文档               |
| style    | 💄    | 样式（不影响逻辑） |
| refactor | ♻️    | 重构               |
| perf     | ⚡    | 性能优化           |
| test     | ✅    | 测试相关           |
| build    | 📦    | 构建 / 依赖        |
| ci       | 🎡    | CI / 部署          |
| chore    | 🔨    | 杂项               |
| revert   | ⏪    | 回滚               |

示例：`feat: ✨ 增加宝可梦详情查看`

> 在本仓库内提交代码请使用 `auto-commit` skill；它会自动获取 diff、匹配 iCafe 卡片并生成符合规范的 commit message。

## 9. AI 修改代码须知

1. **不要**新增功能等价的依赖：请求用 `axios`、状态用 `mobx`、图标用 `phosphor` 或 `<SvgIcon>`、类名拼接用 `classnames`
2. **不要**把 `react-router` 改成 `react-router-dom`：v7 已合并
3. **不要**绕过 `request.ts`：保持统一拦截器与重试策略
4. **不要**直接修改 observable：必须在 action / `runInAction` 中
5. **不要**主动新增单测：项目无测试基建，除非用户明确要求
6. **同步修改**：
    - 新增路径别名：`tsconfig.json` + `webpack/config/webpack.common.js` 必须同时改
    - 新增环境变量：`.env.json` 三个环境都要补
    - 新增组件：组件目录 + `src/components/index.ts` barrel
    - 新增 store：实例文件 + `src/store/index.ts` 中 `stores` 聚合
    - 新增页面：`src/view/Xxx` + `src/router/index.tsx` + 必要时 `src/view/Tab/index.tsx`
7. webpack 配置改动需检查 `webpack.common.js` / `dev.js` / `prod.js` 三处一致性
8. `public/` 仅放静态资源（HTML 模板、favicon）；不要放业务代码
9. 修改前优先 `read_file` 确认现状；修改后**保持目录结构与命名风格**与既有页面一致（参考 `Home/HomeTwo`）
10. 提交代码请使用 `auto-commit`，**不要**直接执行 `git commit`

## 10. 常见任务剧本（Cookbook）

### 10.1 新增一个页面 `Foo`

1. `src/view/Foo/index.tsx`、`src/view/Foo/index.less`
2. `src/router/index.tsx`：

    ```ts
    const Foo = SuspenseLazy(() => import(/* webpackChunkName:"foo" */ '@/view/Foo'));
    // routes 中追加 { path: 'foo', element: Foo }
    ```

3. 顶部导航：在 `src/view/Tab/index.tsx` 增加链接
4. 如需接口：`src/api/foo/{index.ts, types/foo.ts}`
5. 如需状态：`src/store/foo/index.ts` + 在 `src/store/index.ts` 注册

### 10.2 新增一个通用组件 `Modal`

1. `src/components/Modal/{index.tsx, index.less}`
2. `src/components/index.ts` 追加 `export {default as Modal} from './Modal';`
3. 用法：`import {Modal} from '@/components';`

### 10.3 接入一个新接口

```ts
// src/api/foo/types/foo.ts
export interface GetRequestFooParams {
    id: number;
}
export interface GetResponseFoo {
    name: string;
}

// src/api/foo/index.ts
import request from '../request';
import {GetRequestFooParams, GetResponseFoo} from './types/foo';

export const getFoo = (params: GetRequestFooParams) =>
    request<GetResponseFoo>({url: '/api/foo', method: 'GET', params});
```

### 10.4 新增一个 MobX Store

```ts
// src/store/counter/index.ts
import {makeAutoObservable} from 'mobx';
class CounterStore {
    n = 0;
    constructor() {
        makeAutoObservable(this);
    }
    inc = () => (this.n += 1);
}
export const counterStore = new CounterStore();
```

```ts
// src/store/index.ts
import {counterStore} from './counter';
export const stores = {globalStore, aboutStore, counterStore};
```

### 10.5 新增 SVG 图标

1. 把 `bar.svg` 放入 `src/assets/icons/svg/`
2. 直接用：`<SvgIcon name="bar" />`（无需手动 import；由 sprite loader 自动收集）

## 11. 外部参考

- 原作者教程（掘金）：<https://juejin.cn/post/7197790401495121977>
- Vite 版本：<https://github.com/guokaigdg/react-template-vite>
- 移动端版本：<https://github.com/guokaigdg/react-template-mobile>
- React Router v7 升级指南：<https://reactrouter.com/7.1.5/upgrading/v6>
- MobX 文档：<https://mobx.js.org/>
