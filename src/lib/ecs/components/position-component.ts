import { BaseComponent } from './base-component'

export class PositionComponent extends BaseComponent {
  get x() {
    return this.entity.pixiElem?.position.x ?? 0
  }
  set x(v: number) {
    this.entity.pixiElem!.position.x = v
  }
  get y() {
    return this.entity.pixiElem?.position.y ?? 0
  }
  set y(v: number) {
    this.entity.pixiElem!.position.y = v
  }
}
