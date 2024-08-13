import { isMobile as pixiIsMobile } from 'pixi.js'
import { getWindow } from '../utils'

export function isMobile() {
  return pixiIsMobile.phone
}

export function isAndroid() {
  const w = getWindow()
  const userAgent = w.navigator.userAgent.toLowerCase()
  return userAgent.indexOf('android') !== -1
}

export function isTablet() {
  return pixiIsMobile.tablet
}

export function isBarHidden() {
  const w = getWindow()
  const diff = w.outerHeight - w.innerHeight

  const trigger = isChrome() ? w.outerHeight / 10 : 0

  return diff <= trigger
}

export function isPortrait() {
  const w = getWindow()
  return w.innerHeight > w.innerWidth
}

export function isChrome() {
  const w = getWindow()
  const userAgent = w.navigator.userAgent
  return /Chrome/i.test(userAgent) || /CriOS/i.test(userAgent)
}

export function isSafari() {
  const w = getWindow()
  const userAgent = w.navigator.userAgent
  return /^((?!chrome|android).)*safari/i.test(userAgent) && !userAgent.includes('CriOS')
}

export function isPWA() {
  const w = getWindow()
  return w.matchMedia('(display-mode: standalone)').matches
  // return w.navigator["standalone"];
}

export function inIframe() {
  const w = getWindow()
  return w.self !== w.top
}

export function supportVideoFormat() {
  const excludeBrowser = [/vivo/i, /MZBrowser/i]
  const notSupport = excludeBrowser.some((regex) => regex.test(navigator.userAgent))

  if (notSupport) {
    return
  }

  const elem = document.createElement('video')

  if (!elem.canPlayType) {
    return
  }

  function canPlay(type: string) {
    return Boolean(elem.canPlayType(type).replace(/^no$/, ''))
  }

  return {
    ogg: canPlay('video/ogg; codecs="theora"'),
    h264: canPlay('video/mp4; codecs="avc1.42E01E"'),
    h265: canPlay('video/mp4; codecs="hev1"'),
    webm: canPlay('video/webm; codecs="vp8, vorbis"'),
    vp9: canPlay('video/webm; codecs="vp9"'),
    hls: canPlay('application/x-mpegURL; codecs="avc1.42E01E"'),
    av1: canPlay('video/mp4; codecs="av01"'),
  }
}
