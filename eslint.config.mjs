import eslint from '@eslint/js'; // 导入 ESLint 核心库
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'; // 导入 TypeScript ESLint 插件，用于针对 TypeScript 代码添加额外的 lint 规则等功能
import tsEslintParser from '@typescript-eslint/parser'; // 导入 TypeScript ESLint 的解析器，用于解析 TypeScript 代码语法结构，以便 ESLint 进行规则检查
// import tsEslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'; // 导入 ESLint 插件 prettier 的推荐配置，用于结合 ESLint 和 Prettier 进行代码格式化和风格检查
import reactPlugin from 'eslint-plugin-react'; // 导入 ESLint 的 React 插件，用于针对 React 项目进行相关代码规范检查
import reactHooksPlugin from 'eslint-plugin-react-hooks'; // 导入 ESLint 的 React Hooks 插件，用于检查 React Hooks 的使用是否符合规范
import globals from 'globals'; // 导入 ESLint 的全局变量定义，这里包含了不同环境（如 es2022、浏览器、Node 等）下的全局变量定义

const OFF = 0; // 定义常量 OFF，表示关闭规则，对应 ESLint 规则配置中的 "off" 或者数值 0
const WARN = 1; // 定义常量 WARN，表示开启规则，使用警告级别的错误（warn），对应 ESLint 规则配置中的 "warn" 或者数值 1，这种错误不会导致程序退出
const ERROR = 2; // 定义常量 ERROR，表示开启规则，使用错误级别的错误（error），对应 ESLint 规则配置中的 "error" 或者数值 2，当该规则被触发时，程序会退出

// 定义针对 TypeScript 文件的特定配置
const customTsFlatConfig = [
    {
        // 配置项的名称，用于标识该配置，此处可理解为基于 'typescript-eslint/base' 的配置
        name: 'typescript-eslint/base',
        languageOptions: {
            parser: tsEslintParser, // 指定解析 TypeScript 文件所使用的解析器为 tsEslintParser
            sourceType: 'module'
        },
        files: ['**/*.{ts,tsx}'],
        rules: {
            ...tsEslintPlugin.configs.recommended.rules, // 合并 @typescript-eslint/eslint-plugin 推荐配置中的规则
            '@typescript-eslint/no-confusing-non-null-assertion': ERROR, // 禁止使用容易造成混淆的非空断言操作符
            '@typescript-eslint/no-explicit-any': OFF // 允许在代码中使用 any 类型
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin // 注册 '@typescript-eslint' 插件，使其规则和功能在后续 ESLint 检查中可用
        }
    }
];

// 基础的 ESLint 扁平配置数组，包含多个不同方面的配置项
const flatConfig = [
    // 全局生效的规则配置项
    {
        name: 'global config',
        languageOptions: {
            globals: {
                ...globals.es2022,
                ...globals.browser,
                ...globals.node
            },
            // 配置解析器支持的语法相关的选项
            parserOptions: {
                warnOnUnsupportedTypeScriptVersion: false // 不针对不支持的 TypeScript 版本发出警告
            }
        },
        rules: {
            'no-dupe-class-members': OFF, // 该规则原本用于检查类中是否有重复的成员定义
            'no-redeclare': OFF, // 该规则通常用于检查是否有重复声明的变量等情况
            'no-undef': OFF, // 关闭 'no-undef' 规则，意味着代码中即使使用了未定义的变量也不会触发该规则的错误提示
            'no-unused-vars': OFF // 允许代码中存在定义了但未使用的变量，不会触发相关错误提示
        }
    },
    // React 相关配置项，用于对 React 项目代码进行规范检查和配置
    {
        name: 'react-eslint',
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        plugins: {
            react: reactPlugin, // 注册'react' 插件，用于支持 React 相关的规则检查
            'react-hooks': reactHooksPlugin // 注册'react-hooks' 插件，用于支持 React Hooks 相关规则检查
        },
        languageOptions: {
            // 合并'react' 插件推荐配置中的语言选项相关配置，例如设置支持的 JSX 相关语法等
            ...reactPlugin.configs.recommended.languageOptions
        },
        rules: {
            ...reactPlugin.configs.recommended.rules, // 合并'react' 插件推荐配置中的规则
            'react/react-in-jsx-scope': OFF, // 确保了 React 在 JSX 环境中的可用性，关闭规则检查
            'react-hooks/rules-of-hooks': ERROR, // 严格检查 React Hooks 的使用规则，若违反会以错误形式提示
            'react-hooks/exhaustive-deps': WARN, // 用于检查 Effect 的依赖是否完整，若有问题会以警告形式提示
            '@typescript-eslint/no-require-imports': OFF // 允许在 TypeScript 代码中使用 require 进行模块导入
        },
        settings: {
            react: {
                // 设置 React 版本为自动检测，让 ESLint 相关插件根据项目实际使用的 React 版本来应用合适的规则和检查逻辑
                version: 'detect'
            }
        }
    },
    {
        ignores: ['node_modules', 'build', 'dist'] // 配置忽略的文件或目录，不会进行 ESLint 检查
    }
];

// 导出完整的 ESLint 配置数组，将应用到整个项目的代码检查中
export default [
    eslint.configs.recommended,
    eslintPluginPrettierRecommended,
    //...tsEslint.configs.recommended,
    ...flatConfig,
    ...customTsFlatConfig
];
