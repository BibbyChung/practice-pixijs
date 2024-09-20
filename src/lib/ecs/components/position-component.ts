import { BaseComponent } from './base-component'

export class PositionComponent extends BaseComponent {
  private get pixiElem() {
    return this.entity.pixiElem!
  }
  get x() {
    return this.pixiElem.position.x
  }
  set x(v: number) {
    this.pixiElem.position.x = v
  }
  get y() {
    return this.pixiElem.position.y
  }
  set y(v: number) {
    this.pixiElem.position.y = v
  }
}
