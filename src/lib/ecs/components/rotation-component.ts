import { BaseComponent } from './base-component'

export class RotationComponent extends BaseComponent {
  private get pixiElem() {
    return this.entity.pixiElem!
  }
  get rotation() {
    return this.pixiElem.rotation
  }
  set rotation(v: number) {
    this.pixiElem.rotation = v
  }
}
