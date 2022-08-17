import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    watch: false,
  },
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', 'vitest'],
      dts: './auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
    }),
  ],
  server: {
    proxy: {
      '/dataapi': {
        target: 'https://cdn.mdeer.com',
        changeOrigin: true,
        rewrite: (pth) => pth.replace(/^\/dataapi/, ''),
      },
      '/mapapi': {
        target: 'https://geo.datav.aliyun.com',
        changeOrigin: true,
        rewrite: (pth) => pth.replace(/^\/mapapi/, ''),
      },
    },
  },
});
