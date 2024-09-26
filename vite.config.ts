import { svelte } from '@sveltejs/vite-plugin-svelte'
import 'dotenv/config'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, FSWatcher, Plugin } from 'vite'
import { genAssetsTypeFiles } from './.bin/assetsTypeGenerate'

const rootFolderPath = dirname(fileURLToPath(import.meta.url))

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create assets files
genAssetsTypeFiles()

export const myWatch = (useWatcher: (watcher: FSWatcher) => void): Plugin => {
  return {
    name: 'vite-plugin-my-watch',
    configureServer(server) {
      useWatcher(server.watcher)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    myWatch((w) => {
      w.add(['./public'])
      w.on('add', () => {
        genAssetsTypeFiles()
      })
      w.on('unlink', () => {
        genAssetsTypeFiles()
      })
    }),
    svelte(),
  ],
  base: process.env.BASE,
  // build: {
  //   sourcemap: true,
  // },
  resolve: {
    alias: [
      {
        find: '~',
        replacement: join(rootFolderPath, 'src'),
      },
    ],
  },
})
