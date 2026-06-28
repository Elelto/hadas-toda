import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import vitePrerender from 'vite-plugin-prerender';

// Helper to get all blog routes for prerendering
function getBlogRoutes() {
  const blogDir = resolve(__dirname, 'src/content/blog');
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir);
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slugMatch = file.match(/^\d{4}-\d{2}-\d{2}-(.+)\.md$/);
      const slug = slugMatch ? slugMatch[1] : file.replace('.md', '');
      return `/blog/${slug}`;
    });
}

function getLandingRoutes() {
  const problems = ['gimgum', 'kol', 'higuy', 'peh'];
  const variants = ['a', 'b', 'c'];
  const routes = [];
  problems.forEach(p => {
    variants.forEach(v => {
      routes.push(`/landing/${p}/variant-${v}`);
    });
  });
  return routes;
}

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      include: ['buffer', 'process', 'util'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    // Prerendering — מייצר HTML סטטי לכל נתיב כדי שגוגלבוט יראה תוכן מלא
    vitePrerender({
      staticDir: resolve(__dirname, 'dist'),
      routes: [
        '/',
        '/online-therapy',
        '/bnei-brak',
        '/services',
        '/about',
        '/contact',
        '/blog',
        '/testimonials',
        ...getBlogRoutes(),
        ...getLandingRoutes()
      ],
    }),
  ],
  base: "/",
  server: {
    port: 5173,
    strictPort: false,
    host: '127.0.0.1',
    fs: {
      // אפשר גישה לקבצים מחוץ לתיקיית המקור
      allow: ['..'],
    },
    hmr: {
      overlay: false
    }
  },
  // תיקון Buffer polyfill עבור gray-matter
  define: {
    global: 'globalThis',
  },
  // הגדרת תיקיות סטטיות
  build: {
    // אופטימיזציות ביצועים
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // פיצול קוד לחבילות נפרדות
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          animations: ['aos'],
          utils: ['react-helmet-async']
        },
        // שמות קבצים עם hash לקאשינג
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    },
    // דחיסת גזיפ
    reportCompressedSize: true,
    // גודל חבילה מקסימלי
    chunkSizeWarningLimit: 1000,
  },
  // הגדרת קבצים סטטיים
  publicDir: 'public',
  // preload modules
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'aos', 'react-helmet-async']
  }
});
