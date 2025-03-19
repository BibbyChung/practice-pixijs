import { Container, FederatedPointerEvent, Sprite } from 'pixi.js'
import { switchMap, tap } from 'rxjs'
import { getMiniECS } from '~/lib/services/miniECS.service'
import { isCurrentFullScreen, requestFullScreen } from '../../common/device/toggleFullScreen'
import { getSubject, getWindow } from '../../common/utils'
import { getComponentKV } from '../_index'
import { CreateComponent } from '../components/create.component'
import { PlacementComponent } from '../components/placement.component'
import { BaseEntity } from './base.entity'
import { getLoadingDestory } from './loading.entity'

class FullScreenEntity extends BaseEntity {
  create(): void | Promise<void> {
    // const screen = this._ge.pixiApp.screen
    const assets = this.pixiApp.getGameScreenAssets()

    const c = new Container()
    c.label = 'fullscreen-entity'

    const sp = Sprite.from(assets['game-screen/fullscreen.svg'])
    sp.label = 'FullScreenEntity'
    sp.scale.set(0.4)

    sp.position.set(this.pixiApp.app.screen.width * 0.02, this.pixiApp.app.screen.height * 0.02)
    sp.eventMode = 'static'
    sp.cursor = 'pointer'
    // sp.interactive = true
    // c.hitArea = new Rectangle(0, 0, sp.width, sp.height);
    c.addChild(sp)

    sp.addEventListener('pointertap', this.clickIt.bind(this))

    this.pixiElem = c
  }

  private clickIt(event: FederatedPointerEvent) {
    const w = getWindow()
    if (!isCurrentFullScreen()) {
      requestFullScreen(w.document.body)
    } else {
      w.document.exitFullscreen()
    }
  }
}

const isReady = getSubject<boolean>()
export const init = () => isReady.next(true)

// add full screen entity
isReady
  .pipe(
    switchMap(() => getLoadingDestory()),
    tap((event) => {
      const ecs = getMiniECS()
      const entity = new FullScreenEntity()
      const componentKV = getComponentKV({
        createComponent: new CreateComponent(entity),
        placementComponent: new PlacementComponent(entity, 'game', 100),
      })
      ecs.addEntityWithComponent(entity, componentKV)
    })
  )
  .subscribe()
