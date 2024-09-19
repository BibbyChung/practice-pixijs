import { BaseComponent } from './base-component'

export class RotationComponent extends BaseComponent {
  get rotation() {
    return this.entity.pixiElem?.rotation ?? 0
  }
  set rotation(v: number) {
    this.entity.pixiElem!.rotation = v
  }
}
