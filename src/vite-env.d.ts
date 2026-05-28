/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly USER_BASE_URL: string;
    readonly USER_BASENAME: string;
    readonly PUBLIC_PATH: string;
    readonly ENV: 'dev' | 'qa' | 'prod';
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
