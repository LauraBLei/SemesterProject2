/* eslint-disable no-undef */
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  appType: 'mpa',
  base: '/',
  build: {
    outDir: 'dist',
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './auth/login/index.html'),
        auth: resolve(__dirname, './auth/index.html'),
        register: resolve(__dirname, './auth/register/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        listing: resolve(__dirname, './listing/index.html'),
      },
    },
  },
});
