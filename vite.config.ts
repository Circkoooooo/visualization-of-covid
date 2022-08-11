import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [/\.vue$/, /\.vue\?vue/],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: './auto-imports.d.ts',
    }),
    Components({
      extensions: ['vue'],
    }),
  ],
});
