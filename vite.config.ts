import { defineConfig } from 'vitest/config';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
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
        target: 'https://c.m.163.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dataapi/, ''),
      },
    },
  },
});
