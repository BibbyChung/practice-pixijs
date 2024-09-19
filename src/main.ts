import './app.css'
import { initDevtools } from '@pixi/devtools'

import { setWindow } from './lib/common/utils'
import App from './App.svelte'
import { filter, switchMap, of, delay, tap } from 'rxjs'
import { initMiniECS } from './lib/services/miniECS.service'
import { getPixiApp, initPixiApp } from './lib/services/pixiApp.service'
import { setGameAssetsUpdateLoading } from './lib/ecs/entities/loading-entity'

const w = window
setWindow(w)

const app = new App({
  target: document.getElementById('app')!,
})

app.isSvelteAppReady$
  .pipe(
    filter((a) => !!a),
    switchMap(async (elem) => {
      await initPixiApp(elem)
      await initMiniECS()
      // initIO()
      return of(elem)
    }),
    delay(400),
    // tap(() => gAPI.loader.advance()),
    switchMap(() => {
      const pixiApp = getPixiApp()
      // AudioManager.instance.loadResources()
      return pixiApp.setGameScreenAssetsBundle((progress) => {
        setGameAssetsUpdateLoading(progress)
      })
    }),
    tap(() => {
      // setupI18n()
      // for dev
      const pixiApp = getPixiApp()
      console.log('set up devtools')
      const app = getPixiApp()
      initDevtools({ app: pixiApp.app })
    })
  )
  .subscribe()

export default app
