import { getPixiApp } from '~/lib/services/pixiApp.service'
import { BaseComponent } from './base-component'

export class BoundsCollisionComponent extends BaseComponent {
  private pixiApp = getPixiApp()
  get left() {
    return 0
  }
  get right() {
    return this.pixiApp.app.screen.width
  }
  get top() {
    return 0
  }
  get bottom() {
    return this.pixiApp.app.screen.height
  }
}
