import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // Increase to 4 MiB
      },
      manifest: {
        name: 'Krishi Vikas Udyog',
        short_name: 'Krishi Vikas Udyog',
        description: 'A digital marketplace for farmers and buyers',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  // base: "/krishi-vikas-udyog/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
