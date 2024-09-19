import Quadtree from '@timohausmann/quadtree-js'
import { Application, Assets, Texture, Ticker } from 'pixi.js'
import { map, shareReplay } from 'rxjs'
import { GameScreenAssetKeys } from '../../_generate/gameScreenAssetsType.generate'
import { LoadScreenAssetKeys } from '../../_generate/loadScreenAssetsType.generate'
import manifest from '../../_generate/manifest.generate.json'
import { getSubject } from '../common/utils'
import { getMiniECS } from './miniECS.service'

type LoadScreenAssetsKeysType = (typeof LoadScreenAssetKeys)[number]
export type LoadScreenAssetsKeysResourceType = Record<
  LoadScreenAssetsKeysType,
  Texture //& { spineData: ISkeletonData }
>

type GameScreenAssetsKeysType = (typeof GameScreenAssetKeys)[number]
export type GameScreenAssetsKeysResourceType = Record<
  GameScreenAssetsKeysType,
  Texture //& { spineData: ISkeletonData }
>

// pixi applciation
let _pixi: Application
export const initPixiApp = async (elem: HTMLElement) => {
  // set up pixi app
  const canvasWidth = +import.meta.env.VITE_CANVAS_WIDTH
  const canvasHeight = +import.meta.env.VITE_CANVAS_HEIGHT

  const app = new Application()
  await app
    .init({
      width: canvasWidth,
      height: canvasHeight,
      backgroundColor: 0x061626,
      resolution: getDevicePixelRatio(),
      antialias: true,
      autoDensity: true,
      // resizeTo: w,
    })
    .then(() => {
      _pixi = app
      app.render()
      app.canvas.classList.add('mainCanvas')
      app.ticker.add((delta) => tickerLoop$.next(delta))
      elem.appendChild(app.canvas)
    })

  // initial assets
  await Assets.init({ manifest })
  await Promise.all([setLoadScreenAssetsBundle()])
}

const getDevicePixelRatio = () => 2 //w.devicePixelRatio ?? 1)

const getRootCanvas = () => _pixi.canvas

const getCanvasClientX = (x: number) => {
  const rootCanvas = getRootCanvas()
  const rect = rootCanvas.getBoundingClientRect()

  const designWidth = rootCanvas.width / devicePixelRatio
  const actualWidth = rootCanvas.offsetWidth
  return ((x - rect.left) * designWidth) / actualWidth
}
const getCanvasClientY = (y: number) => {
  const rootCanvas = getRootCanvas()
  const rect = rootCanvas.getBoundingClientRect()

  const designHeight = rootCanvas.height / devicePixelRatio
  const actualHeight = rootCanvas.offsetHeight

  return ((y - rect.top) * designHeight) / actualHeight
}

// tickerloop
const tickerLoop$ = getSubject<Ticker>()
const getTickerLoop = () => tickerLoop$.asObservable()

// quadtree
// https://github.com/timohausmann/quadtree-js
let qTree: Quadtree | null = null
const tickerCollisionQTreeLoop$ = getTickerLoop().pipe(
  map((delta) => {
    // const ge = _pixi _pixi.sc getec getGameEngine()
    const app = _pixi
    const ecs = getMiniECS()
    if (!qTree) {
      qTree = new Quadtree(
        {
          x: 0,
          y: 0,
          width: app.screen.width,
          height: app.screen.height,
        },
        6,
        3
      )
    }

    qTree.clear()
    const query = ecs.world.without('createComponent').with('collisionComponent')

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
const getTickerCollisionQTreeLoop = () => tickerCollisionQTreeLoop$

// screen assets
let _loadScreenAssets: LoadScreenAssetsKeysResourceType
const getLoadScreenAssets = () => {
  if (!_loadScreenAssets) {
    throw new Error('please execute this "setLoadScreenAssetsBundle" method first')
  }
  return _loadScreenAssets
}
const setLoadScreenAssetsBundle = async () => {
  const textureObj = await Assets.loadBundle('load-screen')
  _loadScreenAssets = textureObj
}

// game assets
let _gameScreenAssets: GameScreenAssetsKeysResourceType
const getGameScreenAssets = () => {
  if (!_gameScreenAssets) {
    throw new Error('please execute this "setGameScreenAssetsBundle" method first')
  }
  return _gameScreenAssets
}
const setGameScreenAssetsBundle = async (func: (progress: number) => void) => {
  const textureObj = await Assets.loadBundle('game-screen', func)
  _gameScreenAssets = textureObj
}

export const getPixiApp = () => ({
  app: _pixi,
  getRootCanvas,
  getCanvasClientX,
  getCanvasClientY,
  getTickerLoop,
  getTickerCollisionQTreeLoop,
  getLoadScreenAssets,
  setLoadScreenAssetsBundle,
  getGameScreenAssets,
  setGameScreenAssetsBundle,
})
