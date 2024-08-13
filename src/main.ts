import './app.css'
import { setWindow } from './lib/common/utils'
import App from './App.svelte'

const w = window
setWindow(w)

const app = new App({
  target: document.getElementById('app')!,
})

export default app
