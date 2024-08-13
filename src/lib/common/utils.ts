import { Color } from 'pixi.js'
import { BehaviorSubject, Subject, tap, type Subscription } from 'rxjs'

export type WindowType = Window & typeof globalThis

export enum EnumContainerLabel {
  none = 'none',
  root = 'root',
}

// rxjs
export const getSubject = <T>() => new Subject<T>()
export const getBehaviorSubject = <T>(v: T) => new BehaviorSubject(v)

// window
const window$ = getBehaviorSubject<WindowType | null>(window ?? null)
export const setWindow = (w: WindowType) => window$.next(w)
export const getWindow = () => {
  const w = window$.value
  if (w) {
    return w
  }
  throw new Error('please set up "window"')
}

// getRandomInt(-10,10)
export const getRandomInt = (lower: number, upper: number): number =>
  Math.floor(Math.random() * (upper - lower + 1)) + lower

// Test For Hit
// A basic AABB check between two different squares
export const isRectangleCollision = (
  box01: {
    x: number
    y: number
    width: number
    height: number
  },
  box02: {
    x: number
    y: number
    width: number
    height: number
  }
) => {
  return (
    box01.x < box02.x + box02.width &&
    box01.x + box01.width > box02.x &&
    box01.y < box02.y + box02.height &&
    box01.y + box01.height > box02.y
  )
}

// destroy subject
const destroySub$ = getSubject<Subscription>()
destroySub$
  .pipe(
    tap((sub) => {
      sub.unsubscribe()
    })
  )
  .subscribe()
export const setDestroySub = (v: Subscription) => destroySub$.next(v)

// rgb to hex
export const getRGBA2Hex = (rgba: { r: number; g: number; b: number; a: number }) => {
  return new Color({
    r: Math.round(rgba.r),
    g: Math.round(rgba.g),
    b: Math.round(rgba.b),
    a: rgba.a,
  }).toHex()
}
export const getRandomRGBA = () => ({
  r: getRandomInt(0, 255),
  g: getRandomInt(0, 255),
  b: getRandomInt(0, 255),
  a: getRandomInt(0, 10) / 10,
})

// get real x/y
export const getConvertRealClientXY = (clientX: number, clientY: number, w: WindowType) => {
  const canvasWidth = +import.meta.env.VITE_CANVAS_WIDTH
  const canvasHeight = +import.meta.env.VITE_CANVAS_HEIGHT
  return {
    realClientX: (clientX * canvasWidth) / w.innerWidth,
    realClientY: (clientY * canvasHeight) / w.innerHeight,
  }
}

// iPhoneFullScreen
const isIPhoneFullScreen$ = getBehaviorSubject(false)
export const setIsIPhoneFullScreen = (bo: boolean) => isIPhoneFullScreen$.next(bo)
export const getIsIPhoneFullScreen = () => isIPhoneFullScreen$.asObservable()

// iPhoneHideToolbar
const isIPhoneHideToolbar$ = getBehaviorSubject(false)
export const setIsIPhoneHideToolbar = (bo: boolean) => isIPhoneHideToolbar$.next(bo)
export const getIsIPhoneHideToolbar = () => isIPhoneHideToolbar$.asObservable()

// forceLandscape
const isForceLandscape$ = getBehaviorSubject(false)
export const setIsForceLandscape = (bo: boolean) => isForceLandscape$.next(bo)
export const getIsForceLandscape = () => isForceLandscape$.asObservable()
