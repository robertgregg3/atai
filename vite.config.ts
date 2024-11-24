import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import dsv from "@rollup/plugin-dsv";
import path from 'path';


export default defineConfig({
  plugins: [react(), dsv()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@charts': path.resolve(__dirname, 'src/components/charts'),
    },
  },
})
