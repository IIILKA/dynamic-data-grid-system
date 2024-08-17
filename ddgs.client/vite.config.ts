import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

const baseConfig = {
  build: {
    outDir: 'build'
  },
  plugins: [svgr(), dts(), react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};

export default defineConfig(() => {
  return {
    ...baseConfig,
    server: {
      watch: {
        usePolling: true
      },
      host: true,
      strictPort: true,
      port: +process.env.VITE_PORT,
      https: {
        pfx: fs.readFileSync(path.resolve(__dirname, 'https/ddgs.client.pfx')),
        passphrase: process.env.VITE_SSL_CERTIFICATE_CRYPTIC_PASSWORD
      }
    }
  };
});
