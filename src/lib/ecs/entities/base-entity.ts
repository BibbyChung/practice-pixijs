import type { Container } from 'pixi.js'
import type { Subscription } from 'rxjs'
import { getPixiApp } from '../../../lib/services/pixiApp.service'
import { getMiniECS } from '../../services/miniECS.service'

export abstract class BaseEntity {
  protected pixiApp = getPixiApp()
  protected ecs = getMiniECS()
  protected subs: Subscription[] = []
  pixiElem?: Container
  ecsEntityId?: number

  abstract create(): void | Promise<void>
  destroy(): void {
    setTimeout(() => {
      this.pixiElem?.destroy()
    }, 0)
    this.subs.forEach((item) => {
      item.unsubscribe()
    })
  }
}
