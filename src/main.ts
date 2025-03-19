import { initDevtools } from '@pixi/devtools'
import './app.css'

import { delay, filter, of, switchMap, tap } from 'rxjs'
import App from './App.svelte'
import { setWindow } from './lib/common/utils'
import { setGameAssetsUpdateLoading } from './lib/ecs/entities/loading.entity'
import { initMiniECS } from './lib/services/miniECS.service'
import { getPixiApp, initPixiApp } from './lib/services/pixiApp.service'

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
      initDevtools({ app: pixiApp.app })
    })
  )
  .subscribe()

export default app
