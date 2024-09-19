import { isCurrentFullScreen, requestFullScreen } from '../common/device/toggleFullScreen'
import { getWindow } from '../common/utils'
import { MiniPlexECS } from '../ecs/miniECS'

let _miniECS: MiniPlexECS
export const initMiniECS = async () => {
  _miniECS = new MiniPlexECS()
  await _miniECS.initSystems()
  await _miniECS.initEntities()
  initGlobalKeyboardEvent()
}
export const getMiniECS = () => {
  return _miniECS
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
