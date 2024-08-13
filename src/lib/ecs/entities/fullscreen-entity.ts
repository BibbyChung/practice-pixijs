import { Sprite } from 'pixi.js'
import { isCurrentFullScreen, requestFullScreen } from '../../common/device/toggleFullScreen'
import { getWindow } from '../../common/utils'
import { BaseEntity } from './base-entity'

export class FullScreenEntity extends BaseEntity {
  constructor() {
    super()
  }

  create(): void | Promise<void> {
    const screen = this._ge.pixiApp.screen
    const sp = Sprite.from(this._ge.loadScreenAssets['fullscreen'])
    sp.label = 'FullScreenEntity'
    sp.scale.set(0.4)

    sp.position.set(screen.width * 0.02, screen.height * 0.02)
    sp.cursor = 'pointer'
    sp.eventMode = 'static'
    sp.interactive = true
    // c.hitArea = new Rectangle(0, 0, sp.width, sp.height);

    sp.addEventListener('pointertap', (event) => {
      const w = getWindow()
      if (!isCurrentFullScreen()) {
        requestFullScreen(w.document.body)
      } else {
        w.document.exitFullscreen()
      }
    })

    this.pixiElem = sp
  }
}
