import path from 'node:path';
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        base: env.PUBLIC_PATH || '/',
        envPrefix: ['VITE_', 'USER_', 'PUBLIC_', 'ENV'],
        resolve: {
            alias: {
                // 使用 import.meta.dirname 而非 __dirname：后者在 configLoader: 'native' 下不可用
                '@': path.resolve(import.meta.dirname, 'src'),
                Components: path.resolve(import.meta.dirname, 'src/components'),
                Utils: path.resolve(import.meta.dirname, 'src/utils')
            }
        },
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
                generateScopedName: '[name]__[local]__[hash:base64:5]'
            }
        },
        plugins: [
            react(),
            svgr() // 通过 `import Icon from 'xxx.svg?react'` 把 svg 当作 React 组件引入
        ],
        server: {
            host: true,
            port: 3000,
            open: true
        },
        build: {
            outDir: 'build',
            sourcemap: false,
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (/node_modules\/(react|react-dom|react-router|scheduler)\//.test(id)) {
                            return 'react';
                        }
                        if (/node_modules\/(mobx|mobx-react-lite)\//.test(id)) {
                            return 'mobx';
                        }
                    }
                }
            }
        }
    };
});
