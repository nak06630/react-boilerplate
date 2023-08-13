/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
// also don't forget to "npm i -D @types/node", so __dirname won't complain
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
