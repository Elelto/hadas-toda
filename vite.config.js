import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    })
  ],
  base: "/",
  server: {
    fs: {
      // אפשר גישה לקבצים מחוץ לתיקיית המקור
      allow: ['..'],
    },
  },
  // תיקון Buffer polyfill עבור gray-matter
  define: {
    global: 'globalThis',
  },
  // הגדרת תיקיות סטטיות
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin/index.html'),
      },
    },
  },
  // הגדרת קבצים סטטיים
  publicDir: 'public'
});
