import Quadtree from '@timohausmann/quadtree-js'
import { World } from 'miniplex'
import { Assets } from 'pixi.js'
import { map, shareReplay } from 'rxjs'
import manifest from '../assets/manifest.json'
import { isCurrentFullScreen, requestFullScreen } from './common/device/toggleFullScreen'
import { getBehaviorSubject, getWindow } from './common/utils'
import { systemClasses, type ComponentType, type ComponentTypeKV } from './ecs'
import { BaseEntity } from './ecs/entities/base-entity'
import { getPixiApp, getTickerLoop, setPixiApp } from './pixi-application'
import {
  getGameScreenAssets,
  getLoadScreenAssets,
  setFontsAssetsBundle,
  setLoadScreenAssetsBundle,
} from './pixi-assets'

class GameEngine {
  pixiApp = getPixiApp()
  miniplexECS = new World<ComponentType>()
  get loadScreenAssets() {
    return getLoadScreenAssets()
  }
  get gameScreenAssets() {
    return getGameScreenAssets()
  }
  get rootCanvas() {
    return this.pixiApp.canvas
  }

  get window() {
    const ww = this.pixiApp.canvas.ownerDocument.defaultView
    if (!ww) {
      throw new Error('window is not defined')
    }
    return ww
  }

  get devicePixelRatio() {
    return getDevicePixelRatio()
  }

  get designWidth() {
    return this.pixiApp.canvas.width / this.devicePixelRatio
  }
  get designHeight() {
    return this.pixiApp.canvas.height / this.devicePixelRatio
  }
  get actualWidth() {
    return this.pixiApp.canvas.offsetWidth
  }
  get actualHeight() {
    return this.pixiApp.canvas.offsetHeight
  }

  getCanvasClientX(x: number) {
    const rect = this.pixiApp.canvas.getBoundingClientRect()
    return ((x - rect.left) * this.designWidth) / this.actualWidth
  }
  getCanvasClientY(y: number) {
    const rect = this.pixiApp.canvas.getBoundingClientRect()
    return ((y - rect.top) * this.designHeight) / this.actualHeight
  }

  constructor() {
    ;(globalThis as any).__PIXI_APP__ = this.pixiApp
  }

  async initSystems() {
    Assets.init({ manifest })
    const systems = await Promise.all(systemClasses)
    systems.forEach((system) => {
      const obj = new system()
      obj.execute()
    })
  }

  addEntity(entity: ComponentType) {
    const ee = this.miniplexECS.add(entity)
    const id = this.miniplexECS.id(ee)
    ;(entity as BaseEntity).ecsEntityId = id
  }

  addEntityWithComponent(entity: ComponentType, componentKV: ComponentTypeKV) {
    const newEntity = Object.assign(entity, componentKV)
    this.addEntity(newEntity)
  }

  addComponent(
    entity: ComponentType,
    propKey: keyof ComponentType,
    component: ComponentType[keyof ComponentType]
  ) {
    this.miniplexECS.addComponent(entity, propKey, component)
  }
}

let _gameSystem: GameEngine
export const initGameEngine = async (elem: HTMLElement) => {
  await setPixiApp(elem)
  initGlobalKeyboardEvent()
  _gameSystem = new GameEngine()
  await _gameSystem.initSystems()
  await Promise.all([setLoadScreenAssetsBundle(), setFontsAssetsBundle()])
}
export const getGameEngine = () => {
  return _gameSystem
}

// keyboard
const initGlobalKeyboardEvent = () => {
  const w = getWindow()
  w.addEventListener('keydown', (event) => {
    if (event.key === 'l') {
      if (!isCurrentFullScreen()) {
        requestFullScreen(w.document.body)
      } else {
        w.document.exitFullscreen()
      }
    }
  })
}

// quadtree
// https://github.com/timohausmann/quadtree-js
let qTree: Quadtree | null = null
const tickerCollisionQTreeLoop$ = getTickerLoop().pipe(
  map((delta) => {
    const ge = getGameEngine()
    if (!qTree) {
      qTree = new Quadtree(
        {
          x: 0,
          y: 0,
          width: ge.designWidth,
          height: ge.designHeight,
        },
        6,
        3
      )
    }

    qTree.clear()
    const query = ge.miniplexECS.without('createComponent').with('collisionComponent')

    for (const comp of query) {
      const bounds = comp.collisionComponent.bounds
      const obj = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        comp,
      }
      qTree.insert(obj)
    }
    return {
      delta,
      qTree,
    }
  }),
  shareReplay(1)
)
export const getTickerCollisionQTreeLoop = () => tickerCollisionQTreeLoop$

// others
const devicePixelRatio$ = getBehaviorSubject(2) //w.devicePixelRatio ?? 1)
export const getDevicePixelRatio = () => devicePixelRatio$.value
