import { getGameEngine } from '../../game-engine'
import { BaseComponent } from './base-component'

export class BoundsCollisionComponent extends BaseComponent {
  private _ge = getGameEngine()

  get left() {
    return 0
  }
  get right() {
    return this._ge.designWidth
  }
  get top() {
    return 0
  }
  get bottom() {
    return this._ge.designHeight
  }
}
