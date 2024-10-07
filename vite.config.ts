/* eslint-disable no-undef */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.join(__dirname, '../shared/'),
      '@': path.join(__dirname, 'src/'),
    },
  },
});
