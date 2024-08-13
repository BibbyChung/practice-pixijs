import { getWindow } from '../utils'

const w = getWindow()
export function isFullScreenSupport(target: HTMLElement) {
  return !!target.requestFullscreen
}

export async function requestFullScreen(element: HTMLElement) {
  if (!isFullScreenSupport(element)) return

  await element.requestFullscreen({
    navigationUI: 'hide',
  })
}

export async function exitFullscreen() {
  await w.document.exitFullscreen()
}

export function isCurrentFullScreen() {
  return Boolean(w.document.fullscreen || w.document.fullscreenElement)
}
