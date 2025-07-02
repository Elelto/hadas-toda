import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    fs: {
      // אפשר גישה לקבצים מחוץ לתיקיית המקור
      allow: ['..'],
    },
  },
  // הגדרת תיקיות סטטיות
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'public/admin/index.html'),
      },
    },
  }
});
