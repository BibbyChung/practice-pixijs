import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootFolderPath = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: [
      {
        find: '~',
        replacement: join(rootFolderPath, 'src'),
      },
    ],
  },
})
